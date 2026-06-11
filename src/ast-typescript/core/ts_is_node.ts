import ts from "typescript";

export const ts_is_node = (
    tsNode: ts.Node,
    syntaxKinds: (keyof typeof ts.SyntaxKind)[]
) => (syntaxKinds.some((syntaxKind) => {
    
    switch (syntaxKind) {
        case 'JsxOpeningElement':
            return ts.isJsxOpeningElement(tsNode)
        case 'JsxSelfClosingElement':
            return ts.isJsxSelfClosingElement(tsNode);
        case 'StringLiteral':
            return ts.isStringLiteral(tsNode);
        case 'NoSubstitutionTemplateLiteral':
            return ts.isNoSubstitutionTemplateLiteral(tsNode);
        case 'ImportClause':
            return ts.isImportClause(tsNode);
        default:
            return false;
    }

}))
