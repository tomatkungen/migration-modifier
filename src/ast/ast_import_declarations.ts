import jscodeshift, { Collection, ImportDeclaration } from "jscodeshift";
import { pr_import_declarations } from "../print/pr_import_declarations";

/**
 *  Get all ImportDeclaration[]
 * 
 *  interface ImportDeclaration {
 *      node: {
 *          source: LiteralKind
 *          specifiers?: (ImportDefaultSpecifier, ImportSpecifier, ImportNamespaceSpecifier)[] 
 *      }
 *  }[]
 * 
 *  // import {Box} from "@mui/material"
 *  interface LiteralKind: {
 *      type: "Literal"
 *      value: string | boolean | null | number | regExp // "@mui/material"
 *      regExt: {...}
 *  }
 * 
 *  // import React from "react"        <- export default react 
 *  interface ImportDefaultSpecifier {
 *      type: "ImportDefaultSpecifier"
 *      imported: { name: string }  // "React"
 *  }
 * 
 *  // import {useEffect} from "react"   <- export {useEffect}
 *  interface ImportSpecifier {
 *      type: "ImportDefaultSpecifier"
 *      local?: { name: string } // "useEffect"
 *  }
 * 
 *  // import {MyNamespace} from "react"  <- export namespace My.utils
 *  // import * as everything from 'module'<- export {React}, export MyReact
 *  interface ImportNamespaceSpecifier{
 *      type: "ImportDefaultSpecifier"
 *      local?: { name: string } // "MyNamespace"
 *  }
 * 
 *  @return {Array} ImportDeclaration
 */
export const ast_import_declarations = (root: Collection<any>, print: boolean = false): Collection<ImportDeclaration> => {
    const importDeclarations = root.find(jscodeshift.ImportDeclaration);

    print && pr_import_declarations(root, importDeclarations);
    // print && c_space(0, 'ImportDeclarations');

    // print && pr_import_declarations(root, importDeclarations);

    return importDeclarations;
}