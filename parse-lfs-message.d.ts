// TODO: Remove when 'parse-lfs-message' is converted to TypeScript
declare module 'parse-lfs-message' {
  function parseLFSMessage(msg: string | Uint8Array);
  export = parseLFSMessage;
}
