import { useState, useEffect } from 'react';
import { PermissionItem } from 'src/types/userTypes';

export const usePermissions = (initialPermissions: PermissionItem[], isAdmin: boolean) => {
  const [permissions, setPermissions] = useState<PermissionItem[]>(initialPermissions);

  useEffect(() => {
    if (isAdmin) return;

    const newPermissions = [...permissions];
    newPermissions.forEach(permission => {
      if (permission.children && permission.checked) {
        permission.children.forEach(child => {
          child.checked = true;
        });
      }
    });
    setPermissions(newPermissions);
  }, [permissions.map(p => p.checked).join(), isAdmin]);

  const handleParentPermissionChange = (index: number) => {
    const newPermissions = [...permissions];
    const newCheckedState = !newPermissions[index].checked;
    newPermissions[index].checked = newCheckedState;

    if (index === 2 && newPermissions[index].children) {
      newPermissions[index].children!.forEach(child => {
        child.checked = newCheckedState;
      });
    }

    setPermissions(newPermissions);
  };

  const handleChildPermissionChange = (parentIndex: number, childIndex: number) => {
    const newPermissions = [...permissions];
    const child = newPermissions[parentIndex].children![childIndex];
    child.checked = !child.checked;

    if (child.checked &&
      (child.label === 'Reply to Conversations' || child.label === 'Delete Conversation')) {
      const viewConversation = newPermissions[parentIndex].children!.find(
        c => c.label === 'View Conversations'
      );
      if (viewConversation) viewConversation.checked = true;
    }
    if (child.label === 'View Conversations' && !child.checked) {
      const replyConversation = newPermissions[parentIndex].children!.find(
        c => c.label === 'Reply to Conversations'
      );
      const deleteConversation = newPermissions[parentIndex].children!.find(
        c => c.label === 'Delete Conversation'
      );

      if (replyConversation) replyConversation.checked = false;
      if (deleteConversation) deleteConversation.checked = false;
    }

    if (parentIndex === 2) {
      const allChildrenChecked = newPermissions[parentIndex].children?.every(c => c.checked);
      newPermissions[parentIndex].checked = !!allChildrenChecked;
    }

    setPermissions(newPermissions);
  };

  return {
    permissions,
    handleParentPermissionChange,
    handleChildPermissionChange,
    setPermissions
  };
};