import ts from "typescript";
import { ts_folder_struct_tree } from "./core/ts_struct_tree/ts_folder_struct_tree";
import { pr_ts_folder_struct } from "../print/pr_ts_folder_struct";
import { pr_ts_react_struct } from "../print/pr_ts_react_struct";
import { ts_react_struct_tree } from "./core/ts_struct_tree/ts_react_struct_tree";

export class TS_UTIL_PR {

    constructor(
            private tsParseCommandLine: ts.ParsedCommandLine,
            private tsConfigPath: string,
            private tsProgram: ts.Program,
            private tsTypeChecker: ts.TypeChecker
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

    public prParseConfigReactTree(): void {

        pr_ts_react_struct(
            ts_react_struct_tree(
                this.tsProgram,
                this.tsConfigPath,
                this.tsTypeChecker
            )
        )
    }
}