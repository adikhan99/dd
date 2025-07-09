import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_ENDPOINTS } from "@utils/api/auth/endpoints";
import Auth from "@repositories/auth"

export const useLogoutMutation = () => {
    return useMutation<any, any, { sessionId: string }>({
        mutationFn: (logoutInput: { sessionId: string }) => {
            return Auth.logout(`${API_ENDPOINTS.AUTH}/sign-out`, logoutInput);
        },
        onSuccess: () => {
            toast.success("Sign out successfully", { duration: 4000 });
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
