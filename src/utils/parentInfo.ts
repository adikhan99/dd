import { MobileNumber, ParentDetails } from './types/individual-message/types';

export const getParentInfo = (parentDetails: ParentDetails | undefined) => {
    if (!parentDetails) {
        return {
            parentName: '',
            mobileNumbers: [],
            students: [],
        };
    }

    const {
        father_name,
        parent_mobile1,
        parent_mobile1_sms_flag,
        parent_mobile2,
        parent_mobile2_sms_flag,
        family_name,
        students = [],
    } = parentDetails;

    const mobileNumbers: MobileNumber[] = [];

    parent_mobile1_sms_flag === 'Y' && mobileNumbers.push({ number: parent_mobile1 })
    parent_mobile2_sms_flag === 'Y' && mobileNumbers.push({ number: parent_mobile2 })

    return {
        parentName: father_name,
        mobileNumbers,
        students,
        familyName: family_name
    };
}