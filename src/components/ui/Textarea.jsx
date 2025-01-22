import React from 'react';

const Textarea = ({ 
  value, 
  onChange, 
  placeholder, 
  className = '',
  rows = 3
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    />
  );
};

export default Textarea;