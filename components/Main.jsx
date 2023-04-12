import { 
    Flex, Button, Text,
    Modal, ModalOverlay,
    ModalContent, ModalHeader,
    ModalFooter, ModalBody,
    ModalCloseButton, FormControl, Textarea,
    FormLabel, FormErrorMessage, useDisclosure
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TodoItem from "./TodoItem";

export default function Main({ category, view }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [summary, setSummary] = useState("");
    // Make API call based on category and view (not done = false, done = true)
    const [todos, setTodos] = useState([]);
    const isError = summary === "";
    const router = useRouter();
    
    useEffect(() => {
        const validateData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/todoitems", {
                method: "GET",
                headers: {
                    "x-apikey": process.env.NEXT_PUBLIC_API_KEY
                }
            });
            const data = await response.json();
            setTodos(data.filter(cat => cat.categories.includes(category) && cat.state === view));
        }
        validateData();
    }, []);


    const timeout = delay => {
        return new Promise(res => setTimeout(res, delay));
    }

    const addItem = async e => {
        const cats = category === "all-categories" ? [category] : ["all-categories", category]
        const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/todoitems", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-apikey": process.env.NEXT_PUBLIC_API_KEY
            },
            body: JSON.stringify({ summary: summary, categories: cats })
        });
        const result = await response.json();
        setTodos(oldTodos => [result, ...oldTodos]);
        onClose();
    }

    const setStatusOnTodoItem = async (id, state) => {
        await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/todoitems/${id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-apikey": process.env.NEXT_PUBLIC_API_KEY
            },
            body: JSON.stringify({ state: state }) 
        });

        await timeout(500);
        setTodos(oldTodos => oldTodos.filter(todo => todo._id !== id));
    }

    const deleteItem = async id => {
        await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/todoitems/${id}`, {
            method: "DELETE",
            headers: {
                "x-apikey": process.env.NEXT_PUBLIC_API_KEY
            }
        });
        
        setTodos(oldTodos => oldTodos.filter(todo => todo._id !== id));
    }

    return (
        <Flex
            flex="1"
            flexDirection="column"
            gap="1rem"
            padding="2rem"
        >
            <Flex
                justifyContent="space-between"
                align="center"
            >
                <Flex>
                    <Button
                        onClick={_ => router.push(`/todos/${category}`)}
                        fontSize="1rem"
                        color="#323C4D"
                        background={view ? "#FFFFFF" : "#5CF9EC"}
                        border="2px solid #5CF9EC"
                        filter="brightness(1)"
                        _hover={{ filter: "brightness(0.95)" }}
                        borderRadius="1rem 0 0 1rem"
                    >   
                        Not Done
                    </Button>
                    <Button
                        onClick={_ => router.push(`/done/${category}`)}
                        fontSize="1rem"
                        color="#323C4D"
                        background={view ? "#5CF9EC" : "#FFFFFF"}
                        border="2px solid #5CF9EC"
                        filter="brightness(1)"
                        _hover={{ filter: "brightness(0.95)" }}
                        borderRadius="0 1rem 1rem 0"
                    >   
                        Done
                    </Button> 
                </Flex>
                <Text 
                    textTransform="capitalize"
                    color="#323C4D"
                    fontSize="1.25rem"
                    fontWeight="500"
                >
                    {category.replace(/-/g, " ")}
                </Text>
                <Button
                    fontSize="1rem"
                    color="#323C4D"
                    background="#5CF9EC"
                    border="2px solid #5CF9EC"
                    filter="brightness(1)"
                    visibility={view ? "hidden" : "visible"}
                    _hover={{ filter: "brightness(0.95)" }}
                    borderRadius="1rem"
                    onClick={onOpen}
                >
                    Add Item
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add a Todo Item</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl isRequired isInvalid={isError}>
                                <FormLabel>Summary</FormLabel>
                                <Textarea value={summary} onChange={e => setSummary(e.target.value)} />
                                {isError && <FormErrorMessage>Enter Summary Description</FormErrorMessage>}
                            </FormControl>
                        </ModalBody>

                        <ModalFooter 
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Button
                                onClick={addItem}
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
            </Flex>
            {todos.map(todo => {
                return (
                    <TodoItem 
                        key={todo._id} 
                        id={todo._id} 
                        summary={todo.summary}
                        view={view}
                        setStatusOnTodoItem={setStatusOnTodoItem}
                        deleteItem={deleteItem}
                    />
                )})
            }
        </Flex>
    );
}