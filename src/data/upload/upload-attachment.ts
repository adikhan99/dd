import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import upload from "@repositories/upload";
import { UPLOAD } from "@utils/api/upload/endpoints";

export const useUploadAttachmentMutation = () => {
    return useMutation<any, any, File>({
        mutationFn: (file: File) => {

            const formData = new FormData();
            formData.append("attachment", file);

            return upload.uploadAttachment(UPLOAD.ATTACHMENTS, formData);
        },
        onError: (error: any) => {
            console.error("Upload failed", error);
            toast.error(
                error?.response?.data?.error ||
                "Something went wrong while uploading."
            );
        },
    });
};
