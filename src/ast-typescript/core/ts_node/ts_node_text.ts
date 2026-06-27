import ts from "typescript";

export const ts_node_text = (tsNode: ts.Node, tsSource: ts.SourceFile): string => {
    if (ts.isJsxElement(tsNode)) {
        return tsNode.openingElement.tagName.getText(tsSource);
    }

    if (ts.isJsxSelfClosingElement(tsNode)) {
        return tsNode.tagName.getText(tsSource);
    }

    if (ts.isJsxOpeningElement(tsNode)) {
        return tsNode.tagName.getText(tsSource);
    }

    if (ts.isVariableDeclaration(tsNode)) {
        return tsNode.name.getText();
    }

    if (ts.isFunctionDeclaration(tsNode) && tsNode.name) {
        return tsNode.name.getText();
    }

    return 'text' in tsNode && tsNode.text as string || tsNode.getText(tsSource)
}