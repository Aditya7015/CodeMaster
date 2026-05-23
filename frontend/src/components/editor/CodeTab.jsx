import { useRef } from 'react';
import Editor from '@monaco-editor/react';
import LanguageSelector from './LanguageSelector';
import EditorActions from './EditorActions';

const getLanguageForMonaco = (lang) => {
  switch (lang) {
    case 'javascript':
      return 'javascript';
    case 'java':
      return 'java';
    case 'cpp':
      return 'cpp';
    default:
      return 'cpp';
  }
};

const CodeTab = ({
  selectedLanguage,
  code,
  onCodeChange,
  onLanguageChange,
  onRun,
  onSubmit,
  loading,
  isContestOver
}) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value) => {
    onCodeChange(value || '');
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Language Selector */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
        />
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 border-b border-gray-200">
        <Editor
          height="100%"
          language={getLanguageForMonaco(selectedLanguage)}
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            wordWrap: 'on',
            lineNumbers: 'on',
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 10,
            lineNumbersMinChars: 3,
            renderLineHighlight: 'line',
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            mouseWheelZoom: true,
          }}
        />
      </div>

      {/* Action Buttons */}
      <EditorActions onRun={onRun} isContestOver={isContestOver} onSubmit={onSubmit} loading={loading} />
    </div>
  );
};

export default CodeTab;