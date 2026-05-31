import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const rooms = [
  { id: 'general', label: 'general', emoji: '💬' },
  { id: 'random', label: 'random', emoji: '🎲' },
  { id: 'tech', label: 'tech', emoji: '💻' },
  { id: 'gaming', label: 'gaming', emoji: '🎮' },
];

export default function Sidebar() {
  const { user, currentRoom, setCurrentRoom, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getAvatar = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="w-64 bg-gray-900 flex flex-col h-full border-r border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-900">
        <h1 className="text-white font-bold text-xl flex items-center gap-2">
          💬 ChatApp
        </h1>
        <p className="text-gray-400 text-xs mt-1">Real-time Chat</p>
      </div>

      {/* Channels */}
      <div className="p-3 flex-1 overflow-y-auto">
        <p className="text-gray-500 text-xs uppercase font-semibold mb-3 px-2">
          Channels
        </p>
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => setCurrentRoom(room.id)}
            className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition flex items-center gap-2 ${
              currentRoom === room.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <span>{room.emoji}</span>
            <span className="font-medium"># {room.label}</span>
          </button>
        ))}
      </div>

      {/* User Info */}
      <div className="p-3 border-t border-gray-700 bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {getAvatar(user?.username)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {user?.username}
            </p>
            <p className="text-gray-400 text-xs truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-400 text-xs transition p-1 rounded"
            title="ออกจากระบบ"
          >
            ออก
          </button>
        </div>
      </div>
    </div>
  );
}