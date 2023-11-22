// Room.js
import React, { useState, useEffect } from 'react';
import { Nav, Chat } from '../components';
import { Login } from '.';
import { useAuth0 } from '@auth0/auth0-react';
import io from "socket.io-client";

const Room = () => {
  const { user, isAuthenticated } = useAuth0();
  const [createRoomToggler, setCreateRoomToggler] = useState(false);
  const [inputRoomId, setinputRoomId] = useState('');
  const [joinedRoomId, setJoinedRoomId] = useState(null);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const socket = io.connect("http://localhost:8080");

  const handleJoinRoom = () => {
    socket.emit("join_room", { roomId: inputRoomId });
    setJoinedRoomId(inputRoomId);
  };

  const handleCreateRoom = async () => {
    setCreatingRoom(true);

    socket.emit('create_room');

    try {
      const { roomId } = await new Promise((resolve) => {
        socket.once('room_created', (data) => {
          console.log('Room Created:', data.roomId);
          resolve(data);
        });
      });

      setJoinedRoomId(roomId);

      // After joining the room, you may want to emit a welcome message
      socket.emit('send_message', { content: 'Welcome to the room!', sender: user.name, roomid: roomId });
    } catch (error) {
      console.error('Error creating room:', error);
    } finally {
      setCreatingRoom(false);
    }
  };

  useEffect(() => {
    let interval;
    if (creatingRoom) {
      interval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      setCountdown(5);
    }

    return () => clearInterval(interval);
  }, [creatingRoom]);

  return isAuthenticated ? (
    <Login />
  ) : (
    <>
      <Nav isAuthenticate={isAuthenticated} />

      <div className="room_container">
        {joinedRoomId ? (
          <Chat roomid={joinedRoomId} />
        ) : (
          <>
            <button onClick={() => setCreateRoomToggler((prev) => !prev)} className="toggler">
              {createRoomToggler ? 'Join?' : 'Create Room?'}
            </button>

            {createRoomToggler ? (
              <button disabled={creatingRoom} onClick={handleCreateRoom}>
                {creatingRoom ? `Creating Room... (${countdown}s)` : 'Create Room'}
              </button>
            ) : (
              <>
                <label htmlFor="roomid">Enter Room Id</label>
                <input
                  type="text"
                  name="roomid"
                  id="roomid"
                  value={inputRoomId}
                  onChange={(e) => setinputRoomId(e.target.value)}
                />
                <button onClick={handleJoinRoom}>Join</button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Room;
