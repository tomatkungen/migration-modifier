import { TS_NODES } from "../ts_node";
import { ts_react_file, TS_RECT_FILES } from "../ts_react_file";

export const ts_scan_react_files = (
    tsNodes: TS_NODES,
): TS_RECT_FILES => {
    return tsNodes.reduce<TS_RECT_FILES>((tsFileReact, tsNode) => {
        // if File exist update
        const index = tsFileReact.findIndex((tsSourceFile) =>
            (tsSourceFile.tsFilepath === tsNode.filePath))

        if (index === -1)
            tsFileReact.push({
                tsFunExports: [],
                tsFunLocals: [],
                tsVarExports: [],
                tsVarLocals: [],
                tsElement: [],
                tsFilepath: tsNode.filePath,
                sum: ""
            })

        ts_react_file(
            tsFileReact[index === -1 ? tsFileReact.length - 1 : index],
            tsNode
        )

        return tsFileReact;
    }, [])
}