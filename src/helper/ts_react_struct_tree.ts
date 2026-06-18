import path from "node:path";
import ts from "typescript";
import { TS_NODES } from "../ast-typescript/core/ts_node";
import { ts_source_files } from "../ast-typescript/core/ts_source_files";
import { ts_scan_nodes } from "../ast-typescript/core/ts_scan_nodes";
import { ts_react_tree } from "./ts_react_tree";

export const ts_react_struct_tree = (tsProgram: ts.Program, tsConfigPath: string) => {
    const tsSourceFiles = ts_source_files(tsProgram);
    const tsChecker = tsProgram.getTypeChecker();

    const tsNodes: TS_NODES = [];

    // React render and export constant 
    for (const tsSourceFile of tsSourceFiles) {
        if (!tsSourceFile.fileName.endsWith('.tsx'))
            continue;
// console.log(tsSourceFile.fileName);
        ts_scan_nodes(
            tsSourceFile,
            tsSourceFile.fileName,
            tsNodes,
            [ 'VariableDeclaration', 'JsxSelfClosingElement', 'JsxOpeningElement', 'FunctionDeclaration'],
            tsSourceFile,
            tsChecker
        )
    }

    // Remove absolute path and keep relative to tsconfig
    for (const tsNode of tsNodes) {
        tsNode.filePath = tsNode.filePath.replace(path.dirname(tsConfigPath), '')
    }

    ts_react_tree(tsNodes)

    return tsNodes;
}

