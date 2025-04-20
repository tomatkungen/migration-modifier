import path from "path";

export type TSFolderStruct = object;

export const ts_folder_struct = (filePaths: string[], tsConfigPath?: string): TSFolderStruct => {

    let paths = filePaths;

    if (tsConfigPath) {
        const basePath = path.dirname(tsConfigPath)
        paths = paths.map((p) => path.relative(basePath, p))
    }

    const folderStructRef: TSFolderStruct = {}

    paths.forEach((filePath) => {
        
        let pointerRef = folderStructRef;

        const dirName = path.dirname(filePath);
        
        dirName.split('/').forEach((p) => {
            
            if (p === "") return;

            if (!pointerRef[p])
                pointerRef[p] = {
                    files: []
                };

            pointerRef[p]
                .files
                .push(
                    filePath.replace(`${dirName}/`, '')
                )
 
            pointerRef = pointerRef[p]
        });

    })

    return folderStructRef;
}