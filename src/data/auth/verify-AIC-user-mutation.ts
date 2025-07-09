import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/auth/endpoints";
import Auth from "@repositories/auth"
import { Verify_AIC_UserInput, Verify_AIC_UserResponse } from "@ts-types/generated";

export const useVerify_AIC_UserMutation = () => {
    return useMutation<Verify_AIC_UserResponse, any, Verify_AIC_UserInput>({
        mutationFn: (input: Verify_AIC_UserInput) => {
            return Auth.verify_AIC_User(`${API_ENDPOINTS.AUTH}/verify-AIC-user`, input);
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