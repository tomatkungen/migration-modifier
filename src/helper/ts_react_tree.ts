import { TS_NODES } from "../ast-typescript/core/ts_node";
import { TS_RECT_FILES } from "../ast-typescript/core/ts_react_file";
import { ts_scan_react_files } from "../ast-typescript/core/ts_scan_react_files";

export const ts_react_tree = (tsNodes: TS_NODES) => {
    const tsFileReact: TS_RECT_FILES = [];

    ts_scan_react_files(tsNodes, tsFileReact)

    // console.log(tsNodes);
    console.log(tsFileReact);

    // {const tsNodes_comp = tsNodes.forEach((tsNode) => {
    //     if (tsNode.nodeMetadata.returnType && ['reactnode', 'element'].includes(tsNode.nodeMetadata.returnType.toLowerCase()))
    //         console.log(
    //             tsNode.filePath, tsNode.nodeText,
    //             tsNode.nodeMetadata.returnType,
    //             tsNode.nodeSyntaxKind,
    //             tsNode.nodeMetadata.isExported
    //         )
    // });}
}