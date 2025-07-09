import { useQuery } from '@tanstack/react-query';
import { PermissionItem } from 'src/types/userTypes';

const fetchPermissions = async (): Promise<PermissionItem[]> => {
  const response = await fetch('/api/permissions');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const usePermissionsQuery = (isAdmin: boolean) => {
  return useQuery<PermissionItem[], Error>({
    queryKey: ['permissions', isAdmin],
    queryFn: fetchPermissions,
    enabled: !isAdmin, 
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};