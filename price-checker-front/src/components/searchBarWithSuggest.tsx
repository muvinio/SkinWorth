import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { highlightMatch } from './hightlightMatch'; // Assuming highlightMatch is in utils.ts


export function SearchBarWithSuggest({
  onSelect,
  value,
  setValue,
}: { onSelect?: (item: string) => void; value: string; setValue: (v: string) => void }) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selected) return;
    const fetchSuggestions = async () => {
      if (value.trim().length === 0) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }
      try {
        const res = await axios.get<string[]>(`/api/suggest?q=${encodeURIComponent(value)}`);
        setSuggestions(res.data.slice(0, 5));
        setShowSuggestions(true);
      } catch (err) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };
    const delayDebounce = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(delayDebounce);
  }, [value, selected]);

  const handleSelect = (suggestion: string) => {
    setValue(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelected(true);
    onSelect?.(suggestion);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setSelected(false);
  };

  return (
    <div style={{ position: 'relative', width: '400px' }}>
      <input
        value={value}
        onChange={handleInputChange}
        placeholder="Введите название скина"
        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && !selected && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          maxHeight: '200px',
          overflowY: 'auto',
          zIndex: 10
        }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => handleSelect(s)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee'
              }}
            >
              {highlightMatch(s, value)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}