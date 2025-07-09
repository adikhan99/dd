import { useMutation } from "@tanstack/react-query";
import { BroadcastMessagePayload } from "@ts-types/generated";
import { BROADCAST_API_ENDPOINTS } from "@utils/api/broadcast-message/endpoints";
import broadcast from "@repositories/broadcast";

export const useBroadcastMutation = () => {
    return useMutation<any, any, BroadcastMessagePayload>({
        mutationFn: (messagePayload: BroadcastMessagePayload) => {
            return broadcast.sendMessage(`${BROADCAST_API_ENDPOINTS.SEND_BROADCAST_MESSAGE}`, messagePayload);
        },
    });
};