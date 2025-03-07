import * as config from './config';

// Function to generate a random delay between min and max
export const randomDelay = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

// Extension Idea 1: Implement a "delay factor" to adjust delays based on external factors (e.g., network latency).
// Extension Idea 2: Add a feature to randomize delay types (e.g., exponential, linear) based on parameters.


// Function to return localized text based on the language setting (Hebrew or English)
export const getLocalizedText = (): string => {
    if (config.language.toUpperCase() === "HE") {
        return "צור חוברת עבודה ריקה חדשה";  // Hebrew text
    } else {
        return "Create blank workbook";  // English text
    }

    // Extension Idea 1: Support additional languages (e.g., Spanish, French) and dynamically fetch translations from a file or API.
    // Extension Idea 2: Support a "fallback" language in case a localized translation is missing.
    // Extension Idea 3: Implement a function to load translations from a JSON file or external service (e.g., i18n library).

};

// Function to parse and format the date from aria-label in DD/MM/YYYY format
export function parseDateFromAriaLabel(ariaLabel: string): string | null {
    const dateMatch = ariaLabel.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);  // Match date in either format

    if (dateMatch) {
        const extractedDate = dateMatch[0]; // Extract the full date match
        const [month, day, year] = extractedDate.split('/'); // Split the date into parts
        const formattedExtractedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;  // Normalize to DD/MM/YYYY

        return formattedExtractedDate;
    } else {
        return null;  // Return null if no date is found
    }

    // Extension Idea 1: Extend the regex to support different date formats (e.g., MM/DD/YYYY, YYYY-MM-DD).
    // Extension Idea 2: Add localization support for date formats (e.g., using `Intl.DateTimeFormat`).
    // Extension Idea 3: Provide options for different date parsing strategies (e.g., strict vs. lenient matching).
};

// Helper function to format the date as MM/DD/YYYY with leading zeros
export function formatDateWithLeadingZeros(date: Date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so we add 1
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}