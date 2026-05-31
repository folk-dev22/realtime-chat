import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import useStore from '../store/useStore';

const SOCKET_URL = 'http://localhost:5000';

let socketInstance = null;

const useSocket = () => {
  const { user, currentRoom, addMessage } = useStore();

  useEffect(() => {
    if (!user) return;

    // สร้าง socket ครั้งเดียว
    if (!socketInstance) {
      socketInstance = io(SOCKET_URL);
    }

    // Join room ใหม่
    socketInstance.emit('join_room', {
      room: currentRoom,
      username: user.username
    });

    // รับข้อความ
    socketInstance.on('receive_message', (message) => {
      addMessage(message);
    });

    return () => {
      socketInstance.off('receive_message');
    };
  }, [user, currentRoom]);

  const sendMessage = (content) => {
    if (!socketInstance || !user) return;
    socketInstance.emit('send_message', {
      room: currentRoom,
      content,
      sender: user
    });
  };

  return { sendMessage };
};

export default useSocket;