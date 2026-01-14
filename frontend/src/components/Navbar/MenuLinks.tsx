"use client";
import { HStack, VStack, Button, Text } from "@chakra-ui/react";
import {
  Settings,
  User,
  Bell,
  LogOut,
  ListCheck,
  CirclePlus,
} from "lucide-react";
import { signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { VolunteeredModal } from "../VolunteeredModal/VolunteeredModal";
import { NewPostModal } from "../NewPostModal/NewPostModal";
import { useState } from "react";
import { ColorModeButton } from "../ui/color-mode";
import { User as UserType } from "@/types";

const links = [
  { name: "New post", modal: NewPostModal, icon: CirclePlus },
  { name: "Posts", modal: VolunteeredModal, icon: ListCheck },
  { name: "Profile", modal: VolunteeredModal, icon: User },
  { name: "Settings", modal: VolunteeredModal, icon: Settings },
  { name: "Alerts", modal: VolunteeredModal, icon: Bell },
];

const MenuLinks = ({
  isMobile = false,
  user,
}: {
  isMobile?: boolean;
  user?: UserType;
}) => {
  const LinkComponent = isMobile ? VStack : HStack;
  const router = useRouter();

  const [isVolunteeredModalOpen, setIsVolunteeredModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/signin",
    });
    router.push("/");
  };

  const devSignIn = async () => {
    await signIn("credentials", {
      redirect: false,
      username: "admin",
      password: "admin123",
    });
  };

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleLinkClick = (linkName: string) => {
    switch (linkName) {
      case "New post":
        setIsNewPostModalOpen(true);
        break;
      case "Posts":
        setIsVolunteeredModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <LinkComponent gap={isMobile ? 4 : 8} align={"center"}>
      {user && (
        <>
          <VolunteeredModal
            open={isVolunteeredModalOpen}
            onOpenChange={setIsVolunteeredModalOpen}
            user={user}
          />
          <NewPostModal
            open={isNewPostModalOpen}
            onOpenChange={setIsNewPostModalOpen}
          />
        </>
      )}
      {links.map((link) => (
        <Link
          key={link.name}
          href={""}
          onClick={() => handleLinkClick(link.name)}
          color="teal.600"
          style={{
            fontWeight: "medium",
            color: "#0d9488",
            textDecoration: "none",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#0f766e";
            e.currentTarget.style.textDecoration = "underline";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#0d9488";
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

      <ColorModeButton />

      {user?.email ? (
        <HStack gap={2}>
          <Text fontSize="sm" color="fg.muted">
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
        <HStack>
          <Button
            bg={"teal.600"}
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
          <Button onClick={devSignIn}>Dev sign in</Button>
        </HStack>
      )}
    </LinkComponent>
  );
};

export default MenuLinks;
