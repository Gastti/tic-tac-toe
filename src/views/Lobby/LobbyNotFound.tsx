import { useNavigate } from 'react-router-dom'
import Title from '../../components/Title';
import Container from '../../components/Container';
import Box from '../../components/Box';

export default function LobbyNotFound() {
    const navigate = useNavigate();

    return (
        <Container>
            <Title>Lobby no encontrado</Title>
            <Box className="column t-center">
                <p>
                    Lo sentimos, no hemos encontrado el lobby que buscas.
                    <br />
                    <b>¿Qué deseas hacer?</b>
                </p>
                <div>
                    <button
                        className='copybutton gradient-pink mr'
                        onClick={() => navigate('/lobby')}
                    >
                        Crear un Lobby
                    </button>
                    <button
                        className='copybutton gradient-gray'
                        onClick={() => navigate('/')}
                    >
                        Volver al menú
                    </button>
                </div>
            </Box>
        </Container>
    )
}