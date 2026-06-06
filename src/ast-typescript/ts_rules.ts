import ts from "typescript";
import { ts_scan } from "./core/ts_scan";
import { TS_NODES } from "./core/ts_node";

export class TS_RULES {

    private tsSourceFile: readonly ts.SourceFile[]
    private tsNodes: TS_NODES; // { [filePath: string]: string[] } = {};

    public static tsSyntaxKind: (keyof typeof ts.SyntaxKind)[] = [
        'StringLiteral',
        'NoSubstitutionTemplateLiteral',
        'ImportClause'
    ]

    constructor(tsSourceFile: readonly ts.SourceFile[]) {
        this.tsSourceFile = tsSourceFile;
        this.tsNodes = [];
    }


    public find(syntaxKinds: (keyof typeof ts.SyntaxKind)[]): TS_RULES {

        this.tsNodes = [];

        this.tsSourceFile.forEach((sourceFile) => {

            const tempNodes: TS_NODES = [];
            // const fileStrings: string[] = [];
            ts_scan(
                sourceFile,
                sourceFile.fileName,
                tempNodes,
                syntaxKinds,
                sourceFile,
            );

            // Add start and end line and column
            tempNodes.forEach((tempNode) => {

                const startPos = sourceFile.getLineAndCharacterOfPosition(tempNode.start)
                const endPos = sourceFile.getLineAndCharacterOfPosition(tempNode.end)

                tempNode.startLine = startPos.line + 1;
                tempNode.startColumn = startPos.character + 1;
                tempNode.endLine = endPos.line + 1;
                tempNode.endColumn = endPos.character + 1;
            })

            this.tsNodes.push(...tempNodes);
        })
console.log(this.tsNodes.length);
        return this;
    }

    public get(): TS_NODES {
        return this.tsNodes;
    }
}