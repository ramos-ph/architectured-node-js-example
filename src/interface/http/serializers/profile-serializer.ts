import { Profile } from "../../../domain/profile.js";

class ProfileSerializer {
  static serialize(profile: Profile) {
    return {
      id: profile.id,
      email: profile.email,
      username: profile.username,
    };
  }
}

export { ProfileSerializer };
