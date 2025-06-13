$shell = New-Object -ComObject WScript.Shell
$shortcutPath = Join-Path $PSScriptRoot "start_all.lnk"
$targetPath = Join-Path $PSScriptRoot "start_all.bat"
$iconPath = "D:\work\code\COZE\CozeVTest\my-react-app\photo\comicon_01.ico" # 使用用户提供的ICO路径

$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $targetPath
$shortcut.WorkingDirectory = $PSScriptRoot
$shortcut.IconLocation = $iconPath

$shortcut.Save()

Write-Host "快捷方式已创建: $shortcutPath"
Write-Host "快捷方式图标已设置为: $iconPath"
