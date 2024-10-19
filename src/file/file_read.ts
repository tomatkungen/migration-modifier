import fs from 'fs';

export const file_read = (filePath: string): string => {
    return fs.readFileSync(filePath, {'encoding': 'utf-8'})
}