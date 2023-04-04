import { Flex, Checkbox, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function TodoItem({ id, summary, view, setStatusOnTodoItem }) {
    const [isChecked, setIsChecked] = useState(view);
    
    return (
        <Flex
            gap="1rem"
            background="#F8F8FF"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            padding="1rem"
            borderRadius="1rem"
        >
            <Checkbox
                colorScheme="green"
                isChecked={isChecked}
                onChange={_ => { setIsChecked(!isChecked); setStatusOnTodoItem(id, !view) }}
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

        </Flex>
    );
}