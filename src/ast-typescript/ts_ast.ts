import ts from "typescript";
import { ts_parse_config } from "./core/ts_parse_config";
import { ts_read_config_file } from "./core/ts_read_config_file";
import { TS_UTIL_PR } from "./ts_util_pr";
import { ts_source_files } from "./core/ts_source_files";
import { TS_RULES } from "./ts_rules";

export class TS_AST {

    // This is the parsed command line options from the tsconfig.json file
    private tsParseCommandLine: ts.ParsedCommandLine
    // This is the path to the tsconfig.json file
    private tsConfigPath: string;
    // 
    private tsProgram: ts.Program;

    private ts_util_pr: TS_UTIL_PR;

    constructor(tsConfigPath: string) {
        
        this.tsConfigPath = tsConfigPath;
        this.tsParseCommandLine = this.tsParseConfig(tsConfigPath);
        this.tsProgram = ts.createProgram(this.tsParseCommandLine.fileNames, this.tsParseCommandLine.options)
        
        this.ts_util_pr = new TS_UTIL_PR(
            this.tsParseCommandLine,
            this.tsConfigPath,
            this.tsProgram
        );
    }

    private tsParseConfig(tsConfigPath: string): ts.ParsedCommandLine {

        return ts_parse_config(
            ts_read_config_file(tsConfigPath),
            tsConfigPath
        )
    }

    public searchAll(): TS_RULES {
        
        const tsSourceFiles = ts_source_files(
            this.tsProgram
        )

        return new TS_RULES(tsSourceFiles)
    }

    public searchFile(fileNames: string[]): TS_RULES {
        const tsSourceFiles = ts_source_files(
            ts.createProgram(
                fileNames,
                this.tsParseCommandLine.options
            )
        )

        return new TS_RULES(tsSourceFiles)
    }                                                                   

    public getParsedConfigFiles(): string[] {
        return (!this.tsParseCommandLine ? [] : this.tsParseCommandLine.fileNames)
    }

    public getUtil(): TS_UTIL_PR { return this.ts_util_pr; }
}

