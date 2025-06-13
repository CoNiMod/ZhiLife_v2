# ✨ ZhiLife: 您的智能Coze AI生活伴侣 ✨

![ZhiLife Logo Placeholder](https://via.placeholder.com/150/007bff/ffffff?text=ZhiLife+Logo)

欢迎来到 **ZhiLife**，一个功能强大且易于部署的桌面应用，旨在通过整合最先进的Coze AI技术，为您提供无缝的文字、语音和视频聊天体验。无论是日常交流、信息查询，还是沉浸式互动，ZhiLife都将成为您不可或缺的智能助手。

## 🚀 功能亮点

ZhiLife 致力于提供一个多模态的智能交互平台：

*   **💬 文字聊天**: 通过直观的界面，您可以与Coze AI进行流畅的文字对话。无论是提问、寻求建议，还是进行深度讨论，AI都能迅速响应。
*   **🎙️ 语音聊天**: 利用Coze实时API，ZhiLife支持纯语音交互。释放您的双手，通过自然语言与AI进行对话，如同与真人交流般轻松。
*   **🎥 语音视频聊天**: (需Coze机器人支持视频功能) 体验前所未有的沉浸式互动！ZhiLife支持语音与视频的实时交互，让您的AI伙伴以更生动的方式呈现。

## 💡 技术栈

本项目采用前后端分离的架构，确保了高效的开发和灵活的部署：

### 前端 (Client-side)

*   **React**: 用于构建用户界面的流行JavaScript库。
*   **Vite**: 极速的前端构建工具。
*   **TypeScript**: JavaScript的超集，提供类型安全。
*   **Ant Design**: 高质量的React UI组件库，提供美观且功能丰富的界面元素。
*   **@coze/api & @coze/realtime-api**: 用于与Coze平台进行API交互的官方SDK。

### 后端 (Server-side)

*   **Python**: 后端逻辑的主要编程语言。
*   **Flask**: 轻量级的Python Web框架，用于构建RESTful API。
*   **Flask-Cors**: 解决跨域资源共享问题，确保前端可以顺利访问后端。
*   **cozepy**: Python Coze API客户端库，简化与Coze服务的集成。

## ⚙️ 部署与运行指南

本项目的部署旨在极致简化，让您轻松在本地运行。请按照以下步骤操作：

### 1. 🖥️ 系统要求

在开始之前，请确保您的系统安装了以下软件：

*   **Python**: 版本 3.8 或更高。
    *   [下载 Python](https://www.python.org/downloads/)
*   **Node.js**: 版本 14 或更高 (推荐 LTS 版本)，包含 **npm** 包管理器。
    *   [下载 Node.js](https://nodejs.org/en/download/)

### 2. 📥 获取项目

您可以通过以下方式获取项目代码：

*   **通过 Git 克隆**:
    ```bash
    git clone https://github.com/CoNiMod/ZhiLife_v2.git
    cd ZhiLife
    ```
*   **通过压缩包下载（推荐）**:
    如果您获得了项目的 `.zip` 或 `.tar.gz` 压缩包，请将其解压到您希望存放项目的任意目录。然后，通过命令行进入到项目的根目录。

### 3. 🔑 后端配置 (Python)

ZhiLife 的后端使用 Flask 框架，负责与 Coze API 进行通信。

1.  **安装 Python 依赖**:
    打开您的命令行工具 (如 `Git Bash`, `CMD`, `PowerShell` 或 `Windows Terminal`)。
    进入项目的 `backend` 目录，并安装所需的 Python 包：
    ```bash
    cd backend
    pip install -r requirements.txt
    cd .. # 返回项目根目录
    ```
2.  **配置 Coze API Token 和 Bot ID**:
    `backend/app.py` 文件中已预设了默认的 Coze API Token 和 Bot ID。
    **为了您的数据安全和项目稳定性，强烈建议您使用自己的 Coze 机器人 Token 和 Bot ID**。您可以选择以下两种配置方式：

    *   **通过环境变量 (推荐)**:
        在运行项目前，设置以下环境变量：
        *   `COZE_API_TOKEN`: 您的 Coze API 访问令牌。
        *   `COZE_BOT_ID`: 您的 Coze 机器人的 ID。

        **Windows (CMD)**:
        ```cmd
        set COZE_API_TOKEN=YOUR_COZE_API_TOKEN_HERE
        set COZE_BOT_ID=YOUR_COZE_BOT_ID_HERE
        ```
        **Windows (PowerShell)**:
        ```powershell
        $env:COZE_API_TOKEN="YOUR_COZE_API_TOKEN_HERE"
        $env:COZE_BOT_ID="YOUR_COZE_BOT_ID_HERE"
        ```
        **Linux/macOS (Bash/Zsh)**:
        ```bash
        export COZE_API_TOKEN=YOUR_COZE_API_TOKEN_HERE
        export COZE_BOT_ID=YOUR_COZE_BOT_ID_HERE
        ```
        请注意，通过 `set` 或 `export` 设置的环境变量只在当前会话中有效。若要永久设置，请查阅您的操作系统文档。

    *   **直接修改 `backend/app.py` (不推荐用于生产环境)**:
        如果您不希望设置环境变量，可以直接修改 `backend/app.py` 文件中的以下行：
        ```python
        coze_api_token = os.environ.get('COZE_API_TOKEN', 'pat_EzTP3vfCz9cEyAnIoeWz7mhdMEYSk9pPV2BuuFcM7nKYA5Xtnw46Rp0RwFgF2KBk')
        coze_bot_id = os.environ.get('COZE_BOT_ID', "7512293801969500194")
        ```
        将其中的 `'pat_EzTP3vfCz9cEyAnIoeWz7mhdMEYSk9pPV2BuuFcM7nKYA5Xtnw46Rp0RwFgF2KBk'` 和 `"7512293801969500194"` 替换为您的实际 Token 和 Bot ID。

### 4. 🌐 前端设置 (Node.js)

ZhiLife 的前端基于 React 和 Vite 构建。

1.  **安装 Node.js 依赖**:
    在项目的根目录，打开命令行工具：
    ```bash
    npm install
    ```
    这将使用 `npm` 安装所有前端所需的 JavaScript 依赖包。

### 5. ▶️ 运行项目

ZhiLife 提供了一个便捷的批处理文件，让您一键启动所有服务：

*   **双击 `双击启动.bat` 文件** (推荐，仅限 Windows 用户)
    或者
*   **在项目根目录的命令行中运行**:
    ```bash
    启动项目.bat
    ```

这个批处理文件将自动执行以下操作：
*   🚀 **启动 Flask 后端服务**: 在 `http://127.0.0.1:5000` 监听请求。
*   📦 **启动 React 前端应用**: 在 `http://localhost:5173/` 提供服务。
*   🌐 **自动打开浏览器**: 等待5秒后，自动在您的默认浏览器中打开前端页面 (`http://localhost:5173/`)。

**重要提示**: 请勿关闭弹出或由批处理文件启动的命令行窗口，它们是后端和前端服务的运行窗口。关闭它们将导致服务停止。

## 📂 项目结构

```
.
├── backend/                      # 后端服务目录 (Python/Flask)
│   ├── app.py                    # Flask 应用核心，处理Coze API交互
│   └── requirements.txt          # Python 依赖列表
├── public/                       # 前端公共资源 (如 favicon, vite logo)
├── src/                          # 前端源代码目录 (React/TypeScript)
│   ├── components/               # React 组件
│   │   └── WordChat.tsx          # 文字聊天核心组件
│   ├── App.tsx                   # 主应用组件，集成不同聊天模式
│   ├── hooks.ts                  # Coze 实时API相关自定义 Hooks
│   ├── main.tsx                  # 应用入口文件
│   ├── App.css                   # 主应用样式
│   ├── index.css                 # 全局样式
│   └── vite-env.d.ts             # Vite 环境类型定义
├── 项目修改记录/                 # 项目修改记录文件夹
│   └── YYYYMMDDHHMMSS_描述.txt   # 每次任务的修改记录
├── 双击启动.bat                  # Windows 一键启动脚本
├── 启动项目.bat                  # 跨平台启动脚本 (需手动运行)
├── CozeWordChat.py               # (可选) 额外的Python脚本，可能用于特定Coze功能
├── create_shortcut.ps1           # (可选) 用于创建快捷方式的 PowerShell 脚本
├── package.json                  # 前端 Node.js 依赖和项目信息
├── package-lock.json             # Node.js 依赖锁定文件
├── tsconfig.json                 # TypeScript 配置
├── tsconfig.app.json             # 应用 TypeScript 配置
├── tsconfig.node.json            # Node 环境 TypeScript 配置
├── vite.config.ts                # Vite 构建工具配置
└── .gitignore                    # Git 忽略文件配置
```

## ❓ 常见问题 (FAQ)

*   **Q: 为什么我无法打开前端页面？**
    *   A: 请检查后端和前端服务是否都已成功启动。确保 `http://127.0.0.1:5000` 和 `http://localhost:5173/` 端口没有被其他程序占用。您可以查看命令行窗口是否有错误信息。
*   **Q: 我修改了 `app.py` 或前端代码，但没有看到效果？**
    *   A: Flask 后端和 React 前端通常都支持热重载 (Hot Reloading)，但某些情况下可能需要手动重启 `启动项目.bat` 来应用更改。
*   **Q: 如何获取我的 Coze API Token 和 Bot ID？**
    *   A: 请访问 Coze 官方网站或开发文档，了解如何创建机器人并获取相应的 API Token 和 Bot ID。

## 🤝 贡献指南

我们欢迎所有形式的贡献！如果您希望改进 ZhiLife，请遵循以下步骤：

1.  **Fork** 本项目仓库。
2.  **Clone** 您 Fork 的仓库到本地。
3.  创建新的 **Feature Branch** (`git checkout -b feature/YourFeatureName`)。
4.  进行您的更改，并确保代码符合项目规范。
5.  **Commit** 您的更改 (`git commit -m 'feat: Add YourFeature'`)。
6.  **Push** 到您的 Fork 仓库 (`git push origin feature/YourFeatureName`)。
7.  创建一个 **Pull Request** 到主仓库的 `main` 分支。


感谢您使用 ZhiLife！希望它能为您的生活带来更多便利和乐趣！
