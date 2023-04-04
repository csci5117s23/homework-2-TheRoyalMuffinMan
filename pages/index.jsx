import { Flex, Image, Heading, Button, keyframes } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const rotation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
`;

export default function Home() {
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
                color="#FCD6CC"
                gap="1rem"
            >
                <Image 
                    height="4rem" 
                    src="logo.svg" 
                    alt="logo of website"
                    animation={`${rotation} 5s infinite linear`}
                />
                <Heading 
                    fontSize="4rem"
                    letterSpacing="0.5rem"
                >
                    Todo{'\u211D'}
                </Heading>
            </Flex>
            <Button 
                onClick={_ => router.push("/login")}
                letterSpacing="0.5rem"
                fontSize="2.5rem"
                color="#323C4D"
                background="#5CF9EC"
                padding="2rem 3rem"
                borderRadius="2rem"
                filter="brightness(1)"
                _hover={{ filter: "brightness(0.75)" }}
            >
                Login
            </Button>
        </Flex>
    ); 
}
