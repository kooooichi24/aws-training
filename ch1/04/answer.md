# 04.
## 課題内容
[ここ](../README.md#04.)

## 手順
1. AWS CLI を brew インストール
    ```sh
    $ brew install awscli
    ```
2. バージョン確認
    ```sh
    $ aws --version
    aws-cli/2.4.9 Python/3.9.9 Darwin/21.1.0 source/arm64 prompt/off
    ```
3. AWS CLI の初期設定
    事前にIAMユーザに対してアクセスキーを生成しておく

    ```sh
    $ aws configure
    AWS Access Key ID [None]: xxxxx
    AWS Secret Access Key [None]: xxxxx
    Default region name [None]: ap-northeast-1
    Default output format [None]: 
    ```
4. CLI で IAMユーザを取得する
    ```sh
    $ aws iam list-users
    {
        "Users": [
            {
                "Path": "/",
                "UserName": "Administrator",
                "UserId": "AIDAW4IF3FW5STXJDGFVI",
                "Arn": "arn:aws:iam::472995540411:user/Administrator",
                "CreateDate": "2021-11-14T08:55:39+00:00",
                "PasswordLastUsed": "2022-01-09T06:09:39+00:00"
            }
        ]
    }
    ```

## 参考記事
- [AWS CLIをHomebrewでインストールする](https://zenn.dev/akakuro/articles/30f570b8863bef)
- [AWS CLIの設定](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-chap-configure.html)
- [AWS CLI のコンフィグファイルと環境変数とコマンドラインオプションで指定できる内容をまとめて確認してみた](https://dev.classmethod.jp/articles/aws-cli-configuration-file-env-option/)
- [[個人メモ]IAMの情報をAWS CLIで確認する](https://qiita.com/isobecky74/items/92d35fa1d3063fe64dc4)