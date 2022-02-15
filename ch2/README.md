## 第2章: Lambda
### 01. 「Hello, World!」を Lambda で実行する
- AWS Management Console で Lambda を作成して、Hello World を実現してください

### 02. 「Hello World!」を Lambda で構築する (Serverless Framework編)
- Serverless Framework で Hello World を実現してください

### 03. Lambda トリガーイベント
- S3 トリガーを使用して Lambda 関数を呼び出してください

### 04. Lambda から他の AWS サービスを呼び出す
- 成果物の要件を以下と定義します
  1. S3 Bucket A に uploads/*.jpg がアップロードされた時、Lambda が発火すること
  2. Lambda は S3 Bucket の uploads 配下のオブジェクトを全て取得して、S3 Bucket A に json 形式で保存できること
  3. Server Frameworkで動く状態になっていること

### 05. REST API
- API Gateway Lambda DynamoDB を利用して、RESTful な TODO アプリの API を作成してください。
- 成果物の要件を以下とします。
  1. TODO を作成できること
  2. TODO を取得できること

### 06. Serverless Offline編
- 05 をローカル環境で 再現してください

### 07. API Gateway
- メソッドリクエスト・統合リクエスト・統合レスポンス・メソッドレスポンス を説明してください
- 統合タイプを説明してください
- Lambda プロキシ統合・Lambda 非プロキシ統合を説明してください
### 08. Lambda Layer
- Lambda Layer を導入するメリットを教えてください
- Lambda Layer を導入してください

### 09. Lambdaが異常終了した際のアラート通知

### 10. Lambda × SQS

### 11. Amazon EventBridge (CloudWatch Events) でAWS Lambdaを使用する

DLQ SQS SNS
metrics
lambda layer
Batch
Step Function
RDS Proxy × RDS for PostgreSQL
Aurora Serverless v1 for PostgreSQL