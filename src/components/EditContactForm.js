import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function EditContactForm(props) {
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
    let { id } = useParams()

    useEffect(()=> {
      fetch('/api/contact/' + id)
        .then(response => response.json())
        .then(data => {
            if (data.message === 'error') {
                navigate('/')
            }

            setFormData(data.contact)
        })
      }, [id, navigate])

    const handleUpdateContact = () => {
        const requestOptions = {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }

        fetch('/api/contact/' + id, requestOptions)
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
                <h2 className="h2 text-center">Editar Contacto</h2>
                <Form.Group>
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control id="nombre" type="text" name="nombre" placeholder="Ingresa el nombre" aria-describedby="nombreError"
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})} 
                        value={formData.nombre} />
                    <Form.Text className="text-danger mx-1">
                        {errors.nombre}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Label>Primer Apellido:</Form.Label>
                    <Form.Control id="primer-apellido" type="text" name="primerApellido" placeholder="Ingresa el primer apellido" 
                        onChange={(e) => setFormData({...formData, primerApellido: e.target.value})} 
                        value={formData.primerApellido} />
                    <Form.Text className="text-danger mx-1">
                        {errors.primerApellido}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Label>Segundo Apellido:</Form.Label>
                    <Form.Control id="segundo-apellido" type="text" name="segundoApellido" placeholder="Ingresa el segundo apellido"
                        onChange={(e) => setFormData({...formData, segundoApellido: e.target.value})}
                        value={formData.segundoApellido} />
                    <Form.Text className="text-danger mx-1">
                        {errors.segundoApellido}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control id="email" type="email" name="email" placeholder="example@correo.com"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        value={formData.email} />
                    <Form.Text className="text-danger mx-1">
                        {errors.email}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Label>Telefono:</Form.Label>
                    <Form.Control id="telefono" type="text" name="telefono" placeholder="912345678"
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        value={formData.telefono} />
                    <Form.Text className="text-danger mx-1">
                        {errors.telefono}
                    </Form.Text>
                </Form.Group>

                <div className="mt-3 text-end">
                    <Link id="cancel-edit-btn" to="/" role="button" className="btn btn-danger shadow-none mx-3">Cancelar</Link>
                    <Button id="edit-contact-btn" variant="primary" className="shadow-none px-4" onClick={handleUpdateContact}>Actualizar</Button>
                </div>
            </Form>
        </Container>
    )
}

export default EditContactForm