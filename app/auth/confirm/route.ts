import type { EmailOtpType } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const redirectUrl = request.nextUrl.clone();

  redirectUrl.pathname = "/sign-up/verified";
  redirectUrl.search = "";

  if (!tokenHash || type !== "email") {
    redirectUrl.pathname = "/sign-up/error";
    return NextResponse.redirect(redirectUrl);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "email",
  });

  if (error || !data.user) {
    redirectUrl.pathname = "/sign-up/error";
    return NextResponse.redirect(redirectUrl);
  }

  const user = data.user;
  const nickname = user.user_metadata?.nickname;

  const { error: profilleError } = await supabase.from("profiles").insert({
    id: user.id,
    nickname,
  });

  if (profilleError) {
    redirectUrl.pathname = "/sign-up/error";
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.redirect(redirectUrl);
}
