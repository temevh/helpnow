"use client";
import { TextInput } from "@/components/common/inputs";
import { LuLock, LuMail, LuUser, LuShield } from "react-icons/lu";
import {
  Card,
  HStack,
  Button,
  Box,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { signIn, getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
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
      setError("An error occurred during sign in");
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
        bg="blue.200"
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
            ></Box>
            <VStack gap={2}>
              <Text fontSize="2xl" fontWeight="bold">
                Welcome Back
              </Text>
              <Text fontSize="sm" opacity={0.9}>
                Sign in to your HelpNow account
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
                  type={"password"}
                  label="Password"
                  placeholder="Enter your password"
                  required
                  icon={<LuLock />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </VStack>

              <Button
                type="submit"
                w="full"
                size="lg"
                bgGradient="linear(to-r, blue.600, indigo.600)"
                color="gray.500"
                _hover={{
                  bgGradient: "linear(to-r, blue.700, indigo.700)",
                  transform: "translateY(-1px)",
                  shadow: "lg",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                loading={isLoading}
                loadingText="Signing in..."
                transition="all 0.2s ease"
                fontWeight="semibold"
                fontSize="md"
                py={6}
              >
                Sign In
              </Button>
              <Text>
                Dont have an account?{" "}
                <Text
                  as="span"
                  color="blue.600"
                  cursor="pointer"
                  _hover={{ color: "blue.800", textDecoration: "underline" }}
                >
                  Register now
                </Text>
              </Text>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
