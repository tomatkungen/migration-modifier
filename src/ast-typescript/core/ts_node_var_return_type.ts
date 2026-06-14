import ts from "typescript";
import { ts_node_text } from "./ts_node_text";
import { ts_node_var_export } from "./ts_node_var_export";

/**
 * initializer Variable declaration types
 * 
 * To get return type of init variable declaration it has to use ts.TypeChecker
 * Due to that typescript hides its return type
 * 
 * const A = 1; // number
 * const A = () => <div />; //ReactNode
 * const B = () => A();     // still returns JSX
 * const C = (): JSX.Element => foo();
 * 
 * ignores <MyComponet/> even if it is a variable declaration init in theory
 *
 * @returns NODE_TS
*/
export const ts_node_var_return_type = (ts_node: ts.Node, checker: ts.TypeChecker): string | undefined => {
    if (!ts.isVariableDeclaration(ts_node) || !ts_node.initializer) return;

    // Get the type of the initializer
    const type = checker.getTypeAtLocation(ts_node.initializer);

    // If it's a function, get its signature
    const signatures = type.getCallSignatures();
    if (signatures.length === 0) return undefined;

    // Return the function's return type
    const tsType =  signatures[0].getReturnType();

    return checker.typeToString(tsType);
}

// test - it take tag elemens as variable declaration
export const ts_scan_react = (checker: ts.TypeChecker,/*tsProgram: ts.Program,*/ tsNode: ts.Node, tsSource: ts.SourceFile) => {
    // const checker = tsProgram.getTypeChecker();

    // console.log('---', 'file', tsSource.fileName)
    const loop = (childNode: ts.Node) => {

        const symbol = checker.getSymbolAtLocation(childNode);
        const decl = symbol?.declarations?.[0];

        if (decl && ts.isVariableDeclaration(decl)) {
            const type = checker.getTypeAtLocation(decl.name);
            const signatures = type.getCallSignatures();

            if (signatures.length) {
                const returnType = checker.getReturnTypeOfSignature(signatures[0]);
                // console.log('1:', ts_node_text(childNode, tsSource), '=>', checker.typeToString(returnType));
            }
        }

        if (ts.isVariableDeclaration(childNode)) {
            const returnType = ts_node_var_return_type(childNode, checker);
            if (returnType) {

                console.log(
                    ts.SyntaxKind[childNode.kind],
                    '2:',
                    childNode.name.getText(),
                    "=>",
                    returnType,
                    'export',
                    ts_node_var_export(childNode, checker)
                );
                console.log('------')
            }
        }


        //ts.forEachChild(childNode, loop)
    }

    loop(tsNode);
}
