import ts from "typescript";
import { ts_node_export } from "./ts_node_export";

export const ts_node_return_type = (ts_node: ts.Node, checker: ts.TypeChecker): string | undefined => {

    if (ts.isVariableDeclaration(ts_node) && ts.isCatchClause(ts_node.parent))
        return ts_node_catch_clause(ts_node.parent, checker);

    if (ts.isVariableDeclaration(ts_node))
        return ts_node_variable_declaration(ts_node, checker)

    if (ts.isFunctionDeclaration(ts_node))
        return ts_node_function_declaration(ts_node, checker)
}

const ts_node_catch_clause = (tsNode: ts.Node, tsChecker: ts.TypeChecker) => {
    if (!ts.isCatchClause(tsNode))
        return;

    const variable = tsNode.variableDeclaration;
    if (!variable) return undefined;

    const symbol = tsChecker.getSymbolAtLocation(variable.name);
    if (!symbol) return undefined;

    const tsType = tsChecker.getTypeOfSymbolAtLocation(symbol, variable.name);

    return tsChecker.typeToString(tsType);
}

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
const ts_node_variable_declaration = (tsNode: ts.Node, tsChecker: ts.TypeChecker): string | undefined => {
    if (!ts.isVariableDeclaration(tsNode) || !tsNode.initializer) return;

    /*
        function foo() { return { x: 123 }; }
        const a = foo(); // foo() the initializer as callExpression
    */
    if (ts.isCallExpression(tsNode.initializer)) {
        const signature = tsChecker.getResolvedSignature(tsNode.initializer);

        if (signature) {
            const returnType = tsChecker.getReturnTypeOfSignature(signature);
            return tsChecker.typeToString(returnType)
        }
    }

    // Get the type of the initializer
    const type = tsChecker.getTypeAtLocation(tsNode.initializer);

    // If it's a function, get its signature
    const signatures = type.getCallSignatures();
    if (signatures.length === 0) return ts_node_element_declaration(tsNode, tsChecker);

    // Return the function's return type
    const tsType = signatures[0].getReturnType();

    return tsChecker.typeToString(tsType);
}

const ts_node_element_declaration = (tsNode: ts.Node, tsChecker: ts.TypeChecker) => {
    const symbol = tsChecker.getSymbolAtLocation(tsNode);
    const decl = symbol?.declarations?.[0];

    if (decl && ts.isVariableDeclaration(decl)) {
        const type = tsChecker.getTypeAtLocation(decl.name);
        const signatures = type.getCallSignatures();

        if (signatures.length) {
            const returnType = tsChecker.getReturnTypeOfSignature(signatures[0]);

            return tsChecker.typeToString(returnType);
            // console.log('1:', ts_node_text(childNode, tsSource), '=>', checker.typeToString(returnType));
        }
    }
}

/**
 * Function declaration type
 * 
 * function App() { return (<div></div>) }
 * 
 * @param ts_node 
 * @param checker 
 * @returns 
 */
const ts_node_function_declaration = (ts_node: ts.Node, checker: ts.TypeChecker) => {
    if (!ts.isFunctionDeclaration(ts_node)) return;

    const tsSignature = checker.getSignatureFromDeclaration(ts_node);
    if (!tsSignature) return;

    const tsType = tsSignature.getReturnType();

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
            // if (decl && ts.isJsxSelfClosingElement(childNode))
            const type = checker.getTypeAtLocation(decl.name);
            const signatures = type.getCallSignatures();

            if (signatures.length) {
                const returnType = checker.getReturnTypeOfSignature(signatures[0]);
                // console.log('1:', ts_node_text(childNode, tsSource), '=>', checker.typeToString(returnType));
            }
        }

        if (ts.isVariableDeclaration(childNode)) {
            const returnType = ts_node_return_type(childNode, checker);
            if (returnType) {

                console.log(
                    ts.SyntaxKind[childNode.kind],
                    '2:',
                    childNode.name.getText(),
                    "=>",
                    returnType,
                    'export',
                    ts_node_export(childNode, checker)
                );
                console.log('------')
            }
        }


        //ts.forEachChild(childNode, loop)
    }

    loop(tsNode);
}
