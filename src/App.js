import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './components/Main'
import NewContactForm from './components/NewContactForm'
import EditContactForm from './components/EditContactForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/new-contact" element={<NewContactForm />} />
        <Route path="/edit-contact/:id" element={<EditContactForm />} />
      </Routes>
    </Router>
  )
}

export default App