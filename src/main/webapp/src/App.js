import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// User
// Main
import Main from "./components/users/Main";

// Account
import Login from "./components/users/AccountLogin";
import Signin from "./components/users/AccountSignIn";


// Hotel
import HotelList from "./components/users/HotelList";
import HotelDetail from "./components/users/HotelDetail";
import HotelReserve from "./components/users/HotelReserve";
import HotelInMap from "./components/users/HotelInMap";
import HotelReviewTest from "./components/users/HotelReviewTest";

// Hotel Reserve Check
import HotelReserveList from "./components/users/HotelReserveList";
import HotelReserveDetail from "./components/users/HotelReserveDetail";

// Board
import BoardList from "./components/users/BoardList";
import BoardDetail from "./components/users/BoardDetail";
import BoardWrite from "./components/users/BoardWrite";
import BoardUpdate from "./components/users/BoardUpdate";
import Info from "./components/users/Info";
import Review from "./components/users/Review";

// Manager
import ManagerDashBoard from "./components/managers/ManagerDashBoard";
import ManagerReservation from "./components/managers/ManagerReservation";
import ManagerReview from "./components/managers/ManagerReview";
import ManagerMyPlace from "./components/managers/ManagerMyPlace";
import ManagerAddPlace from "./components/managers/ManagerAddPlace2";
import ManagerAddRoom from "./components/managers/ManagerAddRoom";

// Admin
import DashBoardAdmin from "./components/admins/DashBoard";
import Admin from "./components/admins/Admin";
import Authorize from "./components/admins/Authorize";

//kakao social login
import KakaoLogin from "./components/users/KaKaoLogin";
import KakaoRedirect from "./components/users/KakaoRedirect";
import Redirection from "./components/users/Redirection";

import KakaoAuth from "./components/users/KakaoAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="hotelList" >
            <Route path=":seqHotelCategory" element={<HotelList />}/>
          </Route>
          <Route path="detail" element={<HotelDetail />} />
          <Route path="hotelInMap" element={<HotelInMap />} />
          <Route path="hotelReserve" element={<HotelReserve />} />
          <Route path="hotelReserveList" element={<HotelReserveList />} />
          <Route path="hotelReviewTest" element={<HotelReviewTest />} />
          <Route
            path="hotelReserveListDetail"
            element={<HotelReserveDetail />}
          />
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<Signin />} />
          <Route path="boardList">
            <Route path=':page' element={<BoardList />} />
          </Route>
          <Route path="boardDetail" element={<BoardDetail />} >
            <Route path=':paramSeqBoard' element={<BoardDetail />} />
          </Route>
          <Route path="/oauth/callback/kakao" element={<KakaoAuth/>} />
          <Route path="boardWrite" element={<BoardWrite />} />
          <Route path="boardUpdate" element={<BoardUpdate />} >
          <Route path=':paramSeqBoard' element={<BoardUpdate />} />
          </Route>
          <Route path="review" element={<Review />} />
          <Route path="info" element={<Info />} />
          <Route path="kakaoLogin" element={ <KakaoLogin />} />
          <Route path="KakaoRedirect" element={ <KakaoRedirect />} />
          <Route path="redirection" element={ <Redirection />} />         
        </Route>
        <Route path="/manager">
          <Route index element={<ManagerDashBoard />} />
          <Route path="reservation" element={<ManagerReservation />} />
          <Route path="addPlace" element={<ManagerAddPlace/>}/>
          <Route path="addRoom/:hotelSeq" element = {<ManagerAddRoom/>}/>
          <Route path="review" element={<ManagerReview />} />
          <Route path="myPlace" element={<ManagerMyPlace />} />
        </Route>
        <Route path="/admin">
          <Route index element={<DashBoardAdmin />} />
          <Route path=":navPage" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
