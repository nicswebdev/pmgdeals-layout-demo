import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch(
                    "https://cms.pmgdeals.com/api/public/login",
                    {
                        method: "POST",
                        body: JSON.stringify(credentials),
                        headers: {"Content-Type": "application/json"},
                    }
                );
                const user = await res.json();

                // console.log("User Data: " + JSON.stringify(user));
                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user.memberData;
                }
                // Return null if user data could not be retrieved
                return null;
            },
        }),
        GoogleProvider({
            clientId:
                "774119745658-lbt5bbc05mf7nov32pcj5nksvt4aogto.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
    secret: "D4TnSIfP+AA1uUOlBo0OVOjqHuJjpYGlHnfve7/ZPPg=",
    pages: {
        signIn: "/login", // Custom sign-in page
    },
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            if (account.provider === "google") {
                // Call your API to store Google user data
                const res = await fetch(
                    "https://cms.pmgdeals.com/api/public/google",
                    {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            user: {
                                name: user.name,
                                email: user.email,
                                image: user.image,
                            },
                            account,
                            profile,
                        }),
                    }
                );

                if (!res.ok) {
                    console.error("API response error", await res.text());
                    throw new Error("Failed to save user data");
                }

                const data = await res.json();
                if (data.memberData) {
                    user.memberData = data.memberData; // Set memberData for Google users
                } else {
                    console.error("Member data not received from API");
                    throw new Error("Member data not found");
                }
            }
            // Handle other sign-in methods
            return true;
        },
        async jwt({token, user}) {
            // if (user) {
            //     token.user = user; // Add user to the JWT token
            // }

            if (user) {
                token.user = user; // Add user to the JWT token
                if (user.memberData) {
                    token.memberData = user.memberData; // Add memberData to the JWT
                }
            }

            return token;
        },
        async session({session, token}) {
            // session.user = token.user; // Use user info from the token

            if (token.user) {
                // Use user info from the token
                session.user = token.user;

                // Merge memberData properties into session.user
                if (token.memberData) {
                    session.user = {...session.user, ...token.memberData};
                }
            }

            return session;
        },
    },

    // Configure JWT, session, callbacks, etc. here if needed
});
