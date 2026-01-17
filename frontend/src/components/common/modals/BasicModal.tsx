import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogBackdrop,
  HStack,
} from "@chakra-ui/react";
import { CustomCloseButton } from "../buttons";
import { ReactNode } from "react";

interface BasicModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  header?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export const BasicModal = ({
  open,
  onOpenChange,
  header,
  children,
  footer,
}: BasicModalProps) => {
  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => onOpenChange(e.open)}
      placement="center"
      closeOnEscape
    >
      <DialogBackdrop bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <DialogContent
        maxW="3xl"
        maxH="85vh"
        bg="bg.surface"
        borderRadius="2xl"
        boxShadow="2xl"
        border="2px solid"
        borderColor="teal.500"
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={1000}
      >
        <DialogCloseTrigger
          top={4}
          right={4}
          bg="bg.surface"
          borderRadius="full"
          _hover={{ bg: "blue.100" }}
        />

        <DialogHeader
          bgGradient="linear(to-r, blue.400, blue.500)"
          color="white"
          borderTopRadius="2xl"
          p={6}
        >
          <HStack justify="space-between" align="center" w={"100%"}>
            {header}
            <CustomCloseButton onClick={() => onOpenChange(false)} />
          </HStack>
        </DialogHeader>

        <DialogBody
          px={6}
          bg="bg.surface"
          overflowY="auto"
          maxH="calc(85vh - 200px)"
          css={{
            "&::-webkit-scrollbar": {
              width: "0px",
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {children}
        </DialogBody>

        <DialogFooter bg="bg.surface" borderBottomRadius="2xl" p={4} gap={3}>
          {footer}
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
