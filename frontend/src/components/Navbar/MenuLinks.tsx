import { HStack, VStack, Link, Button } from "@chakra-ui/react";
import { Settings, User, Bell, House } from "lucide-react";

const links = [
  { name: "Home", href: "#home", icon: House },
  { name: "Profile", href: "#about", icon: User },
  { name: "Settings", href: "#services", icon: Settings },
  { name: "Alerts", href: "#contact", icon: Bell },
];

const MenuLinks = ({ isMobile = false }) => {
  const LinkComponent = isMobile ? VStack : HStack;

  return (
    <LinkComponent gap={isMobile ? 4 : 8} align={"center"}>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          fontWeight={"medium"}
          color={"blue.600"}
          _hover={{
            color: "blue.500",
            textDecoration: "underline",
          }}
          transition={"color 0.2s ease"}
          aria-label={link.name}
        >
          <HStack>
            <link.icon size={30} style={{ marginRight: 4 }} />
            {isMobile && link.name}
          </HStack>
        </Link>
      ))}

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
      >
        Sign in
      </Button>
    </LinkComponent>
  );
};

export default MenuLinks;
