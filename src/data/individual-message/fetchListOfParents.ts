import { useQuery } from '@tanstack/react-query';
import { ParentDetails, ListOfParentQuery } from '@utils/types/individual-message/types';
import { INDIVIDUAL_API_ENDPOINTS } from '@utils/api/individual-message/endpoints';
import individualMessage from '@repositories/individualMessage';
import { QueryParamsType } from '@ts-types/query-param-types';
import { AxiosError } from 'axios';

const url = INDIVIDUAL_API_ENDPOINTS.LIST_OF_PARENTS;

// API call function
const fetchListOfParentsQuery = async ({ queryKey }: QueryParamsType): Promise<ParentDetails[]> => {
  const [url, searchParentQuery, campus] = queryKey as readonly [string, string, string];

  const { data } = await individualMessage.fetchListOfParents(
    `${url}?par_code=${searchParentQuery}&cmpy_code=${campus}`
  );

  return data;
};


// Hook
const useFetchListOfParents = (query: ListOfParentQuery) => {

  return useQuery<ParentDetails[], AxiosError>(
    [url, query.searchParentQuery, query.campus],
    fetchListOfParentsQuery,
    {
      retry: false,
      staleTime: 0,
    }
  )
};

export { fetchListOfParentsQuery, useFetchListOfParents };
