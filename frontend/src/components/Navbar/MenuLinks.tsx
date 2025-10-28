"use client";
import { HStack, VStack, Button, Box, Text } from "@chakra-ui/react";
import { Settings, User, Bell, House, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const links = [
  { name: "Home", href: "/", icon: House },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "#services", icon: Settings },
  { name: "Alerts", href: "#contact", icon: Bell },
];

const MenuLinks = ({
  isMobile = false,
  user,
}: {
  isMobile?: boolean;
  user?: any;
}) => {
  const LinkComponent = isMobile ? VStack : HStack;
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/signin",
    });
    router.push("/");
  };

  const handleSignIn = () => {
    router.push("/signin");
  };

  return (
    <LinkComponent gap={isMobile ? 4 : 8} align={"center"}>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          style={{
            fontWeight: "medium",
            color: "#2563eb",
            textDecoration: "none",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#3b82f6";
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#2563eb";
            e.currentTarget.style.textDecoration = "none";
          }}
          aria-label={link.name}
        >
          <HStack>
            <link.icon size={30} style={{ marginRight: 4 }} />
            {isMobile && link.name}
          </HStack>
        </Link>
      ))}

      {user?.email ? (
        <HStack gap={2}>
          <Text fontSize="sm" color="gray.600">
            {user.email}
          </Text>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            color="red.500"
            _hover={{
              bg: "red.50",
            }}
          >
            <HStack>
              <LogOut size={16} />
              <Text>Sign out</Text>
            </HStack>
          </Button>
        </HStack>
      ) : (
        <Button
          bg={"blue.600"}
          color={"white"}
          size={"lg"}
          borderRadius={"full"}
          px={4}
          _hover={{
            transform: "translateY(-4px)",
            shadow: "lg",
          }}
          transition={"all 0.2s ease"}
          onClick={handleSignIn}
        >
          Sign in
        </Button>
      )}
    </LinkComponent>
  );
};

export default MenuLinks;
