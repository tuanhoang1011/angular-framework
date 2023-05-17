@echo

cd F:\Angular\Framework\NGFramework
if exist F:\Angular\Framework\NGFramework\dist\dev (
    del F:\Angular\Framework\NGFramework\dist\dev /q /s
)

timeout /t 3
call npm run build:dev

timeout /t 3
if exist F:\Deployment\Angular\Framework\dev (
    del F:\Deployment\Angular\Framework\dev /q /s
) else (
    md F:\Deployment\Angular\Framework\dev
)


timeout /t 3
xcopy F:\Angular\Framework\NGFramework\dist\dev\* F:\Deployment\Angular\Framework\dev /e

pause
exit

