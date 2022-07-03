/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

const users: UsersType = {
    guest: {
        name: "Ghost",
        email: "guest@guestmail.com",
        picture: "/asset/guest.svg"
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
