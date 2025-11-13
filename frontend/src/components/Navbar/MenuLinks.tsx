"use client";
import { HStack, VStack, Button, Box, Text } from "@chakra-ui/react";
import { Settings, User, Bell, House, LogOut, ListCheck } from "lucide-react";
import { signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { VolunteeredModal } from "../VolunteeredModal/VolunteeredModal";
import { useState } from "react";
import { GET_VOLUNTEERED_POSTS } from "@/graphql/queries/post";
import { useMutation, useQuery } from "@apollo/client/react";

const links = [
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
  user?: any;
}) => {
  const LinkComponent = isMobile ? VStack : HStack;
  const router = useRouter();

  const [isVolunteeredModalOpen, setIsVolunteeredModalOpen] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_VOLUNTEERED_POSTS, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

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

  const handleOpenModal = () => {
    if (user?.id) {
      refetch(); // Refetch the latest data when opening modal
    }
    setIsVolunteeredModalOpen(true);
  };

  return (
    <LinkComponent gap={isMobile ? 4 : 8} align={"center"}>
      <VolunteeredModal
        open={isVolunteeredModalOpen}
        onOpenChange={setIsVolunteeredModalOpen}
        posts={data?.getVolunteeredPosts || []}
        loading={loading}
      />
      {links.map((link) => (
        <Link
          key={link.name}
          href={""}
          onClick={handleOpenModal}
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
        <HStack>
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
          <Button onClick={devSignIn}>Dev sign in</Button>
        </HStack>
      )}
    </LinkComponent>
  );
};

export default MenuLinks;
