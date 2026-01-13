"use client";
import {
  useDisclosure,
  Drawer,
  Button,
  Portal,
  CloseButton,
  Icon,
} from "@chakra-ui/react";
import { Menu } from "lucide-react";
import Logo from "./Logo";
import MenuLinks from "./MenuLinks";
import { User } from "@/types";

const MobileDrawer = ({ user }: { user?: User }) => {
  const { open, onToggle } = useDisclosure();

  return (
    <Drawer.Root open={open} onOpenChange={onToggle} size={"full"}>
      <Drawer.Trigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <Icon color={"teal.600"}>
            <Menu />
          </Icon>
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>
                <Logo />
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <MenuLinks isMobile user={user} />
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size={"md"} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default MobileDrawer;
