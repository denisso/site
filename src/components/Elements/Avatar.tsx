/**
 *
 */
import { useSelector } from "react-redux";
import { selectSignInState } from "features/accounts/reducer";
import { Image } from "./Image";

// Avatar without prop picture get picture from user credentials
const AvatarByUser = (props: any) => {
    const { credentials } = useSelector(selectSignInState);
    return <Image picture={credentials.picture} {...props} />;
};

export const Avatar = ({ src, ...props }: any) => {
    if (typeof src === "string") return <Image src={src} {...props} />;
    return <AvatarByUser {...props} />;
};
