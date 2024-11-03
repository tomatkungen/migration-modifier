import { Collection } from "jscodeshift"

export const pr_source = (root: Collection<any>) => {
    console.log('\n', root.toSource())
}