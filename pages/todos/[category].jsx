import { Flex, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";
import Main from "@/components/Main";

export default function Todos() {
    // API call for all categories
    const [categories, setCategories] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    const router = useRouter();
    const router_category = router.query.category;

    useEffect(() => {
        if (!router_category) return;

        const validateData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories", {
                method: "GET",
                headers: {
                    "x-apikey": process.env.NEXT_PUBLIC_API_KEY
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
        }
        validateData();
    }, [router_category, router]);

    if (category === undefined || categories === undefined) {
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
                    boxSize="250px"
                />
            </Flex>
        );
    }

    return (
        <Flex
            flex="1"
            background="#FFFFFF"
        >
            <Menu 
                categories={categories}
            />
            <Main 
                category={category}
                view={false}
            />
        </Flex>
    );
}
