import { TSFolderStructTree } from "../ast-typescript/core/ts_struct_tree/ts_folder_struct_tree";
import { pr_green, pr_yellow } from "./pr_color";

export const pr_ts_folder_struct = (folderStruct: TSFolderStructTree, showFiles: boolean = false) => {
    const res = JSON.stringify(folderStruct, (key, value) => {
        if (showFiles) return value;

        if (key === "files") return undefined;

        if (
            typeof value === 'object' && 
            Object.keys(value).length === 1 && 
            value.files
        )
            return ""

        return value;
    }, 2)

    console.log(
        res
            .replace(/"([^"]+)":/g, (_, key) => `${pr_green(`${key}`)}:`)
            .replace(/{|}/g, (token, _) => `${pr_yellow(`${token}`)}:`)
            .replace(/: ""|: ""|:|"|,/g, '')
            .replace(/:/g, '')
    );
}