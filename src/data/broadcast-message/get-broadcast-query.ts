import broadcast from "@repositories/broadcast";
import { useQuery } from "@tanstack/react-query"
import { BroadcastParam, QueryParamsType } from "@ts-types/query-param-types";
import { BrodcastList, IPaginator } from "@ts-types/generated";
import { BROADCAST_API_ENDPOINTS } from "@utils/api/broadcast-message/endpoints";

type QueryParamType = BroadcastParam;

const fetchBroadcast = async ({ queryKey }: QueryParamsType) => {

    const [apiUrl, { page, limit }] = queryKey as readonly [string, BroadcastParam];
    const url = `${apiUrl}?limit=${limit}&page=${page}`

    const { data: { data: { docs, ...rest } } } = await broadcast.getBrodcastsList(url);
    return { broadcast: { data: docs, paginatorInfo: rest } }
}

const useBroadcastQuery = (options: QueryParamType) => {
    return useQuery<{ broadcast: IPaginator<BrodcastList> }, Error>(
        [BROADCAST_API_ENDPOINTS.GET_BROADCAST, options],
        fetchBroadcast,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchBroadcast, useBroadcastQuery }
