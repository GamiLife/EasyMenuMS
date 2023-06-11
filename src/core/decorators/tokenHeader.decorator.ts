import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { HeaderAuthenticator } from "../helpers";
import { AuthenticationError } from "../exceptions";

interface IContext extends ExecutionContext {
	token: string
}

export const AuthorizationTokenHeader = createParamDecorator((key: boolean = false, context: IContext) => {

    const { headers } = context.switchToHttp().getRequest();
    const token = new HeaderAuthenticator(AuthenticationError).parseAuthenticationHeader(headers["authorization"]);

    if (key) {
        return {
            token,
            tokenId: headers["token-id"] ?? ""
        }
    }
	return token;

});
  