import path from "path";

type filename = string;
type folderpath = string;
type TSFolderStruct = { files: filename[] }

export type TSFolderStructTree = {
    [index: folderpath]: (TSFolderStructTree | TSFolderStruct)
};

/**
 * Generates a nested folder structure object from an array of file paths.
 * Optionally, makes file paths relative to the base path of a provided tsconfig.json file.
 *
 * Each folder in the structure contains a `files` array listing the files directly within it.
 *
 * @param filePaths - Array of absolute or relative file paths to include in the structure.
 * @param tsConfigPath - Optional path to a tsconfig.json file; if provided, file paths are made relative to its directory.
 * 
 * Example:
 * /apps/code/type.ts
 * 
 * { apps: { files: [] }, code: { files: [types.ts] } }
 * 
 * @returns A nested object representing the folder structure, where each folder is a key containing a `files` array and subfolders.
 */
export const ts_folder_struct_tree = (filePaths: string[], tsConfigPath?: string): TSFolderStructTree => {

    // ~/apps/code/tsconfig.json -> apps/code/ | undefined
    const basePath = tsConfigPath && path.dirname(tsConfigPath);

    return filePaths
        .map((p) =>
            // If tsConfigPath is provided, we need to make the paths relative to the base path of the tsconfig.json file
            // ~/apps/code/my/src/my.ts -> my/src/my.ts
            (basePath ? path.relative(basePath, p) : p)
        )
        // Iterate over the paths and create the folder structure
        .reduce<TSFolderStructTree>((prev, curr) => {
            let pointer: TSFolderStructTree  = prev
            path
                .dirname(curr) // my/src
                .split(path.sep) // [my,src]
                .forEach((p, index, ary) => {
                    !pointer[p] && (pointer[p] = { }); // Create empty if not exist
                    (index === ary.length - 1) && !Array.isArray(pointer[p].files) && (pointer[p].files = []); // Create files object if last item
                    (index === ary.length - 1) && Array.isArray(pointer[p].files) && pointer[p].files.push(path.basename(curr)); // add filename to the last folder

                    // @ts-ignore
                    pointer = pointer[p];
                })

            return prev;
        }, {})
}