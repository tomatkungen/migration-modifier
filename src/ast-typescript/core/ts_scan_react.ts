import ts from "typescript";
import { ts_node_text } from "./ts_node_text";

export const ts_scan_react = (tsProgram: ts.Program, tsNode: ts.Node, tsSource: ts.SourceFile) => {
    const checker = tsProgram.getTypeChecker();

    const loop = (childNode: ts.Node) => {

        const symbol = checker.getSymbolAtLocation(childNode);
        const decl = symbol?.declarations?.[0];

        if (decl && ts.isVariableDeclaration(decl)) {
            const type = checker.getTypeAtLocation(decl.name);
            const signatures = type.getCallSignatures();
    
            if (signatures.length) {
                const returnType = checker.getReturnTypeOfSignature(signatures[0]);
                console.log(tsSource.fileName)
                console.log(ts_node_text(childNode, tsSource), checker.typeToString(returnType));
                console.log();
            }
        }

        ts.forEachChild(childNode, loop)
    }

    loop(tsNode);
}