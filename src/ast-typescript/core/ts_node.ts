import ts from "typescript";

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

export const getTSNode = (
    filePath: string,
    node: ts.LiteralLikeNode,
    sourceFile: ts.SourceFile,
    parentNode?: ts.LiteralLikeNode,
): TS_NODE => {
    return {
        filePath,
        nodeText: 'text' in node && node.text || node.getText(sourceFile),
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
        startLine: 0,
        startColumn: 0,
        endLine: 0,
        endColumn: 0
    }
}