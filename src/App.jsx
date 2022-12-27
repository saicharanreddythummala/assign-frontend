import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddStudent from './components/AddStudent';
import AddMentor from './components/AddMentor';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import EditStudent from './components/EditStudent';
import EditMentor from './components/EditMentor';
import AssignStudents from './components/AssignStudents';

function App() {
  return (
    <>
        <Sidebar />
      <div className="wrapper">
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/add-mentor" element={<AddMentor />} />
            <Route path="/edit-student/:id" element={<EditStudent />} />
            <Route path="/edit-mentor/:id" element={<EditMentor />} />
            <Route path="/assign-students/:id" element={<AssignStudents />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
