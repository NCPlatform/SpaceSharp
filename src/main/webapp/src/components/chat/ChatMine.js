import React from 'react';

const ChatMine = ({ name, date, content }) => {
  return (
    <div className="text-end d-flex justify-content-end">
      <div className="mx-2 mt-2" style={{ width: '30rem', maxWidth: '30rem' }}>
        <div className="p-0 row mx-1">
          <p className="col col-12 col-lg-3 text-secondary" style={{ fontSize: '0.8rem' }}>
            {date}
          </p>
          <p className="col col-12 col-lg-9 bg-white rounded bg-opacity-75 p-1">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMine;
