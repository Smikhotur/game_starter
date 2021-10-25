export interface IComment<T = {}> {
  description: string;
  creatorID: string;
  createdDate: number;
  creator?: T;
  id?: string;
}
