import React from "react";

type FileUploaderProps = {
  onFileSelection: (files: File[]) => void;
};

export const FileUploader: React.FC<FileUploaderProps> = (props) => {
  const [fileSize, setFileSize] = React.useState<number>(0);
  const [selectedNoteFiles, setSelectedNoteFiles] = React.useState<
    Record<string, File>
  >({});

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
    props.onFileSelection(requestedFiles);
  };

  const fileNameDisplay = Object.keys(selectedNoteFiles).map((fileName) => (
    <li key={fileName}>{fileName}</li>
  ));

  return (
    <>
      <div>File Size: {`${(fileSize / 1024).toFixed(2)}kb`}</div>
      <div>
        <ul>{fileNameDisplay}</ul>
      </div>
      <div>
        <input
          type="file"
          accept=".txt,.json,.md,.pdf"
          onChange={handleFileSelection}
          multiple
        />
      </div>
    </>
  );
};
