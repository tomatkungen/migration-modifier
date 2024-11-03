import { util_code_language } from "../util/util_code_language";
import { file_read } from "../file/file_read";
import path from 'path';
// import { pr_source } from "../print/pr_source";
import { ast_import_declarations } from "../ast/ast_import_declarations";
import { ast_get_import_from } from "../ast/ast_get_import_name";

// Pick language
const codeLanguage = util_code_language('typescript-react')

// Read file
const filepath = path.resolve(__dirname, 'example.tsx')
const file = file_read(filepath)

// Add file to jssLang
const root = codeLanguage(file)

// Get all imports and print
// const _importDeclarations = ast_import_declarations(root, true)

// Get import map
const _res = ast_get_import_from(root, 'map', 'lodash', true)

// console.log('res', res);

// print alld code
// pr_source(root)