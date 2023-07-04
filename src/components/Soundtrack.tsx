import { useState, useRef } from "react";
import music from "../assets/sounds/background-music.wav";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import MusicOffOutlinedIcon from '@mui/icons-material/MusicOffOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import Container from "./Container";
import { useGame } from "../hooks/useGame";

export default function Soundtrack() {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isSFXEnabled, setIsSFXEnabled } = useGame();

  const toggleMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05;
      audioRef.current.muted = false;
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  const toggleSFX = () => {
    setIsSFXEnabled(prevState => !prevState);
  }

  return (
    <Container className="soundtrack-container">
      <button onClick={toggleMusic}>
        {isPlaying ? <VolumeUpOutlinedIcon /> : <VolumeOffOutlinedIcon />}
      </button>
      <button onClick={toggleSFX}>
        {isSFXEnabled ? <MusicNoteOutlinedIcon /> : <MusicOffOutlinedIcon />}
      </button>
      <audio ref={audioRef} autoPlay loop>
        <source src={music} type="audio/wav" />
      </audio>
    </Container>
  );
}
