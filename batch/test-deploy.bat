@echo

cd F:\Angular\Framework\NGFramework
if exist F:\Angular\Framework\NGFramework\dist\test (
    del F:\Angular\Framework\NGFramework\dist\test /q /s
)

timeout /t 3
call npm run build:test

timeout /t 3
if exist F:\Deployment\Angular\Framework\test (
    del F:\Deployment\Angular\Framework\test /q /s
) else (
    md F:\Deployment\Angular\Framework\test
)


timeout /t 3
xcopy F:\Angular\Framework\NGFramework\dist\test\* F:\Deployment\Angular\Framework\test /e

pause
exit

