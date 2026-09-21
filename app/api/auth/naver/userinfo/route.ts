export async function GET(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.toLowerCase().startsWith("bearer ")) {
    return Response.json({ error: "missing_bearer_token" }, { status: 401 });
  }

  const naverResponse = await fetch("https://openapi.naver.com/v1/nid/me", {
    headers: {
      Authorization: authorization,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const payload = await naverResponse.json();
  const profile = payload?.response;

  if (!naverResponse.ok || !profile?.id) {
    return Response.json({ error: "invalid_naver_userinfo" }, { status: 502 });
  }

  return Response.json({
    sub: profile.id,
    id: profile.id,
    email: profile.email ?? null,
    email_verified: Boolean(profile.email),
    name: profile.name ?? profile.nickname ?? null,
    picture: profile.profile_image ?? null,
  });
}
