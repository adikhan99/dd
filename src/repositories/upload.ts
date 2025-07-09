import { UploadAttachmentPayload } from '@ts-types/generated'
import Base from './base'

class upload extends Base<any, any> {

    uploadAttachment = async (url: string, variables: any,) => {
        const option = {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 0,
        }

        return this.http<UploadAttachmentPayload>(url, 'post', variables, option);
    }
}

export default new upload()
