import broadcast from "@repositories/broadcast";
import { useQuery } from "@tanstack/react-query"
import { ClassGroups } from "@ts-types/generated";
import { ClassGroupParam, QueryParamsType } from "@ts-types/query-param-types";
import { BROADCAST_API_ENDPOINTS } from "@utils/api/broadcast-message/endpoints";

type QueryParamType = ClassGroupParam;

const fetchClassGroups = async ({ queryKey }: QueryParamsType) => {
    const [apiUrl, { yearGroup, collegeId }] = queryKey as readonly [string, ClassGroupParam];

    const { data } = await broadcast.all(`${apiUrl}?collegeId=${collegeId}&yearGroup=${yearGroup}`)
    return data;
}

const useClassGroupsQuery = (options: QueryParamType, fetchOptions?: any) => {
    return useQuery<ClassGroups, Error>(
        [BROADCAST_API_ENDPOINTS.GET_CLASS_GROUPS, options],
        fetchClassGroups,
        {
            ...fetchOptions,
            keepPreviousData: true,
            enabled: Boolean(options?.collegeId && options?.yearGroup)
        }
    )
}

export { fetchClassGroups, useClassGroupsQuery }
