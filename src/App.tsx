import React from "react";
import reactLogo from "./assets/react.svg";
import openAILogo from "./assets/openai.svg";
import viteLogo from "/vite.svg";
import M from "materialize-css";
import { OpenAIBaseClient } from "./clients/OpenAI/OpenAIBaseClient";
import { OpenAIAgent } from "./clients/OpenAI/OpenAI";
import "./App.css";

function App() {
  // Store the file in a list of uploaded files (by file name) and make it efficient (useReducer?)
  // Show the list of uploaded files

  // When a file is uploaded, read the file and extract the data
  const [tokensConsumed, setTokensConsumed] = React.useState<number>(0);
  const [fileSize, setFileSize] = React.useState<number>(0);
  const [fileContent, setFileContent] = React.useState<string[]>([]);
  const [selectedNoteFiles, setSelectedNoteFiles] = React.useState<
    Record<string, File>
  >({});
  const [hideApiKeyButton, setHideApiKeyButton] = React.useState<string>("");

  // Initialize materialize js
  React.useEffect(() => {
    M.AutoInit();
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

  const handleOpenModal = async () => {
    const apiKey = prompt("Enter OpenAI API Key");
    setHideApiKeyButton(apiKey ?? "");

    OpenAIBaseClient.API_KEY = apiKey ?? "";
    OpenAIAgent.API_KEY = apiKey ?? "";
  };

  const apiKeyButtonContent = hideApiKeyButton ? null : (
    <button onClick={handleOpenModal}>Set OpenAI API Key</button>
  );

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

  const uploadFilesContent =
    !Object.keys(selectedNoteFiles).length || !hideApiKeyButton ? null : (
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

    const fileContentContext = fileContent.join("\n");
    const agent = new OpenAIAgent(fileContentContext);
    const { 0: response, 1: tokens } = await agent.getModelResponse(
      userInput,
      {}
    );

    textAreaRef.current!.value = response;

    setTokensConsumed((prev) => prev + tokens);
  };

  const fileChatContent = !fileContent.length ? (
    <>
      <div>
        <input
          type="file"
          accept=".txt,.json,.md"
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
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://platform.openai.com/docs/overview" target="_blank">
          <img src={openAILogo} className="logo OpenAI" alt="OpenAI logo" />
        </a>
      </div>
      <div>File Size: {`${(fileSize / 1024).toFixed(2)}kb`}</div>
      <div>Tokens: {`${tokensConsumed}`}</div>
      <div>
        <h1 className="mb-2">Lore Spire PoC</h1>
        {apiKeyButtonContent}
      </div>
      <div>
        <ul>{fileNameDisplay}</ul>
      </div>
      {fileChatContent}
    </>
  );
}

export default App;
