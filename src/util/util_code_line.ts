import jscodeshift, { Collection, } from "jscodeshift";
import { COLORS, COLOR, pr_green, pr_yellow } from "../print/pr_color";

export const util_code_line = (
    space: number = 0,
    color: Exclude<COLOR, 'END'> = 'GREEN',
    root: Collection<any>, 
    loc?: jscodeshift.SourceLocation | null
) => {
    if (!loc) {
        console.log('')
        return;
    }

    const lines = root.toSource().split('\n');

    const [startLine, startColumn, endLine, endColumn] = [
        loc.start.line, loc.start.column,
        loc.end.line, loc?.end.column
    ];

    const code = lines.reduce<string[]>((prev, line, index) => {

        if (startLine === index + 1 && index + 1 === endLine) {
            prev.push(
                `${index + 1}: ${line.slice(0, startColumn)}${COLORS[color]}${line.slice(startColumn, endColumn)}${COLORS.END}${line.slice(endColumn)}`
            )
        }

        if (startLine === index + 1 && index + 1 !== endLine)
            prev.push(`${line.slice(0, startColumn)}${COLORS[color]}${line.slice(startColumn)}`)


        if (endLine === index + 1 && index + 1 !== startLine)
            prev.push(`${line.slice(0, endColumn)}${COLORS.END}${line.slice(endColumn)}`)

        if (startLine < index + 1  && index + 1 < endLine)
            prev.push(line)

        return prev;
    }, []).join('\n')

    console.log(`${(new Array(space + 1)).join('  ')}`, code)
}