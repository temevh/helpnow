"use client";
import { TextInput } from "@/components/common/inputs";
import { LuLock, LuMail, LuUser, LuShield, LuUserPlus } from "react-icons/lu";
import { HStack, Button, Box, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box
        w="full"
        maxW="md"
        bg="green.200"
        borderRadius="2xl"
        overflow="hidden"
      >
        <Box p={8} textAlign="center" color="black">
          <VStack gap={4}>
            <Box
              p={4}
              bg="whiteAlpha.200"
              borderRadius="full"
              display="inline-flex"
            >
              <LuUserPlus size={32} />
            </Box>
            <VStack gap={2}>
              <Text fontSize="2xl" fontWeight="bold">
                Join HelpNow
              </Text>
              <Text fontSize="sm" opacity={0.9}>
                Create your account to start helping your community
              </Text>
            </VStack>
          </VStack>
        </Box>

        <Box p={6}>
          <form onSubmit={handleSubmit}>
            <VStack gap={6}>
              {error && (
                <Box
                  w="full"
                  bg="red.50"
                  border="1px solid"
                  borderColor="red.200"
                  borderRadius="lg"
                  p={4}
                >
                  <HStack>
                    <Box color="red.500">
                      <LuShield size={20} />
                    </Box>
                    <Text color="red.600" fontWeight="medium" fontSize="sm">
                      {error}
                    </Text>
                  </HStack>
                </Box>
              )}

              {success && (
                <Box
                  w="full"
                  bg="green.50"
                  border="1px solid"
                  borderColor="green.200"
                  borderRadius="lg"
                  p={4}
                >
                  <HStack>
                    <Box color="green.500">
                      <LuUserPlus size={20} />
                    </Box>
                    <Text color="green.600" fontWeight="medium" fontSize="sm">
                      {success}
                    </Text>
                  </HStack>
                </Box>
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

              <Button
                type="submit"
                w="full"
                size="lg"
                bgGradient="linear(to-r, green.600, teal.600)"
                color="white"
                _hover={{
                  bgGradient: "linear(to-r, green.700, teal.700)",
                  transform: "translateY(-1px)",
                  shadow: "lg",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                loading={isLoading}
                loadingText="Creating account..."
                transition="all 0.2s ease"
                fontWeight="semibold"
                fontSize="md"
                py={6}
                disabled={isLoading}
              >
                Create Account
              </Button>

              <Text>
                Already have an account?{" "}
                <Link href="/signin">
                  <Text
                    as="span"
                    color="green.600"
                    cursor="pointer"
                    _hover={{ color: "green.800", textDecoration: "underline" }}
                  >
                    Sign in here
                  </Text>
                </Link>
              </Text>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
