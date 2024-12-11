import { ProfileRepositoryInMemory } from "./infrastructure/profile-repository-in-memory.js";
import { CreateProfile } from "./application/create-profile.js";
import { PBKDF2PasswordHasher } from "./infrastructure/pbkdf2-password-hasher.js";

const pbkdf2PasswordHasher = new PBKDF2PasswordHasher();
const profileRepository = new ProfileRepositoryInMemory();
const createProfile = new CreateProfile({ profileRepository });

const container = {
  profileRepository: profileRepository,
  createProfile: createProfile,
  pbkdf2PasswordHasher: pbkdf2PasswordHasher,
};

export { container };
