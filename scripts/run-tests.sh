#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Running Astroneko Coffee Test Suite${NC}"
echo "================================================"

# Function to run tests and capture results
run_test_suite() {
    local test_name=$1
    local test_command=$2
    local test_dir=$3
    
    echo -e "\n${YELLOW}Running $test_name...${NC}"
    
    if [ -n "$test_dir" ]; then
        cd "$test_dir" || exit 1
    fi
    
    if eval "$test_command"; then
        echo -e "${GREEN}✅ $test_name passed${NC}"
        return 0
    else
        echo -e "${RED}❌ $test_name failed${NC}"
        return 1
    fi
}

# Initialize counters
total_tests=0
passed_tests=0

# Backend Tests
echo -e "\n${YELLOW}🔧 Backend Tests${NC}"
echo "------------------------"

cd backend || exit 1

# Unit Tests
total_tests=$((total_tests + 1))
if run_test_suite "Backend Unit Tests" "mvn test -Dtest=*Test" ""; then
    passed_tests=$((passed_tests + 1))
fi

# Integration Tests
total_tests=$((total_tests + 1))
if run_test_suite "Backend Integration Tests" "mvn test -Dtest=*IntegrationTest" ""; then
    passed_tests=$((passed_tests + 1))
fi

cd ..

# Frontend Tests
echo -e "\n${YELLOW}🎨 Frontend Tests${NC}"
echo "------------------------"

cd frontend || exit 1

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Frontend Unit Tests
total_tests=$((total_tests + 1))
if run_test_suite "Frontend Unit Tests" "npm test -- --watchAll=false" ""; then
    passed_tests=$((passed_tests + 1))
fi

cd ..

# Test Summary
echo -e "\n${YELLOW}📊 Test Summary${NC}"
echo "================================================"
echo -e "Total Test Suites: $total_tests"
echo -e "Passed: ${GREEN}$passed_tests${NC}"
echo -e "Failed: ${RED}$((total_tests - passed_tests))${NC}"

if [ $passed_tests -eq $total_tests ]; then
    echo -e "\n${GREEN}🎉 All tests passed! Your code is ready for deployment.${NC}"
    exit 0
else
    echo -e "\n${RED}💥 Some tests failed. Please fix the issues before deploying.${NC}"
    exit 1
fi
