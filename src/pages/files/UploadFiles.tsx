import React from "react";
import { OpenAIAgent } from "../../clients/OpenAI/OpenAI";
import { FileObject } from "openai/resources/files.mjs";
import M from "materialize-css";

export const UploadFiles: React.FC = () => {
  // Store the file in a list of uploaded files (by file name) and make it efficient (useReducer?)
  // Show the list of uploaded files

  // When a file is uploaded, read the file and extract the data
  const [fileSize, setFileSize] = React.useState<number>(0);
  const [fileContent, setFileContent] = React.useState<string[]>([]);
  const [selectedNoteFiles, setSelectedNoteFiles] = React.useState<
    Record<string, File>
  >({});

  const [remoteFiles, setRemoteFiles] = React.useState<FileObject[]>([]);

  // Initialize materialize js
  React.useEffect(() => {
    M.AutoInit();
  }, []);

  React.useEffect(() => {
    const agent = new OpenAIAgent("");
    agent.getFiles().then((files) => {
      setRemoteFiles(files.data);
    });
  }, []);

  React.useEffect(() => {
    const totalSize = Object.keys(selectedNoteFiles).reduce((acc, key) => {
      return acc + selectedNoteFiles[key].size;
    }, 0);

    setFileSize(totalSize);
  }, [selectedNoteFiles]);

  const extractData = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          resolve(result as string);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
      reader.readAsText(file);
    });
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    // I need to ensure that the file is not uploaded twice
    const requestedFiles = Array.from(event.target.files ?? []);

    const requestedFilesOfSize = requestedFiles.filter((f) => {
      if (f.size < 20000) {
        return true;
      } else {
        confirm(
          `File is too large: ${f.name} Please upload a file less than 20kb`
        );
        return false;
      }
    });
    const uniqueUploadNames = new Set(requestedFilesOfSize.map((f) => f.name));

    const stateUpdate = Object.keys(selectedNoteFiles).reduce((acc, key) => {
      if (!uniqueUploadNames.has(key)) {
        acc[key] = selectedNoteFiles[key];
      }
      return acc;
    }, {} as Record<string, File>);

    requestedFilesOfSize.forEach((file) => {
      stateUpdate[file.name] = file;
    });

    setSelectedNoteFiles(stateUpdate);
  };

  const fileNameDisplay = Object.keys(selectedNoteFiles).map((fileName) => (
    <li key={fileName}>{fileName}</li>
  ));

  const readFilesIntoMemory = async () => {
    const fileData = await Promise.all(
      Object.keys(selectedNoteFiles).map((fileName) => {
        return extractData(selectedNoteFiles[fileName]);
      })
    );

    setFileContent(fileData);
  };

  const uploadFilesContent = !Object.keys(selectedNoteFiles).length ? null : (
    <>
      <div className="pt-4">
        <button onClick={readFilesIntoMemory}>
          Upload ({`${Object.keys(selectedNoteFiles).length}`}) Files
        </button>
      </div>
    </>
  );

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleSendChat = async () => {
    const userInput = textAreaRef.current?.value ?? "";

    textAreaRef.current!.value = "Prompting...";

    const fileContentContext = fileContent.join("\n");
    const agent = new OpenAIAgent(fileContentContext);
    const { 0: response } = await agent.getModelResponse(userInput, {});

    textAreaRef.current!.value = response;
  };

  const fileChatContent = !fileContent.length ? (
    <>
      <div>
        <input
          type="file"
          accept=".txt,.json,.md,.pdf"
          onChange={handleFileSelection}
          multiple
        />
      </div>
      {uploadFilesContent}
    </>
  ) : (
    <div>
      <h2>Chat</h2>
      <div>
        <button onClick={handleSendChat}>Send</button>
        <textarea ref={textAreaRef}></textarea>
      </div>
    </div>
  );

  const fileRows = remoteFiles.map((file) => {
    return (
      <tr key={file.id}>
        <td>{file.id}</td>
        <td>{file.filename}</td>
        <td>{file.purpose}</td>
        <td>{new Date(file.created_at * 1000).toISOString()}</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div>
        <h1 className="mb-2">My Files</h1>
      </div>
      <div>File Size: {`${(fileSize / 1024).toFixed(2)}kb`}</div>
      <div>
        <ul>{fileNameDisplay}</ul>
      </div>
      {fileChatContent}
      <table className="striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Purpose</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>{fileRows}</tbody>
      </table>
    </div>
  );
};
