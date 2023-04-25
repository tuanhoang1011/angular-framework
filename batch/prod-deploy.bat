@echo

cd F:\Angular\Framework\NGFramework
if exist F:\Angular\Framework\NGFramework\dist\production (
    del F:\Angular\Framework\NGFramework\dist\production /q /s
)

timeout /t 3
call npm run build:production

timeout /t 3
if exist F:\Deployment\Angular\Framework\production (
    del F:\Deployment\Angular\Framework\production /q /s
) else (
    md F:\Deployment\Angular\Framework\production
)


timeout /t 3
xcopy F:\Angular\Framework\NGFramework\dist\production\* F:\Deployment\Angular\Framework\production /e

pause
exit

