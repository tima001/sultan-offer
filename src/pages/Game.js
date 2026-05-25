import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

/* ─── Data ─── */
const MESSAGES = [
    "Поймала моё сердце! 💘",
    "Ты слишком быстрая! 😍",
    "Опять влюбился... 💕",
    "Охотница за сердцами! 🎯",
    "Хватит красть моё сердце! 😂",
    "Ты непобедима! 👸",
    "Моё сердце — твоё навсегда! 🌹",
    "Я пропал... 💫",
];

const MILESTONES = [
    { score: 5,  emoji: "🌸", text: "5 сердец!", sub: "Ты неотразима!" },
    { score: 10, emoji: "🔥", text: "10 сердец!", sub: "Настоящий мастер!" },
    { score: 20, emoji: "👑", text: "20 сердец!", sub: "Ты легенда!" },
    { score: 30, emoji: "💫", text: "30 сердец!", sub: "Ты непостижима!" },
];

const MAX_METER = 30;
const BURST_COUNT = 8;
const BURST_EMOJIS = ["💖", "✨", "🌟", "💕", "⭐", "🌸", "💗", "🌺"];

const STARS = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: 1.5 + Math.random() * 2.5,
    delay: `${Math.random() * 5}s`,
    dur: `${2 + Math.random() * 3}s`,
}));

const FLOATERS = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 88}%`,
    delay: `${Math.random() * 8}s`,
    dur: `${7 + Math.random() * 7}s`,
    size: 12 + Math.random() * 12,
    emoji: ["💗", "✨", "🌸", "💕", "⭐"][Math.floor(Math.random() * 5)],
}));

/* ─── Component ─── */
const CatchTheHeart = () => {
    const [score, setScore]             = useState(0);
    const [pos, setPos]                 = useState({ top: "50%", left: "50%" });
    const [clicked, setClicked]         = useState(false);
    const [msg, setMsg]                 = useState(null);
    const [milestone, setMilestone]     = useState(null);
    const [burst, setBurst]             = useState(null);
    const [confetti, setConfetti]       = useState([]);
    const [rainHearts, setRainHearts]   = useState([]);
    const cardRef = useRef(null);

    const moveHeart = useCallback(() => {
        setPos({
            top:  `${15 + Math.floor(Math.random() * 60)}%`,
            left: `${10 + Math.floor(Math.random() * 72)}%`,
        });
        setClicked(false);
    }, []);

    useEffect(() => { moveHeart(); }, [moveHeart]);

    const handleClick = (e) => {
        /* position burst relative to card */
        const rect = e.currentTarget.getBoundingClientRect();
        const cardRect = cardRef.current?.getBoundingClientRect() ?? rect;
        const bx = rect.left - cardRect.left + rect.width  / 2;
        const by = rect.top  - cardRect.top  + rect.height / 2;

        const id = Date.now();
        setBurst({ id, x: bx, y: by });
        setTimeout(() => setBurst(null), 900);

        const newScore = score + 1;
        setScore(newScore);
        setClicked(true);
        setMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);

        const ms = MILESTONES.find((m) => m.score === newScore);
        if (ms) {
            setMilestone(ms);
            /* rain hearts */
            const rain = Array.from({ length: 18 }, (_, i) => ({
                id: i, left: `${Math.random() * 100}%`,
                delay: `${Math.random() * 1.2}s`,
                dur:   `${1.2 + Math.random() * 0.8}s`,
            }));
            setRainHearts(rain);
            /* confetti dots */
            const conf = Array.from({ length: 24 }, (_, i) => ({
                id: i,
                x: 20 + Math.random() * 60,
                color: ["#f0829d","#ffd700","#ff6b9d","#c77dff","#fff"][Math.floor(Math.random() * 5)],
                delay: `${Math.random() * 0.6}s`,
            }));
            setConfetti(conf);
            setTimeout(() => { setMilestone(null); setRainHearts([]); setConfetti([]); }, 2800);
        }

        setTimeout(() => { setMsg(null); moveHeart(); }, 1000);
    };

    const meterPct = Math.min((score / MAX_METER) * 100, 100);

    return (
        <Section>
            <TitleRow>
                <TitleDecor>✦</TitleDecor>
                <Title>Лови звёздное сердце</Title>
                <TitleDecor>✦</TitleDecor>
            </TitleRow>
            <Subtitle>Сердце вырвалось на свободу — поймай его до рассвета 🌙</Subtitle>

            <Card ref={cardRef}>
                {/* Stars */}
                <Starfield>
                    {STARS.map((s) => (
                        <Star key={s.id} top={s.top} left={s.left} size={s.size} delay={s.delay} dur={s.dur} />
                    ))}
                </Starfield>

                {/* Shooting star */}
                <ShootingStarWrap><ShootingStarLine /></ShootingStarWrap>

                {/* Floating particles */}
                <Floaters>
                    {FLOATERS.map((f) => (
                        <Floater key={f.id} left={f.left} delay={f.delay} dur={f.dur} size={f.size}>
                            {f.emoji}
                        </Floater>
                    ))}
                </Floaters>

                {/* Score badge */}
                <ScoreBadge>
                    <ScoreNum>{score}</ScoreNum>
                    <ScoreLbl>💖</ScoreLbl>
                </ScoreBadge>

                {/* The heart */}
                <HeartWrap style={{ top: pos.top, left: pos.left }} onClick={handleClick} className={clicked ? "clicked" : ""}>
                    <GlowRing3 />
                    <GlowRing2 />
                    <GlowRing1 />
                    <HeartEmoji>💖</HeartEmoji>
                </HeartWrap>

                {/* Click burst */}
                {burst && (
                    <BurstGroup x={burst.x} y={burst.y} key={burst.id}>
                        {BURST_EMOJIS.map((em, i) => (
                            <BurstPart key={i} angle={(i / BURST_COUNT) * 360} dist={45 + Math.random() * 20}>
                                {em}
                            </BurstPart>
                        ))}
                    </BurstGroup>
                )}

                {/* Pop message */}
                {msg && <PopMsg>{msg}</PopMsg>}

                {/* Milestone overlay */}
                {milestone && (
                    <MilestoneOverlay>
                        {confetti.map((c) => (
                            <ConfettiDot key={c.id} x={c.x} color={c.color} delay={c.delay} />
                        ))}
                        {rainHearts.map((h) => (
                            <RainHeart key={h.id} left={h.left} delay={h.delay} dur={h.dur}>💖</RainHeart>
                        ))}
                        <MilestoneInner>
                            <MilestoneEmoji>{milestone.emoji}</MilestoneEmoji>
                            <MilestoneText>{milestone.text}</MilestoneText>
                            <MilestoneSub>{milestone.sub}</MilestoneSub>
                        </MilestoneInner>
                    </MilestoneOverlay>
                )}

                {/* Love meter */}
                <MeterRow>
                    <MeterLabel>Любовь</MeterLabel>
                    <MeterTrack>
                        <MeterFill pct={meterPct} />
                        <MeterHeartPin style={{ left: `${meterPct}%` }}>💖</MeterHeartPin>
                    </MeterTrack>
                </MeterRow>
            </Card>

            <Hint>Нажимай быстрее — сердце не ждёт! 💓</Hint>
        </Section>
    );
};

/* ─── Keyframes ─── */
const twinkle = keyframes`
  0%,100% { opacity:0.2; transform:scale(0.8); }
  50%      { opacity:1;   transform:scale(1.3); }
`;
const floatUp = keyframes`
  0%   { transform:translateY(0)   scale(1);   opacity:0.6; }
  100% { transform:translateY(-130px) scale(1.3); opacity:0; }
`;
const heartPulse = keyframes`
  0%,100% { transform:translate(-50%,-50%) scale(1); }
  50%      { transform:translate(-50%,-50%) scale(1.15); }
`;
const heartPop = keyframes`
  0%   { transform:translate(-50%,-50%) scale(1);   opacity:1; }
  50%  { transform:translate(-50%,-50%) scale(2.2); opacity:0.5; }
  100% { transform:translate(-50%,-50%) scale(0);   opacity:0; }
`;
const ring1Anim = keyframes`
  0%,100% { transform:translate(-50%,-50%) scale(1);   opacity:0.55; }
  50%      { transform:translate(-50%,-50%) scale(1.25); opacity:0.2; }
`;
const ring2Anim = keyframes`
  0%,100% { transform:translate(-50%,-50%) scale(1);   opacity:0.35; }
  50%      { transform:translate(-50%,-50%) scale(1.5); opacity:0.1; }
`;
const ring3Anim = keyframes`
  0%,100% { transform:translate(-50%,-50%) scale(1);   opacity:0.2; }
  50%      { transform:translate(-50%,-50%) scale(1.8); opacity:0; }
`;
const popAnim = keyframes`
  0%   { opacity:0; transform:translate(-50%,-50%) scale(0.5) rotate(-3deg); }
  30%  { opacity:1; transform:translate(-50%,-50%) scale(1.1) rotate(1deg); }
  70%  { opacity:1; transform:translate(-50%,-52%) scale(1) rotate(0deg); }
  100% { opacity:0; transform:translate(-50%,-58%) scale(0.9) rotate(-1deg); }
`;
const burstOut = keyframes`
  0%   { opacity:1; transform:translate(-50%,-50%) translate(0,0) scale(1); }
  100% { opacity:0; transform:translate(-50%,-50%) translate(var(--tx),var(--ty)) scale(0.4); }
`;
const milestoneIn = keyframes`
  0%   { opacity:0; }
  15%  { opacity:1; }
  80%  { opacity:1; }
  100% { opacity:0; }
`;
const milestoneScale = keyframes`
  0%   { transform:translate(-50%,-50%) scale(0.4) rotate(-4deg); }
  20%  { transform:translate(-50%,-50%) scale(1.08) rotate(1deg); }
  35%  { transform:translate(-50%,-50%) scale(0.97) rotate(0deg); }
  100% { transform:translate(-50%,-50%) scale(1) rotate(0deg); }
`;
const emojiSpin = keyframes`
  0%   { transform:rotate(-20deg) scale(0.5); opacity:0; }
  40%  { transform:rotate(10deg)  scale(1.3); opacity:1; }
  100% { transform:rotate(0deg)   scale(1);   opacity:1; }
`;
const rainDrop = keyframes`
  0%   { transform:translateY(-10%) rotate(0deg); opacity:1; }
  100% { transform:translateY(120%) rotate(20deg); opacity:0; }
`;
const confettiDrop = keyframes`
  0%   { transform:translateY(-20px) rotate(0deg)  scale(0); opacity:1; }
  100% { transform:translateY(280px) rotate(540deg) scale(1); opacity:0; }
`;
const shoot = keyframes`
  0%   { transform:translateX(0) translateY(0) rotate(-30deg); opacity:1; width:0; }
  70%  { opacity:1; width:100px; }
  100% { transform:translateX(300px) translateY(200px) rotate(-30deg); opacity:0; width:0; }
`;
const shootLoop = keyframes`
  0%,10%  { opacity:0; }
  10%,40% { opacity:1; }
  40%,100%{ opacity:0; }
`;
const meterFill = keyframes`
  from { width:0; }
`;
const titleShimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

/* ─── Styled ─── */
const Section = styled.div`
    display:flex; flex-direction:column; align-items:center;
    gap:14px; padding:0 14px 36px; width:100%; box-sizing:border-box;
`;

const TitleRow = styled.div`
    display:flex; align-items:center; gap:12px;
`;
const TitleDecor = styled.span`
    font-size:18px; color:#d4af6a; opacity:0.8;
`;
const Title = styled.h2`
    font-family:"Romulc",serif;
    font-size:26px; font-weight:400; margin:0; letter-spacing:3px;
    background: linear-gradient(90deg,#f0829d,#ffd700,#f0829d,#ff6b9d);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:${titleShimmer} 4s linear infinite;
    @media(max-width:375px){ font-size:20px; letter-spacing:2px; }
`;
const Subtitle = styled.p`
    font-family:"BKANTKZ",Arial,sans-serif;
    font-size:14px; color:#c9a0a8; text-align:center; margin:0; line-height:1.7;
`;

const Card = styled.div`
    position:relative; width:100%; max-width:480px; height:380px;
    background:linear-gradient(160deg,#120525 0%,#2a0838 35%,#3d0d20 65%,#1a0618 100%);
    border-radius:28px; overflow:hidden; cursor:default;
    box-shadow:
        0 0 0 1px rgba(212,175,106,0.25),
        0 0 40px rgba(240,130,157,0.25),
        0 16px 48px rgba(0,0,0,0.7),
        inset 0 1px 0 rgba(255,255,255,0.07);
    @media(max-width:375px){ height:310px; }
`;

/* Stars */
const Starfield = styled.div`
    position:absolute; inset:0; pointer-events:none;
`;
const Star = styled.div`
    position:absolute;
    top:${p=>p.top}; left:${p=>p.left};
    width:${p=>p.size}px; height:${p=>p.size}px;
    border-radius:50%;
    background:#fff;
    animation:${twinkle} ${p=>p.dur} ${p=>p.delay} ease-in-out infinite;
`;

/* Shooting star */
const ShootingStarWrap = styled.div`
    position:absolute; top:10%; left:-20px; z-index:1; pointer-events:none;
    animation:${shootLoop} 8s 3s infinite;
`;
const ShootingStarLine = styled.div`
    width:0; height:2px; border-radius:2px;
    background:linear-gradient(90deg,#fff,transparent);
    animation:${shoot} 1.4s ease-in forwards;
`;

/* Floating particles */
const Floaters = styled.div`
    position:absolute; inset:0; pointer-events:none; overflow:hidden;
`;
const Floater = styled.div`
    position:absolute; bottom:-20px; left:${p=>p.left};
    font-size:${p=>p.size}px;
    animation:${floatUp} ${p=>p.dur} ${p=>p.delay} infinite ease-in;
    pointer-events:none; user-select:none;
`;

/* Score badge */
const ScoreBadge = styled.div`
    position:absolute; top:16px; left:16px; z-index:6;
    background:rgba(255,255,255,0.07);
    border:1px solid rgba(212,175,106,0.35);
    backdrop-filter:blur(8px);
    border-radius:16px; padding:8px 14px;
    display:flex; flex-direction:column; align-items:center;
`;
const ScoreNum = styled.span`
    font-family:"Romulc",serif;
    font-size:30px; line-height:1; color:#ffd700; letter-spacing:1px;
`;
const ScoreLbl = styled.span`
    font-size:14px; line-height:1;
`;

/* Heart */
const HeartWrap = styled.div`
    position:absolute; z-index:5; cursor:pointer; user-select:none;
    animation:${heartPulse} 1.6s ease-in-out infinite;
    &.clicked { animation:${heartPop} 0.55s ease forwards; }
`;
const GlowRing1 = styled.div`
    position:absolute; top:50%; left:50%;
    width:64px; height:64px; border-radius:50%;
    background:radial-gradient(circle,rgba(255,100,150,0.55),transparent 70%);
    animation:${ring1Anim} 1.6s ease-in-out infinite;
    pointer-events:none;
`;
const GlowRing2 = styled.div`
    position:absolute; top:50%; left:50%;
    width:90px; height:90px; border-radius:50%;
    background:radial-gradient(circle,rgba(255,100,150,0.25),transparent 70%);
    animation:${ring2Anim} 1.6s ease-in-out infinite;
    pointer-events:none;
`;
const GlowRing3 = styled.div`
    position:absolute; top:50%; left:50%;
    width:120px; height:120px; border-radius:50%;
    background:radial-gradient(circle,rgba(255,100,150,0.12),transparent 70%);
    animation:${ring3Anim} 1.6s ease-in-out infinite;
    pointer-events:none;
`;
const HeartEmoji = styled.span`
    font-size:52px; display:block; position:relative; z-index:1;
    filter:drop-shadow(0 0 12px rgba(255,100,150,0.9))
           drop-shadow(0 0 4px rgba(255,200,220,0.8));
    @media(max-width:375px){ font-size:42px; }
`;

/* Burst */
const BurstGroup = styled.div`
    position:absolute; top:${p=>p.y}px; left:${p=>p.x}px;
    pointer-events:none; z-index:9;
`;
const BurstPart = styled.span`
    position:absolute; font-size:16px;
    transform:translate(-50%,-50%);
    --tx:${p=>Math.cos((p.angle*Math.PI)/180)*p.dist}px;
    --ty:${p=>Math.sin((p.angle*Math.PI)/180)*p.dist}px;
    animation:${burstOut} 0.85s cubic-bezier(.2,.8,.5,1) forwards;
`;

/* Pop message */
const PopMsg = styled.div`
    position:absolute; top:50%; left:50%;
    background:rgba(255,255,255,0.1);
    backdrop-filter:blur(12px);
    border:1px solid rgba(255,255,255,0.18);
    border-radius:22px; padding:11px 20px;
    font-family:"BKANTKZ",Arial,sans-serif;
    font-size:15px; color:#fff; font-weight:600;
    text-align:center; white-space:nowrap;
    z-index:10; pointer-events:none;
    text-shadow:0 0 10px rgba(255,150,180,0.8);
    animation:${popAnim} 1s ease forwards;
`;

/* Milestone */
const MilestoneOverlay = styled.div`
    position:absolute; inset:0; z-index:20; pointer-events:none;
    background:rgba(10,2,20,0.82);
    backdrop-filter:blur(4px);
    animation:${milestoneIn} 2.8s ease forwards;
`;
const MilestoneInner = styled.div`
    position:absolute; top:50%; left:50%;
    display:flex; flex-direction:column; align-items:center; gap:8px;
    animation:${milestoneScale} 2.8s ease forwards;
`;
const MilestoneEmoji = styled.span`
    font-size:52px; display:block;
    animation:${emojiSpin} 0.7s 0.1s ease forwards;
    opacity:0;
`;
const MilestoneText = styled.div`
    font-family:"Romulc",serif;
    font-size:30px; color:#ffd700; letter-spacing:2px;
    text-shadow:0 0 20px rgba(255,215,0,0.7);
    @media(max-width:375px){ font-size:24px; }
`;
const MilestoneSub = styled.div`
    font-family:"BKANTKZ",Arial,sans-serif;
    font-size:16px; color:#f0829d; font-weight:300; letter-spacing:1px;
`;

/* Rain hearts */
const RainHeart = styled.span`
    position:absolute; top:0; left:${p=>p.left}; font-size:20px;
    animation:${rainDrop} ${p=>p.dur} ${p=>p.delay} ease-in forwards;
    pointer-events:none;
`;

/* Confetti */
const ConfettiDot = styled.div`
    position:absolute; top:0; left:${p=>p.x}%;
    width:8px; height:8px; border-radius:2px;
    background:${p=>p.color};
    animation:${confettiDrop} 1.8s ${p=>p.delay} ease-in forwards;
`;

/* Love meter */
const MeterRow = styled.div`
    position:absolute; bottom:0; left:0; right:0;
    padding:10px 18px 14px; z-index:6;
    background:linear-gradient(0deg,rgba(10,2,20,0.9),transparent);
    display:flex; align-items:center; gap:10px;
`;
const MeterLabel = styled.span`
    font-family:"BKANTKZ",Arial,sans-serif;
    font-size:11px; color:#d4af6a; white-space:nowrap;
    letter-spacing:1.5px; text-transform:uppercase; opacity:0.85;
`;
const MeterTrack = styled.div`
    flex:1; height:6px; border-radius:6px;
    background:rgba(255,255,255,0.1);
    position:relative; overflow:visible;
`;
const MeterFill = styled.div`
    height:100%; border-radius:6px;
    width:${p=>p.pct}%;
    background:linear-gradient(90deg,#8b1a3a,#f0829d,#ffd700);
    transition:width 0.5s cubic-bezier(.4,0,.2,1);
    box-shadow:0 0 8px rgba(240,130,157,0.6);
`;
const MeterHeartPin = styled.span`
    position:absolute; top:50%; transform:translateX(-50%) translateY(-50%);
    font-size:14px; transition:left 0.5s cubic-bezier(.4,0,.2,1);
    filter:drop-shadow(0 0 4px rgba(255,100,150,0.9));
`;

/* Hint */
const Hint = styled.p`
    font-family:"BKANTKZ",Arial,sans-serif;
    font-size:12px; color:#9a7080; text-align:center; margin:0;
    letter-spacing:0.5px; opacity:0.75;
`;

export default CatchTheHeart;
