# 08.
## 課題内容
[ここ](../README.md#08.)

## 回答
### 1. Lambda Layer を導入するメリットを教えてください
- 課題
  - 同じライブラリを利用する複数のLambdaが存在する場合、全てのLambdaで全てのライブラリも含めてデプロイしていた
  - ライブラリのデプロイが重複することで、Lambdaのサイズが増えたり、デプロイ時間が多くなっていた
- 解決策
  - Lambda Layer によってライブラリなどを共通化することができ、Lambdaは共通化された箇所を参照すればよくなった
- メリット
  - 重複してライブラリをデプロイする必要がなくなり、アップロードサイズの削減とデプロイ時間の短縮が実現された
  - コードの共有とビジネスロジックが分離されることで、ビジネスロジックに専念しやすくなった

### 2. Lambda Layer の導入

#### serverless-layer pluginをインストール
```sh
$ npm i -D serverless-layer
```

#### serverless.yml 修正
```diff
plugins:
  - serverless-prune-plugin
  - serverless-plugin-typescript
  - serverless-dynamodb-local
  - serverless-offline
+ - serverless-layers
...
custom:
+ serverless-layers:
+   compatibleRuntimes: ["nodejs14.x"]
```

#### Lambda Layer ありなし比較

| | layer なし | layer あり |
|-| --------- | ---------- |
|Lambda Functionのサイズ|3.5 MB|2.5 kB|
|デプロイ時間| 73s | 122s(初回), 64s(2回目) |


#### serverless-layer plugin の挙動

`packge.json` からLayerパッケージを`.serverless/layers` に生成して、そのフォルダーを `.serverless/sls-rest-api-dev-nodejs-default.zip`に圧縮して、アップロードしている。

```bash
.serverless
├── cloudformation-template-update-stack.json
├── layers ##### この部分 ######
│   └── nodejs
│       ├── node_modules
│       ├── package-lock.json
│       └── package.json
├── serverless-state.json
├── sls-rest-api-dev-nodejs-default.zip ##### zip後 #####
└── sls-rest-api.zip
```

`sls deploy --verbose` より抜粋
```bash
[ LayersPlugin ]: => default
... ○ Downloading package.json from bucket...
... ○ package.json The specified key does not exist..
... ○  Changes identified ! Re-installing...
... ○ npm install --production --only=prod
...
...
... ○ Created layer package /Users/furukawakoichi/git/aws-training/ch2/08/sls-rest-api/.serverless/sls-rest-api-dev-nodejs-default.zip (3.6 MB)
... ○ Uploading layer package...
... ○ OK...
... ○ New layer version published...
... ○ Uploading remote /Users/furukawakoichi/git/aws-training/ch2/08/sls-rest-api/package.json...
... ○ OK...
... ○ Adding layers...
... ✓ provider - arn:aws:lambda:ap-northeast-1:*********:sls-rest-api-dev-nodejs-default:2
... x (Skipped) function.create-todo - because it has no other layers
... x (Skipped) function.get-all-todo - because it has no other layers
```

## 疑問点
### 1. Layerにアップロードする対象は何？
- Q: node_modules フォルダを共通化するんじゃないの？その記述はどこに書いてあるんだろう
- A: 自動的にpackage.jsonをロードしてLayerとしてデプロイしている

### 2. Layer
- Q: `Serverless Framework Layer` vs `serverless-layers plugin`
- A: `serverless-layers plugin` の方が便利そう
  - 全てのLambda関数に、自動でLayerを付与してくれるみたい
    - [serverless-layers](https://www.npmjs.com/package/serverless-layers)
      > It attaches automatically layers to the provider and for each function it will skip functions with no other layers as they will use the layer(s) we added to the provider
  - `Serverless Framework Layer` はいちいち記述する必要ある気がする
    - [AWS - Layers](https://www.serverless.com/framework/docs/providers/aws/guide/layers)


### 参考記事
- [Lambda レイヤーの作成と共有](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/configuration-layers.html)
- [serverless-layers](https://www.npmjs.com/package/serverless-layers)
- [Serverless Frameworkのserverless-layersプラグインを使って超お手軽にnode_modulesをAWS Lambda Layers化する](https://dev.classmethod.jp/articles/serverless-framework-node-modules-to-lambda-layers/)
- [Lambda Layerの基本的な仕組みを確認する #reinvent](https://dev.classmethod.jp/articles/lambda-layer-basics-how-it-works/)
- [AWS Lambda Layersでライブラリを共通化](https://qiita.com/t_okkan/items/394a15577bd1aad46ec3)
- [今から始めるLambda③「Layersを使う」](https://zenn.dev/nekoniki/articles/6a30b75da0fac5)