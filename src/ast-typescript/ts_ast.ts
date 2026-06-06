import ts from "typescript";
import { ts_parse_config } from "./core/ts_parse_config";
import { ts_read_config_file } from "./core/ts_read_config_file";
import { TS_UTIL } from "./ts_util";
import { ts_engine } from "./core/ts_engine";
import { TS_RULES } from "./ts_rules";

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

    public searchAll(): TS_RULES {
        
        const sourceFiles = ts_engine(
            this.tsParseCommandLine.fileNames,
            this.tsParseCommandLine.options
        )

        return new TS_RULES(sourceFiles)
    }

    public searchFile(fileNames: string[]): TS_RULES {
        const result = ts_engine(
            fileNames,
            this.tsParseCommandLine.options
        )

        return new TS_RULES(result)
    }

    public getParsedConfigFiles(): string[] {
        return (!this.tsParseCommandLine ? [] : this.tsParseCommandLine.fileNames)
    }

    public getUtil(): TS_UTIL { return this.ts_util; }
}

