import { DataGrid, GridColDef, gridClasses, GridRowSelectionModel } from '@mui/x-data-grid';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { DialogActions, DialogContent, Typography } from '@mui/material';
import CustomDialog from '@components/common-components/Dialog';
import styles from './Modal.module.css';
import { useModal } from '@store/apps/modal';
import CustomButton from '@components/common-components/Button';

interface Student {
    student_code: string;
    year_group: string;
    pc_tutor_group: string;
    given_name: string;
}

interface ParentData {
    parent_code: string;
    family_name: string;
    students?: Student[];
}

const PreviewParentsDetailsModal = () => {
    const { closeModal, modalState } = useModal();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const allCollegeData: ParentData[] = modalState?.data?.data?.data || [];
    // const totalRows = allCollegeData.length;

    const handleClose = useCallback(() => {
        closeModal();
    }, [closeModal]);

    const columns = useMemo<GridColDef[]>(() => [
        { field: 'parent_code', headerName: 'Parent Code', width: 150 },
        { field: 'family_name', headerName: 'Family Name', width: 200 },
        {
            field: 'student_codes',
            headerName: 'Student Codes',
            width: 200,
            valueGetter: (params) => {
                const studentCodes = params.row.students?.map((s: Student) => s.student_code);
                return studentCodes?.join(', ') || '';
            },
        },
        {
            field: 'year_groups',
            headerName: 'Year Levels',
            width: 200,
            valueGetter: (params) => {
                const yearGroups = params.row.students?.map((s: Student) =>
                    s.year_group === '-1' ? 'KG' :
                        s.year_group === '0' ? 'PP' :
                            `${s.year_group}`
                );
                return yearGroups?.join(', ') || '';
            },
        },
        {
            field: 'pc_tutor_groups',
            headerName: 'Class Groups',
            width: 200,
            valueGetter: (params) => {
                const pcTutorGroups = params.row.students?.map((s: Student) => s.pc_tutor_group);
                return pcTutorGroups?.join(', ') || '';
            },
        },
        {
            field: 'given_names',
            headerName: 'Students Names',
            width: 200,
            valueGetter: (params) => {
                const givenNames = params.row.students?.map((s: Student) => s.given_name);
                return givenNames?.join(', ') || '';
            },
        },
    ], []);

    const handleRowSelection = useCallback((newSelectionModel: GridRowSelectionModel) => {
        const allIds = allCollegeData.map((row) => row.parent_code);

        // Check if 'select all' is triggered
        const isSelectAllTriggered = newSelectionModel.length === allIds.length;

        // If 'select all' is triggered, select all rows
        if (isSelectAllTriggered) {
            setSelectedIds(allIds);
        } else {
            // Otherwise, select individual rows
            setSelectedIds([...newSelectionModel] as string[]);
        }
    }, [allCollegeData]);


    const getSelectedRows = useCallback((): ParentData[] => {
        return allCollegeData.filter((row) => selectedIds.includes(row.parent_code));
    }, [allCollegeData, selectedIds]);

    const handleSendMessage = useCallback(() => {
        const selectedRows = getSelectedRows();
        if (modalState?.data?.handleSendMessage) {
            modalState.data.handleSendMessage(selectedRows);
        }
    }, [getSelectedRows, modalState?.data?.handleSendMessage]);

    // Select all rows on initial load
    useEffect(() => {
        if (allCollegeData.length > 0) {
            const allIds = allCollegeData.map((row) => row.parent_code);
            setSelectedIds(allIds);
        }
    }, [allCollegeData]);

    return (
        <CustomDialog
            title={<Typography variant='h5' className={styles.title}>Selected Parents/Students</Typography>}
            isOpen={true}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            showDivider
        >
            <DialogContent className={styles.dialogContent}>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <Typography variant="subtitle1">
                            Selected Rows: {selectedIds.length} of {totalRows}
                        </Typography>
                    </div> */}
                    <div style={{ height: 500, width: '100%', minWidth: 1200 }}>
                        <DataGrid
                            rows={allCollegeData}
                            columns={columns}
                            getRowId={(row) => row.parent_code}
                            checkboxSelection
                            rowSelectionModel={selectedIds}
                            onRowSelectionModelChange={handleRowSelection}
                            hideFooterPagination
                            // paginationMode="server" ← ❌ Do NOT use this if all data is already loaded
                            sx={{
                                [`& .${gridClasses.cell}`]: {
                                    py: 1,
                                },
                                '& .MuiDataGrid-virtualScroller': {
                                    overflowX: 'hidden',
                                },
                            }}
                        />
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <CustomButton
                    variant="contained"
                    onClick={handleSendMessage}
                    fullWidth={false}
                    loading={modalState?.isLoading}
                    disabled={selectedIds.length === 0}
                >
                    Send Broadcast
                </CustomButton>
            </DialogActions>
        </CustomDialog>
    );
};

export default PreviewParentsDetailsModal;
