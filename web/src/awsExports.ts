import CdkOutputs from "./cdk-outputs.json";

export const awsExports = {
  Auth: {
    Cognito: {
      userPoolId: CdkOutputs.BlueyStack.UserPoolId,
      userPoolClientId: CdkOutputs.BlueyStack.UserPoolClientId,
      identityPoolId: CdkOutputs.BlueyStack.IdentityPoolId,
      loginWith: {
        oauth: {
          domain: CdkOutputs.BlueyStack.UserPoolDomain,
          scopes: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
          redirectSignIn: [
            CdkOutputs.BlueyStack.WebOriginLocal,
            CdkOutputs.BlueyStack.WebOrigin,
          ],
          redirectSignOut: [
            CdkOutputs.BlueyStack.WebOriginLocal,
            CdkOutputs.BlueyStack.WebOrigin,
          ],
          responseType: "code", // or 'token' for implicit flow
        },
      },
    },
  },
  API: {
    REST: {
      Bluey: {
        endpoint: CdkOutputs.BlueyStack.BlueyApiEndpoint009590E6,
        region: CdkOutputs.BlueyStack.Region,
      },
    },
  },
};
