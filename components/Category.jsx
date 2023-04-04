import { Button, Flex, Link } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Category({ category }) {
    const router = useRouter();

    const deleteCategory = e => {
        e.preventDefault();
        // Logic to delete from DB
        router.push("/todos/all-categories")
    }

    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
        >
            <Link
                onClick={_ => router.push(`/todos/${category}`)}
                color="#FCD6CC"
                fontSize="1.25rem"
                position="relative"
                _before={{
                    content: '""',
                    position: "absolute",
                    display: "block",
                    width: "100%",
                    height: "2px",
                    bottom: "-2px",
                    left: "0",
                    backgroundColor: "#5CF9EC",
                    transform: "scaleX(0)",
                    transformOrigin: "top left",
                    transition: "transform 0.3s ease"
                }}
                _hover={{
                    _before: {
                        transform: "scaleX(1)"
                    },
                    cursor: "pointer"
                }}
            >
                {category}
            </Link>
            <DeleteIcon
                onClick={deleteCategory} 
                color="#FCD6CC"
                cursor="pointer"
            />
        </Flex>
    );
}