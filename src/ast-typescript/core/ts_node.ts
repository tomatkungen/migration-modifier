import ts from "typescript";
import { ts_node_text } from "./ts_node_text";

export type TS_NODE = {
    filePath: string;
    nodeText: string;
    nodeSyntaxKind: string;
    parentText: string;
    parentSyntaxKind: string;
    start: number;
    end: number;
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
}

export type TS_NODES = TS_NODE[];

export const ts_node = (
    filePath: string,
    node: ts.LiteralLikeNode,
    sourceFile: ts.SourceFile,
    parentNode?: ts.LiteralLikeNode,
): TS_NODE => {
    // Get Code line number in file 
    const startPos = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
    const endPos = sourceFile.getLineAndCharacterOfPosition(node.getEnd())

    return {
        filePath,
        nodeText: ts_node_text(node, sourceFile),
        nodeSyntaxKind: ts.SyntaxKind[node.kind],
        parentText: (
            (node.parent && ('text' in node.parent) && typeof node.text === 'string' && node.text) ||
            (parentNode && ('text' in parentNode) && typeof parentNode.text === 'string' && parentNode.text) ||
            (parentNode && parentNode.getFullText(sourceFile)) || '-'
        ),
        parentSyntaxKind: (
            node.parent ? ts.SyntaxKind[node.parent.kind] :
                parentNode ? ts.SyntaxKind[parentNode.kind] :
                    ts.SyntaxKind[0]
        ),
        start: node.getStart(sourceFile),
        end: node.getEnd(),
        startLine: startPos.line + 1,
        startColumn: startPos.character + 1,
        endLine: endPos.line + 1,
        endColumn: endPos.character + 1
    }
}