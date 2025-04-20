import ts from "typescript";
import * as path from "path";

export const ts_parse_config = (
    config: { config?: any; error?: ts.Diagnostic; },
    tsConfigPath: string
): ts.ParsedCommandLine => {

    const parsedCommandLine = ts.parseJsonConfigFileContent(
        config,
        ts.sys,
        path.dirname(tsConfigPath),
    );

    if (parsedCommandLine.errors.length) {
        throw new Error(`Could not parse tsconfig.json: ${parsedCommandLine.errors.map(e => e.messageText).join(', ')}`);
    }

    return parsedCommandLine;
}
