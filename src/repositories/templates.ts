import Base from './base'

class TemplatesRepository extends Base<any, any> {

    getTemplatesCategory = async (url: string) => {
        return this.find(url);
    }

}

export default new TemplatesRepository()
