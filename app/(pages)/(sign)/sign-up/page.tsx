"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

import SignSection from "../../../components/sign/sign-section";
import SignForm from "../../../components/sign/sign-form";
import SignInput from "../../../components/sign/sign-input";
import SignFormButton from "../../../components/sign/sign-form-button";
import SignAuth from "../../../components/sign/sign-auth";
import SignAuthButton from "../../../components/sign/sign-auth-button";
import SignTitle from "../../../components/sign/sign-title";

import { Field, FieldContent } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Terms from "../../../components/modal/terms";
import Privacy from "../../../components/modal/privacy";

const privacyButtonCss = "relative inline-block cursor-pointer text-(--primary) font-medium hover:text-[#4471e2] transition-colors before:absolute before:w-full before:h-[1px] before:left-0 before:top-full before:bg-(--primary)";

export default function SignUpPage() {
  const [termsIsOpen, setTermsIsOpen] = useState(false);
  const [privacyIsOpen, setPrivacyIsOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [values, setValues] = useState({
    name: "",
    nickname: "",
    email: "",
    password: "",
    passwordValidate: "",
  });
  const [validate, setValidate] = useState({
    name: false,
    nickname: false,
    duplicationNickname: false,
    email: false,
    password: false,
    passwordValidate: false,
    terms: false,
  });

  const router = useRouter();

  const termsOnClose = () => {
    setTermsIsOpen(false);
  };

  const privacyOnClose = () => {
    setPrivacyIsOpen(false);
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const nickname = formData.get("nickname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data: existingProfiles, error: nicknameError } = await supabase.from("profiles").select("id, nickname").eq("nickname", nickname.trim());

    if (nicknameError) {
      alert("닉네임 중복 확인에 실패했습니다.");
      return;
    }

    const nextValidate = {
      name: values.name.trim() == "",
      nickname: values.nickname.trim() === "",
      duplicationNickname: existingProfiles.length > 0,
      email: !emailPattern.test(values.email.trim()),
      password: !passwordPattern.test(values.password),
      passwordValidate: values.password !== values.passwordValidate,
      terms: !termsAccepted,
    };

    setValidate(nextValidate);

    if (Object.values(nextValidate).some(Boolean)) {
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          nickname,
        },
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });

    if (error) {
      alert(`회원가입에 실패했습니다. : ${error}`);
      return;
    }

    router.push("/sign-up/complete");
  };

  const validateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setValidate((prev) => {
      const next = {
        ...prev,
        [id]: false,
      };

      if (id === "password") {
        next.password = value !== "" && !passwordPattern.test(value);
        next.passwordValidate = values.passwordValidate !== "" && value !== values.passwordValidate;
      }

      if (id === "passwordValidate") {
        next.passwordValidate = value !== "" && value !== values.password;
      }

      return next;
    });

    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const checkedHandler = (checked: boolean) => {
    setTermsAccepted(checked);
    setValidate((prev) => ({
      ...prev,
      terms: false,
    }));
  };

  return (
    <>
      {termsIsOpen && <Terms onClose={termsOnClose} />}
      {privacyIsOpen && <Privacy onClose={privacyOnClose} />}
      <SignSection>
        <SignTitle title="회원가입" description="지금 회원가입하고 다양한 서비스를 이용해보세요." />
        <SignForm onSubmit={signUp}>
          <div>
            <SignInput id="name" name="name" type="text" placeholder="이름을 입력하세요." onChange={validateHandler} />
            {validate.name ? <p className="mt-1.5 text-[12px] text-red-400">이름을 필수로 입력해주세요.</p> : null}
          </div>
          <div>
            <SignInput id="nickname" name="nickname" type="text" placeholder="닉네임을 입력하세요." onChange={validateHandler} />
            {validate.nickname ? <p className="mt-1.5 text-[12px] text-red-400">닉네임을 필수로 입력해주세요.</p> : null}
            {validate.duplicationNickname ? <p className="mt-1.5 text-[12px] text-red-400">이미 사용중인 닉네임입니다.</p> : null}
          </div>
          <div>
            <SignInput id="email" name="email" type="text" placeholder="이메일을 입력하세요." onChange={validateHandler} />
            {validate.email ? <p className="mt-1.5 text-[12px] text-red-400">올바른 이메일 주소를 입력해주세요.</p> : null}
          </div>
          <div>
            <SignInput id="password" name="password" type="password" placeholder="비밀번호를 입력하세요." onChange={validateHandler} />
            {validate.password ? <p className="mt-1.5 text-[12px] text-red-400">올바른 비밀번호를 입력해주세요.</p> : null}
            <p className="mt-1.5 text-[12px] text-slate-600">특수문자, 소문자, 대문자, 숫자 포함 8자리 이상 입력해야 합니다.</p>
          </div>
          <div>
            <SignInput id="passwordValidate" name="passwordValidate" type="password" placeholder="비밀번호를 한번 더 입력하세요." onChange={validateHandler} />
            {validate.passwordValidate ? <p className="mt-1.5 text-[12px] text-red-400">비밀번호가 일치하지 않습니다.</p> : null}
          </div>
          <div>
            <Field orientation="horizontal">
              <Checkbox id="terms" name="terms" checked={termsAccepted} onCheckedChange={checkedHandler} />
              <FieldContent className="block text-sm text-slate-600">
                <button type="button" className={privacyButtonCss} onClick={() => setTermsIsOpen(true)}>
                  이용약관
                </button>{" "}
                및{" "}
                <button type="button" className={privacyButtonCss} onClick={() => setPrivacyIsOpen(true)}>
                  개인정보처리방침
                </button>
                에 동의합니다.
              </FieldContent>
            </Field>
            {validate.terms ? <p className="mt-2 text-[12px] text-red-400">약관 및 개인정보처리방침에 동의해주세요.</p> : null}
          </div>
          <SignFormButton>회원가입</SignFormButton>
        </SignForm>
        {/* <p className="relative w-full py-3 text-center before:absolute before:left-0 before:top-[50%] before:w-full before:h-[1px] before:bg-slate-200 before:translate-y-[-50%] before:z-0">
          <span className="relative z-1 bg-white px-2 text-sm text-slate-400">또는</span>
        </p> */}
        {/* <SignAuth>
          <SignAuthButton>
            <Image src="/google_icon.webp" alt="구글 아이콘" width={16} height={16} />
            <span>Google로 회원가입</span>
          </SignAuthButton>
          <SignAuthButton>
            <Image src="/naver_icon.ico" alt="네이버 아이콘" width={16} height={16} />
            <span>네이버로 회원가입</span>
          </SignAuthButton>
        </SignAuth> */}
        <p className="mt-4 text-sm text-slate-400">
          이미 계정이 있으신가요?
          <Link href="/sign-in" className="ml-1 text-(--primary) font-medium hover:text-[#4471e2] transition-colors">
            로그인
          </Link>
        </p>
      </SignSection>
    </>
  );
}
