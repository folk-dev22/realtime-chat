import { useState } from 'react';

export default function MessageInput({ onSend, room }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 bg-gray-900 border-t border-gray-700">
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`พิมพ์ข้อความใน #${room}...`}
          className="flex-1 bg-gray-700 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-sm"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl transition font-medium text-sm"
        >
          ส่ง
        </button>
      </form>
      <p className="text-gray-600 text-xs mt-1.5 ml-1">
        กด Enter เพื่อส่ง
      </p>
    </div>
  );
}