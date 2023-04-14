import { Flex } from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <Flex
            justify="center"
            align="center"
            flex="1"
            background="#eee"
        >
            <SignUp 
                path="/sign-up"
                routing="path" 
                signUpUrl="/sign-in" 
                redirectUrl="/todos/all-categories" 
            />
        </Flex>
    );
}