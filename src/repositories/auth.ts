import { CreateUserInput, LoginInput, Verify_AIC_UserInput } from '@ts-types/generated'
import Base from './base'

class Auth extends Base<any, any> {

    login = async (url: string, variables: LoginInput) => {
        return this.http<LoginInput>(url, 'post', variables);
    }

    logout = async (url: string, variables: { sessionId: string }) => {
        return this.http<{ sessionId: string }>(url, 'post', variables);
    }

    verify_AIC_User = async (url: string, variables: Verify_AIC_UserInput) => {
        return this.http<Verify_AIC_UserInput>(url, 'post', variables);
    }

    createUser = async (url: string, variables: CreateUserInput) => {
        return this.http<CreateUserInput>(url, 'post', variables);
    }

    getUser = async (url: string) => {
        return this.find(url);
    }

}

export default new Auth()
