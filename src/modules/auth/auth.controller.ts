import { Controller, Delete, HttpCode, HttpStatus, Post, Put } from "@nestjs/common";
import { MESSAGE_RESPONSE_GET_USER } from "src/core/constants";
import { IsJwtTokens, ResponseMessage, Transform } from "src/core/decorators";
import { IsPublic } from "src/core/decorators";
import { CatchControl } from "src/core/exceptions";
import { AuthService } from "./auth.service";
import { AuthorizationTokenHeader } from "src/core/decorators";


@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @Transform('UserResponseDto')
    @ResponseMessage(MESSAGE_RESPONSE_GET_USER)
    @IsPublic()
    @IsJwtTokens()
    @Post()
    async findByToken(@AuthorizationTokenHeader() firebaseToken: string) {
        try {
            const userDomain = await this.authService.findOneByIdToken(firebaseToken);
            return { finalResponse: userDomain };
        } catch (error) {
            console.log(error)
            CatchControl(error);
        }
    }
    
    @Transform('AuthResponseDto')
    @IsPublic()
    @ResponseMessage(MESSAGE_RESPONSE_GET_USER)
    @IsJwtTokens()
    @Put()
    async updateToken(@AuthorizationTokenHeader(true) {token, tokenId}: {token: string, tokenId: string}) {
        try {
            const userDomain = await this.authService.updateToken(token, tokenId);
            return { finalResponse: userDomain };
        } catch (error) {
            CatchControl(error);
        }
    }
    
    @IsPublic()
    @HttpCode(204)
    @Delete()
    async logOut(@AuthorizationTokenHeader() key: string) {
        try {
            return await this.authService.destroyKey(key);
        } catch (error) {
            CatchControl(error);
        }
    }
    
    @IsPublic()
    @HttpCode(204)
    @Delete("/all")
    async logOutAll(@AuthorizationTokenHeader() key: string) {
        try {
            return await this.authService.destroyAllKeys(key);
        } catch (error) {
            CatchControl(error);
        }
    }
    
}
