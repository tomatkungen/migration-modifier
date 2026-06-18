import { TS_NODES } from "./ts_node";
import { ts_react_file, TS_RECT_FILES } from "./ts_react_file";

export const ts_scan_react_files = (
    tsNodes: TS_NODES,
    tsFileReact: TS_RECT_FILES,
): void => {

    tsNodes.forEach((tsNode) => {
        // if File exist update
        const index = tsFileReact.findIndex((tsSourceFile) =>
            (tsSourceFile.tsFilepath === tsNode.filePath))

        if (index === -1)
            tsFileReact.push({ tsVarExports: [], tsVarLocals: [], tsElement: [], tsFilepath: tsNode.filePath, sum: "" })

        ts_react_file(
            tsFileReact[index === -1 ? tsFileReact.length - 1 : index],
            tsNode.nodeMetadata.isExported,
            tsNode.nodeMetadata.returnType ?? "",
            tsNode.nodeSyntaxKind,
            tsNode.nodeText
        )
    })

}