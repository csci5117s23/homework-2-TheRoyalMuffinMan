import { 
    Flex, Button, Text,
    Modal, ModalOverlay,
    ModalContent, ModalHeader,
    ModalFooter, ModalBody,
    ModalCloseButton, FormControl, Textarea,
    FormLabel, FormErrorMessage, useDisclosure
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import TodoItem from "./TodoItem";

export default function Main({ category, view }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [summary, setSummary] = useState('');
    // Make API call based on category and view (not done = false, done = true)
    const [todos, setTodos] = useState([]);
    const isError = summary === '';
    const router = useRouter();

    const timeout = delay => {
        return new Promise(res => setTimeout(res, delay));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // Logic to add to DB and return back id to identification

        //                                          PLACE HOLDER
        setTodos(oldTodos => [{ id: Math.floor(Math.random() * 100000000), summary: summary }, ...oldTodos]);
        onClose();
    }

    const setStatusOnTodoItem = async (id, state) => {
        const todoItem = todos.find(todo => todo.id === id);
        console.log(todoItem);

        // Logic to change status in DB using {id} and {state}
        await timeout(1000);
        setTodos(oldTodos => oldTodos.filter(todo => todo.id !== id));
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
                    {category.replace(/-/g, ' ')}
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
                                onClick={handleSubmit}
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
                        key={todo.id} 
                        id={todo.id} 
                        summary={todo.summary} 
                        view={view}
                        setStatusOnTodoItem={setStatusOnTodoItem}
                    />
                )})
            }
        </Flex>
    );
}