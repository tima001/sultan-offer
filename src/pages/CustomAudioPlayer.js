import React, { useState, useRef, useEffect } from "react";
import MyMusic from "../music/muz.mp3";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const CustomAudioPlayer = () => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    audioRef.current.muted = isMuted;
    audioRef.current.play().catch(() => {});
  }, [isMuted]);

  return (
    <Wrapper>
      <audio ref={audioRef} src={MyMusic} loop />
      <Button onClick={toggleMute} title={isMuted ? "Включить музыку" : "Выключить музыку"}>
        <Ring spinning={!isMuted} />
        <Icon>{isMuted ? "🔇" : "🎵"}</Icon>
      </Button>
    </Wrapper>
  );
};

export default CustomAudioPlayer;

/* ─── Keyframes ─── */
const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 106, 0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(212, 175, 106, 0); }
`;

/* ─── Styled ─── */
const Wrapper = styled.div`
  position: sticky;
  top: 16px;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  pointer-events: none;

  @media (max-width: 440px) { top: 420px; }
  @media (max-width: 375px) { top: 340px; }
  @media (max-width: 320px) { top: 290px; }
`;

const Button = styled.button`
  position: relative;
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(145deg, #2a0a14, #1a0510);
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.45),
    0 0 0 1.5px rgba(212, 175, 106, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: ${pulse} 2.4s ease-in-out infinite;

  &:active { transform: scale(0.92); }
`;

const Ring = styled.div`
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1.5px solid transparent;
  border-top-color: rgba(212, 175, 106, 0.7);
  border-right-color: rgba(212, 175, 106, 0.3);
  animation: ${spin} ${({ spinning }) => (spinning ? "2s" : "0s")} linear infinite;
  opacity: ${({ spinning }) => (spinning ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Icon = styled.span`
  font-size: 20px;
  line-height: 1;
  position: relative;
  z-index: 1;
`;
