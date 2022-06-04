import React from "react";

export const Context = React.createContext({
    /**
     * dispatch actions to manage CRUD operations of comments
     * Examples:
     * dispatch ({type: "init/insert/update/delete", payload: {...}}).then(response=> processing response)
     * dispatch ({type: "init" }) - get all comments from server, run once in hook useRequestData
     * dispatch ({type: "insert", payload: {idcomment: "id parent comment", comment: "string"} }) - insert comment
     * dispatch ({type: "delete", payload: {idcomment: "id comment"} }) - delete comment
     * dispatch ({type: "update", payload: {idcomment: "id comment", comment: "new string comment"} }) - update comment
     */
    dispatch: () => {},
    /**
     * Used to control the display of the comment dialog
     * const [currentComment, setCurrentComment] = React.useState(null);
     */
    currentComment: null,
    setCurrentComment: () => {},
} as any);
