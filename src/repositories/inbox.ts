import { GreetingTemplatePayload } from '@ts-types/generated'
import Base from './base'

class InboxRepository extends Base<any, any> {

    sendGreetingTemplate = async (url: string, variables: GreetingTemplatePayload) => {
        return this.http<GreetingTemplatePayload>(url, 'post', variables);
    }
}

export default new InboxRepository()
