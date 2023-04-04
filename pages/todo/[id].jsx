import { 
    Flex, Editable,
    EditableTextarea,
    EditablePreview,
    Heading
} from "@chakra-ui/react";
import { useState } from "react";
import Menu from "@/components/Menu";

export default function Todo({ query }) {
    // API call for all categories
    const [categories, setCategories] = useState([]);

    // API call for todoItem attributes given id
    const [summary, setSummary] = useState('yes');
    const [todoCategories, setTodoCategories] = useState([]);
    const [comments, setComments] = useState([]);

    const changeSummary = (e) => {
        // API call to change summary of todo item
        console.log(e.target.value);
        setSummary(e.target.value);
    }


    return (
        <Flex
            flex="1"
            background="#FFFFFF"
        >
            <Menu 
                categories={categories}
                setCategories={setCategories}
            />
            <Flex
                flex="1"
                flexDirection="column"
                gap="1rem"
                padding="2rem"
            >
                <Flex
                    flexDirection="column" 
                    gap="0.5rem"
                >
                    <Heading>Summary</Heading>
                    <Editable 
                        defaultValue={summary}
                        width="500px"
                        border="2px solid black"
                        borderRadius="1rem"
                        padding="0.35rem 0.5rem"
                    >
                        <EditablePreview />
                        <EditableTextarea 
                            onChange={changeSummary}
                            value={summary}
                            margin="0"
                            padding="0.25rem"
                        />
                    </Editable>
                </Flex>

            </Flex>
        </Flex>
    );
}

export const getServerSideProps = async context => {
    return {
        props: { query: context.query }
    };
};