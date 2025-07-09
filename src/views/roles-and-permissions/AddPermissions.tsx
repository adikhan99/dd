import { useState } from "react"
import {
    Switch,
    Collapse,
    Typography,
    Box,
} from "@mui/material"
import { PermissionsEnum } from "@utils/constants"

import Icon from 'src/@core/components/icon';
import styles from './Modal.module.css';
import CustomButton from "@components/common-components/Button";


interface PermissionItem {
    id: PermissionsEnum
    label: string
    description: string
    enabled: boolean
    dependencies?: PermissionsEnum[]
}

interface PermissionModule {
    id: PermissionsEnum
    label: string
    permissions: PermissionItem[]
}

interface AddUserPermissionsProps {
    open?: boolean
    onClose?: () => void
    onSave: (permissions: PermissionsEnum[]) => void
    creatinguser: boolean
}

export default function AddUserPermissions({ open = true, onClose = () => null, onSave, creatinguser }: AddUserPermissionsProps) {


    const [permissionModules, setPermissionModules] = useState<PermissionModule[]>([
        {
            id: PermissionsEnum.BROADCAST_MESSAGE_MODULE,
            label: "Broadcast",
            permissions: [
                {
                    id: PermissionsEnum.BROADCAST_MESSAGE_SEND_BROADCAST,
                    label: "Send Broadcast",
                    description: "Allows the user to access and send broadcasts to parents",
                    enabled: false,
                },
            ],
        },
        {
            id: PermissionsEnum.INDIVIDUAL_MESSAGE_MODULE,
            label: "Individual Message",
            permissions: [
                {
                    id: PermissionsEnum.INDIVIDUAL_MESSAGE_SEND_MESSAGE,
                    label: "Send Individual Message",
                    description: "Allows the user to access and send individual messages to parents",
                    enabled: false,
                },
            ],
        },
        {
            id: PermissionsEnum.INBOX_MODULE,
            label: "Inbox",
            permissions: [
                {
                    id: PermissionsEnum.INBOX_READ_ALL_CHATS,
                    label: "Read All Conversations",
                    description: "Allows the user to access and view conversations in the inbox",
                    enabled: true,
                },
                {
                    id: PermissionsEnum.INBOX_SEND_MESSAGE,
                    label: "Reply to Conversations",
                    description: "Allows the user to respond to conversations within the inbox.",
                    enabled: false,
                    dependencies: [PermissionsEnum.INBOX_READ_ALL_CHATS],
                },
            ],
        },
        {
            id: PermissionsEnum.ROLES_AND_PERMISSIONS_MODULE,
            label: "Roles and Permissions",
            permissions: [
                {
                    id: PermissionsEnum.ROLES_AND_PERMISSIONS_VIEW_USERS,
                    label: "View Users",
                    description: "Allows the user to access and view all the existing users in Dialogue.",
                    enabled: false,
                },
                {
                    id: PermissionsEnum.ROLES_AND_PERMISSIONS_EDIT_USER,
                    label: "Update User",
                    description: "Allows the user to access and edit user details.",
                    enabled: false,
                    dependencies: [PermissionsEnum.ROLES_AND_PERMISSIONS_VIEW_USERS],
                },
                {
                    id: PermissionsEnum.ROLES_AND_PERMISSIONS_CREATE_USER,
                    label: "Add User",
                    description: "Allows the user to access and create a new user for Dialogue.",
                    enabled: false,
                    dependencies: [PermissionsEnum.ROLES_AND_PERMISSIONS_VIEW_USERS],
                },
                {
                    id: PermissionsEnum.ROLES_AND_PERMISSIONS_ACTIVE_INACTIVE_USER,
                    label: "Active / Deactivate User",
                    description: "Allows the user to access and active/deactive users.",
                    enabled: false,
                    dependencies: [PermissionsEnum.ROLES_AND_PERMISSIONS_VIEW_USERS],
                },
            ],
        },
    ])

    const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({
        0: false,
        1: false,
        2: true,
        3: false,
    })

    const toggleModuleExpand = (moduleIndex: number) => {
        setExpandedModules({
            ...expandedModules,
            [moduleIndex]: !expandedModules[moduleIndex],
        })
    }

    // Handle permission toggle
    const handlePermissionToggle = (moduleIndex: number, permissionIndex: number) => {
        const updatedModules = [...permissionModules]
        const permission = updatedModules[moduleIndex].permissions[permissionIndex]

        // Toggle the permission
        permission.enabled = !permission.enabled

        // Handle dependencies
        if (permission.enabled && permission.dependencies) {
            // Enable all dependencies
            permission.dependencies.forEach((depId) => {
                updatedModules.forEach((module, mIdx) => {
                    module.permissions.forEach((perm, pIdx) => {
                        if (perm.id === depId) {
                            updatedModules[mIdx].permissions[pIdx].enabled = true
                        }
                    })
                })
            })
        } else if (!permission.enabled) {
            // If a permission is being disabled, disable all permissions that depend on it
            updatedModules.forEach((module, mIdx) => {
                module.permissions.forEach((perm, pIdx) => {
                    if (perm.dependencies && perm.dependencies.includes(permission.id) && perm.enabled) {
                        updatedModules[mIdx].permissions[pIdx].enabled = false
                    }
                })
            })
        }

        setPermissionModules(updatedModules)
    }

    // Handle module toggle
    const handleModuleToggle = (moduleIndex: number) => {
        const updatedModules = [...permissionModules]
        // eslint-disable-next-line @next/next/no-assign-module-variable
        const module = updatedModules[moduleIndex]

        // Check if all permissions are enabled
        const allEnabled = module.permissions.every((p) => p.enabled)

        // Toggle all permissions in the module
        const newState = !allEnabled
        module.permissions.forEach((permission) => {
            permission.enabled = newState
        })

        // Handle dependencies for all permissions in the module
        if (newState) {
            module.permissions.forEach((permission) => {
                if (permission.dependencies) {
                    permission.dependencies.forEach((depId) => {
                        updatedModules.forEach((m, mIdx) => {
                            m.permissions.forEach((p, pIdx) => {
                                if (p.id === depId) {
                                    updatedModules[mIdx].permissions[pIdx].enabled = true
                                }
                            })
                        })
                    })
                }
            })
        } else {
            // If module is being disabled, check if any permissions in this module
            // are dependencies for permissions in other modules
            module.permissions.forEach((permission) => {
                updatedModules.forEach((m, mIdx) => {
                    m.permissions.forEach((p, pIdx) => {
                        if (p.dependencies && p.dependencies.includes(permission.id) && p.enabled) {
                            updatedModules[mIdx].permissions[pIdx].enabled = false
                        }
                    })
                })
            })
        }

        setPermissionModules(updatedModules)
    }

    // Get module status (e.g., "2/5 turned on")
    const getModuleStatus = (moduleIndex: number) => {
        // eslint-disable-next-line @next/next/no-assign-module-variable
        const module = permissionModules[moduleIndex]
        const enabledCount = module.permissions.filter((p) => p.enabled).length
        const totalCount = module.permissions.length
        return `${enabledCount}/${totalCount} turned on`
    }

    // Handle save
    const handleSave = () => {
        const selectedPermissions: PermissionsEnum[] = []

        permissionModules.forEach((module) => {
            const hasEnabledPermissions = module.permissions.some((p) => p.enabled);

            if (hasEnabledPermissions) {
                // Add module permission
                selectedPermissions.push(module.id);

                // Add individual permissions
                module.permissions.forEach((permission) => {
                    if (permission.enabled) {
                        selectedPermissions.push(permission.id);
                    }
                })
            }
        })

        onSave(selectedPermissions)
        if (!open) {
            onClose()
        }
    }

    return (
        <>
            <>
                <Box sx={{ overflowY: "auto", height: "100%" }}>
                    {permissionModules.map((module, moduleIndex) => (
                        <Box key={module.id} sx={{}} className={styles.permissionItem}>
                            <Box
                                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, backgroundColor: "#f5f5f5", cursor: "pointer" }}

                                className={styles.permissionHeader}
                                onClick={() => toggleModuleExpand(moduleIndex)}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }} >

                                    <Icon
                                        className={styles.toggleIcon}
                                        icon={expandedModules[moduleIndex] ? 'tabler:chevron-down' : 'tabler:chevron-right'}
                                        color="white"
                                        fontSize={16}
                                    />

                                    <Typography>{module.label}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                                        {getModuleStatus(moduleIndex)}
                                    </Typography>
                                    <Switch
                                        checked={module.permissions.every((p) => p.enabled)}
                                        onChange={(e) => {
                                            e.stopPropagation()
                                            handleModuleToggle(moduleIndex)
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </Box>
                            </Box>

                            <Collapse in={expandedModules[moduleIndex]} >
                                <Box sx={{ py: 5, bgcolor: "white" }} >
                                    {module.permissions.map((permission, permissionIndex) => (
                                        <Box
                                            key={permission.id}
                                            sx={{ display: "flex", alignItems: "center", p: 2, }}
                                        >
                                            <Switch
                                                checked={permission.enabled}
                                                onChange={() => handlePermissionToggle(moduleIndex, permissionIndex)}
                                                sx={{ mr: 2 }}
                                            />
                                            <Box>
                                                <Typography variant="body1">{permission.label}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {permission.description}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        p: 2,
                        position: "sticky",
                        bottom: 0,
                        backgroundColor: "white",
                    }}
                >
                    <CustomButton
                        variant="contained"
                        onClick={handleSave}
                        disabled={creatinguser}
                        color='secondary'
                        fullWidth={false}
                    >
                        {creatinguser ? "Creating..." : "Create"}
                    </CustomButton>
                </Box>
            </>
        </>
    )
}
