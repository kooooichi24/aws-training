## 第2章: Lambda
### 01. 「Hello, World!」を Lambda で実行する
### 02. 「Hello World!」を Lambda で構築する (Serverless Framework編)
### 03. Lambda トリガーイベント
S3 トリガーを使用して Lambda 関数を呼び出してください

### 04. Lambda から他の AWS サービスを呼び出す
> 成果物の要件を以下と定義します。
> 1. Lambda Function 1の挙動
>     - 実行したらHelloWorldを出力
>     - S3にhello.jsonをアップロード
> 2. Lambda Function 2の挙動
>     - S3からhello.jsonを読み込み
>     - hello.jsonの中身を出力
> 3. Server Frameworkで動く状態になっていること

[Serverless Frameworkで複数のLambdaの管理を楽にする](https://service.plan-b.co.jp/blog/tech/30863/)


[チュートリアル: Amazon S3 トリガーを使用してサムネイル画像を作成する](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-s3-tutorial.html) を Serverless Framework で動く状態にせよ

### 05. REST API
### 04. Amazon EventBridge (CloudWatch Events) でAWS Lambdaを使用する
### 05. Lambdaが異常終了した際のアラート通知
### SQS