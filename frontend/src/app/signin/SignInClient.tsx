"use client";
import { TextInput } from "@/components/common/inputs";
import {
  AuthCard,
  AuthAlert,
  PrimaryButton,
  AuthLink,
} from "@/components/common/auth";
import { LuLock, LuUser, LuShield } from "react-icons/lu";
import { VStack } from "@chakra-ui/react";
import { signIn, getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInClient() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push(callbackUrl);
      }
    };
    checkSession();
  }, [router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl,
      });

      if (result?.error) {
        setError("Invalid username or password");
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (err) {
      console.log("error signing in", err);
      setError("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      icon={<LuUser size={28} />}
      title="Welcome Back"
      subtitle="Sign in to your HelpNow account"
    >
      <form onSubmit={handleSubmit}>
        <VStack gap={6}>
          {error && (
            <AuthAlert
              type="error"
              message={error}
              icon={<LuShield size={20} />}
            />
          )}

          <VStack gap={4} w="full">
            <TextInput
              label="Username"
              placeholder="Enter your username"
              required
              icon={<LuUser />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextInput
              type="password"
              label="Password"
              placeholder="Enter your password"
              required
              icon={<LuLock />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </VStack>

          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            loadingText="Signing in..."
          >
            Sign In
          </PrimaryButton>

          <AuthLink
            text="Don't have an account?"
            linkText="Register now"
            href="/register"
          />
        </VStack>
      </form>
    </AuthCard>
  );
}
