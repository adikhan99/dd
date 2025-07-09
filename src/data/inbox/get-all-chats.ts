import inbox from "@repositories/inbox";
import { useQuery } from "@tanstack/react-query"
import { QueryParamsType } from "@ts-types/query-param-types";
import { ChatList } from "@ts-types/generated";
import { INBOX_API_ENDPOINTS } from "@utils/api/inbox/endpoints";

const fetchAllChat = async ({ queryKey }: QueryParamsType) => {
    const [url] = queryKey as readonly [string];

    const { data } = await inbox.all(url)
    return data;
}

const useGetAllChatQuery = (fetchOptions?: any) => {
    return useQuery<ChatList[], Error>(
        [INBOX_API_ENDPOINTS.PARENT_WITH_MESSAGES],
        fetchAllChat,
        {
            ...fetchOptions,
            keepPreviousData: true,
            retry: false,
        }
    )
}

export { fetchAllChat, useGetAllChatQuery }
