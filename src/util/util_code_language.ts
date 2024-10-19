import jscodeshift from "jscodeshift";

type Language = 'typescript' | 'javascript' | 'typescript-react'

export const util_code_language = (lang: Language): jscodeshift.JSCodeshift => { 

    const codeLang: {[index in Language]: jscodeshift.JSCodeshift} = {
        javascript: jscodeshift.withParser('babylon'),
        typescript: jscodeshift.withParser('typescript'),
        'typescript-react': jscodeshift.withParser('tsx')
    }

    return codeLang[lang];
}