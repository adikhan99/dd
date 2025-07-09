import { useQuery } from "@tanstack/react-query"
import { GeneralQueryParam, QueryParamsType } from "@ts-types/query-param-types";
import { IPaginator, User, } from "@ts-types/generated"
import { API_ENDPOINTS } from "@utils/api/users/endpoints";
import users from "@repositories/users";

type QueryParamType = GeneralQueryParam;

const fetchUsers = async ({ queryKey }: QueryParamsType) => {
    const {
        limit = 20,
        page = 1,
        text,
    } = queryKey[1] as QueryParamType;
    const url = `${API_ENDPOINTS.USERS}/getUsers?limit=${limit}&page=${page}${text ? `&text=${text}` : ""}`
    const { data: { data: { docs, ...rest } } } = await users.getUsers(url)
    return { users: { data: docs, paginatorInfo: rest } }
}

const useUsersQuery = (options: QueryParamType) => {
    return useQuery<{ users: IPaginator<User> }, Error>(
        [API_ENDPOINTS.USERS, options],
        fetchUsers,
        {
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchUsers, useUsersQuery }