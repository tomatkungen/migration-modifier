import ts from "typescript";
import { ts_node_text } from "./ts_node_text";
import { ts_node_return_type } from "./ts_node_return_type";
import { ts_node_export } from "./ts_node_export";

export type TS_NODE = {
    filePath: string;
    nodeText: string;
    nodeSyntaxKind: keyof typeof ts.SyntaxKind; //string;
    parentText: string;
    parentSyntaxKind: string;
    start: number;
    end: number;
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
    nodeMetadata: {
        returnType?: string,
        isExported: boolean;
    }
}

export type TS_NODES = TS_NODE[];

export const ts_node = (
    filePath: string,
    node: ts.LiteralLikeNode,
    tsSourceFile: ts.SourceFile,
    checker: ts.TypeChecker,
    parentNode?: ts.LiteralLikeNode,
): TS_NODE => {
    // Get Code line number in file 
    const startPos = tsSourceFile.getLineAndCharacterOfPosition(node.getStart(tsSourceFile))
    const endPos = tsSourceFile.getLineAndCharacterOfPosition(node.getEnd())

    return {
        filePath,
        nodeText: ts_node_text(node, tsSourceFile),
        nodeSyntaxKind: ts.SyntaxKind[node.kind] as keyof typeof ts.SyntaxKind,
        parentText: (
            (node.parent && ('text' in node.parent) && typeof node.text === 'string' && node.text) ||
            (parentNode && ('text' in parentNode) && typeof parentNode.text === 'string' && parentNode.text) ||
            (parentNode && parentNode.getFullText(tsSourceFile)) || '-'
        ),
        parentSyntaxKind: (
            node.parent ? ts.SyntaxKind[node.parent.kind] :
                parentNode ? ts.SyntaxKind[parentNode.kind] :
                    ts.SyntaxKind[0]
        ),
        start: node.getStart(tsSourceFile),
        end: node.getEnd(),
        startLine: startPos.line + 1,
        startColumn: startPos.character + 1,
        endLine: endPos.line + 1,
        endColumn: endPos.character + 1,
        nodeMetadata: {
            returnType: ts_node_return_type(node, checker),
            isExported: ts_node_export(node, checker, tsSourceFile)
        }
    }
}