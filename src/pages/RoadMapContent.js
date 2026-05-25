import React, {useEffect, useRef} from "react";
import styled from "@emotion/styled";

const RoadMapContent = () => {


    const TextInfo = [
        {icon: "📅", text: "Когда? 14 февраля – день, когда амуры перерабатывают 🏹"},
        {icon: "📍", text: "Где? Заберу с работы – координаты романтики 🗺️"},
        {icon: "⏰", text: "Во сколько? 2.00 – ровно тогда, когда мое сердце начнёт биться быстрее 💓"},
    ];

    return (
        <TextContentWrapper>
            {TextInfo.map((item, index) => (
                <FlexBox key={index}>

                    <ContentText style={{paddingLeft: "10px"}}>
                        {item.icon}
                    </ContentText> <ContentText style={{paddingRight: "10px"}}>
                    {item.text}
                </ContentText>
                </FlexBox>

            ))}
        </TextContentWrapper>
    );
};

const TextContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`;

const ContentText = styled.p`
    font-family: "BKANTKZ", Arial, sans-serif;
    font-size: 18px;
    line-height: 160%;
    font-weight: 200;
    text-align: start;
    margin: 0;
    margin-bottom: 12px;
`;

const FlexBox = styled.div`
    display: flex;
    gap: 10px;
`;

const TwoGis = styled.img`
    width: 48px;
    height: 48px;
    margin-bottom: 36px;
    cursor: pointer;
`;

export default RoadMapContent;
