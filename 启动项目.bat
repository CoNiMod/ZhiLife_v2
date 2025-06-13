@echo off
setlocal

echo 检查Node.js和npm环境...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到npm命令。请安装Node.js。
    echo 访问官方网站下载Node.js: https://nodejs.org/zh-cn/download/
    echo 安装完成后请重启命令行窗口或电脑。
    pause
    exit /b %errorlevel%
)
echo Node.js和npm环境检测通过。

echo 检查并安装Node.js依赖...
pushd .
cd src
call npm install
if %errorlevel% neq 0 (
    echo Node.js依赖安装失败，请检查npm环境。
    pause
    exit /b %errorlevel%
)
popd
echo Node.js依赖安装完成。

echo 检查并安装Python依赖...
pushd .
cd backend
call pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Python依赖安装失败，请检查Python和pip环境。
    pause
    exit /b %errorlevel%
)
popd
echo Python依赖安装完成。

echo 启动Coze后端服务...
start cmd /k "python backend/app.py"

echo 启动React前端应用...
start cmd /k "npm run dev"

timeout /t 5 >nul
echo 正在尝试打开浏览器...
start "" "http://localhost:5173/"

echo 前后端服务已尝试启动并打开浏览器。
echo 请勿关闭这些命令行窗口。
echo.
echo 按任意键退出此窗口...
pause >nul
