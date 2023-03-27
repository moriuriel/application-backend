export type UnmarshalledCategory = {
  id?: string;
  name: string;
  ownerId: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Category {
  private readonly category: UnmarshalledCategory;

  public constructor(props: UnmarshalledCategory) {
    this.category = props;
  }

  public static create(props: UnmarshalledCategory) {
    if (props?.id) {
      const instance = new Category(props);

      return instance;
    }
    return null;
  }

  public get id(): string {
    return this.category.id;
  }

  public get ownerId(): string {
    return this.category.ownerId;
  }

  public get name(): string {
    return this.category.name;
  }

  public get createdAt(): Date {
    return this.category.createdAt;
  }

  public get updatedAt(): Date {
    return this.category.updatedAt;
  }

  public get isActive(): boolean {
    return this.category.isActive;
  }
}
