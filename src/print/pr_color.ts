export const pr_green = (value: any) => {
    return `${COLORS.GREEN}${value}${COLORS.END}`;
}

export const pr_yellow = (value: any) => {
    return `${COLORS.YELLOW}${value}${COLORS.END}`;
}

export const pr_red = (value: any) => {
    return `${COLORS.RED}${value}${COLORS.END}`;
}

export type COLOR = 'CYAN' | 'MAGENTA' | 'GREEN' | 'YELLOW' | 'RED' | 'END';

export const COLORS: Record<COLOR, string> = {
    'CYAN': '\x1b[36m',
    'MAGENTA': '\x1b[35m',
    'GREEN': '\x1b[32m',
    'YELLOW': '\x1b[33m',
    'RED': '\x1b[31m',
    'END': '\x1b[0m'
}