import { createAuthClient } from "better-auth/react";

// auth server runs on the same domain as Next.js app,
// don't need to specify baseURL
export const authClient = createAuthClient();

export const {
    signIn,
    signUp, 
    signOut,
    useSession,
    getSession,
} = authClient;