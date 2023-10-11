export const pluralizeWord = (singularWord: string, pluralWord: string, count: number): string => {
  return count === 1 ? singularWord : pluralWord
}
