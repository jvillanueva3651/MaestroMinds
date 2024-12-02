import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../../UserContext';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const [MouseOverColor, setMouseOverColor] = useState(null);
  const mouseOveron = () => {
    setMouseOverColor('#218838');
  };
  const mouseOveroff = () => {
    setMouseOverColor(null);
  };
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', isActive);
    return () => {
      window.removeEventListener('scroll', isActive);
    };
  }, []);

  const { user } = useContext(UserContext);
  if (user.isTutor && user.isStudent) {
    throw new Error('User cannot be both a tutor and a student.');
  }

  return (
    <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className="container">
        <div className="logo">
          <span className="rlogo">
            <img src="./img/logo.png" alt="MaestroMinds" />
          </span>
          <Link to="/" className="link">
            <span className="text">MaestroMinds </span>
          </Link>
        </div>
        <div className="links">
          <div className="list">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="/About" className="link">
              About Us
            </Link>
            {!user.isTutor && !user.isStudent && (
              <>
                <Link to="/login" className="link">
                  Log In
                </Link>
                <Link to="/Tutorregistration" className="link">
                  Tutor Registration
                </Link>
                <Link to="/tutors" className="link">
                  Find a Tutor
                </Link>
                <Link to="/mytutors" className="link">
                  My Tutors
                </Link>
                <Link to="/register" className="link"><button
                  style={{ backgroundColor: MouseOverColor }}
                  onMouseOver={mouseOveron}
                  onMouseOut={mouseOveroff}
                >
                  Join Now
                </button>
                </Link>
              </>
            )}

            {user.isStudent && (
              <div className="user" onClick={() => setOpen(!open)}>
                <img src="./img/profile.jpg" alt="profile" className="profile-img" />
                <span>{user?.username}</span>
                {open && (
                  <div className="options">
                    <Link to="/student-profile" className="link">
                      Profile
                    </Link>
                    <Link to="/courses" className="link">
                      My Courses
                    </Link>
                    <Link to="/appointments" className="link">
                      Appointments
                    </Link>
                    <Link to="/messages" className="link">
                      Messages
                    </Link>
                    <Link to="/settings" className="link">
                      Settings
                    </Link>
                    <Link to="/logout" className="link">
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}

            {user.isTutor && (
              <div className="user" onClick={() => setOpen(!open)}>
                
                <img src="./img/profile.jpg" alt="profile" className="profile-img" />
                <span>{user?.username}</span>
                {open && (
                  <div className="options">
                    <Link to="/tutor-profile" className="link">
                      Tutor Profile
                    </Link>
                    <Link to="/mystudents" className="link">
                      My Students
                    </Link>
                    <Link to="/appointments" className="link">
                      Appointments
                    </Link>
                    <Link to="/settings" className="link">
                      Settings
                    </Link>
                    <Link to="/messages" className="link">
                      Messages
                    </Link>
                    <Link to="/logout" className="link">
                      Logout
                    </Link>
                  
                  </div>
                  
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {active || pathname !== '/' ? (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="/">
              Mathematics
            </Link>
            <Link className="link" to="/">
              Computer Science
            </Link>
            <Link className="link" to="/">
              Psychology
            </Link>
            <Link className="link" to="/">
              Biology
            </Link>
            <Link className="link" to="/">
              Physics
            </Link>
            <Link className="link" to="/">
              Music
            </Link>
            <Link className="link" to="/">
              Chemistry
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Navbar;
