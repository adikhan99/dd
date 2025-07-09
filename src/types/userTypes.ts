export interface PermissionItem {
  label: string;
  description?: string;
  checked: boolean;
  count?: string;
  children?: PermissionItem[];
}

export interface UserFormValues {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  campus: string[];
}

export interface UserData {
  id: number;
  fullName: string;
  email: string;
  role: string;
  campus: string[];
  status: string;
}

export type ExpandedSections = {
  broadcast: boolean;
  individualMessage: boolean;
  inbox: boolean;
  rolesPermissions: boolean;
};