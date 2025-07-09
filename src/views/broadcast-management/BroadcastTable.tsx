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
    CardHeader,
    Stack,
    Pagination,
} from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useBroadcastQuery } from '@data/broadcast-message/get-broadcast-query';
import { useState, useEffect, useRef } from 'react';
import { formatDuration, toTitleCase } from '@utils/helper-functions';
import { useAuthCredentials } from '@store/apps/auth';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default function BroadcastTable() {
    const router = useRouter();
    const [page, setPage] = useState<number>(1);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const { authValues } = useAuthCredentials();

    const { data: broadcast, isLoading, refetch } = useBroadcastQuery({
        limit: Number(process.env.NEXT_PUBLIC_DATA_TABLES_LIMIT),
        page: page,
    });

    const broadcastList = broadcast?.broadcast?.data;
    const allowedColleges = authValues?.user?.campus?.map(val => val.name);

    const handleRowClick = (params: any) => {
        const broadcastId = params.row.broadcast_id;
        router.push(`/broadcast-management/detail/${broadcastId}`);
    };

    const onPageChange = (event: any, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        if (!broadcast?.broadcast?.data) return;

        const allMessagesSent = broadcast.broadcast.data.every((item: any) => {
            const total = item.total || 0;
            const success = item.success || 0;
            const failed = item.failed || 0;
            return success + failed >= total - 1;
        });

        if (!allMessagesSent && !intervalRef.current) {
            intervalRef.current = setInterval(() => {
                refetch();
            }, 5000);
        }

        if (allMessagesSent && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [broadcast, refetch]);

    const columns: GridColDef[] = [
        {
            field: 'filters',
            headerName: 'College Name',
            width: 200,
            valueGetter: (params) => {
                const colleges = params.row.filters?.map((val: any) => val?.college) || [];
                return [...new Set(colleges)].join(', ');
            },
        },
        {
            field: 'filters_year',
            headerName: 'Year Level',
            width: 200,
            valueGetter: (params) => {
                const yearLevels = params.row.filters?.map((val: any) => {
                    if (val?.year_level === '-1') return 'KG';
                    if (val?.year_level === '0') return 'PP';
                    return val?.year_level;
                }) || [];
                return [...new Set(yearLevels.flat())].join(', ');
            },
        },
        {
            field: 'message_template',
            headerName: 'Template Name',
            width: 200,
            valueGetter: (params) => {
                return toTitleCase(params?.row?.message_template.replace(params?.row?.message_category?.replaceAll(' ', '_')?.toLowerCase()?.replaceAll('&_', '') || '', '').replaceAll('_', ' ').trim())
            },
        },
        { field: 'broadcast_title', headerName: 'Broadcast Title', width: 200, },
        { field: 'message_category', headerName: 'Message Category', width: 200, },
        { field: 'message', headerName: 'Message Template', width: 200, },
        { field: 'total', headerName: 'Total', type: 'number', width: 100, },
        { field: 'success', headerName: 'Success', type: 'number', width: 100, },
        { field: 'failed', headerName: 'Failed', type: 'number', width: 100, },
        { field: 'read_count', headerName: 'Read', type: 'number', width: 100, },
        { field: 'delivered_count', headerName: 'Delivered', type: 'number', width: 150, },
        {
            field: 'createdBy',
            headerName: 'Created By',
            width: 200,
            valueGetter: (params) => {
                if (params?.row?.createdBy) {
                    return (params?.row?.createdBy?.email)
                }
            },
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 200,
            valueGetter: (params) => {
                if (params?.row?.createdAt) {
                    return dayjs(params?.row?.createdAt).format('D MMMM YYYY [at] h:mma')
                }
            },
        },
        {
            field: 'start_time',
            headerName: 'Start Time',
            width: 150,
            valueGetter: (params) => {
                if (params?.row?.start_time) {
                    return dayjs(params?.row?.start_time).format('h:mma')
                }
            },
        },
        {
            field: 'end_time',
            headerName: 'End Time',
            width: 150,
            valueGetter: (params) => {
                if (params?.row?.end_time) {
                    return dayjs(params?.row?.end_time).format('h:mma')
                }
            },
        },
        {
            field: 'duration',
            headerName: 'Duration',
            width: 150,
            valueGetter: (params) => {
                if (params?.row?.duration) {
                    return formatDuration(params?.row?.duration);
                }
            },
        },
    ];

    return (
        <Container sx={{ mt: 4, minWidth: "100%" }}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardHeader title="Broadcasts List" />
                <CardContent>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box>
                            <DataGrid
                                sx={{
                                    "& .css-q360zr-MuiDataGrid-columnHeaders": { backgroundColor: "transparent" },
                                    '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '4px' },
                                    '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '8px' },
                                    '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '11px' },
                                    cursor: 'pointer',
                                    height: "80vh"
                                }}
                                getRowHeight={() => 'auto'}
                                rows={broadcastList?.filter((val: any) => (val?.filters?.some((filter: any) => allowedColleges?.includes(filter.college))))?.map((value: any) => ({ id: value._id, ...value })) ?? []}
                                columns={columns}
                                hideFooterPagination={true}
                                onRowClick={handleRowClick}
                            />
                            <Stack sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', paddingY: 5 }} >
                                <Pagination
                                    color="primary"
                                    count={broadcast?.broadcast?.paginatorInfo?.totalPages}
                                    page={broadcast?.broadcast?.paginatorInfo?.page}
                                    onChange={onPageChange}
                                />
                            </Stack>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}
