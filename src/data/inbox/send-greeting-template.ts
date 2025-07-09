import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { GreetingTemplatePayload } from "@ts-types/generated";
import { INBOX_API_ENDPOINTS } from "@utils/api/inbox/endpoints";
import inbox from "@repositories/inbox";

export const useGreetingTemplateMutation = () => {
    return useMutation<GreetingTemplatePayload, any, any>({
        mutationFn: (messagePayload: GreetingTemplatePayload) => {
            return inbox.sendGreetingTemplate(`${INBOX_API_ENDPOINTS.SEND_GREETING_TEMPLATE}`, messagePayload);
        },
        onSuccess: () => {
            toast.success("Message sent Successfully", { duration: 4000 });
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