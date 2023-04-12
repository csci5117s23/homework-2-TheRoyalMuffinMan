import { Flex, Checkbox, Text } from "@chakra-ui/react";
import { ViewIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";

export default function TodoItem({ id, summary, view, setStatusOnTodoItem, deleteItem }) {
    const [isChecked, setIsChecked] = useState(view);
    const router = useRouter();
    
    return (
        <Flex
            justify="space-between"
            align="center"
            gap="1rem"
            background="#F8F8FF"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            padding="1rem"
            borderRadius="1rem"
        >
            <Checkbox
                colorScheme="green"
                isChecked={isChecked}
                onChange={e => { setIsChecked(!isChecked); setStatusOnTodoItem(id, !view) }}
            >
                <Text
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    maxWidth="50vw"
                >
                    {summary}
                </Text>
            </Checkbox>
            <Flex
                align="center"
                gap="1rem"
            >
                <ViewIcon 
                    boxSize="25px"
                    color="#323C4D"
                    filter="brightness(1)"
                    _hover={{ filter: "brightness(0.01)" }}
                    cursor="pointer"
                    onClick={e => router.push(`/todo/${id}`)}
                />
                <DeleteIcon 
                    boxSize="22px"
                    color="#323C4D"
                    filter="brightness(1)"
                    _hover={{ filter: "brightness(0.01)" }}
                    cursor="pointer"
                    onClick={e => deleteItem(id)}
                />
            </Flex>
        </Flex>
    );
}