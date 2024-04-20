
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import FeedbackView from './components/FeedbackView';
import FeedBackUpdate from './components/FeedBackUpdate';
import FeedbackList from './components/FeedbackList';

function App() {
  return (
    <Router>
      
        <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/feedback/:id" element={<FeedbackView />} />
        <Route path="/feedback/update/:id" element={<FeedBackUpdate/>}/>
        <Route path="/feedback" element={<FeedbackList />} />
        </Routes>
      
    </Router>
  );
}

export default App;
