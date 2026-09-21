"use client";

import { useState } from "react";
import { migrateTodos } from "@/app/actions/todos-action";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import SignSection from "../../../components/sign/sign-section";
import SignForm from "../../../components/sign/sign-form";
import SignInput from "../../../components/sign/sign-input";
import SignFormButton from "../../../components/sign/sign-form-button";
import SignAuth from "../../../components/sign/sign-auth";
import SignAuthButton from "../../../components/sign/sign-auth-button";
import SignTitle from "../../../components/sign/sign-title";

export default function SignInPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [validate, setValidate] = useState({
    email: false,
    password: false,
  });
  const [auth, setAuth] = useState(false);

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAuth(false);

    const newValidate = {
      email: values.email.trim() === "",
      password: values.password.trim() === "",
    };

    setValidate(newValidate);

    if (Object.values(newValidate).some(Boolean)) {
      return;
    }

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuth(true);
      return;
    }

    if (user) {
      const savedTodos = localStorage.getItem("todo-list");

      if (savedTodos) {
        try {
          const todos = JSON.parse(savedTodos);

          if (todos.length > 0) {
            const result = await migrateTodos(todos);
            if (result.isLoggedIn === true) {
              localStorage.removeItem("todo-list");
            }
          }
        } catch (error) {
          alert(`로그인에 실패했습니다. ${error}`);
          return;
        }
      }
    }

    router.push("/");
  };

  const validateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    setValidate((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  const googleLoginHandler = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(`로그인에 실패했습니다. : (${error.code}) ${error.message}`);
    }
  };

  const kakaoLoginHandler = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(`로그인에 실패했습니다. : (${error.code}) ${error.message}`);
    }
  };

  const naverLoginHandler = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "custom:naver-oauth",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(`로그인에 실패했습니다. : (${error.code}) ${error.message}`);
    }
  };

  return (
    <SignSection>
      <SignTitle
        title="로그인"
        description={
          <>
            다시 오신 것을 환영합니다. <br /> 계정에 로그인하여 서비스를 이용해보세요.
          </>
        }
      />
      <SignForm onSubmit={signIn}>
        <div>
          <SignInput id="email" name="email" type="text" placeholder="이메일을 입력하세요." onChange={validateHandler} />
          {validate.email && <p className="mt-1.5 text-[12px] text-red-400">이메일을 입력해주세요.</p>}
        </div>
        <div>
          <SignInput id="password" name="password" type="password" placeholder="비밀번호를 입력하세요." onChange={validateHandler} />
          {validate.password && <p className="mt-1.5 text-[12px] text-red-400">비밀번호를 입력해주세요.</p>}
          {!validate.email && !validate.password && auth && <p className="mt-1.5 text-[12px] text-red-400">이메일 또는 비밀번호가 올바르지 않습니다.</p>}
        </div>
        <SignFormButton>로그인</SignFormButton>
      </SignForm>
      <p className="relative w-full py-3 text-center before:absolute before:left-0 before:top-[50%] before:w-full before:h-px before:bg-slate-200 before:translate-y-[-50%] before:z-0">
        <span className="relative z-1 bg-white px-2 text-sm text-slate-400">또는</span>
      </p>
      <SignAuth>
        <SignAuthButton onClick={googleLoginHandler}>
          <Image src="/google-icon.svg" alt="구글 아이콘" width={16} height={16} />
          <span className="ml-2">Google로 로그인</span>
        </SignAuthButton>
        <SignAuthButton onClick={kakaoLoginHandler}>
          <Image src="/kakao-icon.svg" alt="카카오 아이콘" width={16} height={16} />
          <span className="ml-2">카카오로 로그인</span>
        </SignAuthButton>
        <SignAuthButton onClick={naverLoginHandler}>
          <Image src="/naver-icon.png" alt="네이버 아이콘" width={16} height={16} />
          <span className="ml-2">네이버로 로그인</span>
        </SignAuthButton>
      </SignAuth>
      <p className="mt-2 text-sm text-slate-400">
        계정이 없으신가요?
        <Link href="/sign-up" className="ml-1 text-primary font-medium hover:text-[#4471e2] transition-colors">
          회원가입
        </Link>
      </p>
    </SignSection>
  );
}
