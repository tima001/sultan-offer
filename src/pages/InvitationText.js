import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const InvitationText = () => {
  return (
    <Wrapper>
      <Card>
        <CornerDecor pos="top-left">✦</CornerDecor>
        <CornerDecor pos="top-right">✦</CornerDecor>
        <CornerDecor pos="bottom-left">✦</CornerDecor>
        <CornerDecor pos="bottom-right">✦</CornerDecor>

        <Greeting>Дорогая Арайкош,</Greeting>
        <BorderLine />
        <Body>
          Искренне хочу пригласить тебя провести со мной особенный вечер —
          полный тепла, улыбок и незабываемых моментов.
        </Body>
        <Signature>— с любовью 💌</Signature>
      </Card>
    </Wrapper>
  );
};

export default InvitationText;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  animation: ${fadeIn} 0.9s ease both;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
  background: linear-gradient(145deg, #fffaf7, #fff5f0);
  border: 1px solid rgba(192, 80, 100, 0.18);
  border-radius: 20px;
  padding: 36px 32px 32px;
  box-shadow:
    0 4px 24px rgba(150, 50, 70, 0.09),
    0 1px 4px rgba(150, 50, 70, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);

  @media (max-width: 375px) { padding: 28px 22px 26px; }
`;

const CornerDecor = styled.span`
  position: absolute;
  font-size: 12px;
  color: rgba(212, 175, 106, 0.55);
  line-height: 1;

  ${({ pos }) => pos === "top-left"    && "top: 12px; left: 14px;"}
  ${({ pos }) => pos === "top-right"   && "top: 12px; right: 14px;"}
  ${({ pos }) => pos === "bottom-left" && "bottom: 12px; left: 14px;"}
  ${({ pos }) => pos === "bottom-right"&& "bottom: 12px; right: 14px;"}
`;

const Greeting = styled.div`
  font-family: "Romulc", serif;
  font-size: 26px;
  font-weight: 400;
  color: #9b1d3c;
  letter-spacing: 1px;
  margin-bottom: 16px;

  @media (max-width: 375px) { font-size: 22px; }
`;

const BorderLine = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(192, 80, 100, 0.3) 30%,
    rgba(212, 175, 106, 0.5) 50%,
    rgba(192, 80, 100, 0.3) 70%,
    transparent
  );
  margin-bottom: 20px;
`;

const Body = styled.p`
  font-family: "BKANTKZ", Arial, sans-serif;
  font-size: 17px;
  font-weight: 300;
  color: #4a2030;
  line-height: 1.85;
  letter-spacing: 0.3px;

  @media (max-width: 375px) { font-size: 15px; }
`;

const Signature = styled.div`
  font-family: "Romulc", serif;
  font-size: 16px;
  color: rgba(155, 29, 60, 0.65);
  text-align: right;
  margin-top: 18px;
  letter-spacing: 1px;
`;
