import jscodeshift, { Collection } from "jscodeshift";
import { util_code_line } from "../util/util_code_line";

export const ast_js_texts = (root: Collection<any>,) => {

    root
        .find(jscodeshift.JSXElement)
        .forEach((JSXElement) => {

            const children = JSXElement.value.children;

            if (!children) return;

            children.forEach((_, index) => {
                if (children[index] && children[index].type === 'JSXText' &&
                    children[index - 1] && children[index - 1].type === 'JSXElement' &&
                    children[index + 1] && children[index + 1].type === 'JSXElement') {
                    console.log("JSXText between elements found:", children[index].value.trim());

                    const res = 
                    util_code_line(0, 'YELLOW', root, children[index].loc);
                }
            })


            // console.log('JSXElm', JSXElement.value.type);
            // util_code_line(0, 'YELLOW', root, JSXElement.value.loc);
        })

}