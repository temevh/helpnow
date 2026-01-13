"use client";
import { TextInput } from "@/components/common/inputs";
import { AuthCard, AuthAlert, PrimaryButton, AuthLink } from "@/components/common/auth";
import { LuLock, LuMail, LuUser, LuShield, LuUserPlus } from "react-icons/lu";
import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CREATE_USER } from "@/graphql/mutations/user";
import { useMutation } from "@apollo/client/react";
import { User } from "@/types";

interface CreateUserResponse {
  createUser: {
    user: User;
    message?: string;
  };
}

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [createUser] = useMutation<CreateUserResponse>(CREATE_USER);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!username || !email || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const input = {
        username: username,
        email,
        password,
      };
      console.log("input", input);
      const { data } = await createUser({
        variables: {
          username,
          email,
          password,
          firstName: "404",
          lastName: "404",
        },
      });

      if (data?.createUser.user) {
        setSuccess("Account created successfully! Redirecting to sign in...");
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        setError(data?.createUser.message || "Registration failed");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during registration"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      icon={<LuUserPlus size={28} />}
      title="Join HelpNow"
      subtitle="Create your account to start helping your community"
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

          {success && (
            <AuthAlert
              type="success"
              message={success}
              icon={<LuUserPlus size={20} />}
            />
          )}

          <VStack gap={4} w="full">
            <TextInput
              label="Username"
              placeholder="Choose a username"
              required
              icon={<LuUser />}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextInput
              label="Email"
              placeholder="Enter your email address"
              required
              icon={<LuMail />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <TextInput
              type="password"
              label="Password"
              placeholder="Create a password (min 6 characters)"
              required
              icon={<LuLock />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextInput
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              required
              icon={<LuLock />}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </VStack>

          <PrimaryButton
            type="submit"
            isLoading={isLoading}
            loadingText="Creating account..."
            disabled={isLoading}
          >
            Create Account
          </PrimaryButton>

          <AuthLink
            text="Already have an account?"
            linkText="Sign in here"
            href="/signin"
          />
        </VStack>
      </form>
    </AuthCard>
  );
}
