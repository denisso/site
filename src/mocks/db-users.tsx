const users: UsersType = {
    guest: {
        name: "Ghost",
        email: "guest@guestmail.com",
        picture: "guest"
    },
};

export type UsersType = {
    [id: string]: {
        email?: string;
        name?: string;
        picture?: string;
    };
};

export { users };
