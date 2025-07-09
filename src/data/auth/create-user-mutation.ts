import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/auth/endpoints";
import Auth from "@repositories/auth"
import { CreateUserInput } from "@ts-types/generated";
import { API_ENDPOINTS as USER_API_ENDPOINTS } from "@utils/api/users/endpoints";
import { useModal } from "@store/apps/modal";


export const useCreateUserMutation = () => {

    const queryClient = useQueryClient();

    const { closeModal } = useModal()

    return useMutation<any, any, CreateUserInput>({
        mutationFn: (input: CreateUserInput) => {
            return Auth.createUser(`${API_ENDPOINTS.AUTH}/create-user`, input);
        },
        onSuccess: () => {
            toast.success("User Created successfully", { duration: 4000 });
            closeModal();
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [USER_API_ENDPOINTS.USERS]
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