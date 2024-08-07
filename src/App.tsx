import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import M from "materialize-css";
import "./App.css";
import { OpenAIBaseClient } from "./clients/OpenAI/OpenAIBaseClient";
import { OpenAIAgent } from "./clients/OpenAI/OpenAI";

function App() {
  // Store the file in a list of uploaded files (by file name) and make it efficient (useReducer?)
  // Show the list of uploaded files

  // When a file is uploaded, read the file and extract the data
  const [fileSize, setFileSize] = React.useState<number>(0);
  const [selectedNoteFiles, setSelectedNoteFiles] = React.useState<
    Record<string, File>
  >({});
  const [showApiKeyButton, setShowApiKeyButton] = React.useState<string>("");

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
      reader.onerror = (event) => {
        reject(new Error("Failed to read file"));
      };
      reader.readAsText(file);
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    setShowApiKeyButton(apiKey ?? "");

    OpenAIBaseClient.API_KEY = apiKey ?? "";
    OpenAIAgent.API_KEY = apiKey ?? "";

    const agent = new OpenAIAgent("Hello, I am a bot");

    const res = await agent.getModelResponse("Hello", {}).catch((err) => {
      console.error(err);
    });

    console.log(res);
  };

  const apiKeyButtonContent = showApiKeyButton ? null : (
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

    console.log(fileData);
  };

  const uploadFilesContent = !Object.keys(selectedNoteFiles).length ? null : (
    <div className="pt-4">
      <button onClick={readFilesIntoMemory}>
        Upload ({`${Object.keys(selectedNoteFiles).length}`}) Files
      </button>
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
      </div>
      <div>{`${(fileSize / 1024).toFixed(2)}kb`}</div>
      <div>
        <h1 className="mb-2">Lore Spire PoC</h1>
        {apiKeyButtonContent}
      </div>
      <div>
        <ul>{fileNameDisplay}</ul>
      </div>
      <div>
        <input
          type="file"
          accept=".txt,.json,.md"
          onChange={handleFileUpload}
          multiple
        />
      </div>
      {uploadFilesContent}
    </>
  );
}

export default App;
