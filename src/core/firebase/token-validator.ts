import { auth } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { EmptyError } from "../exceptions";
import { HttpStatus } from "@nestjs/common";
import { loadFirebase } from "./load-app";

interface IDecodeIdToken extends DecodedIdToken {
    name?: string
    displayName?: string
}

export const FirebaseTokenValidator = async (token: string): Promise<IDecodeIdToken> => {

    if (loadFirebase()) {
        return auth().verifyIdToken(token).catch((error) => {
            throw new EmptyError("Decoding Firebase ID token failed", HttpStatus.FORBIDDEN)
        })  
    }

    throw new EmptyError("Unable to load FIrebase", HttpStatus.INTERNAL_SERVER_ERROR)
}