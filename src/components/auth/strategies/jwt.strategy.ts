import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from "src/config/envs";
import { UserService } from "src/components/user/user.service";


export interface JWTI {
    email: string;
    name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: envs.jwt.secret
        })
    }

    async validate(payload: JWTI) {
        const { email } = payload;
        const user = await this.userService.findByEmail(email);
        delete user.password;
        if (!user) {
            throw new UnauthorizedException('Unauthorized');
        }

        return user;
    }

}

