import ts from 'typescript';

export const util_code_language_ts = (filePath: string): ts.SourceFile | undefined => {
    const program = ts.createProgram([filePath], {});
    const sourceFile = program.getSourceFile(filePath);

    return sourceFile;
}