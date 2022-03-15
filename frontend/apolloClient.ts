import { createAuthLink, AuthOptions } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client/core";
import { Auth } from "aws-amplify";
import awsConfig from "./aws-exports";

const url = awsConfig.Api.aws_appsync_graphqlEndpoint;
const region = awsConfig.Api.aws_appsync_region;
const auth: AuthOptions = {
  type: "AMAZON_COGNITO_USER_POOLS",
  jwtToken: async () =>
    (await Auth.currentSession()).getIdToken().getJwtToken(),
};

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
