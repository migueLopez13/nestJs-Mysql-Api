export declare class Contact {
    id: string;
    dni: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
    gender: string;
    address: string;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    constructor(id: string, dni: string, password: string, name: string, surname: string, phone: string, gender: string);
}
