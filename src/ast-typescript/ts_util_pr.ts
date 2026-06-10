import ts from "typescript";
import { ts_folder_struct_tree } from "../file/ts_folder_struct_tree";
import { pr_ts_folder_struct } from "../print/pr_ts_folder_struct";

export class TS_UTIL_PR {

    constructor(
            private tsParseCommandLine: ts.ParsedCommandLine,
            private tsConfigPath: string,
            private tsProgram: ts.Program
    ) { }

    public prParseConfigFolders(): void {

        pr_ts_folder_struct(
            ts_folder_struct_tree(
                this.tsParseCommandLine.fileNames,
                this.tsConfigPath
            )
        )
    }

    public prParseConfigFoldersFile(): void {

        pr_ts_folder_struct(
            ts_folder_struct_tree(
                this.tsParseCommandLine.fileNames,
                this.tsConfigPath
            ),
            true
        )
    }

    public prParseReactTree(filenames: string[]): void {
        pr_ts_react_struct(

        )
    }
}