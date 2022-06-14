import { useSelector } from "react-redux";
import { selectSignInState } from "./reducer";
import { GoogleButton } from "./Google/GoogleButton";
import { Avatar } from "components/Elements/Avatar";
import styled from "styled-components"

const AvatarStyled = styled(Avatar)`
    width: 2rem;
    height: 2rem;
`

export const AccountComponent = () => {
    const { isSignIn, currentUserID } = useSelector(selectSignInState);

    return (
        <>
            {currentUserID && (
                <>
                    {!isSignIn && <AvatarStyled className="Avatar"/>}
                    <GoogleButton />
                </>
            )}
        </>
    );
};
