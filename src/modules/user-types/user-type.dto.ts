export class UserTypeCreateDto {
  readonly name: string;
  readonly description: string;
}

export class UserTypeUpdateDto {
  readonly name: string;
  readonly description: string;
}

export class UserTypeResponseDto {
  readonly id?: number;
  readonly name: string;
  readonly description: string;
}
