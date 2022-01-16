# 03.
## 課題内容
[ここ](../README.md#03.)

## 手順
1. [チュートリアル: Amazon S3 トリガーを使用して Lambda 関数を呼び出す](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-s3-example.html) を実施
    
    Managed Console で Lambda のイベントトリガーの感覚を掴む

2. [チュートリアル: Amazon S3 トリガーを使用してサムネイル画像を作成する](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-s3-tutorial.html) を実施
    - [成果物はここ](./lambda-s3)
    - AWS CLI で Lambda のイベントトリガーの感覚を掴む
    - 落とし穴
      - ローカル環境の Node.js バージョンが関数の Node.js バージョンと一致させておくこと
        - [ここ](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-s3-tutorial.html#:~:text=linux%20%E7%92%B0%E5%A2%83%E3%81%A6%E3%82%99%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%88%E3%82%99%E3%83%A9%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%9F%E3%83%8A%E3%83%AB%E3%81%BE%E3%81%9F%E3%81%AF%E3%82%B7%E3%82%A7%E3%83%AB%E3%82%92%E9%96%8B%E3%81%8D%E3%81%BE%E3%81%99%E3%80%82%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%AB%E7%92%B0%E5%A2%83%E3%81%AE%20node.js%20%E3%83%8F%E3%82%99%E3%83%BC%E3%82%B7%E3%82%99%E3%83%A7%E3%83%B3%E3%81%8B%E3%82%99%E9%96%A2%E6%95%B0%E3%81%AE%20node.js%20%E3%83%8F%E3%82%99%E3%83%BC%E3%82%B7%E3%82%99%E3%83%A7%E3%83%B3%E3%81%A8%E4%B8%80%E8%87%B4%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%93%E3%81%A8%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%97%E3%81%BE%E3%81%99%E3%80%82)
      - `npm install sharp` ではなくて `npm install --arch=x64 --platform=linux sharp` を実行すること
        - [AWS Lambda(Node.js)にsharp(Native Module)をデプロイする方法](https://dev.classmethod.jp/articles/how-to-deploy-with-native-module/)
      - AWS CLI バージョン 2 を利用している場合、`aws lambda create-function` と `aws lambda invoke` を実行時に、 `--cli-binary-format raw-in-base64-out` も付けること
        - ```sh
          $ aws lambda invoke --function-name CreateThumbnail \ 
          --invocation-type Event \                           
          --payload file://inputFile.txt outputfile.txt \ 
          --cli-binary-format raw-in-base64-out # <-- これ
          ```
      - 謎にハマってしまって時間を溶かしてしまった、、、

3. ServerlessFramework で実現
    - イベントを検知して、Lambda関数を実行する
    - [成果物はここ](./sls-lambda-event-trigger)

## 疑問点
### 1. S3 Bucket Name
- Q: S3 Bucket名を変更せずに `sls deploy` と `sls remove` を繰り返しても、エラーにならないのはなんでだ？ S3 バケット名はグローバルで一意でなければならないのに、、、
- A: ただの勘違い
  - 存在しているS3 Bucketと名前衝突してはいけないだけ、
  - `sls remove` で S3 Bucket を削除しているので、同名で作成しても問題なし

### 2. Serverless Framework × IAM Role
- Q1: `serverless.yml` に iam の設定記述していないのに、なぜ Lambda が S3 Event を検知したり、CloudWatch にログを出力できるんだ？
- A1:
  - Serverless Framework に設定した IAM ロールが `AdministratorAccess` 権限を持っていたから
    - [AWS：Serverless Framework における IAM ロールの設定](https://pyteyon.hatenablog.com/entry/2019/08/08/224047)
    - > デフォルトでは、LambdaファンクションはCloudWatchログの作成と書き込みの権限を持っています (DeepL翻訳)
      - [IAM / Serverless Framework - Documentation](https://www.serverless.com/framework/docs/providers/aws/guide/iam/#:~:text=%20also%20by%20default%2C%20your%20lambda%20functions%20have%20permission%20to%20create%20and%20write%20to%20cloudwatch%20logs.)
    - `sls deploy` すると、ポリシーステートメントが自動で Lambda に付与されてる
      - Action: `lambda:InvokeFunction`
      - Effect: `Allow`
      - Conditions: 
        ```json
        {
          "StringEquals": {
            "AWS:SourceAccount": "472995540411"
          },
          "ArnLike": {
            "AWS:SourceArn": "arn:aws:s3:::lambda-event-trigger-source-1"
          }
        }
        ```

- Q2: sls に設定した IAM User の権限は、sls の function roles にも権限が反映されている？
- A2: 動きだけみると、反映されていないっぽい、
  - lambda の policy を確認したら、デフォルトの権限しかなかった
  - TODO: 有識者に質問する

- Q3: 現場では、sls を実行する IAM User にどんな権限を付与している？（local と dev それぞれ気になる）
- A3:
  - TODO: わかり次第、記述する



## 参考記事
- [チュートリアル: Amazon S3 トリガーを使用して Lambda 関数を呼び出す](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-s3-example.html)
- [AWSサービストリガによるLambda起動 ](https://future-architect.github.io/articles/20200722/)
- [Serverless Frameworkの使い方まとめ](https://serverless.co.jp/blog/25/)
- [The ABCs of IAM: Managing permissions with Serverless](https://www.serverless.com/blog/abcs-of-iam-permissions/)
- [Serverless Framework: Minimal IAM role Permissions](https://dav009.medium.com/serverless-framework-minimal-iam-role-permissions-ba34bec0154e)