import type { RequestHandler } from "express";
import { ProfileSerializer } from "../../serializers/profile-serializer.js";

const createProfileHandler: RequestHandler = async (req, res) => {
  const body = req.body;
  const { pbkdf2PasswordHasher, createProfile } = req.container;

  const profile = await createProfile.execute({
    email: body.email,
    username: body.username,
    passwordHash: pbkdf2PasswordHasher.hash(body.password),
  });

  res.status(201).send({ data: ProfileSerializer.serialize(profile) });
};

export { createProfileHandler };
