import { Length } from "class-validator";

export class CreateDutyDto {
  @Length(1, 100)
  name: string;
}