# Automated Testing Guide for Astroneko Coffee

This document provides comprehensive guidance on the automated testing framework implemented for the Astroneko Coffee project to ensure code quality and prevent regression issues.

## Overview

The testing strategy follows a multi-layered approach:
- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test component interactions
- **End-to-End Tests**: Test complete user workflows
- **CI/CD Pipeline**: Automated testing on code changes

## Backend Testing Framework

### Test Structure
```
backend/src/test/java/
├── coffee/astroneko/backend/
│   ├── entity/
│   │   └── MenuItemTest.java              # Entity unit tests
│   ├── service/
│   │   └── MenuItemServiceTest.java       # Service layer tests with mocks
│   ├── repository/
│   │   └── MenuItemRepositoryTest.java    # JPA repository tests
│   ├── controller/
│   │   ├── MenuControllerTest.java        # Public API controller tests
│   │   └── MenuManagementControllerTest.java # Secure API controller tests
│   └── integration/
│       ├── SimpleIntegrationTest.java     # Database integration tests
│       └── MenuManagementIntegrationTest.java # Full API integration tests
```

### Test Categories

#### 1. Unit Tests
- **MenuItemTest**: Tests entity getters, setters, and validation
- **MenuItemServiceTest**: Tests business logic with mocked dependencies
- Status: ✅ **PASSING** (12/12 tests)

#### 2. Repository Tests  
- **MenuItemRepositoryTest**: Tests JPA operations with H2 in-memory database
- Tests CRUD operations, queries, and data integrity

#### 3. Controller Tests
- **MenuControllerTest**: Tests public menu endpoints
- **MenuManagementControllerTest**: Tests secure CRUD endpoints
- Uses MockMvc for web layer testing

#### 4. Integration Tests
- **SimpleIntegrationTest**: Basic database connectivity tests
- **MenuManagementIntegrationTest**: Full API workflow tests with TestContainers

### Running Backend Tests

```bash
# Run all unit tests (recommended)
mvn test -Dtest="MenuItemTest,MenuItemServiceTest"

# Run specific test categories
mvn test -Dtest="*Test"           # Unit tests only
mvn test -Dtest="*IntegrationTest" # Integration tests only

# Run all tests with coverage
mvn clean test jacoco:report
```

### Test Configuration

#### Dependencies Added to pom.xml:
```xml
<!-- Testing Dependencies -->
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>postgresql</artifactId>
    <scope>test</scope>
</dependency>
```

#### Test Configuration (application-test.properties):
```properties
# Test database configuration
spring.datasource.url=jdbc:h2:mem:testdb;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=false
spring.security.user.name=test
spring.security.user.password=test
```

## Frontend Testing Framework

### Test Structure
```
frontend/
├── __tests__/                    # Global test utilities
├── jest.config.js               # Jest configuration
├── jest.setup.js                # Test setup and mocks
└── app/test/crud-expose/
    └── __tests__/
        └── page.test.tsx         # Component tests
```

### Frontend Test Setup

#### Dependencies Added to package.json:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:ci": "jest --ci --coverage --watchAll=false"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/jest": "^29.5.14",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

### Running Frontend Tests

```bash
cd frontend

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:ci

# Run tests in watch mode
npm run test:watch
```

## Continuous Integration (CI/CD)

### GitHub Actions Pipeline

The project includes a comprehensive CI/CD pipeline (`.github/workflows/ci-cd.yml`) that:

1. **Backend Tests**
   - Sets up PostgreSQL service
   - Runs Maven tests with proper test database
   - Generates test reports

2. **Frontend Tests**
   - Sets up Node.js environment
   - Installs dependencies
   - Runs Jest tests with coverage

3. **Integration Tests**
   - Starts full Docker Compose environment
   - Runs end-to-end API tests
   - Verifies cross-component functionality

4. **Build and Deploy**
   - Builds Docker images
   - Deploys to staging/production (when configured)

### Test Automation Scripts

#### Windows (PowerShell)
```bash
# Run all tests
.\scripts\run-tests.bat
```

#### Unix/Linux/macOS
```bash
# Run all tests
./scripts/run-tests.sh
```

## Test Coverage Goals

- **Unit Tests**: 80%+ code coverage
- **Integration Tests**: All API endpoints tested
- **E2E Tests**: Critical user journeys covered

## Best Practices

### 1. Test Naming Convention
```java
// Pattern: testMethodName_Condition_ExpectedResult
testCreateMenuItem_ValidData_ReturnsCreatedItem()
testGetMenuItem_NonExistentId_ReturnsNotFound()
```

### 2. Test Structure (AAA Pattern)
```java
@Test
void testCreateMenuItem_ValidData_ReturnsCreatedItem() {
    // Arrange
    CreateMenuItemRequest request = new CreateMenuItemRequest("Latte", 4.50);
    
    // Act
    MenuItem result = menuItemService.createMenuItem(request);
    
    // Assert
    assertEquals("Latte", result.getName());
    assertEquals(4.50, result.getPrice());
}
```

### 3. Mock Usage
- Mock external dependencies
- Use real objects for simple data containers
- Verify interactions with mocks

### 4. Test Data Management
- Use test-specific data builders
- Clean up test data between tests
- Use transactions for rollback in integration tests

## Debugging Failed Tests

### Common Issues and Solutions

1. **Database Connection Issues**
   ```bash
   # Check if PostgreSQL is running
   docker ps
   
   # Restart database
   docker-compose restart postgres
   ```

2. **Port Conflicts**
   ```bash
   # Check port usage
   netstat -an | findstr 8083
   
   # Kill processes on port
   taskkill /PID <process_id> /F
   ```

3. **Maven Test Failures**
   ```bash
   # Clean and rebuild
   mvn clean compile test-compile
   
   # Run with debug information
   mvn test -X
   ```

## Integration with Development Workflow

### Pre-commit Hooks (Recommended)
```bash
# Install pre-commit hook
echo "mvn test -Dtest='MenuItemTest,MenuItemServiceTest'" > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### IDE Integration
- Configure IDE to run tests automatically
- Set up test coverage reporting
- Enable test result notifications

## Monitoring and Reporting

### Test Reports Location
- **Backend**: `backend/target/surefire-reports/`
- **Frontend**: `frontend/coverage/`
- **CI/CD**: GitHub Actions artifacts

### Metrics to Track
- Test execution time
- Code coverage percentage
- Number of tests per component
- Test failure rates

## Future Enhancements

1. **Performance Testing**: Add JMeter/k6 tests for API performance
2. **Security Testing**: Add OWASP ZAP integration
3. **Contract Testing**: Add Pact for API contract testing
4. **Visual Testing**: Add screenshot comparison tests for frontend
5. **Load Testing**: Add stress testing for high-traffic scenarios

---

**Status**: ✅ Core testing framework implemented and verified
**Last Updated**: August 17, 2025
**Next Review**: Monthly or after major feature additions
