import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const rooms = ['general', 'random', 'tech', 'gaming'];

export default function Sidebar() {
  const { user, currentRoom, setCurrentRoom, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-800 flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-white font-bold text-xl">💬 ChatApp</h1>
      </div>

      <div className="p-4 flex-1">
        <p className="text-gray-400 text-xs uppercase font-semibold mb-2">Channels</p>
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setCurrentRoom(room)}
            className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition ${
              currentRoom === room
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            # {room}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700 flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium">{user?.username}</p>
          <p className="text-gray-400 text-xs">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-400 text-sm transition"
        >
          ออก
        </button>
      </div>
    </div>
  );
}