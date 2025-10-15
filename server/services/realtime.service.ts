import { HttpError } from "@server/utils/http-error";

export class RealtimeService {
  async createHandshake(_userId: string) {
    throw new HttpError(501, "Realtime handshake not implemented");
  }
}

export const realtimeService = new RealtimeService();
