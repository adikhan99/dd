import React from 'react';
import { TextareaAutosize } from '@mui/material';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  disabled?: boolean;
}

const CustomTextArea: React.FC<TextAreaProps> = ({ value, disabled, onChange, placeholder = '', minRows = 3 }) => {
  return (
    <TextareaAutosize
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      minRows={minRows}
      disabled={disabled}
      style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
    />
  );
};

export default CustomTextArea;