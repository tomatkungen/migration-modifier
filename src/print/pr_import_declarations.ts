import { Collection, ImportDeclaration } from "jscodeshift";
import { c_space } from "../util/util_console_log";
import { pr_import_declaration } from "./pr_import_declaration";
import { pr_specifier } from "./pr_specifier";

export const pr_import_declarations = (root: Collection<any>, importDeclarations: Collection<ImportDeclaration>) => {

    c_space(0, 'ImportDeclarations');

    importDeclarations.forEach((importDeclaration) => {

        // Print func
        pr_import_declaration(root, importDeclaration)

        // Print import functions
        importDeclaration.node.specifiers?.forEach((specifier) => {

            // Print import 
            pr_specifier(root, specifier)
        })
    });
}