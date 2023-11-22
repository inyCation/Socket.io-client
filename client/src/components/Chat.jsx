import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";

const hashStringToColor = () => {
    return (str = "guest") => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = Math.abs(hash).toString(16).substring(0, 6);
        return `#${'0'.repeat(6 - color.length)}${color}`;
    };
};

const Chat = ({ roomid }) => {
    const { user = "guest", isAuthenticated } = useAuth0();
    const [message, setMessage] = useState("");
    const [messagesReceived, setMessagesReceived] = useState([]);
    const socket = io.connect("http://localhost:8080");

    const sendMessage = () => {
        const newMessage = {
            content: message,
            sender: user.given_name || user.nickname || "Guest",
            roomid: roomid,
        };

        // Emit the message to the specific room (roomid)
        socket.emit("send_message", newMessage);

        setMessagesReceived([...messagesReceived, newMessage]);
        setMessage("");
    };

    useEffect(() => {
        const receiveMessage = (data) => {
            console.log("Received Message:", data);
            setMessagesReceived((prevMessages) => [...prevMessages, data]);
        };

        socket.on("receive_message", receiveMessage);

        return () => {
            // Clean up the socket event listener when the component unmounts
            socket.off("receive_message", receiveMessage);
        };
    }, [socket, roomid]);

    return (
        <>
            <div className="app">
                <h1>HIII {user.given_name || user.nickname || "Guest"}</h1>
                <h1>WELCOME TO GROUP CHAT ROOM-ID: {roomid}</h1>
                <ul>
                    {messagesReceived.map((msg, i) => (
                        <li key={i} style={{ color: hashStringToColor()(msg.sender) }}>
                            {msg && (
                                <>
                                    <strong>{msg.sender}:</strong>
                                    <span>{' ' + msg.content}</span>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="input_container">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message ..."
                    />
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </>
    );
};

export default Chat;
