import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const TARGET = new Date("2026-05-26T17:00:00");

const getTimeLeft = () => {
  const diff = TARGET - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  };
};

const TimerWithPhoto = () => {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time.days,    label: "күн",   labelRu: "дней" },
    { value: time.hours,   label: "сағат", labelRu: "часов" },
    { value: time.minutes, label: "минут", labelRu: "минут" },
    { value: time.seconds, label: "секунд",labelRu: "секунд" },
  ];

  return (
    <Section>
      <Hero>
        <HeroOverlay />
        <HeroContent>
          <VenueLabel>место встречи</VenueLabel>
          <VenueName>Coffee-Coffee</VenueName>
          <DateTag>26 мая · 17:00</DateTag>

          <TimerLabel>до особенного вечера</TimerLabel>

          <UnitRow>
            {units.map((u, i) => (
              <React.Fragment key={u.label}>
                <UnitBox>
                  <UnitValue>{String(u.value).padStart(2, "0")}</UnitValue>
                  <UnitLabelKz>{u.label}</UnitLabelKz>
                </UnitBox>
                {i < units.length - 1 && <Colon>:</Colon>}
              </React.Fragment>
            ))}
          </UnitRow>

          <GisButton href="https://2gis.kz/taraz/geo/70000001051082555" target="_blank" rel="noreferrer">
            <GisLogo src={require("../img/2gis.png")} alt="2GIS" />
            Открыть в 2ГИС
          </GisButton>
        </HeroContent>
      </Hero>
    </Section>
  );
};

export default TimerWithPhoto;

/* ─── Keyframes ─── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
`;

/* ─── Styled ─── */
const Section = styled.div`
  padding: 0 20px;
  display: flex;
  justify-content: center;
`;

const Hero = styled.div`
  position: relative;
  width: 100%;
  max-width: 460px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow:
    0 8px 40px rgba(60, 10, 20, 0.3),
    0 2px 8px rgba(60, 10, 20, 0.15);

  background: url(${require("../img/kiiz.jpeg")}) center/cover no-repeat;

  @media (max-width: 440px) { min-height: 340px; }
  @media (max-width: 375px) { min-height: 300px; }
  @media (max-width: 320px) { min-height: 270px; }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(20, 5, 12, 0.78) 0%,
    rgba(60, 10, 25, 0.70) 50%,
    rgba(10, 2, 8, 0.82) 100%
  );
`;

const HeroContent = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 10px;
  animation: ${fadeUp} 1s ease both;
`;

const VenueLabel = styled.div`
  font-family: "BKANTKZ", Arial, sans-serif;
  font-size: 12px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #d4af6a;
  font-weight: 400;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
`;

const VenueName = styled.div`
  font-family: "Romulc", serif;
  font-size: 32px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 3px;
  text-align: center;
  text-shadow:
    0 2px 20px rgba(212, 175, 106, 0.4),
    0 0 40px rgba(255, 150, 170, 0.2);

  @media (max-width: 375px) { font-size: 26px; letter-spacing: 2px; }
`;

const TimerLabel = styled.div`
  font-family: "BKANTKZ", Arial, sans-serif;
  font-size: 12px;
  letter-spacing: 3px;
  color: rgba(255, 230, 235, 0.95);
  font-weight: 400;
  margin-top: 8px;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.7);
`;

const UnitRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
`;

const UnitBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 62px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(212, 175, 106, 0.35);
  border-radius: 14px;
  padding: 12px 10px 10px;
  backdrop-filter: blur(8px);

  @media (max-width: 375px) { min-width: 52px; padding: 10px 8px 8px; }
  @media (max-width: 320px) { min-width: 44px; }
`;

const UnitValue = styled.div`
  font-family: "Romulc", serif;
  font-size: 32px;
  font-weight: 400;
  color: #fff;
  line-height: 1;
  letter-spacing: 2px;
  text-shadow:
    0 2px 8px rgba(0, 0, 0, 0.8),
    0 0 20px rgba(255, 150, 170, 0.4);

  @media (max-width: 375px) { font-size: 26px; }
  @media (max-width: 320px) { font-size: 22px; }
`;

const UnitLabelKz = styled.div`
  font-family: "BKANTKZ", Arial, sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #d4af6a;
  letter-spacing: 1px;
  margin-top: 5px;
  text-transform: lowercase;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);

  @media (max-width: 320px) { font-size: 9px; }
`;

const Colon = styled.div`
  font-family: "Romulc", serif;
  font-size: 28px;
  color: rgba(212, 175, 106, 0.9);
  line-height: 1;
  margin-bottom: 14px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
  animation: ${pulse} 1s ease-in-out infinite;

  @media (max-width: 375px) { font-size: 22px; }
`;

const DateTag = styled.div`
  font-family: "BKANTKZ", Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 3px;
  color: #fff;
  background: rgba(155, 29, 60, 0.55);
  border: 1px solid rgba(212, 175, 106, 0.4);
  border-radius: 20px;
  padding: 5px 16px;
  backdrop-filter: blur(6px);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);

  @media (max-width: 375px) { font-size: 12px; }
`;

const GisButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  padding: 10px 22px;
  background: rgba(255, 255, 255, 0.12);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(8px);
  text-decoration: none;
  font-family: "BKANTKZ", Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 1px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  transition: background 0.2s ease, transform 0.15s ease;

  &:active { transform: scale(0.96); }

  @media (max-width: 375px) { font-size: 13px; padding: 9px 18px; }
`;

const GisLogo = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  border-radius: 4px;
`;
