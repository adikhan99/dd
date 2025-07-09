import { PermissionsEnum } from "@utils/constants";
import BroadcastMessageView from "src/views/broadcast-form/BroadcastMessageView";

const BroadcastMessage = () => {
  return (
    <BroadcastMessageView />
  );
};

BroadcastMessage.authProps = {
  allowedRoles: [],
  allowedPermission: [PermissionsEnum.BROADCAST_MESSAGE_MODULE, PermissionsEnum.BROADCAST_MESSAGE_SEND_BROADCAST]
}

export default BroadcastMessage;
