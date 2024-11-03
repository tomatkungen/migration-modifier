import jscodeshift, { ASTPath, CallExpression, Collection } from "jscodeshift";
import { util_code_line } from "../util/util_code_line";
import { c_return, c_space } from "../util/util_console_log";
import { pr_green, pr_red } from "./pr_color";

export const pr_call_expression = (space: number, root: Collection<any>, callExpression: ASTPath<CallExpression>) => {

    c_space(space, `${callExpression.value.type}`);
    util_code_line(space, 'YELLOW', root, callExpression.value.loc)
    
    if (jscodeshift.Identifier.check(callExpression.value.callee)) {
        const calleeType = callExpression.value.callee.type
        const calleeName = callExpression.value.callee.name

        c_space(space + 1, `callee.${calleeType} - <${pr_green(calleeName)}>`);
        util_code_line(space + 1, 'GREEN', root, callExpression.value.callee.loc)

        c_return()
        return;
    }

    // Unhandle Error
    util_code_line(space + 1, 'RED', root, callExpression.value.loc)
    c_return();
}