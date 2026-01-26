import { Popover as ChakraPopover, Button, ButtonGroup, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface ConfirmPopoverProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
}

const ConfirmPopover = ({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  confirmText = "Yes, delete",
  cancelText = "Cancel",
  children,
}: ConfirmPopoverProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <ChakraPopover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <ChakraPopover.Trigger asChild>{children}</ChakraPopover.Trigger>
      <ChakraPopover.Positioner>
        <ChakraPopover.Content>
          <ChakraPopover.Arrow>
            <ChakraPopover.ArrowTip />
          </ChakraPopover.Arrow>
          <ChakraPopover.Body>
            <ChakraPopover.Title fontWeight="bold" mb={2}>
              {title}
            </ChakraPopover.Title>
            <Text mb={4}>{description}</Text>
            <ButtonGroup size="sm" justifyContent="flex-end" width="full">
              <Button variant="outline" onClick={() => setOpen(false)}>
                {cancelText}
              </Button>
              <Button colorPalette="red" onClick={handleConfirm}>
                {confirmText}
              </Button>
            </ButtonGroup>
          </ChakraPopover.Body>
        </ChakraPopover.Content>
      </ChakraPopover.Positioner>
    </ChakraPopover.Root>
  );
};

export default ConfirmPopover;
