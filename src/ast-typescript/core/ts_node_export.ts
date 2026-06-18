import ts from "typescript";

/**
 * 
 * export const x = 123;   // exported true
 * const y = 456;          // local false
 * 
 * const foo = 1;
 * export { foo }; -> exported true
 * 
 * @param tsNode 
 * @param tsChecker 
 * 
 * @return bool
 */
export const ts_node_export = (tsNode: ts.Node, tsChecker: ts.TypeChecker, tsSourceFile: ts.SourceFile): boolean => {
    if (ts.isVariableDeclaration(tsNode))
        return ts_node_var_export(tsNode, tsChecker)

    if (ts.isFunctionDeclaration(tsNode))
        return ts_node_fun_export(tsNode, tsChecker, tsSourceFile)

    return false;
}

const ts_node_var_export = (tsNode: ts.Node, tsChecker: ts.TypeChecker): boolean => {
    if (!ts.isVariableDeclaration(tsNode))
        return false

    const stmt = tsNode.parent.parent; // VariableStatement

    // Case 1: direct export keyword
    if (isNodeExported(stmt)) return true;

    // Case 2: export { foo }
    const symbol = tsChecker.getSymbolAtLocation(tsNode.name);
    if (!symbol) return false;

    for (const decl of symbol.declarations ?? []) {
        if (ts.isExportSpecifier(decl)) return true;
        if (ts.isExportAssignment(decl)) return true;
    }

    return false;
}

const ts_node_fun_export = (tsNode: ts.Node, tsChecker: ts.TypeChecker, tsSourceFile: ts.SourceFile): boolean => {
    if (!ts.isFunctionDeclaration(tsNode))
        return false;

    // Case 1: direct export keyword
    if (isNodeExported(tsNode)) return true;

    // Case 2: exported via export list or default export
    const symbol = tsChecker.getSymbolAtLocation(tsNode.name!);
    if (!symbol) return false;

    for (const decl of symbol.declarations ?? []) {
        if (ts.isExportSpecifier(decl)) return true;
        if (ts.isExportAssignment(decl)) return true;
    }

    let exported: boolean = false;

    // const apa = () => (); export { apa }
    ts.forEachChild(tsSourceFile, function visit(node) {
        if (ts.isExportAssignment(node)) {
            const exprSymbol = tsChecker.getSymbolAtLocation(node.expression);
            if (exprSymbol === symbol) {
                exported = true;
            }
        }
        ts.forEachChild(node, visit);
    });

    return exported;
}

// export const x = 1
const isNodeExported = (node: ts.Node): boolean => {
    // Case 1: has "export" keyword
    return (
        (ts.getCombinedModifierFlags(node as ts.Declaration) &
            ts.ModifierFlags.Export) !== 0
    );
}