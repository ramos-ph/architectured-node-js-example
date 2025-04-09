import { Profile } from "../entities/profile.ts";

interface ProfileRepository {
  generateNextId: () => string;
  create: (profile: Profile.Type) => Promise<void>;
}

export { ProfileRepository };
