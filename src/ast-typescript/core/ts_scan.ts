import ts from "typescript";
import { ts_node, TS_NODES } from "./ts_node";
import { ts_is_node } from "./ts_is_node";

export const ts_scan = (
    node: ts.Node,
    filePath: string,
    tsNodes: TS_NODES,
    syntaxKinds: (keyof typeof ts.SyntaxKind)[],
    sourceFile: ts.SourceFile,
    parentNode?: ts.Node,
) => {

    if (ts_is_node(node, syntaxKinds)) 
        tsNodes.push(ts_node(
            filePath,
            node as ts.LiteralLikeNode,
            sourceFile,
            parentNode as ts.LiteralLikeNode
        ));

    ts.forEachChild(node, (childNode) =>
        ts_scan(childNode, filePath, tsNodes, syntaxKinds,sourceFile, node));
}

// @deprecated use ts_is_node instead
const isTsNode = (
    node: ts.Node,
    // filePath: string,
    // tsNodes: TS_NODES,
    syntaxKinds: (keyof typeof ts.SyntaxKind)[],
    // sourceFile: ts.SourceFile,
    // parentNode?: ts.Node,
): boolean => {

    return syntaxKinds.some((syntaxKind) => {

        switch (syntaxKind) {
            case 'StringLiteral':
                return ts.isStringLiteral(node);
            case 'NoSubstitutionTemplateLiteral':
                return ts.isNoSubstitutionTemplateLiteral(node);
            case 'ImportClause':
                return ts.isImportClause(node);
            default:
                return false;
        }
    });
    
    // syntaxKinds.forEach((_syntaxKind) => {
    // if (!TS_RULES.tsSyntaxKind.includes(syntaxKind)) return;

    // if (node.parent && ts.isImportDeclaration(node.parent) && ts.isStringLiteral(node)) {
    //     console.log('node', node.text);
    //     result.push(node.text);
    // }

    // if (ts.isStringLiteral(node)) {

    //     tsNodes.push(getTSNode(
    //         filePath,
    //         node,
    //         sourceFile,
    //         parentNode as ts.LiteralLikeNode
    //     ));
    // }

    // if (ts.isNoSubstitutionTemplateLiteral(node)) {
    //     tsNodes.push(getTSNode(
    //         filePath,
    //         node,
    //         sourceFile,
    //         parentNode as ts.LiteralLikeNode
    //     ));
    // }
    // })
}