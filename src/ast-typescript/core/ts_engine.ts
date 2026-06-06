import ts from "typescript";

export const ts_engine = (fileNames: string[], options: ts.CompilerOptions): readonly ts.SourceFile[] => {

    console.log('scan files: ', fileNames.length);
    const sourceFiles = ts.createProgram(fileNames, options)
        .getSourceFiles()

    return sourceFiles.filter((sourceFile) => {
        return !sourceFile.isDeclarationFile
    })
}
