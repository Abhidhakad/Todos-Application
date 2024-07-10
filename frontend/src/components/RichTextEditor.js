import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import ReactQuill from 'react-quill'; // Import ReactQuill

const RichTextEditor = () => {
  const [editorValue, setEditorValue] = useState('');

  // Handle changes in the editor
  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  return (
    <div>
      <h1>Your Rich Text Editor</h1>
      <div className="max-w-md mx-auto rounded-md overflow-hidden bg-white bg-opacity-20 shadow-lg p-6">
        {/* Render the Quill editor */}
        <ReactQuill
          value={editorValue}
          onChange={handleEditorChange}
          theme="snow" // Specify the theme (snow is a clean theme)
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
