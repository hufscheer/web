declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '@hcc/ui/styles.css' {
  const content: never;
  export default content;
}

declare module '~/styles/globals.css' {
  const content: never;
  export default content;
}
