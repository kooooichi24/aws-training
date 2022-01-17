## 第2章: Lambda
### 01. 「Hello, World!」を Lambda で実行する
AWS Management Console で Lambda を作成して、Hello World を実現してください

### 02. 「Hello World!」を Lambda で構築する (Serverless Framework編)
Serverless Framework で Hello World を実現してください

### 03. Lambda トリガーイベント
S3 トリガーを使用して Lambda 関数を呼び出してください

### 04. Lambda から他の AWS サービスを呼び出す
成果物の要件を以下と定義します
1. S3 Bucket A に uploads/*.jpg がアップロードされた時、Lambda が発火すること
2. Lambda は S3 Bucket の uploads 配下のオブジェクトを全て取得して、S3 Bucket A に json 形式で保存できること
3. Server Frameworkで動く状態になっていること

### 05. Serverless Offline編
04 をローカル環境で TypeScript で再現してください

### 05. REST API
### 04. Amazon EventBridge (CloudWatch Events) でAWS Lambdaを使用する
### 05. Lambdaが異常終了した際のアラート通知
### SQS