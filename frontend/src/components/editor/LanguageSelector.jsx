const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const languages = [
    { id: 'javascript', label: 'JavaScript' },
    { id: 'java', label: 'Java' },
    { id: 'cpp', label: 'C++' },
  ];

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.id}
          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition ${
            selectedLanguage === lang.id
              ? 'bg-green-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => onLanguageChange(lang.id)}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;