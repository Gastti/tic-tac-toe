import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Title from '../../components/Title';
import Container from '../../components/Container';
import Box from '../../components/Box';
import { useGame } from '../../hooks/useGame';

export default function PreLobby() {
    const { getUserFromLocalStorage } = useGame();
    const navigate = useNavigate();
    const { slug } = useParams();
    const PATH = `/lobby/${slug}`
    useEffect(() => {
        const user = getUserFromLocalStorage();
        if (!user) {
            console.log(slug);
            navigate(`/`, { state: { slug } });
        } else {
            setTimeout(() => {
                navigate(PATH);
            }, 1000)
        }
    }, [])
    return (
        <Container>
            <Title>Uniendote</Title>
            <Box className="column">
                <p>Espera un momento mientras te unes al lobby.</p>
                <div className='loadcircle'></div>
            </Box>
        </Container>
    )
}
