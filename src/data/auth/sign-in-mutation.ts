import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/auth/endpoints";
import Auth from "@repositories/auth"
import { LoginInput, LoginResponse } from "@ts-types/generated";

export const useLoginMutation = () => {
    return useMutation<LoginResponse, any, LoginInput>({
        mutationFn: (loginInput: LoginInput) => {
            return Auth.login(`${API_ENDPOINTS.AUTH}/sign-in`, loginInput);
        },
        onSuccess: () => {
            toast.success("Sign in successfully", { duration: 4000 });
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