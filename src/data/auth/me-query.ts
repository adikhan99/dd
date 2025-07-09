import { User } from '@ts-types/generated'
import { API_ENDPOINTS } from '@utils/api/auth/endpoints'
import auth from "@repositories/auth"
import { useQuery } from '@tanstack/react-query'

export const fetchMe = async () => {
    const { data } = await auth.getUser(`${API_ENDPOINTS.AUTH}/getUser`);
    return { user: data?.data };
}

export const useMeQuery = (options: any) => {
    options.retry = false;
    options.refetchOnWindowFocus = true;
    options.cacheTime = 0;
    options.staleTime = 0;
    return useQuery<{ user: User }, Error>([`${API_ENDPOINTS.AUTH}/getUser`], () => fetchMe(), options)
}

