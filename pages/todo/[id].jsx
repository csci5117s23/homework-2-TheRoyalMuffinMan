import TodoView from "@/components/TodoView";
import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import Menu from "@/components/Menu";

export default function Todo() {
    // Auth
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [authToken, setAuthToken] = useState(undefined);

    // API call for all categories
    const [categories, setCategories] = useState(undefined);

    // API call for todoItem attributes given id
    const router = useRouter();
    const router_id = router.query.id

    useEffect(() => {
        if (!router_id) return;
        if (!isLoaded) return;

        const validateData = async () => {
            if (!userId) {
                router.push("/");
                return;
            }
            
            const token = await getToken({ template: "codehooks" });
            let response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            
            const data = await response.json();
            setCategories(data.map(cat => cat.category));
            setAuthToken(token);
        }
        validateData();
    }, [router_id, router, isLoaded, userId, getToken]);

    return (
        <Flex
            flex="1"
            background="#FFFFFF"
        >
            <Menu 
                categories={categories}
                authToken={authToken}
                setCategories={setCategories}
            />
            <TodoView 
                id={router_id}
                authToken={authToken}
                categories={categories}
                setCategories={setCategories}
            />
        </Flex>
    );
}
