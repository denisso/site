/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { useSelector } from "react-redux";
import { selectSignInState } from "./reducer";
import { GoogleButton } from "./Google/GoogleButton";
import styled from "styled-components";
import { ReactComponent as LogoGuest } from "assets/guest.svg";
import { AnimateItem } from "components/Tools";
import { useGetReady } from "features/settings/reducer";

const AvatarStyled = styled.div`
    width: 2rem;
    height: 2rem;
    .Icon {
        width: 100%;
        height: auto;
        fill: ${({ theme }) => theme.colors.first};
        transition: fill var(--transition);
    }
`;

export const AccountComponent = () => {
    const { isSignIn, currentUserID } = useSelector(selectSignInState);
    const isReady = useGetReady()
    return (
        <AnimateItem isVisible={isReady}>
            {currentUserID && (
                <>
                    {!isSignIn && (
                        <AvatarStyled>
                            <LogoGuest className="Icon"/>
                        </AvatarStyled>
                    )}
                    <GoogleButton />
                </>
            )}
        </AnimateItem>
    );
};
