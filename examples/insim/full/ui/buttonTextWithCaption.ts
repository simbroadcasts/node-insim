export function buttonTextWithCaption(caption: string, text: string) {
  const zero = String.fromCharCode(0);

  return `${zero}${caption}${zero}${text}`;
}
