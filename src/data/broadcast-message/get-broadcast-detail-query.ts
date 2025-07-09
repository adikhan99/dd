import broadcast from "@repositories/broadcast";
import { useQuery } from "@tanstack/react-query"
import { BroadcastParam, QueryParamsType } from "@ts-types/query-param-types";
import { BroadcastDetails, IPaginator } from "@ts-types/generated";
import { BROADCAST_API_ENDPOINTS } from "@utils/api/broadcast-message/endpoints";

type QueryParamType = BroadcastParam;

const fetchBroadcastDetail = async ({ queryKey }: QueryParamsType) => {

    const [apiUrl, broadcastId, { page, limit }] = queryKey as readonly [string, string, BroadcastParam];
    const url = `${apiUrl}/${broadcastId}?limit=${limit}&page=${page}`

    const { data: { data: { docs, ...rest } } } = await broadcast.getBrodcastsList(url);
    return { broadcast: { data: docs, paginatorInfo: rest } }
}

const useBroadcastDetailQuery = (options: QueryParamType, broadcastId: string, fetchOptions?: any) => {
    return useQuery<{ broadcast: IPaginator<BroadcastDetails> }, Error>(
        [BROADCAST_API_ENDPOINTS.GET_SINGLE_BROADCAST, broadcastId, options],
        fetchBroadcastDetail,
        {
            ...fetchOptions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchBroadcastDetail, useBroadcastDetailQuery }
