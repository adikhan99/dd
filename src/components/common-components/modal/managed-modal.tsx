import { useModal } from '@store/apps/modal';
import dynamic from 'next/dynamic';

const AddUserModal = dynamic(() => import('@views/roles-and-permissions/AddUserModal'));
const EditUserModal = dynamic(() => import('@views/roles-and-permissions/EditUserModal'));
const ActiveUserModalView = dynamic(() => import('@views/roles-and-permissions/ActiveUserModal'));
const InactiveUserModalView = dynamic(() => import('@views/roles-and-permissions/InactiveUserModal'));
const PreviewParentsDetailsModal = dynamic(() => import('@views/broadcast-form/PreviewParentsDetailsModal'));


const ManagedModal = () => {
    const { modalState: { view } } = useModal();

    return (
        <>
            {view === "ADD_USER_MODAL" && < AddUserModal />}
            {view === "EDIT_USER_MODAL" && < EditUserModal />}
            {view === "ACTIVE_USER_MODAL" && < ActiveUserModalView />}
            {view === "INACTIVE_USER_MODAL" && < InactiveUserModalView />}
            {view === "PARENT_DETAILS_MODAL" && < PreviewParentsDetailsModal />}
        </>
    );
};

export default ManagedModal;