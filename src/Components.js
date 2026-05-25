import "./App.css";
import PhotoWithHeader from "./pages/PhotoWithHeader";
import TimerWithPhoto from "./pages/TimerWithPhoto";
import InvitationText from "./pages/InvitationText";
import styled from "@emotion/styled";
import LastText from "./pages/LastText";
import CatchTheHeart from "./pages/Game";

function Components() {
    return (
        <PageWrapper>
            <PhotoWithHeader />

            <MainContent>
                <Divider />
                <InvitationText />
                <Divider />
                <TimerWithPhoto />
                <Divider />
                <LastText />
                <Divider />
                <CatchTheHeart />
                <BottomSpace />
            </MainContent>
        </PageWrapper>
    );
}

export default Components;

const PageWrapper = styled.div`
    position: relative;
    top: -64px;
    display: flex;
    flex-direction: column;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 0;
    background: linear-gradient(
        180deg,
        #fdf5ef 0%,
        #fef7f2 40%,
        #fdf5ef 100%
    );
`;

const Divider = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 24px;
    gap: 12px;

    &::before,
    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(192, 80, 100, 0.25) 30%,
            rgba(212, 175, 106, 0.4) 50%,
            rgba(192, 80, 100, 0.25) 70%,
            transparent
        );
    }

    &::before {
        content: "✦";
        flex: none;
        font-size: 14px;
        color: rgba(212, 175, 106, 0.7);
        letter-spacing: 6px;
    }

    &::after {
        content: "✦";
        flex: none;
        font-size: 14px;
        color: rgba(212, 175, 106, 0.7);
    }
`;

const BottomSpace = styled.div`
    height: 48px;
`;
