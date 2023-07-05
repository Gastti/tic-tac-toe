import { useState, useEffect } from "react";
import "./Home.css";
import Title from "../../components/Title";
import Container from "../../components/Container";
import { useGame } from "../../hooks/useGame";
import Box from "../../components/Box";
import SyncIcon from '@mui/icons-material/Sync';
import { useNavigate, useParams } from "react-router-dom";

export default function Home() {
    const { userManagement, getUserFromLocalStorage } = useGame();
    const [name, setName] = useState<string>(`Invitado ${(Math.floor(Math.random() * 40) + 100)}`);
    const [avatar, setAvatar] = useState<string>("/images/avatars/avatar-0.png");
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        const user = getUserFromLocalStorage();
        if (user) {
            setName(user.name);
            setAvatar(user.avatar);
        }
    }, [getUserFromLocalStorage])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.length < 3 || name.length > 15) setError(true);
        else {
            setError(false);
            userManagement(name, avatar);
            console.log(slug);
            slug ? navigate(`/lobby/${slug}`) : navigate("/lobby");
        }
    }

    const handleAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const randomNumber = Math.floor(Math.random() * 9) + 1;
        setAvatar(`/images/avatars/avatar-${randomNumber}.png`);
    }

    return (
        <Container>
            <Title>¡Bienvenido!</Title>
            <Box>
                <p style={{textAlign: "center"}}>Hola <b>{name}</b>, si quieres puedes editar tu perfil antes de comenzar.</p>
                <form
                    className="antesala-info"
                    onSubmit={handleSubmit}
                >
                    <div className="antesala-avatar">
                        <img src={avatar} />
                        <button type="button" onClick={handleAvatar}><SyncIcon /></button>
                    </div>
                    <div className="antesala-name">
                        <input type="text" name="name" value={name} onChange={handleOnChange} />
                        {error && <p className="antesala-error">Tu nick debe contener entre 3 y 15 caracteres.</p>}
                    </div>
                    <button type="submit" className="button gradient-pink">
                        {slug ? "Unirse a la Sala" : "Crear Sala"}
                    </button>
                </form>
            </Box>
        </Container>
    )
}
