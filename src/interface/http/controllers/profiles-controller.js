import { ProfileSerializer } from "../serializers/profile-serializer.js";

class ProfileController {
  static async create(req, res) {
    const body = req.body;
    const { pbkdf2PasswordHasher, createProfile } = req.container;

    const profile = await createProfile.execute({
      email: body.email,
      username: body.username,
      password: pbkdf2PasswordHasher.hash(body.password),
    });

    return res.status(201).send({ data: ProfileSerializer.serialize(profile) });
  }
}

export { ProfileController };
