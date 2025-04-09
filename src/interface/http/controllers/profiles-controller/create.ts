import type { RequestHandler } from "express";
import { ProfileSerializer } from "../../serializers/profile-serializer.ts";

const createProfileHandler: RequestHandler = async (req, res) => {
  const body = req.body;
  const { createProfile } = req.container;

  const profile = await createProfile({
    email: body.email,
    username: body.username,
    password: body.password,
  });

  res.status(201).send({ data: ProfileSerializer.serialize(profile) });
};

export { createProfileHandler };
