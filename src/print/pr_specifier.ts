import { Collection, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier } from "jscodeshift";
import { c_return, c_space } from "../util/util_console_log";
import { util_code_line } from "../util/util_code_line";
import { pr_green } from "./pr_color";

export const pr_specifier = (root: Collection<any>, specifier: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier) => {

    // Print specifier
    let specifierType = specifier.type;
    c_space(3, `${specifierType}`);

    let importedName: null | string | undefined = null; // Name of imported
    let localName: null | string | undefined = null; // Local name of the imported

    if (ImportSpecifier.check(specifier)) {
        importedName = specifier.imported.name
        localName = specifier.local?.name

        if (importedName && (!localName || localName === importedName)) {
            c_space(4, `imported.${specifier.imported.type} - <${pr_green(importedName)}>`)
            // c_space(4, `code - import { ${importedName} } from "${sourceValue}"`)
            util_code_line(4,'GREEN', root, specifier.loc)
        }

        if (importedName && localName && localName !== importedName) {
            c_space(4, `ìmported.${specifier.imported.type} - <${pr_green(importedName)}>`)
            c_space(4, `local.${specifier.local?.type} - <${pr_green(localName)}>`);
            // c_space(4, `code - import { ${importedName} as ${localName} } from "${sourceValue}"`)
            util_code_line(4, 'GREEN', root, specifier.loc)
        }
    }

    if (ImportDefaultSpecifier.check(specifier)) {
        localName = specifier.local?.name

        c_space(4, `local.${specifier.local?.type} - <${pr_green(localName)}>`);
        // c_space(4, `code - import ${localName} from "${sourceValue}"`)
        util_code_line(4, 'GREEN', root, specifier.loc)
    }

    if (ImportNamespaceSpecifier.check(specifier)) {
        localName = specifier.local?.name

        c_space(3, `local.${specifier.local?.type} - <${pr_green(localName)}>`);
        // c_space(4, `code - import * as ${localName} from "${sourceValue}"`)
        util_code_line(4, 'GREEN', root, specifier.loc);
    }

    c_return()
}