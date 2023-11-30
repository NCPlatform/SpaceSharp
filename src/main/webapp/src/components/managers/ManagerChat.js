import React from 'react';
import ManagerHeader from './ManagerHeader';

import ChatList from '../chat/ChatList.js';

const ManagerChat = () => {
  return (
    <>
      <ManagerHeader />
      <div className="mt-5 pt-3">
        <ChatList backColor={'fourthBackColor'} />
      </div>
    </>
  );
};

export default ManagerChat;
