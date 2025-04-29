import { Profile } from "../entities/profile.ts";

export interface EmailQueue {
  sendWelcomeMail(profile: Profile.Type): Promise<void>;
}
