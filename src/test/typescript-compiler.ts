import ts from "typescript";
import * as fs from "fs";
import * as path from "path";

// Helper: Recursively traverse the AST
function findStringLiterals(node: ts.Node, filePath: string, result: string[]): void {
  // Check if the node is a string literal
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    result.push(node.text);
  }

  // Recursively process child nodes
  ts.forEachChild(node, (child) => findStringLiterals(child, filePath, result));
}

// Main: Scan files for string literals
const scanProjectForStrings = (tsConfigPath: string): void => {
  console.log('tsConfigPath', tsConfigPath)
  const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);

  if (configFile.error) {
    throw new Error(`Could not read tsconfig.json: ${configFile.error.messageText}`);
  }

  console.log('>> parseJsonConfigFileContent')
  const parsedCommandLine = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsConfigPath)
  );
  console.log('>> createProgram', parsedCommandLine.fileNames)

  const program = ts.createProgram(parsedCommandLine.fileNames, parsedCommandLine.options);
  const sourceFiles = program.getSourceFiles();


  const result: { [filePath: string]: string[] } = {};

  console.log('>> loop files');

  sourceFiles.forEach((sourceFile) => {
    // Ignore declaration files
    if (sourceFile.isDeclarationFile) return;

    console.log('filename', sourceFile.fileName);

    const fileStrings: string[] = [];
    findStringLiterals(sourceFile, sourceFile.fileName, fileStrings);
    result[sourceFile.fileName] = fileStrings;
  });

  // Output results
  const outputPath = path.join(process.cwd(), "string_literals.json");
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(`>> sString literals extracted to ${outputPath}`);
}

// Entry point: Replace with the path to your tsconfig.json
const tsConfigPath = path.resolve('..', 'github-desktop-git', "tsconfig.json");
scanProjectForStrings(tsConfigPath);