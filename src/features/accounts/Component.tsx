import { useSelector } from "react-redux";
import { selectSignInState } from "./reducer";
import { GoogleButton } from "./Google/GoogleButton";
import { Avatar } from "components/Elements/Avatar";

export const AccountComponent = () => {
    const { isSignIn, currentUserID } = useSelector(selectSignInState);

    return (
        <>
            {currentUserID && (
                <>
                    {!isSignIn && <Avatar />}
                    <GoogleButton />
                </>
            )}
        </>
    );
};
