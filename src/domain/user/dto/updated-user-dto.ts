import { CreateUserDto } from "src/domain/user/dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdatedUserDto extends PartialType(CreateUserDto) {

}
