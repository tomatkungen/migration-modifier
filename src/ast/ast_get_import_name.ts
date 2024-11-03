import jscodeshift, {
    ASTPath,
    CallExpression,
    Collection,
    ImportDeclaration,
    ImportDefaultSpecifier,
    ImportSpecifier,
    MemberExpression
} from "jscodeshift";
import { pr_specifier } from "../print/pr_specifier";
import { c_space } from "../util/util_console_log";
import { ast_import_declarations } from "./ast_import_declarations";
import { pr_member_func_expression } from "../print/pr_member_func_expression";
import { pr_import_declaration } from "../print/pr_import_declaration";
import { pr_call_expression } from "../print/pr_call_expression";

export const ast_get_import_from = (
    root: Collection<any>,
    importName: string,
    fromName: string,
    print: boolean = false
) => {

    // Get all Impors
    const importDeclarations = ast_import_declarations(root)

    print && c_space(0, 'ImportDeclarations');

    // Loop all import declarations
    importDeclarations.forEach((importDeclaration) => {

        // Return if module name not found
        if (importDeclaration.node.source.value !== fromName) return;

        print && pr_import_declaration(root, importDeclaration)

        // Get module functions
        geModuleNamesByImportDeclaration(
            root,
            importDeclaration,
            importName,
            print
        );
    });
}

const geModuleNamesByImportDeclaration = (
    root: Collection<any>,
    importDeclaration: ASTPath<ImportDeclaration>,
    importName: string,
    print: boolean = false
) => {

    const astNodeExpression: (ASTPath<MemberExpression> | ASTPath<CallExpression>)[] = []

    importDeclaration.node.specifiers?.forEach((specifier) => {

        if (ImportSpecifier.check(specifier)) {

            root.find(
                jscodeshift.CallExpression, {
                callee: {
                    name: specifier.local?.name || specifier.imported.name // type: 'Identifier',
                }
            }
            ).forEach((callExpression) => {
                if (specifier.imported.name !== importName) 
                    return;

                // print Import
                print && pr_specifier(root, specifier);

                if (jscodeshift.Identifier.check(callExpression.value.callee)) {

                    print && pr_call_expression(5, root, callExpression)

                    astNodeExpression.push(callExpression);
                    return;
                }
            })
        }

        if (ImportDefaultSpecifier.check(specifier)) {

            root.find(jscodeshift.MemberExpression, {
                object: { name: specifier.local?.name }, // type: 'Identifier',
                property: { name: importName } // type: 'Identifier'
            }).forEach((memberFuncExpression) => {
                // print Import 
                print && pr_specifier(root, specifier);

                print && pr_member_func_expression(5, root, memberFuncExpression);

                astNodeExpression.push(memberFuncExpression);
            })
        }

        // if (ImportNamespaceSpecifier.check(specifier) && specifier.local?.name === moduleName) {
        //     importName.importName = specifier.local?.name ?? ''
        //     importName.localName = specifier.local?.name ?? ''
        //     importName.moduleType = 'ImportNamespace'
        // }
    })

}