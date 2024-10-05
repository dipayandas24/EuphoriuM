import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig"; 
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        await signOut(auth);
        navigate("/login");
      } catch (err) {
        console.error("Logout Error:", err);
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDoc = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setDisplayName(docSnap.data().displayName || "User");
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>EuphoriuM</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <LogoutOutlinedIcon onClick={handleLogout} style={{ cursor: 'pointer' }} />
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            src="https://i.pinimg.com/736x/96/d5/48/96d54878ddb9b403c8f6fa379a9f38fa.jpg"
            alt=""
          />
          <span>{displayName || "User"}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
