import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsConfig from "../aws-exports";
import client from "../apolloClient";
import { ApolloProvider } from "@apollo/client";

Amplify.configure({ Auth: awsConfig.Auth });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <ApolloProvider client={client}>
          <main>
            <div>
              <h1>Hello {user.attributes?.email || user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </div>
            <Component {...pageProps} />
          </main>
        </ApolloProvider>
      )}
    </Authenticator>
  );
}

export default MyApp;
