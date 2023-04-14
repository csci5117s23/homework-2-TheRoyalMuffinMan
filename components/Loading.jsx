import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
    return (
        <Flex
            background="#FFFFFF"
            justify="center"
            align="center"
            flex="1"
        >
            <Spinner
                thickness="12px"
                speed="0.75s"
                emptyColor="gray.200"
                color="#323C4D"
                boxSize="100px"
            />
        </Flex>
    );
}