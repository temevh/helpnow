"use client";
import { TextInput, PasswordInput } from "@/components/common/inputs";
import { LuLock, LuMail, LuUser } from "react-icons/lu";
import { Card, HStack, Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      alert(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card.Root maxW="lg">
        <Card.Header>
          <Card.Title>Sign In</Card.Title>
          <Card.Description>
            Enter your username and password to continue
          </Card.Description>
        </Card.Header>

        <Card.Body gap={4}>
          <TextInput
            label="Username"
            placeholder="Enter your username"
            required
            icon={<LuUser />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            icon={<LuLock />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Card.Body>

        <Card.Footer justifyContent="flex-end">
          <Button type="submit" colorScheme="blue">
            Sign In
          </Button>
        </Card.Footer>
      </Card.Root>
    </form>
  );
}
