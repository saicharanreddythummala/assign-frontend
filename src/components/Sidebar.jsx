import React from "react";
import * as Ai from "react-icons/ai";
import * as BS from "react-icons/bs";
import { Link } from "react-router-dom";
import "../custom css/sidebar.css";

export default function Sidebar() {
  return (
    <>
      <nav className="navbar-vertical">
        <div className="navbar-brand nav-top nav-div">
          <h3>Dashboard</h3>
        </div>
        <div className="nav-center nav-div">
          <div className="list-items">
            <ul>
              <li>
                <div className="list-content">
                  <Link to="/home" className="nav-link">
                    <Ai.AiOutlineHome className="logo" /> Home
                  </Link>
                </div>
              </li>
              <li>
                <div className="list-content">
                  <Link to="/add-student" className="nav-link">
                    <BS.BsPersonPlus className="logo" />
                    Add a Student
                  </Link>
                </div>
              </li>
              <li>
                <div className="list-content">
                  <Link to="/add-mentor" className="nav-link">
                    <BS.BsPerson className="logo" />
                    Add a mentor
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="nav-bottom nav-div">
          <h3>Footer</h3>
        </div>
      </nav>
    </>
  );
}
