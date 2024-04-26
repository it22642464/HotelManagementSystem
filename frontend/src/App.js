
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import FeedbackView from './components/FeedbackView';
import FeedBackUpdate from './components/FeedBackUpdate';
import FeedbackList from './components/FeedbackList';
import ContactAddForm from './components/contacts/ContactAddFrom';
import ContactVeiw from './components/contacts/ContactVeiw';

import FilteredFeedback from './components/FilteredFeedback';



function App() {
  return (
    <Router>
      
        <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/feedback/:id" element={<FeedbackView />} />
        <Route path="/feedback/update/:id" element={<FeedBackUpdate/>}/>
        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/FilteredFeedback" element={<FilteredFeedback />} />
        <Route path="/contact" element={<ContactAddForm/> }/>
        <Route path="/contact/veiw" element={<ContactVeiw/>}/>

        </Routes>
      
    </Router>
  );
}

export default App;
