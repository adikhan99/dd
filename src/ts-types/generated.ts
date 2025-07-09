import { PermissionsEnum } from "@utils/constants"

export declare type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  Mixed: any
  Upload: any
  Date: Date
  DateTimeTz: any
}

export type AuthCredentialTypes = {
  user: User | null | undefined
  token: string | null | undefined
}


export type AuthProps = {
  allowedRoles?: Scalars['String'][]
  allowedPermission?: PermissionsEnum;
}

export type IPaginator<Data> = {
  data: Data[];
  paginatorInfo: IPaginatorInfo;
}

export type IPaginatorInfo = {
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: any;
  nextPage?: any;
}


export type User = {
  _id: Scalars['ID'];
  email: Scalars['String'];
  username: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  profileImage: Scalars['String'];
  positionTitle: Scalars['String'];
  role: {
    _id: Scalars['Int'];
    name: Scalars['String'];
  },
  active: Scalars['Boolean'];
  createdBy: string
  updatedBy: string
  permissions: Array<Scalars['String']>;
  campus: Array<{
    name: Scalars['String'];
    code: Scalars['String'];
    _id: Scalars['ID'];
  }>
  lastLoggedIn: Scalars['Date'];
  isLastActiveAdmin: Scalars['Boolean']
} & {
  createdBy: User;
  updatedBy: User;
}

export type LoginInput = {
  username: Scalars['String']
  email: Scalars['String']
  accessToken?: Scalars['String'],
  sessionId?: Scalars['String']
}

export type Verify_AIC_UserInput = {
  email: Scalars['String']
}

export type CreateUserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  positionTitle: Scalars['String'];
  permissions: Array<Scalars['String']>
  campuses: Array<Scalars['String']>
}

export type EditUserInput = {
  userId: Scalars['ID'];
  positionTitle: Scalars['String'];
  permissions: Array<Scalars['String']>
  campuses: Array<Scalars['String']>
}

export type ActiveInaciveUserInput = {
  userId: Scalars['String'];
  active: Scalars['Boolean']
}


export type LoginResponse = {
  data: {
    message: Scalars['String']
    data: {
      token: Scalars['String']
      user: User
    }
  }
}


export type Verify_AIC_UserResponse = {
  data: {
    data: VerifiedUserType
  }
}

export type VerifiedUserType = {
  first_name: Scalars['String'];
  surname: Scalars['String'];
  role_campus_details: Array<{
    campus_code: Scalars['String'];
    campus_name: Scalars['String'];
    role: Scalars['String'];
  }>;
  email: Scalars['String'];
  positionTitle: Scalars['String'];
}


export type BroadcastMessagePayload = {
  collegeData: any | null,
  parentsData: {
    parent_code: Scalars['String'],
    parent_surname: Scalars['String'],
    father_name: Scalars['String'],
    mother_name: Scalars['String'],
    family_name: Scalars['String'],
    parent_mobile1: Scalars['String'],
    parent_mobile1_sms_flag: Scalars['String'],
    parent_mobile2: Scalars['String'],
    parent_mobile2_sms_flag: Scalars['String'],
    students: Array<
      {
        student_code: Scalars['String']
        surname: Scalars['String'],
        given_name: Scalars['String'],
        year_group: Scalars['String'],
        pc_tutor_group: Scalars['String'],
        date_of_birth: Scalars['String'],
        absent_date?: Scalars['String'],
        absent_type?: Scalars['String']
      }
    >
  } | string | null,
  messageTemplate?: Scalars['String'],
  message: Scalars['String'],
  messageCategory?: Scalars['String'] | null,
  templateValues?: Array<Scalars['String']> | null,
  isStudentName?: Scalars['Boolean']
  isStudentCode?: Scalars['Boolean']
  whatsAppAttachmentId?: Scalars['String'] | null
  whatsAppAttachmentFileName?: Scalars['String'] | null
  broadcastTitle: Scalars['String'] | null
}

export type ParentsDataPayload = {
  year_grp: Array<Scalars['String']> | Scalars['String'],
  pc_grp: Array<Scalars['String']> | Scalars['String'],
  cmpy_code?: Scalars['String'],
  test_mode: Scalars['Boolean'],
  absent_date?: Scalars['Date'],
  absent_type?: Scalars['String']
}

export type ParentsResponse = {
  data: Array<
    {
      parent_code: Scalars['String'],
      parent_surname: Scalars['String'],
      father_name: Scalars['String'],
      mother_name: Scalars['String'],
      family_name: Scalars['String'],
      parent_mobile1: Scalars['String'],
      parent_mobile1_sms_flag: Scalars['String'],
      parent_mobile2: Scalars['String'],
      parent_mobile2_sms_flag: Scalars['String'],
      students: Array<
        {
          student_code: Scalars['String']
          surname: Scalars['String'],
          given_name: Scalars['String'],
          year_group: Scalars['String'],
          pc_tutor_group: Scalars['String'],
          date_of_birth: Scalars['String'],
          absent_date?: Scalars['String'],
          absent_type?: Scalars['String']
        }
      >
    }
  >
}

export type BrodcastList = {
  data: {
    _id: Scalars['String'];
    broadcast_id: Scalars['String'];
    sender_number: Scalars['String'];
    message_template: Scalars['String'];
    message: Scalars['String'];
    total: Scalars['Int'];
    success: Scalars['Int'];
    failed: Scalars['Int'];
    created_at: Scalars['String'];
  }[]
}

export type BroadcastDetails = {
  data: {
    _id: string;
    job_id: string;
    parent_code: string;
    sender_number: string;
    receiver_number: string;
    status: 'pending' | 'success' | 'failed';
    error_log?: string;
    created_at: string;
  }[]
  count: Scalars['Int']
  page: Scalars['Int']
}

export type ClassGroups = {
  data: {
    pc_tutor_group: Scalars['String'] | null
  }[]
}

export type ChatList = {
  contact_number: string
  messages: object[]
  name: string
  parent_code: string
  updated_at: string
  __v: string
  _id: string
}

export type GreetingTemplatePayload = {
  recipient: string
  message: string
}

export type GreetingTemplateResponse = {
  data: {
    message: Scalars['String']
  }
}

export type TemplatesCategory = {
  name: Scalars['String'];
  slug: Scalars['String'];
}

export type Templates = {
  template_name: Scalars['String'],
  category: Scalars['String'],
  status: Scalars['String'],
  message_sample: Scalars['String']
  format: Scalars['String'],
  variables: Array<Scalars['String']>
}

export type UploadAttachmentPayload = {
  attachment: File | null,
}

export type UploadAttachmentResponse = {
  data: Array<
    {
      message: Scalars['String'],
      file: {
        originalName: Scalars['String'],
        filename: Scalars['String'],
        path: Scalars['String'],
        size: number,
        mimetype: Scalars['String'],
      },
      whatsAppResponse: {
        id: Scalars['String']
      }
    }
  >
}

export interface Message {
  message: string;
  sender_number: string;
  receiver_number: string;
  time_stamp: string;
  parent_code?: string;
  name?: string;
  college?: string;
  isTemplate?: boolean;
  full_name?: string;
  is_contextual_reply?: boolean;
  context_message_id?: string | null;
  context_message_text?: string | null;
  context_message_sender?: string | null;
}

export interface ChatMessage {
  message: string;
  senderId: string;
  receiverId: string;
  time: string;
  feedback: { isSent: boolean; isDelivered: boolean; isSeen: boolean }[];
  parent_code?: string | null;
  college?: string | null;
  isTemplate?: boolean;
  isContextual?: boolean;
  contextId?: string | null;
  contextMessage?: string | null;
  contextSender?: string | null;

}

export interface LastMessage {
  message: string;
  senderId: string;
  time: string;
  feedback: { isSent: boolean; isDelivered: boolean; isSeen: boolean }[];
}

export interface ContactChat {
  id: string;
  fullName?: string;
  parent_code?: string;
  college?: string;
  lastMessage: LastMessage[];
  unSeenMsgs: number;
}

export interface MessagesState {
  chat: {
    id: number;
    userId: number;
    unseenMsgs: number;
    chat: ChatMessage[];
  };
  contact: {
    about: string;
    avatar: string;
    id: string;
    role: string;
    status: string;
    chat: ContactChat[];
  };
}