import "./PlayersListUI.css";
import { IPlayer, Marker } from "../../App";
import PlayerCard from "../../components/PlayerCard";

interface IPlayersListUI {
    players: Array<IPlayer>;
}

const playerPlaceholder = {
    id: "31KLQW5",
    name: "Esperando...",
    avatar: "src/assets/images/avatars/avatar-0.png",
    marker: "?" as Marker,
    score: 0
}

export default function PlayersListUI({ players }: IPlayersListUI) {
    return (
        <div className="playerlist">
            {players.map(player => <PlayerCard key={player.id} player={player} />)}
            {players.length < 2 && <PlayerCard key={playerPlaceholder.id} player={playerPlaceholder} />}
        </div>
    )
}
