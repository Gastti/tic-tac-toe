import "./PlayersListUI.css";
import { IPlayer } from "../../App";
import PlayerCard from "../../components/PlayerCard";
import Loader from "../../components/Loader";

interface IPlayersListUI {
    players: Array<IPlayer>;
    turn: string;
}

export default function PlayersListUI({ players, turn }: IPlayersListUI) {
    return (
        <div className="playerlist">
            {players.map(player => <PlayerCard key={player.id} player={player} turn={turn} />)}
            {players.length < 2 && (
                <div className="player-card-placeholder">
                    <div className="player-card">
                        <Loader />
                        <br />
                        <h3 className="player-card-name">Esperando Oponente</h3>
                    </div>
                </div>
            )}
        </div>
    )
}
