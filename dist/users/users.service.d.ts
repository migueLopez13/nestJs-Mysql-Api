export interface UserApi {
    userId: string;
    username: string;
    password: string;
}
export declare class UsersService {
    private readonly users;
    findOne(username: string): Promise<UserApi | undefined>;
}
