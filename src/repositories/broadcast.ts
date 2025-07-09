import { BroadcastMessagePayload, ParentsDataPayload } from '@ts-types/generated'
import Base from './base'

class BroadcastRepository extends Base<any, any> {

    sendMessage = async (url: string, variables: BroadcastMessagePayload) => {
        return this.http<BroadcastMessagePayload>(url, 'post', variables);
    }

    getBrodcastsList = async (url: string) => {
        return this.find(url);
    }

    getParentsDetails = async (url: string, variables: Array<ParentsDataPayload>) => {
        return this.http<Array<ParentsDataPayload>>(url, 'post', variables);
    }

}

export default new BroadcastRepository()
