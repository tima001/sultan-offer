import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const PhotoWithHeader = () => {
  return (
    <Hero>
      <Overlay />
      <Content>
        <PreTitle>— приглашение —</PreTitle>
        <MainTitle>💌 ТВОЁ ОСОБОЕ ПРИГЛАШЕНИЕ 💌</MainTitle>
        <DateBadge>
          <DateLine />
          <DateText>26 · 05 · 2026</DateText>
          <DateLine />
        </DateBadge>
      </Content>
    </Hero>
  );
};

export default PhotoWithHeader;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Hero = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  @media (max-width: 440px) {
    height: 650px;
    background: url(${require("../img/mainph.jpeg")}) center/cover no-repeat;
  }
  @media (max-width: 375px) { height: 580px; }
  @media (max-width: 320px) { height: 520px; }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    170deg,
    rgba(30, 5, 10, 0.55) 0%,
    rgba(80, 10, 25, 0.4) 50%,
    rgba(10, 2, 5, 0.65) 100%
  );
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 24px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  animation: ${fadeUp} 1.2s ease both;
`;

const PreTitle = styled.div`
  font-family: "BKANTKZ", Arial, sans-serif;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 5px;
  text-transform: lowercase;
  color: rgba(255, 220, 200, 0.8);
`;

const MainTitle = styled.h1`
  font-family: "Romulc", serif;
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  text-align: center;
  letter-spacing: 2px;
  line-height: 1.45;
  text-shadow:
    0 2px 20px rgba(200, 60, 90, 0.6),
    0 0 40px rgba(212, 175, 106, 0.3);

  @media (max-width: 375px) { font-size: 20px; }
  @media (max-width: 320px) { font-size: 18px; }
`;

const DateBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
`;

const DateLine = styled.div`
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 106, 0.8));

  &:last-child {
    background: linear-gradient(90deg, rgba(212, 175, 106, 0.8), transparent);
  }
`;

const DateText = styled.div`
  font-family: "BKANTKZ", Arial, sans-serif;
  font-size: 18px;
  font-weight: 300;
  color: #d4af6a;
  letter-spacing: 4px;
  text-shadow: 0 0 16px rgba(212, 175, 106, 0.5);

  @media (max-width: 320px) { font-size: 16px; letter-spacing: 3px; }
`;
