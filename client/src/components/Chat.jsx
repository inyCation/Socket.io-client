import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";
import ScrollToBottom from 'react-scroll-to-bottom';
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
    const userName = user.given_name || user.nickname || "Guest";

    const sendMessage = () => {
        if (message.trim() === "") {
            alert("Message cannot be blank!");
        } else {
            const newMessage = {
                content: message,
                sender: userName,
                roomid: roomid,
            };
            
            socket.emit("send_message", newMessage);
            setMessagesReceived([...messagesReceived, newMessage]);
            setMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (message.trim() === "") {
                alert("Message cannot be blank!");
            } else {
                sendMessage();
            }
        }
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
                <h1>Hii {userName}, Welcome to Global CHAT ROOM-ID: {roomid} </h1>
                <ScrollToBottom className='data'>
                    {messagesReceived.map((msg, i) => (
                        <li className={`${msg.sender == userName ? "myMessage" : ""}`} key={i} style={{ color: hashStringToColor()(msg.sender) }}>
                            {msg && (
                                <>
                                    <strong>{msg.sender == userName ? "You" : msg.sender}:</strong>
                                    <span>{' ' + msg.content}</span>
                                </>
                            )}
                        </li>
                    ))}
                </ScrollToBottom>

                <div className="input_container">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Message ..."
                        onKeyUp={handleKeyPress}
                    />
                    <button onClick={sendMessage}>Send Message</button>
                </div>
            </div>
        </>
    );
};

export default Chat;
