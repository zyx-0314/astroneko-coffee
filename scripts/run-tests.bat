@echo off
setlocal enabledelayedexpansion

echo 🚀 Running Astroneko Coffee Test Suite
echo ================================================

set total_tests=0
set passed_tests=0

echo.
echo 🔧 Backend Tests
echo ------------------------

cd backend
if not exist target mkdir target

REM Unit Tests
set /a total_tests+=1
echo Running Backend Unit Tests...
call mvn test -Dtest=*Test
if !errorlevel! equ 0 (
    echo ✅ Backend Unit Tests passed
    set /a passed_tests+=1
) else (
    echo ❌ Backend Unit Tests failed
)

REM Integration Tests
set /a total_tests+=1
echo Running Backend Integration Tests...
call mvn test -Dtest=*IntegrationTest
if !errorlevel! equ 0 (
    echo ✅ Backend Integration Tests passed
    set /a passed_tests+=1
) else (
    echo ❌ Backend Integration Tests failed
)

cd ..

echo.
echo 🎨 Frontend Tests
echo ------------------------

cd frontend

REM Check if node_modules exists
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
)

REM Frontend Unit Tests
set /a total_tests+=1
echo Running Frontend Unit Tests...
call npm test -- --watchAll=false
if !errorlevel! equ 0 (
    echo ✅ Frontend Unit Tests passed
    set /a passed_tests+=1
) else (
    echo ❌ Frontend Unit Tests failed
)

cd ..

echo.
echo 📊 Test Summary
echo ================================================
echo Total Test Suites: !total_tests!
echo Passed: !passed_tests!
echo Failed: !failed_tests!

set /a failed_tests=!total_tests!-!passed_tests!

if !passed_tests! equ !total_tests! (
    echo.
    echo 🎉 All tests passed! Your code is ready for deployment.
    exit /b 0
) else (
    echo.
    echo 💥 Some tests failed. Please fix the issues before deploying.
    exit /b 1
)
