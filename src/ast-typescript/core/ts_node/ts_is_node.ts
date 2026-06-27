import ts from "typescript";

export const ts_is_node = (
    tsNode: ts.Node,
    syntaxKinds: (keyof typeof ts.SyntaxKind)[]
) => (syntaxKinds.some((syntaxKind) => {
    
    switch (syntaxKind) {
        case 'JsxOpeningElement':       // <elem>
            return ts.isJsxOpeningElement(tsNode)
        case 'JsxSelfClosingElement':   // <elem />
            return ts.isJsxSelfClosingElement(tsNode);
        case 'StringLiteral':           // "test"
            return ts.isStringLiteral(tsNode);
        case 'NoSubstitutionTemplateLiteral':
            return ts.isNoSubstitutionTemplateLiteral(tsNode);
        case 'ImportClause':
            return ts.isImportClause(tsNode);
        case 'VariableDeclaration':     // const <var> = <initater>
            return ts.isVariableDeclaration(tsNode);
        case 'FunctionDeclaration':     // myFunc() {}
            return ts.isFunctionDeclaration(tsNode);
        default:
            return false;
    }

}))
