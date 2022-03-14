# Boyaki Backend
[serverless-appsync-plugin](https://github.com/sid88in/serverless-appsync-plugin)を用いて構築

## Deployment
以下のようにGithub Actionsで設定
- mainブランチにpush -> production環境へデプロイ
- stagingブランチにpush -> staging環境へデプロイ

## Architectue
<img src="https://user-images.githubusercontent.com/26875412/157812343-9d465204-3c59-4066-b170-ed236a35ef53.jpg" width="60%" />

## Project structure
```
.
├── resolvers                   # Connectors between GraphQl and a data source.
|                                 They tell AWS AppSync how to translate an incoming GraphQL request into instructions for your backend data source,
|                                 and how to translate the response from that data source back into a GraphQL response.
├── schema                      # Graphql schema files
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```


