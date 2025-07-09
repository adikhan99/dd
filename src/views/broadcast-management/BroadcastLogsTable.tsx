import React, { useState } from 'react';
import {
    DataGrid,
    GridColDef,
} from '@mui/x-data-grid';
import {
    Box,
    CircularProgress,
    Container,
    Card,
    CardContent,
    Chip,
    Pagination,
    Stack,
} from '@mui/material';
import dayjs from 'dayjs';
import { useBroadcastDetailQuery } from '@data/broadcast-message/get-broadcast-detail-query';

interface Props {
    broadcastId: string;
}

export default function BroadcastLogsTable({ broadcastId }: Props) {
    const [page, setPage] = useState<number>(1);

    const { data: broadcast, isLoading } = useBroadcastDetailQuery({ limit: Number(process.env.NEXT_PUBLIC_DATA_TABLES_LIMIT), page: page }, broadcastId);

    const columns: GridColDef[] = [
        { field: 'parent_code', headerName: 'Parent Code', flex: 1 },
        { field: 'student_code', headerName: 'Student Code', flex: 1 },
        { field: 'receiver_number', headerName: 'Parent Number', flex: 1 },
        { field: 'college', headerName: 'College', flex: 1 },
        {
            field: 'year_level',
            headerName: 'Year Level',
            flex: 1,
            valueGetter: (params) => {
                return params.row.year_level === '-1' ? 'KG' : params.row.year_level === '0' ? 'PP' : `Year ${params.row.year_level}`
            },
        },
        {
            field: 'class_group',
            headerName: 'Class Group',
            flex: 1,
            valueGetter: (params) => {
                return params.row.class_group
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: ({ value }) => {
                const color =
                    value === 'success' ? 'success' :
                        value === 'failed' ? 'error' :
                            'warning';
                return <Chip label={value} color={color} size="small" />;
            },
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            flex: 1,
            valueGetter: (params) => {
                if (params?.row?.created_at) {
                    return dayjs(params?.row?.created_at).format('D MMMM YYYY [at] h:mma')
                }
            }
        },
    ];

    const onPageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <DataGrid
                                sx={{
                                    "& .css-q360zr-MuiDataGrid-columnHeaders": { backgroundColor: "transparent" }, height: "80vh",
                                    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '4px' },
                                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '8px' },
                                    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '11px' }
                                }}
                                getRowHeight={() => 'auto'}
                                disableColumnMenu
                                rowHeight={54}
                                rows={broadcast?.broadcast?.data?.map((value: any) => ({ id: value._id, ...value })) ?? []}
                                columns={columns}
                                hideFooterPagination={true}
                            />
                            <Stack
                                sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', paddingY: 5 }}
                            >
                                <Pagination
                                    color="primary"
                                    count={broadcast?.broadcast?.paginatorInfo?.totalPages}
                                    page={broadcast?.broadcast?.paginatorInfo?.page}
                                    onChange={onPageChange}
                                />
                            </Stack>
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}
