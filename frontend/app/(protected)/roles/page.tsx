import { useRoles } from '@/hooks/queries/roles';

export default function RolesPage() {
  const { data, isLoading } = useRoles();
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Roles</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : Array.isArray(data) && data.length > 0 ? (
        <ul>
          {data.map((role: any) => (
            <li key={role.id} className="mb-2 p-2 border rounded">
              <div>{role.name}</div>
              <div className="text-xs text-gray-500">{role.description}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No roles found.</div>
      )}
    </div>
  );
}
