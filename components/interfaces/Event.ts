export default interface Event {
  _id: string;
  name: string;
  starts: number[];
  ends: number[];
  whitelist: boolean;
  vanity: string;
  host?: string;
}
