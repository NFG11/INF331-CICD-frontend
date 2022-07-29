import { useState } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function ContactRow(props) {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleRemoveContact = () => {
        fetch('/api/contact/' + props.contact.id, {method: 'DELETE'})
            .then(response => response.json())
            .then(data => {
                handleClose()
                if (data.message === "success") {
                    props.updateContacts(props.contact.id)
                }
            })
    }

    return (  
      <tr>
        <td>{props.contact.nombre}</td>
        <td>{props.contact.primerApellido}</td>
        <td>{props.contact.segundoApellido}</td>
        <td>{props.contact.email}</td>
        <td>{props.contact.telefono}</td>
        <td className="text-center">
          <Link id="edit-contact-btn-link" to={"/edit-contact/" + props.contact.id} role="button" className="btn btn-primary btn-sm shadow-none mx-2">Editar</Link>
          <Button id={"delete-contact-" + props.contact.id + "-btn-link"} variant="danger" size="sm" className="shadow-none" onClick={handleRemoveContact}>Eliminar</Button>
        </td>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estas seguro que quieres eliminar este contacto?</Modal.Body>
                <Modal.Footer>
                    <Button id="cancel-delete-btn" variant="secondary shadow-none" onClick={handleClose}>Cancelar</Button>
                    <Button id="delete-contact-btn" variant="danger shadow-none" onClick={handleRemoveContact}>Eliminar</Button>
                </Modal.Footer>
        </Modal>
      </tr>
    )
}

function ContactTable(props) {
    const updateContacts = (id) => {
        let newValue = props.contacts.filter(data => data.id !== id)
        props.onChange(newValue)
    }

    return (
        <Table bordered hover className="mt-4">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Primer Apellido</th>
                    <th>Segundo Apellido</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.contacts.map((contact, i) => (
                    <ContactRow key={i} contact={contact} updateContacts={updateContacts} />
                ))}
            </tbody>
        </Table>
    )
}

export default ContactTable