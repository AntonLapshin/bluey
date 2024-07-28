import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
// import * as iam from "aws-cdk-lib/aws-iam";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { Duration } from "aws-cdk-lib";
import { createCognito } from "./createCognito";

export class BlueyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const envPath = path.join(__dirname, "..", "lambda", ".env");
    const envConfig = dotenv.parse(fs.readFileSync(envPath));

    if (!envConfig.ALLOWED_ORIGIN) {
      throw "No ALLOWED_ORIGIN is set";
    }

    const lambdaQuestion = new lambda.Function(this, "Bluey", {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "Question.handler",
      environment: {
        ...envConfig,
      },
    });

    const { userPool } = createCognito(this);

    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(
      this,
      "CognitoAuthorizer",
      {
        cognitoUserPools: [userPool],
      }
    );

    const api = new apigateway.LambdaRestApi(this, "BlueyApi", {
      handler: lambdaQuestion,
      cloudWatchRole: true,
      proxy: false,
      deployOptions: {
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
        metricsEnabled: true,
      },
      defaultCorsPreflightOptions: {
        // window.location.origin => no trailing slash is allowed
        allowOrigins: [envConfig.ALLOWED_ORIGIN],
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      },
      integrationOptions: {
        timeout: Duration.seconds(5),
      },
    });

    const audioResource = api.root.addResource("question");
    audioResource.addMethod(
      "POST",
      new apigateway.LambdaIntegration(lambdaQuestion),
      {
        authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
        requestParameters: {
          "method.request.header.Content-Type": true,
        },
        methodResponses: [
          {
            statusCode: "200",
            responseParameters: {
              "method.response.header.Access-Control-Allow-Origin": true,
              "method.response.header.Access-Control-Allow-Headers": true,
              "method.response.header.Access-Control-Allow-Methods": true,
            },
          },
        ],
      }
    );
  }
}
