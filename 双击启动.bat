@echo off
echo 启动Coze后端服务...
start cmd /k "python backend/app.py"

echo 启动React前端应用...
start cmd /k "npm run dev"

timeout /t 5 >nul
echo 正在尝试打开浏览器...
start "" "http://localhost:5173/"

echo 前后端服务已尝试启动并打开浏览器。
echo 请勿关闭这些命令行窗口。
