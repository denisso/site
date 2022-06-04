/**
 * Google credentials
 * https://developers.google.com/identity/gsi/web/reference/js-reference#credential
 * needed
 * sub - The unique ID of the user's Google Account
 * email - The user's email address
 * name
 * picture - url image
 */
import React from "react";
import { parseJwt } from "tools/parseJWT";
import { useDispatch } from "react-redux";
import { signIn, CredentialsType, postUserCredentials } from "../reducer";
import { loadScript } from "tools/loadScript";

export enum GoogleLoadingStates {
    NotLoaded = 0,
    ScriptLoaded,
    GoogleApiInitialized,
}

export const useGoogleIdentityApi = () => {
    const [stateGoogle, setStateGoogle] = React.useState(
        GoogleLoadingStates.NotLoaded
    );
    const dispatch = useDispatch();
    const handleCredentialResponse = React.useCallback((response) => {
        const credentialGoogle: any = parseJwt(response.credential);
        const credentials: CredentialsType = {
            id: credentialGoogle.sub,
            name: credentialGoogle.name,
            email: credentialGoogle.email,
            picture: credentialGoogle.picture,
        };
        dispatch(signIn(credentials));
        dispatch(postUserCredentials(credentials))
    }, []);

    React.useEffect(() => {
        switch (stateGoogle) {
            case GoogleLoadingStates.NotLoaded:
                loadScript({
                    src: "https://accounts.google.com/gsi/client",
                    async: true,
                    defer: true,
                    id: "google-script-identity",
                    onload: function () {
                        setStateGoogle(GoogleLoadingStates.ScriptLoaded);
                    },
                });
                break;
            case GoogleLoadingStates.ScriptLoaded:
                if (!window.google) return;

                window.google.accounts.id.initialize({
                    client_id:
                        "32181816134-9v3igk7t98d9qksv6pfcies9sd0dimcr.apps.googleusercontent.com",
                    auto_select: true,
                    callback: handleCredentialResponse,
                });

                setTimeout(() => {
                    if (window.google)
                        setStateGoogle(
                            GoogleLoadingStates.GoogleApiInitialized
                        );
                }, 200);
                break;
        }
    }, [stateGoogle]);

    return stateGoogle;
};
