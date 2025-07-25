// ** Types
import { AppDispatch } from '@store/index'
import { Dispatch } from 'redux'
import { ThemeColor } from 'src/@core/layouts/types'

export type StatusType = 'busy' | 'away' | 'online' | 'offline'

export type StatusObjType = {
  busy: ThemeColor
  away: ThemeColor
  online: ThemeColor
  offline: ThemeColor
}

export type ProfileUserType = {
  id: number
  role: string
  about: string
  avatar: string
  fullName: string
  status: StatusType
  settings: {
    isNotificationsOn: boolean
    isTwoStepAuthVerificationEnabled: boolean
  }
}

export type MsgFeedbackType = {
  isSent: boolean
  isSeen: boolean
  isDelivered: boolean
}

export type ChatType = {
  message: string
  senderId: string
  time: Date | string
  feedback: MsgFeedbackType
}

export type ChatsObj = {
  id: number
  userId: number
  chat: ChatType[]
  unseenMsgs: number
  lastMessage?: ChatType
}

export type ContactType = {
  id: number
  role: string
  about: string
  avatar?: string
  fullName: string
  status: StatusType
  avatarColor?: ThemeColor
}

export type ChatsArrType = {
  id: number
  role: string
  about: string
  chat: ChatsObj
  avatar?: string
  fullName: string
  status: StatusType
  avatarColor?: ThemeColor
}

export type SelectedChatType = null | {
  chat: ChatsObj
  contact: ChatsArrType
}

export type ChatStoreType = {
  chats: ChatsArrType[] | null
  contacts: ContactType[] | null
  userProfile: ProfileUserType | null
  selectedChat: SelectedChatType
  myPayload: SelectedChatType
}

export type SendMsgParamsType = {
  chat?: ChatsObj
  // message: string
  contact?: ChatsArrType
  selectedChat: any
  dispatch: AppDispatch
}

export type ChatContentType = {
  selectedChat: any
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  dispatch: Dispatch<any>
  statusObj: StatusObjType
  userProfileRightOpen: boolean
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  sendMsg: (params: SendMsgParamsType) => void
  handleUserProfileRightSidebarToggle: () => void
  messages: any
  sendMessage: (message: string) => void;
  showTempSelectBox: boolean;
  showAddMessageBox: boolean;
}

export type ChatSidebarLeftType = {
  selectedChat: any,
  hidden: boolean
  mdAbove: boolean
  store: ChatStoreType
  sidebarWidth: number
  userStatus: StatusType
  dispatch: Dispatch<any>
  leftSidebarOpen: boolean
  statusObj: StatusObjType
  userProfileLeftOpen: boolean
  removeSelectedChat: () => void
  handleSelectChat: (id: number) => void
  handleLeftSidebarToggle: () => void
  getInitials: (val: string) => string
  setUserStatus: (status: StatusType) => void
  handleUserProfileLeftSidebarToggle: () => void
  formatDateToMonthShort: (value: string, toTimeForCurrentDay: boolean) => void
  messages: any,
}

export type UserProfileLeftType = {
  hidden: boolean
  store: ChatStoreType
  sidebarWidth: number
  userStatus: StatusType
  statusObj: StatusObjType
  userProfileLeftOpen: boolean
  setUserStatus: (status: StatusType) => void
  handleUserProfileLeftSidebarToggle: () => void
}

export type UserProfileRightType = {
  hidden: boolean
  store: ChatStoreType
  sidebarWidth: number
  statusObj: StatusObjType
  userProfileRightOpen: boolean
  getInitials: (val: string) => string
  handleUserProfileRightSidebarToggle: () => void
}

export type SendMsgComponentType = {
  store: ChatStoreType
  dispatch: Dispatch<any>
  sendMsg: (params: SendMsgParamsType) => void
}

export type ChatLogType = {
  hidden: boolean
  data: {
    chat: ChatsObj
    contact: ContactType
    userContact: ProfileUserType
  }
}

export type MessageType = {
  time: string | Date
  message: string
  senderId: string
  feedback: MsgFeedbackType
  interactive?: any
  isTemplate?: any
  file_url?: string | null
  file_name?: string | null
  contextId?: any; 
  isContextual?: boolean;
  contextMessage?: any;
  contextSender?: any;

}

export type ChatLogChatType = {
  msg: string
  time: string | Date
  feedback: MsgFeedbackType
  interactive?: any
  isTemplate?: any
  message?: any;
  contextId?: any;
  file_url?: string | null
  file_name?: string | null
  isContextual?: boolean;
  contextMessage?: string;
  contextSender?: string;
}

export type FormattedChatsType = {
  senderId: string
  messages: ChatLogChatType[]
}

export type MessageGroupType = {
  senderId: string
  messages: ChatLogChatType[]
}
