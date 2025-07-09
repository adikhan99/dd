import templates from "@repositories/templates";
import { useQuery } from "@tanstack/react-query"
import { Templates } from "@ts-types/generated";
import { QueryParamsType } from "@ts-types/query-param-types";
import { TEMPLATES_API_ENDPOINTS } from "@utils/api/templates/endpoints";

const fetchTemplates = async ({ queryKey }: QueryParamsType) => {

    const [apiUrl, templateCategory, { }] = queryKey as readonly [string, string, {}];
    const url = `${apiUrl}?templateCategory=${templateCategory}`;

    const { data } = await templates.find(url)
    return data;
}

const useTemplatesQuery = (options?: any, templateCategory?: string, fetchOptions?: any) => {
    return useQuery<{ data: Array<Templates> }, Error>(
        [TEMPLATES_API_ENDPOINTS.GET_TEMPLATES, templateCategory, options],
        fetchTemplates,
        {
            ...fetchOptions,
            keepPreviousData: true,
            staleTime: 0,
            enabled: Boolean(templateCategory)
        }
    )
}

export { fetchTemplates, useTemplatesQuery }
