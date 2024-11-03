import jscodeshift, { ASTPath, Collection, MemberExpression } from "jscodeshift";
import { c_return, c_space } from "../util/util_console_log";
import { pr_green } from "./pr_color";
import { util_code_line } from "../util/util_code_line";

export const pr_member_func_expression = (space: number, root: Collection<any>, memberExpression: ASTPath<MemberExpression>) => {

    c_space(space, `${memberExpression.value.type}`);
    util_code_line(space, 'YELLOW', root, memberExpression.value.loc)

    if (
        jscodeshift.Identifier.check(memberExpression.value.object) &&
        jscodeshift.Identifier.check(memberExpression.value.property)
    ) {
        c_space(space + 1, `object.${memberExpression.value.object.type} - <${pr_green(memberExpression.value.object.name)}>`);
        util_code_line(space + 1, 'GREEN', root, memberExpression.value.object.loc)

        c_space(space + 1, `property.${memberExpression.value.property.type} - <${pr_green(memberExpression.value.property.name)}>`);
        util_code_line(space + 1, 'GREEN', root, memberExpression.value.property.loc)
        c_return()
        return
    }

    if (jscodeshift.Identifier.check(memberExpression.value.object)) {
        c_space(space + 1, `object.${memberExpression.value.object.type} - <${pr_green(memberExpression.value.object.name)}>`);
        util_code_line(space + 1, 'GREEN', root, memberExpression.value.object.loc)
        c_return()
        return
    }

    if (jscodeshift.Identifier.check(memberExpression.value.property)) {
        c_space(space + 1, `property.${memberExpression.value.property.type} - <${pr_green(memberExpression.value.property.name)}>`);
        util_code_line(space + 1, 'GREEN', root, memberExpression.value.property.loc)
        c_return()
        return
    }

    util_code_line(space, 'RED', root, memberExpression.value.loc)
    c_return()
}