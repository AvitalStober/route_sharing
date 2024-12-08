import IUser from "../types/users";

export const checkValidation = (user: IUser): boolean => {
    if (user.age !== undefined && user.address !== undefined && user.address.trim() !== "") {
        return true;
    }
    return false;
};