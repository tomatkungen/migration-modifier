import ts from "typescript";
import { ts_node_export } from "./ts_node_export";

export const ts_node_return_type = (tsNode: ts.Node, tsTypeChecker: ts.TypeChecker): string | undefined => {

    if (ts.isVariableDeclaration(tsNode) && ts.isCatchClause(tsNode.parent))
        return ts_node_catch_clause(tsNode.parent, tsTypeChecker);

    if (ts.isVariableDeclaration(tsNode))
        return ts_node_variable_declaration(tsNode, tsTypeChecker)

    if (ts.isFunctionDeclaration(tsNode))
        return ts_node_function_declaration(tsNode, tsTypeChecker)

    // if (ts.isJsxSelfClosingElement(tsNode) || ts.isJsxOpeningElement(tsNode))
    //     return ts_node_jsx_element(tsNode)
}



/**
 * 
 * try { } catch (error) { } 
 * error is variableDeclaraton
 * 
 * @param tsNode 
 * @param tsTypeChecker 
 * @returns 
 */
const ts_node_catch_clause = (tsNode: ts.Node, tsTypeChecker: ts.TypeChecker) => {
    if (!ts.isCatchClause(tsNode))
        return;

    const variable = tsNode.variableDeclaration;
    if (!variable) return undefined;

    const symbol = tsTypeChecker.getSymbolAtLocation(variable.name);
    if (!symbol) return undefined;

    const tsType = tsTypeChecker.getTypeOfSymbolAtLocation(symbol, variable.name);

    return tsTypeChecker.typeToString(tsType);
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
const ts_node_variable_declaration = (tsNode: ts.Node, tsTypeChecker: ts.TypeChecker): string | undefined => {
    if (!ts.isVariableDeclaration(tsNode) || !tsNode.initializer) return;

    /*
        const w = (tag.current.input as HTMLInputElement).value
        // .value is the initalizer as property'AccessExpression
    */
    if (ts.isPropertyAccessExpression(tsNode.initializer)) {
        const tsType = tsTypeChecker.getTypeAtLocation(tsNode.initializer)
        
        return tsTypeChecker.typeToString(tsType)
    }

    /*
        function foo() { return { x: 123 }; }
        const a = foo(); // foo() the initializer as callExpression
    */
    if (ts.isCallExpression(tsNode.initializer)) {
        const signature = tsTypeChecker.getResolvedSignature(tsNode.initializer);

        if (signature) {
            const returnType = tsTypeChecker.getReturnTypeOfSignature(signature);
            return tsTypeChecker.typeToString(returnType)
        }
    }

    // Get the type of the initializer
    const type = tsTypeChecker.getTypeAtLocation(tsNode.initializer);

    // If it's a function, get its signature
    const signatures = type.getCallSignatures();
    if (signatures.length === 0) return ts_node_element_declaration(tsNode, tsTypeChecker);

    // Return the function's return type
    const tsType = signatures[0].getReturnType();

    return tsTypeChecker.typeToString(tsType);
}

const ts_node_element_declaration = (tsNode: ts.Node, tsTypeChecker: ts.TypeChecker) => {
    const symbol = tsTypeChecker.getSymbolAtLocation(tsNode);
    const decl = symbol?.declarations?.[0];

    if (decl && ts.isVariableDeclaration(decl)) {
        const type = tsTypeChecker.getTypeAtLocation(decl.name);
        const signatures = type.getCallSignatures();

        if (signatures.length) {
            const returnType = tsTypeChecker.getReturnTypeOfSignature(signatures[0]);

            return tsTypeChecker.typeToString(returnType);
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
 * @param tsTypeDhecker 
 * @returns 
 */
const ts_node_function_declaration = (ts_node: ts.Node, tsTypeDhecker: ts.TypeChecker) => {
    if (!ts.isFunctionDeclaration(ts_node)) return;

    const tsSignature = tsTypeDhecker.getSignatureFromDeclaration(ts_node);
    if (!tsSignature) return;

    const tsType = tsSignature.getReturnType();

    return tsTypeDhecker.typeToString(tsType);
}

// test - it take tag elemens as variable declaration
export const ts_scan_react = (tsTypeChecker: ts.TypeChecker,/*tsProgram: ts.Program,*/ tsNode: ts.Node, tsSource: ts.SourceFile) => {
    // const checker = tsProgram.getTypeChecker();

    // console.log('---', 'file', tsSource.fileName)
    const loop = (childNode: ts.Node) => {

        const symbol = tsTypeChecker.getSymbolAtLocation(childNode);
        const decl = symbol?.declarations?.[0];

        if (decl && ts.isVariableDeclaration(decl)) {
            // if (decl && ts.isJsxSelfClosingElement(childNode))
            const type = tsTypeChecker.getTypeAtLocation(decl.name);
            const signatures = type.getCallSignatures();

            if (signatures.length) {
                const returnType = tsTypeChecker.getReturnTypeOfSignature(signatures[0]);
                // console.log('1:', ts_node_text(childNode, tsSource), '=>', checker.typeToString(returnType));
            }
        }

        if (ts.isVariableDeclaration(childNode)) {
            const returnType = ts_node_return_type(childNode, tsTypeChecker);
            if (returnType) {

                console.log(
                    ts.SyntaxKind[childNode.kind],
                    '2:',
                    childNode.name.getText(),
                    "=>",
                    returnType,
                    'export',
                    ts_node_export(childNode, tsTypeChecker, tsSource)
                );
                console.log('------')
            }
        }


        //ts.forEachChild(childNode, loop)
    }

    loop(tsNode);
}
