import { useQuery } from '@tanstack/react-query';
import { ParentDetails } from '@utils/types/individual-message/types';
import { INDIVIDUAL_API_ENDPOINTS } from '@utils/api/individual-message/endpoints';
import individualMessage from '@repositories/individualMessage';
import { QueryParamsType } from '@ts-types/query-param-types';

// API call
const fetchParentDataQuery = async ({ queryKey }: QueryParamsType): Promise<ParentDetails> => {
  const [url, searchParentQuery, campus] = queryKey as readonly [string, string, string];
  const { data } = await individualMessage.fetchListOfParents(
    `${url}?par_code=${searchParentQuery}&cmpy_code=${campus}`
  );

  return data;
};

// Custom hook
const useFetchParentData = (searchParentQuery?: string | null, campus?: string) => {

  return useQuery<ParentDetails, Error>(
    [INDIVIDUAL_API_ENDPOINTS.PARENT_DETAILS, searchParentQuery, campus],
    fetchParentDataQuery,
    {
      retry: false,
      staleTime: 0,
    },
  );
};

export { useFetchParentData, fetchParentDataQuery }