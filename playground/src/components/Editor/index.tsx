import React from 'react';

import MonacoEditor, { MonacoEditorProps } from 'react-monaco-editor';

const Editor: React.FC<MonacoEditorProps> = (props) => {
  const options = {
    selectOnLineNumbers: true,
    fontSize: 18,
    ...(props.options || {})
  };
  return (
    <MonacoEditor
      width="100%"
      height="100%"
      language="javascript"
      theme="vs-dark"
      {...props}
      options={options}
    />
  );
};

export default Editor;
