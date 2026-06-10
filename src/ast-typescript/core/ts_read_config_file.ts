import ts from "typescript";

/**
 * 
 * Returns the tsconfig json
 * {
 *   compilerOptions: {
 *     moduleDetection: 'force',
 *     types: [ 'node' ],
 *     module: 'Preserve',
 *     resolveJsonModule: true,
 *     allowJs: true,
 *     esModuleInterop: true,
 *     isolatedModules: true
 *   }
 * }
 * 
 * @param tsConfigPath 
 * @returns any
 */
export const ts_read_config_file = (tsConfigPath: string) => {
    const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile)

    if (configFile.error) {
        throw new Error(`Could not read tsconfig.json: ${configFile.error.messageText}`)
    }

    return configFile.config;
}