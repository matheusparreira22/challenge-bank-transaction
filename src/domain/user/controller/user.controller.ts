import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "src/domain/user/usecase/create-user.service";
import { CreateUserDto } from "src/domain/user/dto";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post()
    async create(@Body() dto: CreateUserDto) {
      return   this.userService.create(dto)
    }
}