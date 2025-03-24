import React from 'react';

const RatingBar = ({ label, value, onChange }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div>{label}</div>
      {[1, 2, 3, 4].map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          style={{
            margin: '0 5px',
            padding: '8px 16px',
            backgroundColor: value === num ? '#4CAF50' : '#e0e0e0',
            color: value === num ? '#fff' : '#000',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default RatingBar;
