import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import EventList from './events/EventList';
import EventAdd from './events/EventAdd';
import axios from 'axios';

const AdminEvent = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState('finishDate');
  const [sortDirection, setSortDirection] = useState('DESC');
  const [searchKey, setSearchKey] = useState('all');

  const [eventList, setEventList] = useState([]);
  const [deadline, setDeadline] = useState([]);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    axios
      .get(`/admin/getEventList?page=${page}&size=${size}&sort=${sort},${sortDirection}&searchKey=${searchKey}`)
      .then(res => {
        console.log(res.data);
        setEventList(res.data.eventList.content);
        setTotalPages(res.data.eventList.totalPages);
        setDeadline(res.data.deadline);
      })
      .catch(err => console.log(err));
  }, [page, sort, sortDirection, searchKey]);

  return (
    <>
      <AdminHeader />
      <div className="container py-3 rounded bg-secondary-subtle" style={{ marginTop: '5rem' }}>
        <div className="row h-100">
          <div className="col col-12 col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 my-3">
            {eventList && (
              <EventList
                eventList={eventList}
                totalPages={totalPages}
                page={page}
                deadline={deadline}
                setPage={setPage}
                searchKey={searchKey}
                setSearchKey={setSearchKey}
              />
            )}
          </div>
          <div className="col col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 my-3">
            <EventAdd />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEvent;
