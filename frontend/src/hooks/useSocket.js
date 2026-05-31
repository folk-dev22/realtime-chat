import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import useStore from '../store/useStore';

const useSocket = () => {
  const socket = useRef(null);
  const { user, currentRoom, addMessage } = useStore();

  useEffect(() => {
    if (!user) return;

    socket.current = io('http://localhost:5000');

    socket.current.emit('join_room', {
      room: currentRoom,
      username: user.username
    });

    socket.current.on('receive_message', (message) => {
      addMessage(message);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [user, currentRoom]);

  const sendMessage = (content) => {
    if (!socket.current || !user) return;
    socket.current.emit('send_message', {
      room: currentRoom,
      content,
      sender: user
    });
  };

  return { sendMessage };
};

export default useSocket;