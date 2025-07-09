import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

// Type Imports
import { AsyncOptionType } from '@utils/types/individual-message/types';

interface AsynchronousProps {
    handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    label: string;
    options: AsyncOptionType[];
    loading: boolean;
    inputValue: string;
    setInputValue: (value: string) => void;
    value: { title: string, value: string } | null;
    open: boolean;
    setOpen: (open: boolean) => void;
    onChange: (event: React.SyntheticEvent<Element, Event>, value: AsyncOptionType | null) => void;
    noOptionsText: string;
}

const AsyncAutocomplete: React.FC<AsynchronousProps> = ({
    handleKeyDown,
    label,
    options,
    loading,
    setInputValue,
    open,
    setOpen,
    onChange,
    noOptionsText,
    value,
}) => {
    return (
        <Autocomplete
            sx={{ width: '100%' }}

            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}

            value={value}
            onInputChange={(event, value) => {
                setInputValue(value)
            }}

            options={options}
            getOptionLabel={(option) => option.title}

            isOptionEqualToValue={(option, value) => option.title === value.title}
            loading={loading}
            onChange={onChange}
            noOptionsText={noOptionsText}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default AsyncAutocomplete;
