import {
  User,
  UnmarshalledUser,
} from '@Modules/users/domain/entites/user.entity';

export type RawResult = Record<string, unknown>;

export class UserMapper {
  public static toDomain(raw: UnmarshalledUser): User {
    return User.create(raw);
  }
}
