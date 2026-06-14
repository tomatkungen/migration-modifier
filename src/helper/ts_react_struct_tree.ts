import path from "node:path";
import ts from "typescript";
import { TS_NODES } from "../ast-typescript/core/ts_node";
import { ts_source_files } from "../ast-typescript/core/ts_source_files";
import { ts_scan } from "../ast-typescript/core/ts_scan";

export const ts_react_struct_tree = (tsProgram: ts.Program, tsConfigPath: string) => {
    const tsSourceFiles = ts_source_files(tsProgram);
    const tsChecker = tsProgram.getTypeChecker();

    const tsNodes: TS_NODES = [];

    // React render
    for (const tsSourceFile of tsSourceFiles) {
        if (!tsSourceFile.fileName.endsWith('.tsx'))
            continue;
// console.log(tsSourceFile.fileName);
        ts_scan(
            tsSourceFile,
            tsSourceFile.fileName,
            tsNodes,
            [ 'VariableDeclaration'],
            tsSourceFile,
            tsChecker
        )
    }

    // Remove absolute path and keep relative to tsconfig
    for (const tsNode of tsNodes) {
        tsNode.filePath = tsNode.filePath.replace(path.dirname(tsConfigPath), '')
    }

    return tsNodes;
}

