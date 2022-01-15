# 02.
## 課題内容
[ここ](../README.md#02.)

## 手順
1. a
    ```bash
    $ npm install -g serverless

    $ serverless --version
    Framework Core: 2.71.0
    Plugin: 5.5.3
    SDK: 4.3.0
    Components: 3.18.1

    $ serverless create --template aws-nodejs --name sls-lambda-hello-world --path sls-lambda-hello-world
    Serverless: Generating boilerplate...
    Serverless: Generating boilerplate in "/Users/furukawakoichi/git/aws-training/ch2/02/sls-lambda-hello-world"
    Serverless: Successfully generated boilerplate for template: "aws-nodejs"

    $ sls deploy
    $ sls invoke -f hello
    {
        "statusCode": 200,
        "body": "{\n  \"message\": \"Go Serverless v1.0! Your function executed successfully!\",\n  \"input\": {}\n}"
    }
    $ serverless remove --verbose
    ```

## 疑問点
### 1. aws-nodejs or aws-nodejs-typescript?
- Q: ServerlessFrameworkのTypeScriptテンプレート、複雑すぎない？
- A: aws-nodejs + serverless-plugin-typescript を採用する
  - [（訂正あり） Serverless Framework で TypeScript を使うときは、aws-nodejs-typescript を使わずに serverless-plugin-typescript を使おう](https://team-6.hatenablog.jp/entry/2021/02/14/210839)

### 2. ブラックボックスすぎて、裏側で何やってるか分からん、、
- Q1: そもそも、project構成どうなってるの？
- A1: `sls create --template aws-nodejs ...` の場合は下記が生成される
  - ``
    ```
    .
    ├── handler.js
    └── serverless.yml
    ```
  - handler.js
    -ファンクションを定義するためのファイル
  - serverless.yml
    - 各サービス全体の設定を行うためのファイル
    - providerにどのクラウドを利用するか
    - Lambda関数の設定
    - などなど

- Q2: serverless.yml の設定ファイルの詳細は？
- A2: 
  - この資料とプロダクトコード見たら、掴めました
    - [serverless.ymlを一行一行、見ていくしかないんや](https://zenn.dev/han_aru/articles/aabac861bc519d1220a5)
  - Provider AWS の公式リファレンス
    - [Serverless.yml Reference](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml)
  - ちなみに、serverless.ymlは分割できるらしい
    - [Serverless Frameworkのserverless.ymlが長くなってきたので外部ファイルから読み込むようにしてみる](https://dev.classmethod.jp/articles/serverless-yml-read-external-file/)

- Q3: `sls deploy` は内部的にどんな処理をしている？
- A3:
  - > 内部的には、CloudFormationのスタックを作成し、それに基づいてIAMやLambda等の設定が行われています。
    - [今から始めるServerless Frameworkで簡単Lambda開発環境の構築](https://dev.classmethod.jp/articles/easy-deploy-of-lambda-with-serverless-framework/)
  - `sls deploy -v`で確認できる
    ```sh
    $ sls deploy -v
    Serverless: Packaging service...
    Serverless: Excluding development dependencies...
    Serverless: Creating Stack...
    Serverless: Checking Stack create progress...
    CloudFormation - CREATE_IN_PROGRESS - AWS::CloudFormation::Stack - sls-lambda-hello-world-dev
    CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
    CloudFormation - CREATE_IN_PROGRESS - AWS::S3::Bucket - ServerlessDeploymentBucket
    CloudFormation - CREATE_COMPLETE - AWS::S3::Bucket - ServerlessDeploymentBucket
    CloudFormation - CREATE_IN_PROGRESS - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
    CloudFormation - CREATE_IN_PROGRESS - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
    CloudFormation - CREATE_COMPLETE - AWS::S3::BucketPolicy - ServerlessDeploymentBucketPolicy
    CloudFormation - CREATE_COMPLETE - AWS::CloudFormation::Stack - sls-lambda-hello-world-dev
    Serverless: Stack create finished...
    Serverless: Ensuring that deployment bucket exists
    Serverless: Uploading CloudFormation file to S3...
    Serverless: Uploading artifacts...
    Serverless: Uploading service sls-lambda-hello-world.zip file to S3 (567 B)...
    Serverless: Validating template...
    Serverless: Updating Stack...
    Serverless: Checking Stack update progress...
    CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - sls-lambda-hello-world-dev
    CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - HelloLogGroup
    CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
    CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
    CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - HelloLogGroup
    CloudFormation - CREATE_COMPLETE - AWS::Logs::LogGroup - HelloLogGroup
    CloudFormation - CREATE_COMPLETE - AWS::IAM::Role - IamRoleLambdaExecution
    CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
    CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Function - HelloLambdaFunction
    CloudFormation - CREATE_COMPLETE - AWS::Lambda::Function - HelloLambdaFunction
    CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersionEP1Ji8RR8AQw8PZ95IgwRu1SLoi1lcOGH11SshtYxI
    CloudFormation - CREATE_IN_PROGRESS - AWS::Lambda::Version - HelloLambdaVersionEP1Ji8RR8AQw8PZ95IgwRu1SLoi1lcOGH11SshtYxI
    CloudFormation - CREATE_COMPLETE - AWS::Lambda::Version - HelloLambdaVersionEP1Ji8RR8AQw8PZ95IgwRu1SLoi1lcOGH11SshtYxI
    CloudFormation - UPDATE_COMPLETE_CLEANUP_IN_PROGRESS - AWS::CloudFormation::Stack - sls-lambda-hello-world-dev
    CloudFormation - UPDATE_COMPLETE - AWS::CloudFormation::Stack - sls-lambda-hello-world-dev
    Serverless: Stack update finished...
    Service Information
    service: sls-lambda-hello-world
    stage: dev
    region: us-east-1
    stack: sls-lambda-hello-world-dev
    resources: 6
    api keys:
      None
    endpoints:
    functions:
      hello: sls-lambda-hello-world-dev-hello
    layers:
      None

    Stack Outputs
    HelloLambdaFunctionQualifiedArn: arn:aws:lambda:us-east-1:472995540411:function:sls-lambda-hello-world-dev-hello:2
    ServerlessDeploymentBucketName: sls-lambda-hello-world-d-serverlessdeploymentbuck-dh42h76ur1k
    ```

- Q4: `sls deploy` で生成された `.serverless/*` をプロダクトコードで見たことないんだけど、、、
- A4: 
  - 業務のローカル環境では`serverless-offline`を利用している
  - `serverless-offline`環境では、`.serverless/*`が生成されないのでは
  - そもそも実行しているコマンドが、`sls offline --stage local start`だった。`sls deploy`ではない。
  - dev環境以上は、CodePipelineやCodeBuildで実行しているため、CodeBuild上に`.serverless/*`が生成されているのでは？

## 参考記事
- [Get started with Serverless Framework Open Source & AWS](https://www.serverless.com/framework/docs/getting-started/)
- [Serverless Frameworkの使い方まとめ](https://serverless.co.jp/blog/25/)
- [とことんサーバーレス①：Serverless Framework入門編](https://qiita.com/hiroshik1985/items/6d979ff1afb56953b62e)
- [今から始めるServerless Frameworkで簡単Lambda開発環境の構築](https://dev.classmethod.jp/articles/easy-deploy-of-lambda-with-serverless-framework/)