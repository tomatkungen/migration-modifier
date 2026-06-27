import ts from "typescript";

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
    isExported: boolean,
    returnType: string,
    tsSyntaxKind: keyof typeof ts.SyntaxKind,
    nodeText: string
) => {

    // export const tt: Element
    if (isExported && tsSyntaxKind === 'VariableDeclaration' && TS_REACT_SYNTAX_KINDS.includes(returnType))
        tsReactFile.tsVarExports.push(nodeText)

    // const tt: Element
    if (!isExported && tsSyntaxKind === 'VariableDeclaration' && TS_REACT_SYNTAX_KINDS.includes(returnType))
        tsReactFile.tsVarLocals.push(nodeText)

    // export function app (): Element {}
    if (isExported && tsSyntaxKind === 'FunctionDeclaration' && TS_REACT_SYNTAX_KINDS.includes(returnType))
        tsReactFile.tsFunExports.push(nodeText)

    // <tt> | <tt />
    if (TS_SYNTAX_ELEMENT_KIND.includes(tsSyntaxKind))
        tsReactFile.tsElement.push(nodeText)

    tsReactFile.sum += `
    ---
            ${isExported}: isExported,
            ${returnType}: returnType,
            ${tsSyntaxKind}: tsSyntaxKind,
            ${nodeText}: nodeText`
}