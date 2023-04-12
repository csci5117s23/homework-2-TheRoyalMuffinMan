import { Flex, Link } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Category({ id, category, setMenuCategories, setCategories = undefined }) {
    const router = useRouter();

    const deleteCategory = async e => {
        e.preventDefault();
        const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/categories/${id}`, { 
            method: "DELETE",
            headers: {
                "x-apikey": process.env.NEXT_PUBLIC_API_KEY
            }
        });
        const result = await response.json();
        setMenuCategories(list => list.filter(item => item._id !== result._id));
        if (setCategories !== undefined) {
            setCategories(list => list.filter(item => item.category !== result.category));
        }
        if (decodeURIComponent(router.asPath).indexOf(category) !== -1) {
            router.push("/todos/all-categories");
        }
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