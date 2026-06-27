import ts from "typescript";
import { TS_NODE } from "./ts_node";

export type TS_REACT_FILE = {
    tsFunExports: string[];
    tsFunLocals: string[];
    tsVarExports: string[];         // export const x: Element | ReactNode= {}
    tsVarLocals: string[];          //  const x: Element | ReactNode = {}
    tsElement: string[];            // <Element/> <Element>
    tsFilepath: string;             // relative to tsonfig src/test.ts
    childs?: TS_REACT_FILE
    sum: string
}

export type TS_RECT_FILES = TS_REACT_FILE[];

const TS_REACT_SYNTAX_KINDS = ['Element', 'ReactNode', 'ReactElement']

const TS_SYNTAX_ELEMENT_KIND = ['JsxSelfClosingElement', 'JsxOpeningElement']

export const ts_react_file = (
    tsReactFile: TS_REACT_FILE,
    tsNode: TS_NODE,
) => {

    // export const tt: Element
    if (tsNode.nodeMetadata.isExported && tsNode.nodeSyntaxKind === 'VariableDeclaration' && TS_REACT_SYNTAX_KINDS.includes(tsNode.nodeMetadata.returnType ?? ""))
        tsReactFile.tsVarExports.push(tsNode.nodeText)

    // const tt: Element
    if (!tsNode.nodeMetadata.isExported && tsNode.nodeSyntaxKind === 'VariableDeclaration' && TS_REACT_SYNTAX_KINDS.includes(tsNode.nodeMetadata.returnType ?? ""))
        tsReactFile.tsVarLocals.push(tsNode.nodeText)

    // export function app (): Element {}
    if (tsNode.nodeMetadata.isExported && tsNode.nodeSyntaxKind === 'FunctionDeclaration' && TS_REACT_SYNTAX_KINDS.includes(tsNode.nodeMetadata.returnType ?? ""))
        tsReactFile.tsFunExports.push(tsNode.nodeText)

    // <tt> | <tt />
    if (TS_SYNTAX_ELEMENT_KIND.includes(tsNode.nodeSyntaxKind))
        tsReactFile.tsElement.push(tsNode.nodeText)

    tsReactFile.sum += `
    ---
            isExported:   ${tsNode.nodeMetadata.isExported}
            returnType:   ${tsNode.nodeMetadata.returnType},
            tsSyntaxKind: ${tsNode.nodeSyntaxKind},
            nodeText:     ${tsNode.nodeText}`
}