# 我的Coze聊天应用

这是一个整合了文字聊天、语音聊天和语音视频聊天功能的React应用，后端使用Flask与Coze API进行交互。

## 功能特性

*   **文字聊天**: 通过后端API与Coze机器人进行文字对话。
*   **语音聊天**: 利用Coze实时API进行纯语音对话。
*   **语音视频聊天**: (如果您的Coze机器人支持) 提供语音和视频的实时交互。

## 部署和运行指南

要运行此项目，您需要安装 Python 和 Node.js。

### 1. 克隆或下载项目

```bash
git clone [项目仓库地址]
cd my-react-app
```
(如果您是通过压缩包获取的项目，请直接解压并进入项目根目录。)

### 2. 后端设置 (Python)

1.  **安装 Python 依赖**:
    打开命令行工具 (如 Git Bash, CMD, PowerShell)，进入项目根目录：
    ```bash
    cd backend
    pip install -r requirements.txt
    cd ..
    ```
2.  **配置 Coze API Token 和 Bot ID (可选)**:
    `backend/app.py` 中默认使用了提供的 API Token 和 Bot ID。如果您想使用自己的 Coze 机器人，可以修改 `backend/app.py` 文件中的以下行：
    ```python
    coze_api_token = os.environ.get('COZE_API_TOKEN', 'pat_EzTP3vfCz9cEyAnIoeWz7mhdMEYSk9pPV2BuuFcM7nKYA5Xtnw46Rp0RwFgF2KBk')
    coze_bot_id = os.environ.get('COZE_BOT_ID', "7512293801969500194")
    ```
    将其替换为您的实际 Token 和 Bot ID，或者设置环境变量 `COZE_API_TOKEN` 和 `COZE_BOT_ID`。

### 3. 前端设置 (Node.js)

1.  **安装 Node.js 依赖**:
    在项目根目录，打开命令行工具：
    ```bash
    npm install
    ```

### 4. 运行项目

在项目根目录，直接运行以下批处理文件：

```bash
start_all.bat
```

这个批处理文件将自动：
*   启动 Flask 后端服务 (在 `http://127.0.0.1:5000`)。
*   启动 React 前端应用 (在 `http://localhost:5173/`)。
*   等待5秒后自动在您的默认浏览器中打开前端页面。

请勿关闭弹出的命令行窗口，它们是后端和前端服务的运行窗口。

## 项目结构

```
.
├── backend/                  # 后端服务目录
│   ├── app.py                # Flask 应用，处理Coze文字聊天API
│   └── requirements.txt      # 后端Python依赖
├── public/                   # 前端公共资源
├── src/                      # 前端源代码目录
│   ├── components/
│   │   └── WordChat.tsx      # 文字聊天组件
│   ├── App.tsx               # 主应用组件，整合了多种聊天模式
│   ├── hooks.ts              # Coze实时API相关的hook
│   └── ...                   # 其他前端文件
├── 项目修改记录/             # 项目修改记录
│   └── Coze聊天功能整合_20250607.txt # 本次任务的修改记录
├── start_all.bat             # 一键启动前后端及打开浏览器的脚本
├── package.json              # 前端Node.js依赖和项目信息
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── .gitignore
