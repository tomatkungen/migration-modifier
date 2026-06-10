import ts from "typescript";

export const ts_source_files = (tsCreateProgram: ts.Program): readonly ts.SourceFile[] => {

    return tsCreateProgram
        .getSourceFiles()
        .filter((sourceFile) => 
            (!sourceFile.isDeclarationFile)
        )
}
