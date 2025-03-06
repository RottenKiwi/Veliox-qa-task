export const log = (message: string) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);

    // Extension Idea 1: Implement different log levels (e.g., DEBUG, INFO, ERROR) to categorize logs.
    // Extension Idea 2: Save logs to a file or external logging service (e.g., Loggly, ELK Stack).
    // Extension Idea 3: Implement log rotation (when the log file size grows too large).
    // Extension Idea 4: Allow filtering logs based on severity or tags (e.g., filter by "ERROR").
};
