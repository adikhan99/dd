import { ActiveInaciveUserInput, EditUserInput } from '@ts-types/generated';
import Base from './base'

class Users extends Base<any, any> {

    getUsers = async (url: string) => {
        return this.find(url);
    }

    active_inactive_user = async (url: string, variables: ActiveInaciveUserInput) => {
        return this.http<ActiveInaciveUserInput>(url, 'post', variables);
    }

    editUser = async (url: string, variables: EditUserInput) => {
        return this.http<EditUserInput>(url, 'post', variables);
    }

}

export default new Users()
