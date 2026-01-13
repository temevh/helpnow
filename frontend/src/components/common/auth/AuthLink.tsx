import { Text } from "@chakra-ui/react";
import Link from "next/link";

interface AuthLinkProps {
  text: string;
  linkText: string;
  href: string;
}

export default function AuthLink({ text, linkText, href }: AuthLinkProps) {
  return (
    <Text color="gray.600" textAlign="center" fontSize="sm">
      {text}{" "}
      <Link href={href}>
        <Text
          as="span"
          color="teal.600"
          cursor="pointer"
          fontWeight="medium"
          _hover={{ color: "teal.700", textDecoration: "underline" }}
        >
          {linkText}
        </Text>
      </Link>
    </Text>
  );
}
