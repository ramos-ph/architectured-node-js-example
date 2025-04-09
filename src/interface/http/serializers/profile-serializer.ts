import { Profile } from "../../../domain/entities/profile.ts";

class ProfileSerializer {
  static serialize(profile: Profile.Type) {
    return {
      id: profile.id,
      email: profile.email,
      username: profile.username,
    };
  }
}

export { ProfileSerializer };
