import {
  UnmarshalledUser,
  User,
} from '@Modules/users/domain/entites/user.entity';

export class UserMapper {
  public static toDomain(raw: UnmarshalledUser): User {
    return User.create(raw);
  }
}
