import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./components/users/Main";
import List from "./components/users/List";
import Login from "./components/users/Login";
import Signin from "./components/users/SignIn";
import HotelInMap from "./components/users/HotelInMap";
import Detail from "./components/users/Detail";

import DashBoard from "./components/managers/DashBoard";
import Manager from "./components/managers/Manager";

import DashBoardAdmin from "./components/admins/DashBoard";
import Admin from "./components/admins/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="list" element={<List />} />
          <Route path="detail" element={<Detail />} />
          <Route path="hotelInMap" element={<HotelInMap />} />
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<Signin />} />
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
