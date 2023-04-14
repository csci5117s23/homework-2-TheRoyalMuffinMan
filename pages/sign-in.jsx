import { Flex } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <Flex
            justify="center"
            align="center"
            flex="1"
            background="#eee"
        >
            <SignIn 
                path="/sign-in"
                routing="path" 
                signUpUrl="/sign-up" 
                redirectUrl="/todos/all-categories" 
            />
        </Flex>
    );
}