import firebaseAdmin from 'firebase-admin';
import { Auth } from 'firebase-admin/lib/auth/auth';
import { loadFirebase } from './load-app';
import { EmptyError } from '../exceptions';

interface IExtraArguments {
    email_verified: boolean
    name: string
    email: string
}

interface IResponseToIdToken {
    kind: string
    idToken: string
    refreshToken: string
    expiresIn: string
    isNewUser: boolean
}

export class FirebaseCreateTokenTest {
    constructor(
        private readonly loadApp: boolean = loadFirebase(),
        private readonly auth: Auth = firebaseAdmin.auth(),
        public uid: string = "TestUserUid",
        public email_verified: boolean = true,
        private readonly testKey: string = process.env.FIREBASE_API_KEY_FOR_TEST,
        private readonly apiToIdToken: string = process.env.FIREBASE_API_TO_ID_TOKEN
    ) {
        if (!testKey) throw new Error("Unable to get testKey");
        if (!apiToIdToken) throw new Error("Unable to get apiToIdToken");
    }

    private extraArguments(): IExtraArguments {
        return {
            email_verified: this.email_verified,
            name: "Test Name",
            email: "test@test.ts"
        }
    }

    private async createCustomToken(): Promise<string> {
        return this.auth.createCustomToken(this.uid, this.extraArguments());
    }

    async removeCustomToken(): Promise<void> {
        return this.auth.deleteUser(this.uid)
    }

    async getIdToken(): Promise<IResponseToIdToken> {

        if (this.loadApp) {
            const token = await this.createCustomToken();
    
            return fetch(this.apiToIdToken + this.testKey, {
                method: "POST",
                body: JSON.stringify({
                    token,
                    returnSecureToken: true
                })
            }).then(response => response.json()).then(response => response);
        }

        throw new EmptyError("Failed to load Firebase App")
    }
}