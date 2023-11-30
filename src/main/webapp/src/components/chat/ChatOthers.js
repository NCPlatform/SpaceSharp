import React from 'react';

const ChatOthers = ({ name, date, content }) => {
  return (
    <div className="text-start d-flex">
      <div className="mx-2 mt-2" style={{ width: '30rem', maxWidth: '30rem' }}>
        <div className="p-0 row mx-1">
          <p className="col col-12 m-0 p-0">
            <span className="fs-5 m-0 p-0 fw-bold">{name}</span>님{' '}
            <span className="d-lg-none d-xl-none text-secondary" style={{ fontSize: '0.8rem' }}>
              {date}
            </span>
          </p>
          <p className="col col-12 col-lg-9 bg-secondary rounded bg-opacity-75 p-1">{content}</p>
          <p className="d-none d-xl-block d-lg-block col col-12 col-lg-3 text-secondary" style={{ fontSize: '0.8rem' }}>
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatOthers;
