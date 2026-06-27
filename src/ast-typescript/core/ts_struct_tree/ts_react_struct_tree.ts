import path from "node:path";
import ts from "typescript";
import { TS_NODES } from "../ts_node";
import { ts_scan_files_nodes } from "../ts_scan/ts_scan_files_nodes";
import { ts_source_files } from "../ts_source_files";
import { ts_scan_react_files } from "../ts_scan/ts_scan_react_files";

export const ts_react_struct_tree = (tsProgram: ts.Program, tsConfigPath: string, tsChecker: ts.TypeChecker) => {

    // React render and export constan
    const tsNodes: TS_NODES = ts_scan_files_nodes(
        ts_source_files(tsProgram),
        tsChecker,
        [ 'VariableDeclaration', 'JsxSelfClosingElement', 'JsxOpeningElement', 'FunctionDeclaration'],
        ".ts"
    );

    // Remove absolute path and keep relative to tsconfig
    for (const tsNode of tsNodes) {
        tsNode.filePath = tsNode.filePath.replace(path.dirname(tsConfigPath), '')
    }

    // React tree files
    const tsReactFiles = ts_scan_react_files(tsNodes)

    console.log(tsReactFiles);

    return tsNodes;
}

