class ProfileSerializer {
  static serialize(profile) {
    return {
      id: profile.id,
      email: profile.email,
      username: profile.username,
    };
  }
}

export { ProfileSerializer };
