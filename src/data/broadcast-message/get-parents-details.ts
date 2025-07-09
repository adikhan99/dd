import { useMutation } from "@tanstack/react-query";
import { ParentsDataPayload, ParentsResponse } from "@ts-types/generated";
import { BROADCAST_API_ENDPOINTS } from "@utils/api/broadcast-message/endpoints";
import broadcast from "@repositories/broadcast";

export const useParentDetailsMutation = () => {
    return useMutation<ParentsResponse, any, any>({
        mutationFn: (collegeConfigurations: Array<ParentsDataPayload>) => {
            return broadcast.getParentsDetails(`${BROADCAST_API_ENDPOINTS.GET_PARENT_DETAILS}`, collegeConfigurations);
        }
    });
};