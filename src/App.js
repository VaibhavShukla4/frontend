import logo from "./logo.svg";
import "./App.css";
import UserList from "./pages/UserList";
import AddUserData from "./pages/AddUserData";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/adduser" element={<AddUserData />} />
      </Routes>
    </div>
  );
}

export default App;
