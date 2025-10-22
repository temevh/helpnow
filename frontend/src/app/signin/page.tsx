"use client";
import { TextInput, PasswordInput } from "@/components/common/inputs";
import { LuLock, LuMail, LuUser } from "react-icons/lu";
import { Card, HStack, Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <Card.Root maxW="lg">
      <Card.Header>
        <Card.Title>Sign up</Card.Title>
        <Card.Description>
          Fill in the form below to create an account
        </Card.Description>
      </Card.Header>
      <Card.Body gap={4}>
        <HStack gap="8" w="full">
          <TextInput
            label="Email"
            placeholder="Enter your email"
            required={true}
            icon={<LuMail />}
          />
          <TextInput
            label="Username"
            placeholder="Enter your username"
            required={true}
            icon={<LuUser />}
          />
        </HStack>
        <HStack gap="8" w="full">
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required={true}
            icon={<LuLock />}
          />
          <PasswordInput
            label="Password again"
            placeholder="Re-enter your password"
            required={true}
            icon={<LuLock />}
          />
        </HStack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">Cancel</Button>
        <Button variant="solid">Sign in</Button>
      </Card.Footer>
    </Card.Root>
  );
}
