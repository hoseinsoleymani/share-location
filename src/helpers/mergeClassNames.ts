export function mergeClassNames(
  classNames: Record<string, boolean | undefined>,
): string {
  return Object.entries(classNames)
    .reduce<string>((result, [className, condition]) => {
      if (condition) return result.concat(' ', className);

      return result;
    }, '')
    .trimStart();
}
