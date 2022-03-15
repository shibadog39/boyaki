import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "boyaki-backend",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-appsync-plugin"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "stg",
    region: "ap-northeast-1",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    appSync: {
      name: "boyaki_${opt:stage, self:provider.stage}",
      authenticationType: "AMAZON_COGNITO_USER_POOLS",
      userPoolConfig: {
        awsRegion: "ap-northeast-1",
        defaultAction: "ALLOW",
        userPoolId: { Ref: "BoyakiUserPool" },
      },
      region: "ap-northeast-1",
      mappingTemplatesLocation: "resolvers",
      mappingTemplates: [
        {
          type: "User",
          field: "posts",
          dataSource: "posts_${opt:stage, self:provider.stage}",
        },
        {
          type: "Query",
          field: "listUser",
          dataSource: "users_${opt:stage, self:provider.stage}",
        },
        {
          type: "Query",
          field: "getUser",
          dataSource: "users_${opt:stage, self:provider.stage}",
        },
        {
          type: "Mutation",
          field: "createUser",
          dataSource: "users_${opt:stage, self:provider.stage}",
        },
        {
          type: "Post",
          field: "user",
          dataSource: "users_${opt:stage, self:provider.stage}",
        },
        {
          type: "Post",
          field: "likes",
          dataSource: "likes_${opt:stage, self:provider.stage}",
        },
        {
          type: "Post",
          field: "likes",
          dataSource: "likes_${opt:stage, self:provider.stage}",
        },
        {
          type: "Query",
          field: "listPost",
          dataSource: "posts_${opt:stage, self:provider.stage}",
        },
        {
          type: "Query",
          field: "listPostByUser",
          dataSource: "posts_${opt:stage, self:provider.stage}",
        },
        {
          type: "Query",
          field: "getPost",
          dataSource: "posts_${opt:stage, self:provider.stage}",
        },
        {
          type: "Mutation",
          field: "createPost",
          dataSource: "posts_${opt:stage, self:provider.stage}",
        },
        {
          type: "Query",
          field: "listLike",
          dataSource: "likes_${opt:stage, self:provider.stage}",
        },
        {
          type: "Mutation",
          field: "likePost",
          dataSource: "likes_${opt:stage, self:provider.stage}",
        },
        {
          type: "Mutation",
          field: "cancelLikePost",
          dataSource: "likes_${opt:stage, self:provider.stage}",
        },
      ],
      schema: [
        "schema/user.graphql",
        "schema/post.graphql",
        "schema/like.graphql",
      ],
      dataSources: [
        {
          type: "AMAZON_DYNAMODB",
          name: "users_${opt:stage, self:provider.stage}",
          description: "User Table",
          config: {
            tableName: "users_${opt:stage, self:provider.stage}",
            iamRoleStatements: [
              {
                Effect: "Allow",
                Action: ["dynamodb:*"],
                Resource: [
                  "arn:aws:dynamodb:${self:provider.region}:*:table/users_${opt:stage, self:provider.stage}",
                  "arn:aws:dynamodb:${self:provider.region}:*:table/users_${opt:stage, self:provider.stage}/*",
                ],
              },
            ],
          },
        },
        {
          type: "AMAZON_DYNAMODB",
          name: "posts_${opt:stage, self:provider.stage}",
          description: "Post Table",
          config: {
            tableName: "posts_${opt:stage, self:provider.stage}",
            iamRoleStatements: [
              {
                Effect: "Allow",
                Action: ["dynamodb:*"],
                Resource: [
                  "arn:aws:dynamodb:${self:provider.region}:*:table/posts_${opt:stage, self:provider.stage}",
                  "arn:aws:dynamodb:${self:provider.region}:*:table/posts_${opt:stage, self:provider.stage}/*",
                ],
              },
            ],
          },
        },
        {
          type: "AMAZON_DYNAMODB",
          name: "likes_${opt:stage, self:provider.stage}",
          description: "Like Table",
          config: {
            tableName: "likes_${opt:stage, self:provider.stage}",
            iamRoleStatements: [
              {
                Effect: "Allow",
                Action: ["dynamodb:*"],
                Resource: [
                  "arn:aws:dynamodb:${self:provider.region}:*:table/likes_${opt:stage, self:provider.stage}",
                  "arn:aws:dynamodb:${self:provider.region}:*:table/likes_${opt:stage, self:provider.stage}/*",
                ],
              },
            ],
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      BoyakiUserPool: {
        Type: "AWS::Cognito::UserPool",
        DeletionPolicy: "Retain",
        Properties: {
          UserPoolName: "BoyakiUserPool_${opt:stage, self:provider.stage}",
          AutoVerifiedAttributes: ["email"],
          Policies: {
            PasswordPolicy: { MinimumLength: 8 },
          },
          UsernameAttributes: ["email"],
          RecoveryMechanisms: [{ Name: "verified_email", Priority: 2 }],
        },
      },
      BoyakiUserPoolWebClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          ClientName:
            "BoyakiUserPoolWebClient_${opt:stage, self:provider.stage}",
          GenerateSecret: false,
          RefreshTokenValidity: 30,
          UserPoolId: { Ref: "BoyakiUserPool" },
        },
      },
      UserTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "users_${opt:stage, self:provider.stage}",
          KeySchema: [
            {
              AttributeName: "userId",
              KeyType: "HASH",
            },
          ],
          AttributeDefinitions: [
            {
              AttributeName: "userId",
              AttributeType: "S",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",
        },
      },
      PostTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "posts_${opt:stage, self:provider.stage}",
          KeySchema: [
            {
              AttributeName: "postId",
              KeyType: "HASH",
            },
          ],
          AttributeDefinitions: [
            {
              AttributeName: "postId",
              AttributeType: "S",
            },
            {
              AttributeName: "userId",
              AttributeType: "S",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",
          GlobalSecondaryIndexes: [
            {
              IndexName: "userId-index",
              KeySchema: [
                {
                  AttributeName: "userId",
                  KeyType: "HASH",
                },
                {
                  AttributeName: "postId",
                  KeyType: "RANGE",
                },
              ],
              Projection: { ProjectionType: "ALL" },
            },
          ],
        },
      },
      LikeTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "likes_${opt:stage, self:provider.stage}",
          KeySchema: [
            {
              AttributeName: "likeId",
              KeyType: "HASH",
            },
          ],
          AttributeDefinitions: [
            {
              AttributeName: "likeId",
              AttributeType: "S",
            },
            {
              AttributeName: "postId",
              AttributeType: "S",
            },
            {
              AttributeName: "userId",
              AttributeType: "S",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",
          GlobalSecondaryIndexes: [
            {
              IndexName: "userId-index",
              KeySchema: [
                {
                  AttributeName: "userId",
                  KeyType: "HASH",
                },
                {
                  AttributeName: "likeId",
                  KeyType: "RANGE",
                },
              ],
              Projection: { ProjectionType: "ALL" },
            },
            {
              IndexName: "postId-index",
              KeySchema: [
                {
                  AttributeName: "postId",
                  KeyType: "HASH",
                },
                {
                  AttributeName: "likeId",
                  KeyType: "RANGE",
                },
              ],
              Projection: { ProjectionType: "ALL" },
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
