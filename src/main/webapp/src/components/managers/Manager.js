import React from 'react';
import DashBoard from './DashBoard';
import Reservation from './Reservation';
import Review from './Review';
import { useParams } from 'react-router-dom';
import ManagerHeader from './ManagerHeader';
import CardTest from './CardTest';

const Manager = () => {

    const { navPage } = useParams();

    const navIndex = {
        'dashboard': <DashBoard/>,
        'reservation' : <Reservation/>,
        'review': <Review/>,
        'cardTest' : <CardTest/>,
    }

    return (
        <>
            <ManagerHeader/>
            {
                navPage && <div>{navIndex[navPage]}</div>
            }
        </>
    );
};

export default Manager;