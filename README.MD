# Excel Online Test Automation

This project demonstrates an automated test for verifying the functionality of the TODAY() function in Excel Online using Playwright and TypeScript. The test simulates logging into Excel Online, entering the TODAY() function in the formula bar, and comparing the returned date with the system's current date.

## Features

- Automated login to Excel Online using Playwright.
- Input and evaluate the TODAY() function in a new blank workbook.
- Extract the displayed date and compare it with the system's current date.
- Handle dynamic elements and popups.
- Supports English and Hebrew languages for UI localization.
- Uses random delays to simulate human-like interactions.

## Project Structure
```
├── config.ts        # Configuration file for sensitive data (e.g., credentials, language)
├── helpers.ts       # Helper functions for random delays, text localization, and date parsing
├── logger.ts        # Logger utility for consistent logging
├── package.json     # Project dependencies and scripts
├── tests/           # Directory containing test scripts
│   └── excel-online-test.ts  # Main test script
└── tsconfig.json    # TypeScript configuration file
```

## Key Files

### `logger.ts`

The `logger.ts` file provides a simple utility for logging messages with timestamps. It helps track the flow of the automation process and captures important events during test execution. The log format includes the timestamp and message, ensuring that logs are clear and easy to read. This can be extended in the future to add log levels (e.g., info, warning, error) and output logs to external files for better traceability.

### `helpers.ts`

The `helpers.ts` file contains utility functions that are used throughout the project. It includes:
- randomDelay(min: number, max: number): Generates a random delay between min and max milliseconds to simulate human-like actions during the test.
- getLocalizedText(): Returns localized text for UI elements based on the current language setting (either English or Hebrew).
- parseDateFromAriaLabel(ariaLabel: string): Extracts and formats the date from the aria-label attribute of a specific Excel Online element.
- formatDateWithLeadingZeros(date: Date): Formats the given date in MM/DD/YYYY format, ensuring leading zeros are included.

These functions can be extended in the future to add more helper methods, such as additional text localization for other languages, more complex delay logic, or more date parsing functions to handle different date formats.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/excel-online-test-automation.git
   cd excel-online-test-automation
   ```

2.	Install the required dependencies:

   ```bash
    npm install
   ```

3. 	Update the ```config.ts``` file with your Microsoft account credentials and preferred language (either 'HE' for Hebrew or 'EN' for  English).

4.	Run the test:

   ```bash
    npx playwright test  
   ```

## Future Improvements
	*	Extend the logger to support different log levels (e.g., info, warning, error).
	*	Add more helper functions for handling additional UI elements and test scenarios.
	*	Implement support for other languages in the getLocalizedText function.
	*	Improve error handling and reporting in the test script.