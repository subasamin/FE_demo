import React from 'react';
import EmployeeProfileForm from './components/FixEmployeeProfile';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Note from "./components/Note";
import EmailWarning from "./components/EmailWarning";
function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path={"/profile/:userId"} element={<EmployeeProfileForm />}></Route>
              <Route path={"/note"} element={<Note />}></Route>
              <Route path={"/mail-warning"} element={<EmailWarning />}></Route>
          </Routes>
      </BrowserRouter>
  );
}
export default App;
