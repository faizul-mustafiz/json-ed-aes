export default class Parser {
  parseJsonPayload(payload: any) {
    const parsedString = JSON.stringify(payload);
    const size = Buffer.from(parsedString).length;
    return { parsedString, size };
  }
  parseStringPayload(payload: string) {
    return JSON.parse(payload);
  }
}
