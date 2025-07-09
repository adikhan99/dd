export interface MobileNumber {
  number: string;
}

export interface ListOfParentQuery {
  searchParentQuery: string;
  campus: string;
}

export interface Student {
  student_code: string;
  surname: string;
  given_name: string;
  year_group: string;
  pc_tutor_group: string;
  date_of_birth: string;
  imageUrl: string;
}

export interface AsyncOptionType {
  title: string;
  value: string;
}

export interface ParentDetails {
  family_name: string;
  father_name: string;
  mother_name: string;
  parent_code: string;
  parent_mobile1: string;
  parent_mobile1_sms_flag: string;
  parent_mobile2: string;
  parent_mobile2_sms_flag: string;
  parent_surname: string;
  students: Student[];
}

export interface SendMessageRequestBody {
  parent_code: string;
  contact_number: string;
  profile_picture_url: string;
  updated_at: string;
  messages: any; // Replace `any` with a more specific type if possible  
  students: Student[],
  template: string;
  templateValues: any[][] | null;
}

type OptionType = { label: string; value: string; flag?: string };

export interface parentDetailFormValues {
  campus: string;
  searchParentQuery: string;
  messageCategory: OptionType;
  messageTemplate: OptionType;
  selectedParent: AsyncOptionType;
  students: Student[];
  selectedChildren: Student[];
}

export interface studentType {
  code: string;
  image: string;
}

export interface StudentImage {
  students: studentType[]
}