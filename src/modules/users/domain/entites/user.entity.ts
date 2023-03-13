export type UnmarshalledUser = {
  id?: string;
  name: string;
  email: string;
  isConfirmed: boolean;
  isActive: boolean;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
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
      isConfirmed: this.isConfirmed,
      isActive: this.isActive,
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

  public get createdAt(): Date {
    return this.user.createdAt;
  }

  public get updatedAt(): Date {
    return this.user.updatedAt;
  }

  public get isActive(): boolean {
    return this.user.isActive;
  }

  public get isConfirmed(): boolean {
    return this.user.isConfirmed;
  }
}
