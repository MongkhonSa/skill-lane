import {
  IsString,
  IsInt,
  IsEnum,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

enum GenderEnum {
  'MALE',
  'FEMALE',
}
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  nickName: string;

  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @IsEnum(GenderEnum)
  @IsNotEmpty()
  gender: string;
}
