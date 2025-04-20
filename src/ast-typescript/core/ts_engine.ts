import ts from "typescript";

export const ts_engine = (parseConfig: ts.ParsedCommandLine) => {


    const sourceFiles = ts.createProgram(parseConfig.fileNames, parseConfig.options)
        .getSourceFiles()


    const result: { [filePath: string]: string[] } = {};

    sourceFiles.forEach((sourceFile) => {
        if (sourceFile.isDeclarationFile)
            return;

        const fileStrings: string[] = [];
        scanProject(sourceFile, sourceFile.fileName, fileStrings);

        result[sourceFile.fileName] = fileStrings;
    })

    return result;
}

const scanProject = (node: ts.Node, filePath: string, result: string[]) => {

    ts.forEachChild(node, (child) =>
        scanProject(child, filePath, result));
}