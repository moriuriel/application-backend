export type UnmarshalledUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
};

export class User {
  private readonly user: UnmarshalledUser;

  public constructor(props: UnmarshalledUser) {
    this.user = props;
  }

  public static create(props: UnmarshalledUser) {
    if (props?.id) {
      const instance = new User(props);

      return instance;
    }
    return null;
  }

  public unmarshal(): UnmarshalledUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }

  public get id(): string {
    return this.user.id;
  }

  public get name(): string {
    return this.user.name;
  }

  public get email(): string {
    return this.user.email;
  }

  public get password(): string {
    return this.user.password;
  }

  public get createdAt(): string {
    return this.user.createdAt;
  }
  public get updatedAt(): string {
    return this.user.updatedAt;
  }
}
