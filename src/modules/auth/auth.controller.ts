import { Controller, Headers, Post } from "@nestjs/common";
import { MESSAGE_RESPONSE_GET_USER } from "src/core/constants";
import { ResponseMessage, Transform } from "src/core/decorators";
import { CatchControl } from "src/core/exceptions";
import { UsersService } from "src/modules/users/users.service";

@Controller("auth")
export class AuthController {
    constructor(private userService: UsersService) {}

    @Transform('UserResponseDto')
    @ResponseMessage(MESSAGE_RESPONSE_GET_USER)
    @Post()
    async findByToken(@Headers("Authorization") IdToken: string) {
        try {
            const userDomain = await this.userService.findOneByIdToken(IdToken);
            return { finalResponse: userDomain };
        } catch (error) {
            CatchControl(error);
        }
    }
}
