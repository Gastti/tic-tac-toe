import React from 'react'
import Box from '../../components/Box'
import Title from '../../components/Title'
import Container from '../../components/Container'
import { useNavigate } from 'react-router-dom'

export default function ErrorView(): React.ReactElement {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }
    return (
        <Container>
            <Title>Error</Title>
            <Box>
                <p style={{ textAlign: "center" }}>
                    <b>¡Lo sentimos!</b><br></br>
                    Ha ocurrido un error en el sitio, vuelve al inicio para continuar jugando <b>Tic Tac Toe</b>.
                </p>
                <button className='button small gradient-green' onClick={handleClick}>Volver al Inicio</button>
            </Box>
        </Container>
    )
}
