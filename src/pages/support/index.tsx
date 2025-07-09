import SupportView from "@views/support/SupportView";

interface AuthProps {
  allowedRoles: string[];
  adminStaffPermissions: string[];
}

const Support: React.FC & { authProps: AuthProps } = () => {
  return <SupportView />;
}

Support.authProps = {
  allowedRoles: ['admin', 'staff'],  // Roles allowed to access this page
  adminStaffPermissions: ['view_dashboard'] // Permissions required
};

export default Support;
