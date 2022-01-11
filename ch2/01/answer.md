# 01.
## 課題内容
[ここ](../README.md#01.)

## 手順
1. [関数の（土台）作成](https://qiita.com/zaburo/items/d31c1cb2055143991dfb#%E9%96%A2%E6%95%B0%E3%81%AE%E5%9C%9F%E5%8F%B0%E4%BD%9C%E6%88%90)
2. 関数のテスト実行
    ```bash
    # Exucution results
    Test Event Name
    test

    Response
    {
      "statusCode": 200,
      "body": "\"Hello from Lambda!\""
    }

    Function Logs
    START RequestId: 27d7eea5-1857-46cf-9fda-3cc29fbdf7a2 Version: $LATEST
    END RequestId: 27d7eea5-1857-46cf-9fda-3cc29fbdf7a2
    REPORT RequestId: 27d7eea5-1857-46cf-9fda-3cc29fbdf7a2	Duration: 2.10 ms	Billed Duration: 3 ms	Memory Size: 128 MB	Max Memory Used: 56 MB	Init Duration: 164.18 ms

    Request ID
    27d7eea5-1857-46cf-9fda-3cc29fbdf7a2
    ```
3. [動作ログの確認](https://qiita.com/zaburo/items/d31c1cb2055143991dfb#%E5%8B%95%E4%BD%9C%E3%83%AD%E3%82%B0%E3%81%AE%E7%A2%BA%E8%AA%8D)

## 疑問点
### 1. event
- Q: Lambdaハンドラのeventとは？
- A: イベントソースから渡されるデータのこと
    - [AWS Lambdaメモ -ハンドラの引数eventの中身-](https://tk5-21.hatenablog.com/entry/2018/01/12/003751) に書いてあった
    - > Lambda関数は何かをキッカケにして呼び出されるので、必ず呼び出し元が存在します。呼び出し元の例で言えば API Gateway であったり、DynamoDB であったり。 （Lambdaでは、これらの呼び出し元を イベントソース と呼んでいるようです）
### 2. test event
- Q: テストイベントとは？
- A: テストイベントは、Lambdaハンドラのeventの仮想的なもの
    - [テストイベントとeventの関係](https://fukatsu.tech/aws-lambda#event)

## 参考記事
- [「Hello, World!」をサーバーレスで実行する](https://aws.amazon.com/jp/getting-started/hands-on/run-serverless-code/)
- [AWSのLambdaの動作をHelloWorldで理解する](https://qiita.com/zaburo/items/d31c1cb2055143991dfb)