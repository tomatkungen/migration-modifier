import path from "node:path";
import ts from "typescript";
import { TS_NODES } from "../ast-typescript/core/ts_node";
import { ts_source_files } from "../ast-typescript/core/ts_source_files";
import { ts_scan } from "../ast-typescript/core/ts_scan";

export const ts_react_struct_tree = (tsProgram: ts.Program) => {
    const tsSourceFiles = ts_source_files(tsProgram);
    
    const tsNodes: TS_NODES = [];

    // const recursiveTreeNode = (node: ts.Node) => {
        // if (ts_is_node(node, ['JsxOpeningElement', 'JsxSelfClosingElement'])) {
        //     console.log(node.getText())
        // }

        // if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node))
        //     console.log(node.tagName.getText());
    //     if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
    //         const tag = 'text' in node && node.text || node.getText()
    //         console.log(tag);
    //     }

    //     ts.forEachChild(node, recursiveTreeNode)
    // }

    for (const tsSourceFile of tsSourceFiles) {
        if (!tsSourceFile.fileName.endsWith('.tsx'))
            continue;
 
        ts_scan(
            tsSourceFile,
            tsSourceFile.fileName,
            tsNodes,
            ['JsxOpeningElement', 'JsxSelfClosingElement'],
            tsSourceFile
        )
    }

    return tsNodes;
}

