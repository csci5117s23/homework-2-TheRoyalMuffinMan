import { Link } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Category({ key, category, selected }) {
    const router = useRouter();

    return (
        <Link
            onClick={_ => router.push(`/todos/${category}`)}
            color="#FCD6CC"
            fontSize="1.25rem"
            position="relative"
            width="fit-content"
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
    );
}