import ts from "typescript";
import { TS_NODES } from "../ts_node";
import { ts_scan_nodes } from "./ts_scan_nodes";

type ExcludeSuffix = ".tsx" | ".ts"

export const ts_scan_files_nodes = (
    tsSourceFiles: readonly ts.SourceFile[],
    tsChecker: ts.TypeChecker,
    syntaxKinds: (keyof typeof ts.SyntaxKind)[],
    exludeSuffix?: ExcludeSuffix
): TS_NODES => (
    tsSourceFiles.reduce<TS_NODES>((prevTsNodes, tsSourceFile) => {
        if (exludeSuffix && tsSourceFile.fileName.endsWith(exludeSuffix))
            return prevTsNodes;

        ts_scan_nodes(
            tsSourceFile,
            tsSourceFile.fileName,
            prevTsNodes,
            syntaxKinds,
            tsSourceFile,
            tsChecker
        )

        return prevTsNodes;
    }, [])
)
