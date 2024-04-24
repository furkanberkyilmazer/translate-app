import React,{useState} from 'react';
import languages from '../../consts/languages';

function Translate() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage]=useState('en');




  const url = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '7181624d3amsh78647ce7d20ddd2p17d677jsn4b3b4f161ce0',
      'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
    },
    body: new URLSearchParams({
      from: 'auto',
      to: selectedLanguage,
      text: inputText
    })
  };

  const translateText = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
      setTranslatedText(JSON.parse(result).trans);
    } catch (error) {
      console.error('Çeviri hatası:', error);
      setError('Çeviri yapılırken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
      <textarea
        style={{ width: '100%', minHeight: '100px', marginBottom: '10px', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
        placeholder="Write the text to be translated here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <select
        style={{ marginBottom: '10px', padding: '5px', fontSize: '16px' }}
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <br />
      <button
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
        onClick={translateText}
        disabled={inputText.trim() === ''}
      >
        Translate
      </button>
      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#fff' }}>
        {translatedText}
      </div>
    </div>
  );
}


export default Translate;