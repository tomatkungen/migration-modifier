import { util_code_language } from "../util/util_code_language";
import { file_read } from "../file/file_read";
import path from 'path';
// import { pr_source } from "../print/pr_source";
import { ast_import_declarations } from "../ast/ast_import_declarations";
import { ast_node_expressions } from "../ast/ast_node_expressions";

// Pick language
const codeLanguage = util_code_language('typescript-react')

// Read file
const filepath = path.resolve(__dirname, 'example.tsx')
const file = file_read(filepath)

// Add file to jssLang
const root = codeLanguage(file)

// Get all imports and print
const importDeclarations = ast_import_declarations(root, true)

console.log('importDeclarations', importDeclarations.length)

// Get import map
const astNodeExpressions = ast_node_expressions(root, 'map', 'lodash', true)

console.log('astNodeExpressions', astNodeExpressions.length)

// console.log('res', res);

// print alld code
// pr_source(root)