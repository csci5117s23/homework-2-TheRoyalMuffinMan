import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function NotFound() {
    const router = useRouter();

    return (
        <Flex
            flex="1"
            flexDirection="column"
            gap="2rem"
            justify="center"
            align="center"
            background="linear-gradient(180deg, #323C4D, #171515);"
        >
            <Flex
                align="center"
            >
                <Heading 
                    color="white"
                    padding="1rem 2rem"
                    borderRight="2px solid white"
                >
                    404
                </Heading>
                <Text
                    color="white"
                    padding="1rem 2rem"
                    fontSize="1.25rem"
                >
                    This page could not be found
                </Text>
            </Flex>
            <Button 
                onClick={_ => router.push("/todos/all-categories")}
                fontSize="1.25rem"
                padding="1rem 1.5rem"
                filter="brightness(1)"
                _hover={{ filter: "brightness(0.75)" }}
            >
                Home
            </Button>
        </Flex>
    )
}