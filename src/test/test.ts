import jscodeshift from "jscodeshift";
import { util_code_language } from "../util/util_code_language";
import { file_read } from "../file/file_read";
import path from 'path';
import { pr_code } from "../print/pr_code";
import { mgr_get_all_imports } from "../migration/mgr_get_all_imports";

// Pick language
const codeLanguage = util_code_language('typescript-react')

// Read file
const filepath = path.resolve(__dirname, 'example.tsx')
const file = file_read(filepath)

// Add file to jssLang
const root = codeLanguage(file)

// Get all imports and print
mgr_get_all_imports(root, true)

// print alld code
pr_code(root)