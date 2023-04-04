import { useState } from "react";
import Menu from "@/components/Menu";
import Main from "@/components/Main";
import { Flex } from "@chakra-ui/react";

export default function Todos({ query }) {
    // API call for all categories
    const [categories, setCategories] = useState([]);

    return (
        <Flex
            flex="1"
            background="#FFFFFF"
        >
            <Menu 
                categories={categories}
                setCategories={setCategories}
            />
            <Main 
                category={query.category}
                view={false}
            />
        </Flex>
    );
}

export const getServerSideProps = async context => {
    return {
        props: { query: context.query }
    };
};