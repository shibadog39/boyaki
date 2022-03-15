const awsConfig = {
  // 公開されても問題ない情報であることを確認
  // ref: https://github.com/aws-amplify/amplify-js/issues/2495
  // TODO: 環境ごとに向き先を変える
  Auth: {
    region: "ap-northeast-1",
    userPoolId: "ap-northeast-1_eTpPLmm1r",
    userPoolWebClientId: "nii8ngd6v33au06b2q96k33sk",
  },
  Api: {
    aws_appsync_graphqlEndpoint:
      "https://tpzlkwfndffr5alzqxksq6d4ky.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    aws_appsync_region: "ap-northeast-1",
  },
};

export default awsConfig;
