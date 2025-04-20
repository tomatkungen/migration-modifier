import ts from "typescript";
import { ts_folder_struct } from "../file/ts_folder_struct";
import { pr_ts_folder_struct } from "../print/pr_ts_folder_struct";

export class TS_UTIL {

    constructor(
            private tsParseCommandLine: ts.ParsedCommandLine,
            private tsConfigPath: string
    ) { 
        this.tsParseCommandLine = tsParseCommandLine
        this.tsConfigPath = tsConfigPath
    }

    public prParseConfigFolders(): void {

        pr_ts_folder_struct(
            ts_folder_struct(
                this.tsParseCommandLine.fileNames,
                this.tsConfigPath
            )
        )
    }

    public prParseConfigFoldersFile(): void {

        pr_ts_folder_struct(
            ts_folder_struct(
                this.tsParseCommandLine.fileNames,
                this.tsConfigPath
            ),
            true
        )
    }
}