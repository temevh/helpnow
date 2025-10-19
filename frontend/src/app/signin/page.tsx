"use client";
import { TextInput } from "@/components/common/inputs";
import { Button, Card, HStack, Stack } from "@chakra-ui/react";
import { LuLock, LuMail, LuUser } from "react-icons/lu";

export default function SignInPage() {
  return (
    <Card.Root maxW="lg">
      <Card.Header>
        <Card.Title>Sign up</Card.Title>
        <Card.Description>
          Fill in the form below to create an account
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <HStack gap="4" w="full">
          <TextInput
            label="Email"
            placeholder="Enter your email"
            required={true}
            helperText="We'll never share your email."
            icon={<LuMail />}
          />
          <TextInput
            label="Username"
            placeholder="Enter your username"
            required={true}
            icon={<LuUser />}
          />
        </HStack>
        <HStack gap="4" w="full">
          <TextInput
            label="Password"
            placeholder="Enter your password"
            required={true}
            helperText="We'll never share your email."
            icon={<LuLock />}
          />
          <TextInput
            label=""
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
