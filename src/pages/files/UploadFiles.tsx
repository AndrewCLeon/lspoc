import React from "react";
import { OpenAIAgent } from "../../clients/OpenAI/OpenAI";
import { FileObject } from "openai/resources/files.mjs";
import M from "materialize-css";
import { useParams } from "react-router";

export const UploadFiles: React.FC = () => {
  // Store the file in a list of uploaded files (by file name) and make it efficient (useReducer?)
  // Show the list of uploaded files

  // When a file is uploaded, read the file and extract the data
  const { characterId } = useParams<{
    campaignId: string;
    characterId: string;
  }>();
  const [fileSize, setFileSize] = React.useState<number>(0);
  const [selectedNoteFiles, setSelectedNoteFiles] = React.useState<
    Record<string, File>
  >({});

  const [remoteFiles, setRemoteFiles] = React.useState<FileObject[]>([]);

  const refreshFiles = () => {
    const agent = new OpenAIAgent("");
    agent.getFiles().then((files) => {
      setRemoteFiles(files?.data ?? []);
    });
  };

  // Initialize materialize js
  React.useEffect(() => {
    M.AutoInit();
  }, []);

  React.useEffect(() => {
    refreshFiles();
  }, []);

  React.useEffect(() => {
    const totalSize = Object.keys(selectedNoteFiles).reduce((acc, key) => {
      return acc + selectedNoteFiles[key].size;
    }, 0);

    setFileSize(totalSize);
  }, [selectedNoteFiles]);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    // I need to ensure that the file is not uploaded twice
    const requestedFiles = Array.from(event.target.files ?? []);

    const uniqueUploadNames = new Set(requestedFiles.map((f) => f.name));

    const stateUpdate = Object.keys(selectedNoteFiles).reduce((acc, key) => {
      if (!uniqueUploadNames.has(key)) {
        acc[key] = selectedNoteFiles[key];
      }
      return acc;
    }, {} as Record<string, File>);

    requestedFiles.forEach((file) => {
      stateUpdate[file.name] = file;
    });

    setSelectedNoteFiles(stateUpdate);
  };

  const fileNameDisplay = Object.keys(selectedNoteFiles).map((fileName) => (
    <li key={fileName}>{fileName}</li>
  ));

  const handleFilesUpload = async () => {
    const agent = new OpenAIAgent("");
    await Promise.all(
      Object.keys(selectedNoteFiles).map((fileName) => {
        return agent.uploadFile(selectedNoteFiles[fileName]);
      })
    );

    setSelectedNoteFiles({});
    refreshFiles();
  };

  const uploadFilesContent = !Object.keys(selectedNoteFiles).length ? null : (
    <>
      <div className="pt-4">
        <button onClick={handleFilesUpload}>
          Upload ({`${Object.keys(selectedNoteFiles).length}`}) Files
        </button>
      </div>
    </>
  );

  const fileSelectionContent = (
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
  );

  const fileRows = remoteFiles.map((file) => {
    return (
      <tr key={file.id}>
        <td>{file.id}</td>
        <td>{file.filename}</td>
        <td>{file.purpose}</td>
        <td>{(file.bytes / 1024).toFixed(2)}kb</td>
        <td>{new Date(file.created_at * 1000).toISOString()}</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div>
        <h1 className="mb-2">{characterId} Files</h1>
      </div>
      <div>File Size: {`${(fileSize / 1024).toFixed(2)}kb`}</div>
      <div>
        <ul>{fileNameDisplay}</ul>
      </div>
      {fileSelectionContent}
      <table className="striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Purpose</th>
            <th>Size</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>{fileRows}</tbody>
      </table>
    </div>
  );
};
