import "./App.css";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/adduser" element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
