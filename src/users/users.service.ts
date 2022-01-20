import { Injectable } from '@nestjs/common';

export interface UserApi {
  userId: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 'dsfsdfs-sadfsdf-sdfsdf',
      username: 'politecnico',
      password: 'pruebanestjs',
    },
  ];

  async findOne(username: string): Promise<UserApi | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
