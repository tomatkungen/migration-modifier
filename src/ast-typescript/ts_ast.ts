import ts from "typescript";
import { ts_parse_config } from "./core/ts_parse_config";
import { ts_read_config_file } from "./core/ts_read_config_file";
import { TS_UTIL } from "./ts_util";

export class TS_AST {

    // This is the parsed command line options from the tsconfig.json file
    private tsParseCommandLine: ts.ParsedCommandLine
    // This is the path to the tsconfig.json file
    private tsConfigPath: string;

    private ts_util: TS_UTIL;

    constructor(tsConfigPath: string) {
        
        this.tsConfigPath = tsConfigPath;
        this.tsParseCommandLine = this.tsParseConfig(tsConfigPath);
        
        this.ts_util = new TS_UTIL(this.tsParseCommandLine, this.tsConfigPath);
    }

    private tsParseConfig(tsConfigPath: string): ts.ParsedCommandLine {

        return ts_parse_config(
            ts_read_config_file(tsConfigPath),
            tsConfigPath
        )
    }

    public getParsedConfigFiles(): string[] {
        return (
            !this.tsParseCommandLine ?
                [] : 
                this.tsParseCommandLine.fileNames
        )
    }

    public getUtil(): TS_UTIL {
        return this.ts_util;
    }
}

