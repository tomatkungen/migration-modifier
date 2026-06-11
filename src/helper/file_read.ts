import fs from 'fs';

/**
 * Reads the contents of a file synchronously and returns it as a UTF-8 encoded string.
 *
 * @param filePath - The path to the file to be read.
 * @returns The contents of the file as a string.
 *
 * @throws Will throw an error if the file cannot be read.
 */
export const file_read = (filePath: string): string => {
    return fs.readFileSync(filePath, {'encoding': 'utf-8'})
}