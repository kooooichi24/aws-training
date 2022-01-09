## 第1章: 準備運動
### 01. AWS アカウントの作成
AWS アカウントを作成してください。

### 02. IAM ユーザを作成してください
Admin権限を付与したIAMユーザを作成してください。

### 03. MFA認証
01,02で作成した root ユーザと IAM ユーザの MFA 認証を有効にしてください。

### 04. AWS CLI
AWS CLI を設定してください。

### 05. IAMグループ
下記の構成となるように、IAMグループとIAMユーザを作成してください。

```
.
├── Administrators
│   └── Administrator
└── Developers
│   └── Developer
```
