// React Imports
import { hasPermission } from '@utils/auth-utils';
import { PermissionsEnum } from '@utils/constants';
import React from 'react';
import IndividualMessageView from "src/views/individual-message/IndividualMessageView";

const IndividualMessageForm: React.FC = () => {
  return (
    <div>
      {hasPermission(PermissionsEnum.INDIVIDUAL_MESSAGE_SEND_MESSAGE) &&
        <IndividualMessageView />
      }
    </div>
  );
};

(IndividualMessageForm as any).authProps = {
  allowedRoles: [],  // Roles allowed to access this page
  allowedPermission: [PermissionsEnum.INDIVIDUAL_MESSAGE_MODULE, PermissionsEnum.INDIVIDUAL_MESSAGE_SEND_MESSAGE]// Permissions required
};

export default IndividualMessageForm;
