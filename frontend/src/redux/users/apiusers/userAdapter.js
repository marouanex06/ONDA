export const normalizeUser = (user = {}) => ({
  ...user,
  id_user: user.id_user ?? user.id ?? null,
  full_name:
    user.full_name ??
    user.fullname ??
    user.username ??
    user.email?.split("@")[0] ??
    "",
  profile_photo: user.profile_photo ?? null,
});

export const normalizeUsers = (users = []) => users.map(normalizeUser);
