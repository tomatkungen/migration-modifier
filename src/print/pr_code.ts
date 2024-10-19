import { Collection } from "jscodeshift"

export const pr_code = (root: Collection<any>) => {
    console.log('\n', root.toSource())
}