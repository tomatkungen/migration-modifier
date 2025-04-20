import ts from 'typescript';

export const printRecursiveFrom = (
    node: ts.Node, indentLevel: number, sourceFile: ts.SourceFile
) => {
    const indentation = "-".repeat(indentLevel);
    const syntaxKind = ts.SyntaxKind[node.kind];
    const nodeText = node.getText(sourceFile);
    console.log(`${indentation}-x-${syntaxKind}: y${nodeText}y`);

    node.forEachChild(child =>
        printRecursiveFrom(child, indentLevel + 1, sourceFile)
    );
}