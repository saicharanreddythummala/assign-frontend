import React from 'react';
import * as Ai from 'react-icons/ai';
import * as BS from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../custom css/sidebar.scss';
import { AiOutlineBars } from 'react-icons/ai';
import { useState } from 'react';

export default function Sidebar() {
  const [show, setShow] = useState(false);

  return (
    <>
      <nav className="navbar-vertical">
        <div className="navbar-brand nav-top nav-div">
          <h3>Student-Teacher</h3>
        </div>
        <div className={'nav-center nav-div'}>
          {window.innerWidth < 600 ? (
            <AiOutlineBars
              className="fs-2"
              onClick={() => {
                setShow(!show);
              }}
            />
          ) : null}
          <div className={show ? 'show_list' : 'list-items'}>
            <ul>
              <li
                onClick={() => {
                  if (window.innerWidth < 600) {
                    setShow(!show);
                  }
                }}
              >
                <div className="list-content">
                  <Link to="/home" className="nav-link">
                    <Ai.AiOutlineHome className="logo" /> Home
                  </Link>
                </div>
              </li>
              <li
                onClick={() => {
                  if (window.innerWidth < 600) {
                    setShow(!show);
                  }
                }}
              >
                <div className="list-content">
                  <Link to="/add-student" className="nav-link">
                    <BS.BsPersonPlus className="logo" />
                    Add a Student
                  </Link>
                </div>
              </li>
              <li
                onClick={() => {
                  if (window.innerWidth < 600) {
                    setShow(!show);
                  }
                }}
              >
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
      </nav>
    </>
  );
}
