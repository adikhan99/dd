import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton, Box, Grid } from '@mui/material';
import { Delete } from '@mui/icons-material';
import CustomSelect from '@components/common-components/CustomSelect';
import CustomButton from '@components/common-components/Button';
import ClassGroupDropdown from './ClassGroupDropdown';
import { ATTENDANCE_CATEGORY } from '@utils/constants';
import { useAuthCredentials } from '@store/apps/auth';
import { useEffect, useRef, useState } from 'react';

interface CollegeSelectionTableProps {
    collegeData: Array<CollegeData>;
    setCollegeData: (val?: any) => void;
    messageCategory?: string;
    messageTemplate?: string;
}

type CollegeData = {
    id: number;
    college: { label: string; value: string } | null;
    yearLevel: string[] | null;
    classGroup: string[] | null;
};

const collegeYearLevelMap: Record<string, string[]> = {
    'Kewdale Primary': ['KG', 'PP', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
    'Kewdale High': ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'],
    'Thornlie': ['KG', 'PP', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'],
    'Dianella': ['KG', 'PP', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10'],
    'Adelaide': ['KG', 'PP', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'],
    'Forrestdale': ['KG', 'PP', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9'],
    'Henley Brook': ['KG', 'PP', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7', 'Year 8', 'Year 9'],
};

const CollegeSelectionTable = ({ collegeData, setCollegeData, messageCategory, messageTemplate }: CollegeSelectionTableProps) => {
    const [collegeOptions, setCollegeOptions] = useState<Array<{ label: string, value: string }>>([]);
    const { authValues } = useAuthCredentials();
    const nextId = useRef<number>(collegeData.length ? Math.max(...collegeData.map(d => d.id)) + 1 : 1);

    const selectedCollegeLabels = collegeData
        .map((row) => row.college?.label)
        .filter(Boolean) as string[];

    const availableCollegeOptions = collegeOptions.filter(
        (option) =>
            !selectedCollegeLabels.includes(option.label) &&
            (messageCategory !== ATTENDANCE_CATEGORY || option.label !== 'Kewdale High')
    );

    const handleChange = (id: number, field: keyof CollegeData, value: any) => {
        setCollegeData((prevRows: CollegeData[]) =>
            prevRows.map((row) =>
                row.id === id
                    ? {
                        ...row,
                        [field]: value,
                        ...(field === 'yearLevel' && { classGroup: 'All' })
                    }
                    : row
            )
        );
    };

    const addNewRow = () => {
        const newRow: CollegeData = {
            id: nextId.current++,
            college: null,
            yearLevel: null,
            classGroup: null
        };
        setCollegeData((prevRows: CollegeData[]) => [...prevRows, newRow]);
    };

    const handleDelete = (id: number) => {
        setCollegeData((prevRows: CollegeData[]) => prevRows.filter((row) => row.id !== id));
    };

    const columns: GridColDef[] = [
        {
            field: 'college',
            headerName: 'College',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div onMouseDown={(e) => e.stopPropagation()} style={{ width: '100%' }}>
                    <CustomSelect
                        list={availableCollegeOptions}
                        onChange={(selectedOption) => {
                            handleChange(params.id as number, 'yearLevel', null);
                            handleChange(params.id as number, 'classGroup', null);
                            handleChange(params.id as number, 'college', selectedOption || null);
                        }}
                        isMulti={false}
                        placeholder="Select College"
                        errorMsg=""
                        value={params.value ? { label: params.value?.label, value: params.value?.value } : null}
                        menuPortalTarget={document.body}
                    />
                </div>
            )
        },
        {
            field: 'yearLevel',
            headerName: 'Year Level',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                const yearLevels = params.row.college?.label ? collegeYearLevelMap[params.row.college.label] || [] : [];
                const yearLevelOptions = [
                    { value: 'All', label: 'All' },
                    ...yearLevels.map((level) => ({ value: level, label: level }))
                ];

                return (
                    <div onMouseDown={(e) => e.stopPropagation()} style={{ width: '100%' }}>
                        <CustomSelect
                            list={yearLevelOptions}
                            onChange={(selectedOptions) => {
                                const selectedValues = selectedOptions
                                    ? selectedOptions.map((opt: any) => opt.value)
                                    : [];
                                const allLevels = yearLevels;

                                if (selectedValues.includes('All') || selectedValues.length === allLevels.length) {
                                    handleChange(params.id as number, 'yearLevel', ['All']);
                                } else {
                                    handleChange(params.id as number, 'yearLevel', selectedValues.length ? selectedValues : null);
                                }
                            }}
                            isMulti={true}
                            placeholder="Select Year Level"
                            errorMsg=""
                            value={
                                params.value
                                    ? (params.value as string[]).map((val: string) => ({
                                        label: val,
                                        value: val
                                    }))
                                    : []
                            }
                            menuPortalTarget={document.body}
                            disable={!params.row.college}
                        />
                    </div>
                );
            }
        },
        {
            field: 'classGroup',
            headerName: 'Class Group',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <ClassGroupDropdown params={params} handleChange={handleChange} />
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => handleDelete(params.id as number)}>
                        <Delete />
                    </IconButton>
                </Box>
            )
        }
    ];

    useEffect(() => {
        const updatedCollege = authValues?.user?.campus?.map((val: { code: string, name: string }) => ({
            label: val.name,
            value: val.code
        }));
        if (updatedCollege) setCollegeOptions(updatedCollege);
    }, [authValues]);

    return (
        <Box
            sx={{
                width: '100%',
                padding: 2,
                '& .MuiDataGrid-root': {
                    backgroundColor: '#fff',
                    borderRadius: 2,
                    boxShadow: 1
                }
            }}
        >
            <DataGrid
                rows={collegeData}
                columns={columns}
                disableRowSelectionOnClick
                autoHeight
                hideFooterPagination
                getRowId={(row) => row.id}
            />
            <Grid display="flex" justifyContent="flex-end" gap={5} marginTop={5}>
                <CustomButton
                    fullWidth={false}
                    variant="contained"
                    onClick={addNewRow}
                    disabled={availableCollegeOptions.length === 0 || (messageTemplate === 'Parent Teacher Meeting' && collegeData.length === 1)}
                >
                    Add College
                </CustomButton>
            </Grid>
        </Box>
    );
};

export default CollegeSelectionTable;
