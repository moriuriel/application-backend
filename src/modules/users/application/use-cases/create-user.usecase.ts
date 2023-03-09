type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

export interface ICreateUserUseCase {
  execute(input: CreateUserInput): Promise<CreateUserInput>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  public async execute(input: CreateUserInput): Promise<CreateUserInput> {
    return input;
  }
}
