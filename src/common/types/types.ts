export type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
};
