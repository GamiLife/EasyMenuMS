export abstract class Entity<T> {
  protected readonly _id: number;
  public readonly props: T;

  constructor(props: T, id?: number) {
    if (id) this._id = id;
    this.props = props;
  }

  get id() {
    return this._id;
  }
}
