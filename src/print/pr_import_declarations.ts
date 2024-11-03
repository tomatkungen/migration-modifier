import { Collection, ImportDeclaration } from "jscodeshift";
import { c_space } from "../util/util_console_log";
import { pr_import_declaration } from "./pr_import_declaration";

export const pr_import_declarations = (root: Collection<any>,importDeclarations: Collection<ImportDeclaration>) => {

    c_space(0, 'ImportDeclarations');

    importDeclarations.forEach((importDeclaration) => {

        // Print func
        pr_import_declaration(root, importDeclaration)
    });
}