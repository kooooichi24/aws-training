# 05.
## 課題内容
[ここ](../README.md#05.)

## 手順
1. TypeScript 環境のボイラープレートを利用する
    ```bash
    $ git clone https://github.com/kooooichi24/node-ts-jest-eslint-prettier-boilerplate.git sls-rest-api
    $ npm i
    $ rm -rf .git
    ```
2. Serverless Framework に必要なファイルを設定する
    
    テンプレートから作成
    ```bash
    $ serverless create --template aws-nodejs --name aws-nodejs --path aws-nodejs
    ```

    `serverless.yml`, `handler.js`, `.npmignore` を移植
    ```bash
    $ cp serverless.yml handler.js .npmignore sls-rest-api
    ```

    必要なライブラリのインストール
    ```bash
    $ npm i -D serverless serverless-plugin-typescript serverless-prune-plugin
    $ npm i -D @types/aws-lambda
    ```
3. `serverless.yml` の設定

    **DynamoDB のテーブルを作成する設定を記述**
    
    パーティションキーのみ作成
    ```yml
    resources:
      Resources:
        TodoTable:
          Type: AWS::DynamoDB::Table
          Properties:
            TableName: ${self:provider.environment.DYNAMODB_TODO_TABLE}
            AttributeDefinitions:
              - AttributeName: id
                AttributeType: S
            KeySchema:
              - AttributeName: id
                KeyType: HASH
            BillingMode: PROVISIONED
            ProvisionedThroughput:
              ReadCapacityUnits: 1
              WriteCapacityUnits: 1
    ```

    **Lambda のエンドポイントの設定**
    ```yml
    functions:
      create-todo:
        handler: handler.createTodo
        events:
          - http:
              path: /api/v1/todo
              method: post
      get-all-todo:
        handler: handler.getAllTodo
        events:
          - http:
              path: /api/v1/todo
              method: get
    ```

    **IAM Role の設定**

    Lambda が DynamoDB を呼び出すための権限を付与してあげる
    ```yml
    provider:
      iam:
        role:
          statements:
            - Effect: Allow
              Action:
                - dynamodb:GetItem
                - dynamodb:PutItem
                - dynamodb:UpdateItem
                - dynamodb:DeleteItem
                - dynamodb:Scan
              Resource: arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TODO_TABLE}
    ```

4. 実装

    **DynamoDB のライブラリ(AWS SDK for JavaScript v3)をインストール**
    ```bash
    $ npm install @aws-sdk/client-dynamodb
    # Refference: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html
    ```
    あとは実装してください


## 疑問点
### 1. 
- Q: `serverless.yml` の Resource に記述する DynamoDB の定義は、キーだけで良いの？他のカラムのテーブル定義は？
- A: パーティションキーとソートキーのみでよい
    - [DynamoDBの定義をserverless.ymlに書いておくべきかどうか](https://scrapbox.io/sudow/DynamoDBの定義をserverless.ymlに書いておくべきかどうか)
    - [DynamoDBを初めて触ってハマったこと](https://suzuki-navi.hatenablog.com/entry/2020/12/25/143112)
        > AttributeDefinitions に書くのはパーティションキーとソートキーのみでよく、ほかは書いてはいけないというのが正解でした。テーブル作成時ではなく、レコード挿入時に自由にカラムを増やせます。
- Q: DynamoDB の GSI って何？
- A: DBのインデックスのこと。DynamoDBにはインデックスの種類に、GSIとローカルインデックスがあるみたい
    - [セカンダリインデックスを使用したデータアクセス性の向上](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/SecondaryIndexes.html)
    - [コンセプトから学ぶAmazon DynamoDB【GSI篇】](https://dev.classmethod.jp/articles/conceptual-learning-about-dynamodb-gsi/)
- Q: API Gateway の http と httpapi はどちらを選択すべき？
- A: REST API で良いのでは
    - [Amazon API Gatewayは「HTTP API」と「REST API」のどちらを選択すれば良いのか？ #reinvent](https://dev.classmethod.jp/articles/amazon-api-gateway-http-or-rest/)

## 参考記事
- [AWS Hands-on for Beginners 〜 Serverless 編 〜](https://pages.awscloud.com/event_JAPAN_Hands-on-for-Beginners-Serverless-2019_Contents.html)
- [aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)
- [API Gateway + Lambda + DynamoDB でサーバーレスな API 作成](https://zenn.dev/ombran/articles/serverless-apigateway-lambda-dynamodb#dynamodb-のテーブル作成)
- [Stripe API Reference](https://stripe.com/docs/api)

---


## 後で読む
https://zenn.dev/arei/scraps/47abc4f7052ff7
