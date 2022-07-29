import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function NewContactForm(props) {
    const [formData, setFormData] = useState({
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        email: "",
        telefono: ""
    })

    const [errors, setErrors] = useState({
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        email: "",
        telefono: ""
    })

    const navigate = useNavigate()

    const handleAddContact = () => {
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }

        fetch('/api/contact', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.message === "error") {
                    setErrors(data.error)
                } else {
                    setErrors({})
                    navigate('/')
                }
            })
    }

    return (
        <Container className="w-50 m-auto mt-5">
            <Form>
                <h2 className="h2 text-center">Nuevo Contacto</h2>
                <Form.Group>
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control id="nombre" type="text" name="nombre" placeholder="Ingresa el nombre" aria-describedby="nombreError"
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                    <Form.Text className="text-danger mx-1">
                        {errors.nombre}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Label>Primer Apellido:</Form.Label>
                    <Form.Control id="primer-apellido" type="text" name="primerApellido" placeholder="Ingresa el primer apellido" 
                        onChange={(e) => setFormData({...formData, primerApellido: e.target.value})} />
                    <Form.Text className="text-danger mx-1">
                        {errors.primerApellido}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Label>Segundo Apellido:</Form.Label>
                    <Form.Control id="segundo-apellido" type="text" name="segundoApellido" placeholder="Ingresa el segundo apellido"
                        onChange={(e) => setFormData({...formData, segundoApellido: e.target.value})} />
                    <Form.Text className="text-danger mx-1">
                        {errors.segundoApellido}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control id="email" type="email" name="email" placeholder="example@correo.com"
                        onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <Form.Text className="text-danger mx-1">
                        {errors.email}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Label>Telefono:</Form.Label>
                    <Form.Control id="telefono" type="text" name="telefono" placeholder="912345678"
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})} />
                    <Form.Text className="text-danger mx-1">
                        {errors.telefono}
                    </Form.Text>
                </Form.Group>

                <div className="mt-3 text-end">
                    <Link id="cancel-add-btn" to="/" role="button" className="btn btn-danger shadow-none mx-3">Cancelar</Link>
                    <Button id="add-contact-btn" variant="primary" className="shadow-none px-4" onClick={handleAddContact}>Añadir</Button>
                </div>
            </Form>
        </Container>
    )
}

export default NewContactForm