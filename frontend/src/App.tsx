import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./Context/useAuth";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Sidebar />
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
