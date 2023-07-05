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
        if (name.length < 3) setError(true);
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
            <Title>Antesala</Title>
            <Box>
                Hola <b>{name}</b>, prepara tu perfil antes de ingresar a la partida.
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
                        {error && <p className="antesala-error">Tu nickname debe tener al menos 3 letras.</p>}
                    </div>
                    <button type="submit" className="button gradient-pink">Ingresar a la sala</button>
                </form>
            </Box>
        </Container>
    )
}
