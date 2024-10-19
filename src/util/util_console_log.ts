export const c = (...arg: any[]) => {
    console.log(...arg);
}

export const c_space = (space: number, ...args: any[]) => {
    console.log((new Array(space + 1)).join('  '), ...args);
}

export const c_return = () => {
    console.log('')
}