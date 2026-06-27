import { TS_NODES } from "../ast-typescript/core/ts_node";
import { ts_scan_react_files } from "../ast-typescript/core/ts_scan_react_files";

export const ts_react_tree = (tsNodes: TS_NODES) => {

    const tsFileReact = ts_scan_react_files(tsNodes)

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