/**
 * 
 */
import React from "react";

import { useSelector } from "react-redux";
import { selectSignInState } from "features/accounts/reducer";

const Image = ({ src, ...props }: any) => {
    const [uri, setUri] = React.useState(src);
    const errorLoading = React.useRef(false);
    const onError = () => {
        if (errorLoading.current) return;
        setUri("/asset/imageLoadingProblem.svg");
        errorLoading.current = true;
    };
    return <img src={uri} {...props} onError={onError} />;
};

// Avatar without prop picture get picture from user credentials
const AvatarByUser = (props: any) => {
    const { credentials } = useSelector(selectSignInState);
    return <Image picture={credentials.picture} {...props} />;
};

export const Avatar = ({ src, ...props }: any) => {
    if (typeof src === "string")
        return <Image src={src} {...props} />;
    return <AvatarByUser {...props} />;
};
