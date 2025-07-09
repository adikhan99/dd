import templates from "@repositories/templates";
import { useQuery } from "@tanstack/react-query"
import { TemplatesCategory } from "@ts-types/generated";
import { QueryParamsType } from "@ts-types/query-param-types";
import { TEMPLATES_API_ENDPOINTS } from "@utils/api/templates/endpoints";

const fetchTemplatesCategories = async ({ queryKey }: QueryParamsType) => {
    const [apiUrl, { }] = queryKey as readonly [string, {}];

    const { data } = await templates.getTemplatesCategory(apiUrl)
    return data;
}

const useTemplatesCategoriesQuery = (options?: any, fetchOptions?: any) => {
    return useQuery<{ data: Array<TemplatesCategory> }, Error>(
        [TEMPLATES_API_ENDPOINTS.GET_TEMPLATES_CATEGORIES, options],
        fetchTemplatesCategories,
        {
            ...fetchOptions,
            keepPreviousData: true,
            staleTime: 270000 // 270000ms is 4.5 minutes while cache time is 5 minutes by default
        }
    )
}

export { fetchTemplatesCategories, useTemplatesCategoriesQuery }
