import { read } from "fs";
import { ChangeEvent, useEffect, useState } from "react"

export default function FileUploader() {

    const [file, setFile] = useState<File | null>()

    const [fileContent, setFileContent] = useState<string[] | null>(null);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0];

        if (selectedFile && selectedFile.type === "text/plain") {
            setFile(selectedFile);
        } else {
            setFile(null)
        }
    }


    useEffect(() => {
        // Only proceed if a file is actually selected.
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                console.log("File content has been read!"); // This will now appear
                console.log(reader.result); // This will show the file's content
                setFileContent(reader.result as string); // You can optionally update state here
            };

            // This is the missing line that starts the reading process.
            reader.readAsText(file);
        }
    }, [file]); // The effect will re-run when the 'file' state changes.

    return (
        <div className="space-y-4">
            <input
                type="file"
                title="Select a file to upload"
                onChange={handleFileChange}
                accept="text/plain"
            />
            {file && (
                <div className="mb-4 text-sm">
                    <p>File name: {file.name}</p>
                    <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                    <p>Type: {file.type}</p>
                </div>
            )}
            {fileContent && (
                <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap max-h-60 overflow-y-auto">
                    <h4 className="font-semibold">File Contents:</h4>
                    <p className="text-gray-700">{fileContent}</p>
                </div>
            )}
        </div>
    )
}
