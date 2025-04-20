import * as path from "path";
import { TS_AST } from "../ast-typescript/ts_ast";
// import { ts_parse_config } from "../ast-typescript/core/ts_parse_config";
// import { ts_read_config_file } from "../ast-typescript/core/ts_read_config_file";
// import { ts_folder_struct } from "../file/ts_folder_struct";
// import { pr_ts_folder_struct } from "../print/pr_ts_folder_struct";

// Path to the tsconfig.json file
const tsConfigPath = path.resolve('..', 'github-desktop-git', "tsconfig.json");

// Create a new TS_AST instance
const tsEngine = new TS_AST(tsConfigPath);

// Get the parsed command line options print folder structure
tsEngine.getUtil().prParseConfigFolders();

// ts_engine(parseConfig)
//  .find([JSXText, SttringLiteral], name?, includeFiles?)
//  .replaceWith((tsNode) => {})
//  .forEach((node) => {})
//  .get();

