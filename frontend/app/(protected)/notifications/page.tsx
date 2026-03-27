import { useNotifications } from '@/hooks/queries/notifications';

export default function NotificationsPage() {
  const { data, isLoading } = useNotifications();
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data?.map((n: any) => (
            <li key={n.id} className="mb-2 p-2 border rounded">
              <div>{n.message}</div>
              <div className="text-xs text-gray-500">{n.created_at}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
