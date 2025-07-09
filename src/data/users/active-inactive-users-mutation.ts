import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ActiveInaciveUserInput } from "@ts-types/generated";
import users from "@repositories/users";
import { API_ENDPOINTS } from "@utils/api/users/endpoints";
import { API_ENDPOINTS as AUTH_API_ENDPOINTS } from "@utils/api/auth/endpoints";

export const useActive_InavtiveMutation = () => {

    const queryClient = useQueryClient();

    return useMutation<any, any, ActiveInaciveUserInput>({
        mutationFn: (loginInput: ActiveInaciveUserInput) => {
            return users.active_inactive_user(`${API_ENDPOINTS.USERS}/activeUser`, loginInput);
        },
        onSuccess: () => {
            toast.success("User Updated successfully", { duration: 4000 });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [API_ENDPOINTS.USERS]
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