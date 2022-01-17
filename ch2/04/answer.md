# 04.
## 課題内容
[ここ](../README.md#04.)

## 手順
1. aa
    ```bash
    $ serverless create --template aws-nodejs --name sls-lambda-thumbnail --path sls-lambda-thumbnail
    $ yarn init
    ```
    

## 疑問点
### 1. 
- Q: AWS リソースで ServerlessFramework で構築するものと、しないものの判断基準は？
- A: 調査中
  - sls で構築しているもの
    - DynamoDB
    - API Gateway
    - SQS
  - sls で構築しない方が良いもの
    - CICD関連
    - Network関連

## 参考記事
- なし