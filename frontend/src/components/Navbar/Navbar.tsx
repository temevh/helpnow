"use client";
import { Box, Flex } from "@chakra-ui/react";
import Logo from "./Logo";
import MenuLinks from "./MenuLinks";
import MobileDrawer from "./MobileDrawer";
import { useUser } from "@/hooks/useUser";

export const Navbar = () => {
  const { user } = useUser();

  return (
    <Flex
      as={"nav"}
      align={"center"}
      justify={"space-between"}
      wrap={"wrap"}
      gap={{ base: 8, lg: 16 }}
      px={{ base: 6, lg: 12 }}
      py={3}
      mx={"auto"}
      position="sticky"
      top={0}
      bg="white"
      zIndex={1000}
    >
      <Logo />
      {/*Desktop Menu*/}
      <Box display={{ base: "none", md: "block" }}>
        {/*TODO: Change to something else other than any :D*/}
        <MenuLinks user={user as any} />
      </Box>

      {/*Mobile Menu*/}
      <Box display={{ base: "block", md: "none" }}>
        {/*TODO: Change to something else other than any :D*/}
        <MobileDrawer user={user as any} />
      </Box>
    </Flex>
  );
};
