import { SendMessageRequestBody, ListOfParentQuery, ParentDetails } from '@utils/types/individual-message/types';

import Base from './base'

class individualMessage extends Base<any, any> {
    send = async (url: string, variables: SendMessageRequestBody[]) => {
        return this.http<SendMessageRequestBody[]>(url, 'post', variables);
    }

    fetchListOfParents = async (url: string) => {
        return this.http<ListOfParentQuery>(url, 'get');
    }

    fetchParentDetails = async (url: string) => {
        return this.http<ParentDetails>(url, 'get');
    }
}

export default new individualMessage()
