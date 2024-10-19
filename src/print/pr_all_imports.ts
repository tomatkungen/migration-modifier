import { Collection, ImportDeclaration, ImportSpecifier, ImportDefaultSpecifier, ImportNamespaceSpecifier } from "jscodeshift";
import { c, c_return, c_space } from "../util/util_console_log";

export const pr_all_imports = (importDeclarations: Collection<ImportDeclaration>) => {

    importDeclarations.forEach((importDeclaration) => {

        c_space(0, 'ImportDeclaration');

        // Print package
        const sourceType = importDeclaration.node.source.type;
        const sourceValue = importDeclaration.node.source.value;
        
        c_space(1, `${sourceType} - <${sourceValue}>`);

        // Print func
        importDeclaration.node.specifiers?.forEach((specifier) => {

            let specifierType = specifier.type;
            c_space(2, `${specifierType}`);
            
            let importedName: null | string | undefined = null; // Name of imported
            let localName: null | string | undefined = null; // Local name of the imported
            
            if (ImportSpecifier.check(specifier)) {
                importedName = specifier.imported.name
                localName = specifier.local?.name

                if (importedName && (!localName || localName === importedName)) {
                    c_space(3, `imported.${specifier.imported.type} - <${importedName}>`);
                    c_space(4, `code - import { ${importedName} } from "${sourceValue}"`)
                }

                if (importedName && localName && localName !== importedName) {
                    c_space(3, `ìmported.${specifier.imported.type} - <${importedName}>`)
                    c_space(3, `local.${specifier.local?.type} - <${localName}>`);
                    c_space(4, `code - import { ${importedName} as ${localName} } from "${sourceValue}"`)
                }
            }

            if (ImportDefaultSpecifier.check(specifier)) {
                localName = specifier.local?.name;

                c_space(3, `local.${specifier.local?.type} - <${localName}>`);
                c_space(4, `code - import ${localName} from "${sourceValue}"`)
            }

            if (ImportNamespaceSpecifier.check(specifier)) {
                localName = specifier.local?.name

                c_space(3, `local.${specifier.local?.type} - <${localName}>`);
                c_space(4, `code - import * as ${localName} from "${sourceValue}"`)
            }

            c_return()
        });
    });
}