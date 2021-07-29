export const trainViewTypeArray = ['basic', 'advanced'] as const
export type trainViewType = typeof trainViewTypeArray[number]

export const uiStyleTypeArray = ['neumorphic', 'flat'] as const
export type uiStyleType = typeof uiStyleTypeArray[number]

export const colorThemeTypeArray = ['dark', 'light', 'adaptive'] as const
export type colorThemeType = typeof colorThemeTypeArray[number]

export type booleanString = 'true' | 'false'
