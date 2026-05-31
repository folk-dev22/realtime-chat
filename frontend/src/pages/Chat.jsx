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
      }
    };
    fetchMessages();
  }, [currentRoom]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <h2 className="text-white font-semibold"># {currentRoom}</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg}
              isOwn={msg.sender?._id === user?._id}
            />
          ))}
          <div ref={bottomRef} />
        </div>
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}