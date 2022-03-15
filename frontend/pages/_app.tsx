import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// 公開されても問題ない情報であることを確認
// ref: https://github.com/aws-amplify/amplify-js/issues/2495
// TODO: 環境ごとに向き先を変える
Amplify.configure({
  Auth: {
    region: "ap-northeast-1",
    userPoolId: "ap-northeast-1_eTpPLmm1r",
    userPoolWebClientId: "nii8ngd6v33au06b2q96k33sk",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <div>
            <h1>Hello {user.attributes?.email || user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </div>
          <Component {...pageProps} />
        </main>
      )}
    </Authenticator>
  );
}

export default MyApp;
