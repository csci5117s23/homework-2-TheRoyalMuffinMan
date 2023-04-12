import { 
    Flex, Heading, Image, 
    Button, Input, Link, 
    Modal, ModalOverlay,
    ModalContent, ModalHeader,
    ModalFooter, ModalBody,
    ModalCloseButton, FormControl, Spinner,
    FormLabel, FormErrorMessage, useDisclosure
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Category from "./Category";

export default function Menu({ categories, setCategories = undefined }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [category, setCategory] = useState("");
    const [menuCategories, setMenuCategories] = useState(undefined);
    const router = useRouter();
    const checkCategory = cat => {
        cat = cat.trim();
        cat = cat.toLowerCase();
        cat = cat.replace(/\s+/g, "-");
        return categories.includes(cat) || cat === "all-categories";
    }
    const isError = category === "" || checkCategory(category);
    useEffect(() => { !isOpen && setCategory("") }, [isOpen]);

    useEffect(() => {
        const getCategories = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories", {
                method: "GET",
                headers: {
                    "x-apikey": process.env.NEXT_PUBLIC_API_KEY
                }
            });
            
            const data = await response.json();
            setMenuCategories(Object.values(data));
        }
        getCategories();
    }, []);

    const addCategory = async e => {
        const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-apikey": process.env.NEXT_PUBLIC_API_KEY
            },
            body: JSON.stringify({ category: category })
        });
        const result = await response.json();
        setMenuCategories(oldList => [...oldList, result]);
        if (setCategories !== undefined) {
            setCategories(oldList => [...oldList, result.category]);
        }
        onClose();
    }

    if (menuCategories === undefined) {
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
            flexDirection="column"
            background="#323C4D"
            padding="1rem 2rem"
            gap="1rem"
        >
            <Flex 
                align="center"
                color="#FCD6CC"
                gap="1rem"
                cursor="pointer"
                onClick={_ => router.push("/")}
            >
                <Image 
                    height="2rem" 
                    src="../logo.svg" 
                    alt="logo of website"
                />
                <Heading 
                    fontSize="2rem"
                    letterSpacing="0.25rem"
                >
                    Todo{"\u211D"}
                </Heading>
            </Flex>
            <Button 
                onClick={onOpen}
                leftIcon={<AddIcon />} 
                background="#5CF9EC"
                filter="brightness(1)"
                _hover={{ filter: "brightness(0.75)" }}
            >
                Add Category
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired isInvalid={isError}>
                            <FormLabel>Category</FormLabel>
                            <Input type="text" value={category} onChange={e => setCategory(e.target.value)} />
                            {isError && <FormErrorMessage>Invalid Category Entered</FormErrorMessage>}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter 
                        display="flex"
                        justifyContent="space-between"
                    >
                        <Button
                            onClick={addCategory}
                            color="#FCD6CC"
                            background="#323C4D"
                            filter="brightness(1)"
                            _hover={{ filter: "brightness(0.75)" }}
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Link
                onClick={_ => router.push("/todos/all-categories")}
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
                All Categories
            </Link>
            {menuCategories.map(cat => 
                <Category 
                    key={cat._id} 
                    id={cat._id} 
                    category={cat.category} 
                    setMenuCategories={setMenuCategories}
                    setCategories={setCategories}
                />)}
        </Flex>
    );
}