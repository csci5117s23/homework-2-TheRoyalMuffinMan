import { Flex, Heading, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Menu from "@/components/Menu";

export default function Todos() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const { category } = router.query;

    return (
        <Flex
            flex="1"
            background="#FFFFFF"
        >
            <Menu 
                categories={categories}
                setCategories={setCategories}
                selected={category}
            />            
        </Flex>
    );
}