import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EditUserInput } from "@ts-types/generated";
import { API_ENDPOINTS as USER_API_ENDPOINTS } from "@utils/api/users/endpoints";
import users from "@repositories/users";
import { API_ENDPOINTS as AUTH_API_ENDPOINTS } from "@utils/api/auth/endpoints";



export const useEditUserMutation = () => {

    const queryClient = useQueryClient();

    return useMutation<any, any, EditUserInput>({
        mutationFn: (input: EditUserInput) => {
            return users.editUser(`${USER_API_ENDPOINTS.USERS}/edit-user`, input);
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [USER_API_ENDPOINTS.USERS]
            });
            queryClient.invalidateQueries({
                queryKey: [`${AUTH_API_ENDPOINTS.AUTH}/getUser`]
            });
        },
        onError: (error) => {
            toast.error(
                error?.response?.data?.error
                    ? Array.isArray(error?.response?.data?.error)
                        ? error?.response?.data?.error[0]
                        : error?.response?.data?.error
                    : 'errors.something-went-wrong'
            );
        },
    });
};