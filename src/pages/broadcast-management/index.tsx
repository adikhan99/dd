import { PermissionsEnum } from "@utils/constants"
import BroadcastTable from "src/views/broadcast-management/BroadcastTable"

const BroadcastManagement = () => {
  return <BroadcastTable />

}
BroadcastManagement.authProps = {
  allowedRoles: [],
  allowedPermission: [PermissionsEnum.BROADCAST_MESSAGE_MODULE, PermissionsEnum.BROADCAST_MESSAGE_SEND_BROADCAST]
}
export default BroadcastManagement
