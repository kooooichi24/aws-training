# 03.
## 課題内容
[ここ](../README.md#03.)

## 手順
1. [チュートリアル: Amazon S3 トリガーを使用して Lambda 関数を呼び出す](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-s3-example.html) を実施
    
    Managed Console で Lambda のイベントトリガーの感覚を掴む

2. [チュートリアル: Amazon S3 トリガーを使用してサムネイル画像を作成する](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-s3-tutorial.html) を実施
    
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

3. ServerlessFramework で実現
    ```sh
    $ npm install -g serverless

    $ serverless --version
    Framework Core: 2.71.0
    Plugin: 5.5.3
    SDK: 4.3.0
    Components: 3.18.1
    ```
## 疑問点
### 1. xxx
- Q: qqq
- A: aaa

## 参考記事
- [チュートリアル: Amazon S3 トリガーを使用して Lambda 関数を呼び出す](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/with-s3-example.html)
- [AWSサービストリガによるLambda起動 ](https://future-architect.github.io/articles/20200722/)