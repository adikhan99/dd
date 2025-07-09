import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Select from 'react-select'
import { ReactNode } from 'react'

// Define the expected shape of list items
type OptionType = { label: string; value: string; flag?: string };

type PropTypes = {
    list?: OptionType[] | undefined;
    errorMsg?: string | undefined | null;
    placeholder?: string;
    label?: string | undefined;
    name?: string;
    onChange?: (e: any, { val }: any) => void;
    isMulti?: boolean;
    value?: OptionType | OptionType[] | [] | undefined | null;
    defaultValue?: OptionType | OptionType[] | [] | undefined | null;
    disable?: boolean;
    tooltip?: ReactNode | string;
    tooltipIcon?: ReactNode | any;
    searchable?: boolean;
    menuPortalTarget?: any;
    isLoading?: boolean;
};

const CustomSelect = ({ tooltip, tooltipIcon, list, errorMsg, placeholder, label, name, onChange, defaultValue, isMulti, value, searchable = true, disable, menuPortalTarget, isLoading = false, ...rest }: PropTypes) => {
    return (
        <>
            {label && (
                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
                    <Typography fontSize={13} variant='body2' color={errorMsg ? 'var(--mui-palette-error-main)' : '#2F2B3DE6'}>
                        {label}
                    </Typography>
                    {tooltip && (
                        <Tooltip title={tooltip} placement="top-start">
                            {tooltipIcon}
                        </Tooltip>
                    )}
                </Grid>
            )}
            <Select
                isClearable
                defaultValue={defaultValue}
                value={value}
                name={name}
                isMulti={isMulti}
                classNamePrefix="select"
                placeholder={placeholder}
                options={list}
                isSearchable={searchable}
                onChange={onChange}
                isDisabled={disable}
                menuPortalTarget={menuPortalTarget}
                {...rest}
                isLoading={isLoading}
            />
            {errorMsg && (
                <Typography variant='body2' sx={{ mt: 0, mb: 3, color: 'red' }}>
                    {errorMsg as string}
                </Typography>
            )}
        </>
    )
}

export default CustomSelect;
