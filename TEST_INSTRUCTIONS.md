# Test Instructions

## Prerequisites

Before running tests, you need to install Node.js and npm. Then install the project dependencies:

```bash
npm install
```

## Running Tests

### Run all tests once
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with UI
```bash
npm run test:ui
```

## Property-Based Tests

Property-based tests are configured to run 100 iterations each to ensure comprehensive coverage. These tests validate universal properties across many generated inputs.

### Current Property Tests

1. **Property 1: Consistent Spacing Grid** (Requirements 1.5)
   - Validates that all spacing values are multiples of 8px
   - Tests spacing scale consistency
   - Tests utility class spacing values
   - Tests spacing operations preserve grid alignment

## Test Structure

- `src/test/setup.js` - Test setup and configuration
- `src/test/*.property.test.js` - Property-based tests
- `src/test/*.test.js` - Unit tests (to be added)

## Notes

- Property tests use `fast-check` library for property-based testing
- Tests run in jsdom environment for DOM testing
- All tests must pass before deployment
