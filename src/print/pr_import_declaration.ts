import { ASTPath, Collection, ImportDeclaration } from "jscodeshift";
// import { pr_specifier } from "./pr_specifier";
import { c_space } from "../util/util_console_log";
import { pr_yellow } from "./pr_color";
import { util_code_line } from "../util/util_code_line";

export const pr_import_declaration = (root: Collection<any>, importDeclaration: ASTPath<ImportDeclaration>) => {

    const nodeType = importDeclaration.node.type
    c_space(1, nodeType);
    
    // Print package
    const sourceType = importDeclaration.node.source.type;
    const sourceValue = importDeclaration.node.source.value;

    c_space(2, `${sourceType} - <${pr_yellow(sourceValue)}>`);
    util_code_line(2, 'YELLOW', root, importDeclaration.node.source.loc)

    // Print import functions
    // importDeclaration.node.specifiers?.forEach((specifier) => {

    //     // Print import 
    //     pr_specifier(root, specifier)
    // })
}