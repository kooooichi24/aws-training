# 06.
## 課題内容
[ここ](../README.md#06.)

## 手順
1. 05 の続きから始める
2. ローカルで実行するためのライブラリをインストール
    
    ```bash
    $ npm i -D serverless-offline serverless-dynamodb-local
    ```

3. `serverless.yml` の設定

    **プラグインの設定追加**
    ```diff
    plugins:
      - serverless-prune-plugin
      - serverless-plugin-typescript
    + - serverless-dynamodb-local
    + - serverless-offline
    ```

4. DynamoDB ローカルのセットアップ手法の選定

    「DynamoDB Localをインストールする手法」と「Dockerで設定する手法」の2通り存在する

    [公式 (serverless-dynamodb-local)](https://www.serverless.com/plugins/serverless-dynamodb-local) には、「DynamoDB Localをインストールする手法」が紹介されていたが、M1 Mac だとローカルでDynamoDBが起動できなかったので、[Dynamodb local setup on M1 apple silicon mac](https://stackoverflow.com/questions/66635424/dynamodb-local-setup-on-m1-apple-silicon-mac#:~:text=interestingly%20the%20docker%20image%20is%20working%20fine%20for%20me%20using%20the%20docker%20preview%20version%2C%20eg%20by%20using%20the%20docker%20compose%20file%20from%20deploying%20dynamodb%20locally%20on%20your%20computer%20(on%20the%20docker%20tab).)を参考にして、Dockerの手法を採用した。

5. DynamoDB ローカルの設定

    **docker-compose.yml**

    [コンピュータ上で DynamoDB をローカルでデプロイする](https://docs.aws.amazon.com/ja_jp/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html) を参考に、`docker-compose.yml` を作成

    ```yml
    version: "3.8"
    services:
      dynamodb-local:
        command: ["-jar", "DynamoDBLocal.jar", "-sharedDb", "-inMemory"]
        image: "amazon/dynamodb-local:latest"
        container_name: dynamodb-local
        ports:
          - "8000:8000"
        # volumes:
        #   - "./dynamodb:/home/dynamodblocal/data"
        working_dir: /home/dynamodblocal
    ```

    **serverless.yml**

    ```yml
    custom:
    dynamodb:
      stages:
        - local
      start:
        port: 8000
        migrate: true
        noStart: true # Dockerで起動したローカルのDynamoDBを利用したい
    ```

6. 実装

    **向き先をローカルの設定に変更**

    ※ 本当は、インフラ層に DynamoDBClient クラスを作成して、コンストラクター内で環境ごとに config 情報を切り替えた方が良い
    
    ```diff
    const client = new DynamoDBClient({
    - region: "ap-northeast-1",
    + region: "localhost",
    + endpoint: "http://localhost:8000",
    });
    ```

  7. 動作確認

      **ローカル実行**
      ```bash
      $ npm run deploy:local
      ```

      **POST**
      ```bash
      $ curl -X POST -H "Content-Type: application/json" -d '{"todoTitle": "dynamodb-local-docker", "createdBy": "furukawa"}' -i http://localhost:3000/local/api/v1/todo

      TTP/1.1 200 OK
      content-type: application/json; charset=utf-8
      cache-control: no-cache
      content-length: 1761
      vary: accept-encoding
      Date: Fri, 11 Feb 2022 07:43:29 GMT
      Connection: keep-alive
      Keep-Alive: timeout=5

      {"message":"Go Serverless v1.0! Your function executed successfully!","input":{"body":"{\"todoTitle\": \"serverless1\", \"createdBy\": \"furukawa\"}","headers":{"Host":"localhost:3000","User-Agent":"curl/7.77.0","Accept":"*/*","Content-Type":"application/json","Content-Length":"53"},"httpMethod":"POST","isBase64Encoded":false,"multiValueHeaders":{"Host":["localhost:3000"],"User-Agent":["curl/7.77.0"],"Accept":["*/*"],"Content-Type":["application/json"],"Content-Length":["53"]},"multiValueQueryStringParameters":null,"path":"/api/v1/todo","pathParameters":null,"queryStringParameters":null,"requestContext":{"accountId":"offlineContext_accountId","apiId":"offlineContext_apiId","authorizer":{"principalId":"offlineContext_authorizer_principalId"},"domainName":"offlineContext_domainName","domainPrefix":"offlineContext_domainPrefix","extendedRequestId":"ckzi3s71o000cxysqhs1o2urv","httpMethod":"POST","identity":{"accessKey":null,"accountId":"offlineContext_accountId","apiKey":"offlineContext_apiKey","apiKeyId":"offlineContext_apiKeyId","caller":"offlineContext_caller","cognitoAuthenticationProvider":"offlineContext_cognitoAuthenticationProvider","cognitoAuthenticationType":"offlineContext_cognitoAuthenticationType","cognitoIdentityId":"offlineContext_cognitoIdentityId","cognitoIdentityPoolId":"offlineContext_cognitoIdentityPoolId","principalOrgId":null,"sourceIp":"127.0.0.1","user":"offlineContext_user","userAgent":"curl/7.77.0","userArn":"offlineContext_userArn"},"path":"/api/v1/todo","protocol":"HTTP/1.1","requestId":"ckzi3s71o000dxysqc1tw1arw","requestTime":"11/Feb/2022:16:43:29 +0900","requestTimeEpoch":1644565409194,"resourceId":"offlineContext_resourceId","resourcePath":"/local/api/v1/todo","stage":"local"},"resource":"/api/v1/todo"}}% 
      ```

      **GET**
      ```bash
      $ curl -X GET -i http://localhost:3000/local/api/v1/todo

      HTTP/1.1 200 OK
      content-type: application/json; charset=utf-8
      cache-control: no-cache
      content-length: 876
      accept-ranges: bytes
      Date: Fri, 11 Feb 2022 07:48:59 GMT
      Connection: keep-alive
      Keep-Alive: timeout=5

      {"todos":[{"checked":{"BOOL":false},"createdAt":{"S":"2022-02-11 16:42:35"},"id":{"S":"be8be5df-fb02-480e-8ce6-fe0cc5d3ec3e"},"title":{"S":"serverless"},"createdBy":{"S":"furukawa"},"updatedAt":{"S":"2022-02-11 16:42:35"}}]}
      ```

## 疑問点
### 1. DynamoDB ローカルをGUIで確認したい
- Q: `http://localhost:8000/shell` にアクセスして、DynamoDBローカルをGUIで確認したいんだけど、できない
- A: 非推奨になったので、できないらしい
    - ここら辺でローカルの確認方法があった
      - [DynamoDB勉強する](https://zenn.dev/kawarimidoll/scraps/696d862cbbaced)
      - [Serverless Frameworkの開発でDynamoDB Localを使う](https://tech-broccoli.life/articles/engineer/sls-with-dymano-db/#dynamodb-localの確認・操作を簡単にするdynamodb-adminについて)
    - だけど、非推奨になったみたい
      - [Dynamodb local web shell does not load](https://stackoverflow.com/questions/70535330/dynamodb-local-web-shell-does-not-load#:~:text=dynamodb%20local%20web%20shell%20was%20deprecated%20with%20version%201.16.x%20and%20is%20not%20available%20any%20longer%20from%201.17.x%20to%20latest.%20there%20are%20no%20immediate%20plans%20for%20a%20new%20web%20shell%20to%20be%20introduced.)
        > DynamoDB Local Web Shell was deprecated with version 1.16.X and is not available any longer from 1.17.X to latest. There are no immediate plans for a new Web Shell to be introduced.
        
        2022/02/11現在、Dockerのイメージは`1.18.0`だった

## 参考記事
- [serverless-dynamodb-local](https://www.npmjs.com/package/serverless-dynamodb-local)
- [amazon/dynamodb-local](https://hub.docker.com/r/amazon/dynamodb-local/tags)
- [DynamoDB local のあれこれ](https://developers.freee.co.jp/entry/dynamodb-local)
