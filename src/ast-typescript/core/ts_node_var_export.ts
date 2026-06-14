import { off } from "node:cluster";
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
export const ts_node_var_export = (tsNode: ts.Node, tsChecker: ts.TypeChecker) => {
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

// export const x = 1
function isNodeExported(node: ts.Node): boolean {
    // Case 1: has "export" keyword
    return (
        (ts.getCombinedModifierFlags(node as ts.Declaration) &
            ts.ModifierFlags.Export) !== 0
    );
}