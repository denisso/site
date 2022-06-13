/**
 * for more info about Fontawesome icons see:
 * https://fontawesome.com/v5/docs/apis/javascript/get-started
 */
import React from "react";

import { useSelector } from "react-redux";
import { selectSignInState } from "features/accounts/reducer";

const Image = ({ picture, ...props }: any) => {
    const [src, setSrc] = React.useState(picture);
    const errorLoading = React.useRef(false);
    const onError = () => {
        if (errorLoading.current) return;
        setSrc("/asset/imageLoadingProblem.svg");
        errorLoading.current = true;
    };
    return <img src={src} {...props} onError={onError} />;
};

const AvatarByUser = (props: any) => {
    const { currentUserID, credentials } = useSelector(selectSignInState);
    if (currentUserID === "guest") {
        return <img src={"/asset/guest.svg"} {...props} />;
    }

    return <Image picture={credentials.picture} {...props} />;
};

export const Avatar = ({ picture, ...props }: any) => {
    if (typeof picture === "string")
        return <Image picture={picture} {...props} />;
    return <AvatarByUser props={props} />;
};
