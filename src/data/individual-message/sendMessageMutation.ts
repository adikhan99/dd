import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INDIVIDUAL_API_ENDPOINTS } from '@utils/api/individual-message/endpoints';
import { SendMessageRequestBody } from '@utils/types/individual-message/types';
import individualMessage from "@repositories/individualMessage";
import toast from "react-hot-toast";

export const useSendMessageMutation = () => {
    const queryClient = useQueryClient();
    const url = INDIVIDUAL_API_ENDPOINTS.SEND_MESSAGE_TEMPLATE

    return useMutation<any, Error, SendMessageRequestBody[]>({
        mutationFn: async (message: SendMessageRequestBody[]): Promise<any> => {
            return individualMessage.send(url, message)
        },
        onSuccess: () => {
            toast.success("Message sent successfully!", { duration: 4000 });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [url]
            });
        },
        onError: (error: Error) => {
            console.error("Mutation failed:", error);
        }
    });
};
