import { useEffect, useRef } from 'react';
import useStore from '../store/useStore';
import useSocket from '../hooks/useSocket';
import MessageBubble from '../components/MessageBubble';
import MessageInput from '../components/MessageInput';
import Sidebar from '../components/Sidebar';
import api from '../utils/api';

export default function Chat() {
  const { user, messages, setMessages, currentRoom } = useStore();
  const { sendMessage } = useSocket();
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get(`/messages/${currentRoom}`);
        setMessages(data);
      } catch (error) {
        console.error(error);
        setMessages([]);
      }
    };
    fetchMessages();
  }, [currentRoom]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-900 flex items-center gap-2">
          <span className="text-gray-400 text-lg">#</span>
          <h2 className="text-white font-semibold">{currentRoom}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-4xl mb-3">💬</p>
              <p className="text-gray-400 font-medium">ยังไม่มีข้อความใน #{currentRoom}</p>
              <p className="text-gray-500 text-sm mt-1">เริ่มการสนทนากันเลย!</p>
            </div>
          )}
          {messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              isOwn={msg.sender?._id === user?._id}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <MessageInput onSend={sendMessage} room={currentRoom} />
      </div>
    </div>
  );
}