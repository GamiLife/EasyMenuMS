import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { IJwtTokens, IJwtVerify } from "../interfaces";
import { ARGON_HANDLER } from "../constants";

@Injectable()
export class JwtHandler {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(ARGON_HANDLER)
        private readonly argon: typeof argon2
    ){}

    private async create(sub: string, email?: string): Promise<string> {
        return this.jwtService.signAsync({
            sub,
            email
        });
    }

    async verifyHashKey(tokenId: string, refreshToken: string): Promise<boolean> {
        return this.argon.verify(tokenId, refreshToken)
    }

    async verifyKey(tokenId: string): Promise<IJwtVerify> {
        return this.jwtService.verifyAsync(tokenId)
    }

    private async createRefresh(sub: string, email: string ): Promise<string> {
        return await this.create(sub, email);
    }

    private async hashRefresh(token: string): Promise<string> {
        return this.argon.hash(token);
    }

    async getJwtTokens(sub: string, email: string): Promise<IJwtTokens> {

        const token = await this.create(sub);
        const refreshToken = await this.createRefresh(sub, email);
        const hashToken = await this.hashRefresh(refreshToken);

        const today = new Date();
        today.setTime(today.getTime() + this.timeToMiliseconds(process.env.TOKEN_EXPIRATION))
        const expiry = today;

        return {
            token,
            refreshToken,
            hashToken,
            expiry
        }
    }

    private timeToMiliseconds(time: string): number {
        let result: number;
        if (time.includes("h")) {
            result = parseInt(time) * 60 * 60;
        } else if (time.includes("m")) {
            result = parseInt(time) * 60;
        } else if (time.includes("d")) {
            result = parseInt(time) * 24 * 60 * 60;
        } else if (time.includes("a")) {
            result = parseInt(time) * 365 * 24 * 60 * 60;
        }
        return result;
    }

}