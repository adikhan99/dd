export const AUTH_CREDS = '_CCAA00_'
export const STAFF = 'staff'
export const SUPER_ADMIN = 'admin'
export const OTHER_CATEGORY = "Others"
export const SUPPORT_EMAIL = "helpdesk@aic.wa.edu.au"
export const TERMS_OF_USE = "/terms-of-use"
export const ATTENDANCE_CATEGORY = "Attendance"
export const SESSION_ID = "_SESSION_"

export const profilePlaceholer = "/images/profile-placeholder.png"

export enum AttendanceType {
    Absence = "AFS",
    Late = "LFS",
    Early_Departure = "EDP"
}

export enum TEMPLATE_NAMES {
    GREETING_TEMPLATE = "greeting_template",
}

export enum Language {
    English = "en",
    Arabic = "ar"
}

// PERMISSIONS 
export enum PermissionsEnum {
    ALL = "all",
    INBOX_MODULE = "inbox-module",
    INBOX_READ_ALL_CHATS = "inbox-read-all-chats",
    INBOX_SEND_MESSAGE = "inbox-send-message",
    INDIVIDUAL_MESSAGE_MODULE = "individual-message-module",
    INDIVIDUAL_MESSAGE_SEND_MESSAGE = "individual-message-send-message",
    BROADCAST_MESSAGE_MODULE = "broadcast-message-module",
    BROADCAST_MESSAGE_SEND_BROADCAST = "broadcast-message-send-broadcast",
    ROLES_AND_PERMISSIONS_MODULE = "roles-and-permissions-module",
    ROLES_AND_PERMISSIONS_VIEW_USERS = "roles-and-permissions-view-users",
    ROLES_AND_PERMISSIONS_CREATE_USER = "roles-and-permissions-create-user",
    ROLES_AND_PERMISSIONS_EDIT_USER = "roles-and-permissions-edit-user",
    ROLES_AND_PERMISSIONS_ACTIVE_INACTIVE_USER = "roles-and-permissions-active-inactive-user",
}

export const AllPermissions = [
    PermissionsEnum.INBOX_MODULE,
    PermissionsEnum.INBOX_READ_ALL_CHATS,
    PermissionsEnum.INBOX_SEND_MESSAGE,
    PermissionsEnum.INDIVIDUAL_MESSAGE_MODULE,
    PermissionsEnum.INDIVIDUAL_MESSAGE_SEND_MESSAGE,
    PermissionsEnum.BROADCAST_MESSAGE_MODULE,
    PermissionsEnum.BROADCAST_MESSAGE_SEND_BROADCAST,
    PermissionsEnum.ROLES_AND_PERMISSIONS_MODULE,
    PermissionsEnum.ROLES_AND_PERMISSIONS_VIEW_USERS,
    PermissionsEnum.ROLES_AND_PERMISSIONS_CREATE_USER,
    PermissionsEnum.ROLES_AND_PERMISSIONS_EDIT_USER,
    PermissionsEnum.ROLES_AND_PERMISSIONS_ACTIVE_INACTIVE_USER,
]

// CAMPUSES
export enum CampusEnum {
    KEWDALE_HIGH = 'Kewdale High',
    KEWDALE_PRIMARY = 'Kewdale Primary',
    THORNLIE = 'Thornlie',
    DIANELLA = 'Dianella',
    ADELAIDE = 'Adelaide',
    FORESTDALE = 'Forrestdale',
    HANLEY_BROOK = 'Henley Brook'
}

export enum CampusCodeEnum {
    KEWDALE_HIGH_CODE = '01',
    KEWDALE_PRIMARY_CODE = '01',
    THORNLIE_CODE = '02',
    DIANELLA_CODE = '03',
    ADELAIDE_CODE = '04',
    FORESTDALE_CODE = '05',
    HANLEY_BROOK_CODE = '06'
}

export const campusList = [
    { name: CampusEnum.KEWDALE_HIGH, code: CampusCodeEnum.KEWDALE_HIGH_CODE },
    { name: CampusEnum.KEWDALE_PRIMARY, code: CampusCodeEnum.KEWDALE_PRIMARY_CODE },
    { name: CampusEnum.THORNLIE, code: CampusCodeEnum.THORNLIE_CODE },
    { name: CampusEnum.DIANELLA, code: CampusCodeEnum.DIANELLA_CODE },
    { name: CampusEnum.ADELAIDE, code: CampusCodeEnum.ADELAIDE_CODE },
    { name: CampusEnum.FORESTDALE, code: CampusCodeEnum.FORESTDALE_CODE },
    { name: CampusEnum.HANLEY_BROOK, code: CampusCodeEnum.HANLEY_BROOK_CODE }
];

export enum formats {
    DATE_FORMAT = "DD/MM/YYYY",
    TIME_FORMAT = "hh:mm A",
};