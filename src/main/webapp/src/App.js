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
import Detail from "./components/users/Detail";
import HotelInMap from "./components/users/HotelInMap";

// Board
import BoardList from "./components/users/BoardList";
import BoardDetail from "./components/users/BoardDetail";
import BoardWrite from "./components/users/BoardWrite";
import BoardUpdate from "./components/users/BoardUpdate";

// Manager
import DashBoard from "./components/managers/DashBoard";
import Manager from "./components/managers/Manager";

// Admin
import DashBoardAdmin from "./components/admins/DashBoard";
import Admin from "./components/admins/Admin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} /> 
          <Route path="hotelList" element={<HotelList />} />
          <Route path="detail" element={<Detail />} />
          <Route path="hotelInMap" element={<HotelInMap />} />
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<Signin />} />
          <Route path="boardList" element={<BoardList />} />
          <Route path="boardDetail" element={<BoardDetail />} />
          <Route path="boardWrite" element={<BoardWrite />} />
          <Route path="boardUpdate" element={<BoardUpdate />} />
        </Route>
        <Route path="/manager">
          <Route index element={<DashBoard />} />
          <Route path=":navPage" element={<Manager />} />
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
