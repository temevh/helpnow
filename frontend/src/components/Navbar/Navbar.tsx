import { Box, Flex } from "@chakra-ui/react";
import Logo from "./Logo";
import MenuLinks from "./MenuLinks";
import MobileDrawer from "./MobileDrawer";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth";
export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

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
        <MenuLinks user={user} />
      </Box>

      {/*Mobile Menu*/}
      <Box display={{ base: "block", md: "none" }}>
        <MobileDrawer />
      </Box>
    </Flex>
  );
};
