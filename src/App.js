import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import TasksListPage from './components/TasksListPage';
import ProfilePage from './components/ProfilePage';
import FaqPage from './components/FaqPage';
import CompetitionsPage from './components/CompetitionsPage';
import './App.css';
import TaskDetailsPage from "./components/TaskDetailsPage";
import TheoryPage from "./components/TheoryPage";
import TestPage from "./components/TestPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/tasks" element={<TasksListPage/>}/>
                <Route path="/tasks/:id" element={<TaskDetailsPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/faq" element={<FaqPage/>}/>
                <Route path="/competitions" element={<CompetitionsPage/>}/>
                <Route path="/theory" element={<TheoryPage/>}/>
                <Route path="/test" element={<TestPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;