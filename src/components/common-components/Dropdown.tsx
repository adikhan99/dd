import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface DropdownProps {
  label?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  fullWidth?: boolean;
  multiple?: boolean;
  displayEmpty?: boolean;
  name?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange, fullWidth = true, multiple = false, name }) => {
  return (
    <FormControl fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        label={label}
        multiple={multiple}
        name={name}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;