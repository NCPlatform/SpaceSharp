import React from 'react';
import io from 'socket.io-client'
import { useDispatch } from 'react-redux'

const ChatList = () => {

    const dispatch = useDispatch();
    const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

    return (
        <div>
            
        </div>
    );
};

export default ChatList;