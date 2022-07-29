import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import ContactTable from './ContactTable'

function Main() {
  const [contacts, setContacts] = useState([])

  const handleChange = useCallback((newValue) => {
    setContacts(newValue)
  }, [])

  useEffect(()=> {
    fetch('/api/contacts')
      .then(response => response.json())
      .then(data => setContacts(data.contacts))
    }, [])

  return (
    <Container className="mt-5">
      <h2 className="h2 text-center">Lista de Contactos</h2>
      <div className="text-center mt-4">
        <Link id="new-contact-btn-link" to="/new-contact" role="button" className="btn btn-success shadow-none">Añadir nuevo contacto</Link>
      </div>
      {
        (contacts.length === 0) ? (
          <p className="h4 text-center mt-4">No hay contactos para mostrar</p>
        ) : (
          <ContactTable contacts={contacts} onChange={handleChange} />
        )
      }
    </Container>
  )
}

export default Main