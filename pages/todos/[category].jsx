import TodoList from "@/components/TodoList";
import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import Menu from "@/components/Menu";

export default function Todos() {
    // Auth
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [authToken, setAuthToken] = useState(undefined);

    // API call for all categories
    const [categories, setCategories] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const router = useRouter();
    const router_category = router.query.category;

    useEffect(() => {
        if (!router_category) return;
        if (!isLoaded) return;

        const validateData = async () => {
            if (!userId) {
                router.push("/");
                return;
            }

            const token = await getToken({ template: "codehooks" });
            const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            
            const data = await response.json();
            const cat_entries = Object.values(data);
            if (router_category === "all-categories" || cat_entries.find(curr_cat => curr_cat.category === router_category)) {
                setCategory(router_category);
            } else {
                router.push("/404");
            }
            
            setCategories(cat_entries);
            setAuthToken(token);
        }
        validateData();
    }, [router_category, router, isLoaded, userId, getToken]);

    return (
        <Flex
            flex="1"
            background="#FFFFFF"
        >
            <Menu 
                categories={categories}
                authToken={authToken}
            />
            <TodoList 
                category={category}
                authToken={authToken}
                view={false}
            />
        </Flex>
    );
}
