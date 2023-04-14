import { 
    Flex, Editable,
    EditableTextarea,
    EditablePreview,
    Text, Button, Tag,
    TagLabel, TagLeftIcon,
    Checkbox, useDisclosure, Slide
} from "@chakra-ui/react";
import { CheckIcon, AddIcon, CloseIcon, WarningIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "./Loading";

export default function TodoView({ id, authToken, categories }) {
    const [todoCategories, setTodoCategories] = useState(undefined);
    const [checkStatus, setCheckStatus] = useState(undefined);
    const [summary, setSummary] = useState(undefined);
    const [created, setCreated] = useState(undefined);
    const { isOpen, onToggle } = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        if (!id) return;
        if (!authToken) return;
        if (!categories) return;

        const retrieveData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/todoitems/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + authToken
                }
            });

            const result = await response.json();
            if (result == null || result.length === 0) {
                router.push("/404"); return;
            }

            const res_cats = result.categories;
            const res_summary = result.summary;
            const res_state = result.state;
            const res_created = result.created;
            const cats = res_cats.filter(cat => categories.includes(cat));

            cats.unshift("all-categories");

            if (cats.length !== res_cats.length) {
                await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/todoitems/${id}`, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + authToken
                    },
                    body: JSON.stringify({ _id: id, summary: res_summary, state: res_state, categories: cats, created: res_created}) 
                });
            }

            setSummary(res_summary);
            setTodoCategories(cats);
            setCheckStatus(res_state);
            setCreated(res_created);
        }

        retrieveData();
    }, [id, authToken, categories, router]);

    useEffect(() => {
        if (!isOpen) return;

        const fadeaway = async () => {
            await timeout(2000);
            onToggle();
        }

        fadeaway();
    }, [isOpen, onToggle]);

    const timeout = delay => {
        return new Promise(res => setTimeout(res, delay));
    }

    const save = async e => {
        await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/todoitems/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authToken
            },
            body: JSON.stringify({ _id: id, summary: summary, state: checkStatus, categories: todoCategories, created: created }) 
        });
        onToggle();
    }

    const addTag = cat => {
        setTodoCategories(cats => [cat, ...cats]);
    }

    const removeTag = cat => {
        setTodoCategories(cats => cats.filter(item => item !== cat))
    }

    const notAllProps = () => {
        return (
            id === undefined || authToken === undefined ||
            categories === undefined || todoCategories === undefined ||
            created === undefined || summary === undefined || checkStatus === undefined
        );
    }

    if (notAllProps()) {
        return <Loading />;
    }

    return (
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
                <Flex
                    align="center"
                    justify="space-between"
                >   
                    <Checkbox
                        size="lg"
                        colorScheme="green"
                        isChecked={checkStatus}
                        onChange={e => setCheckStatus(e.target.checked)}
                    >
                        <Text fontWeight="700">
                            Summary
                        </Text>
                    </Checkbox>
                    <Button 
                        color="#323C4D"
                        leftIcon={<CheckIcon />} 
                        background="#5CF9EC"
                        filter="brightness(1)"
                        _hover={{ filter: "brightness(0.75)" }}
                        onClick={save}
                    >
                        Save
                    </Button>
                </Flex>
                <Flex
                    flex="1"
                    justify="space-between"
                >
                    <Editable 
                        defaultValue={summary}
                        width="500px"
                    >
                        <EditablePreview
                            width="500px"
                            border="2px solid black"
                            borderRadius="1rem"
                            padding="0.35rem 0.5rem"
                            whiteSpace="pre-wrap"
                            minHeight="250px"
                        />
                        <EditableTextarea 
                            onChange={e => setSummary(e.target.value)}
                            value={summary}
                            margin="0"
                            padding="0.25rem"
                            height="250px"
                        />
                    </Editable>
                    <Flex
                        flexWrap="wrap"
                        gap="0.5rem"
                        align="flex-start"
                        width="300px"
                        height="fit-content"
                    >
                        {todoCategories.filter(cat => cat !== "all-categories" && categories.includes(cat)).map(cat => (
                            <Tag 
                                width="fit-content" 
                                height="fit-content"
                                padding="0.75rem"
                                key={cat} 
                                color="#323C4D"
                                background="#5CF9EC"
                            >
                                <Flex
                                    align="center"
                                >
                                    <TagLeftIcon 
                                        cursor="pointer"
                                        boxSize="12px" 
                                        as={CloseIcon} 
                                        onClick={e => removeTag(cat)}
                                    />
                                    <TagLabel>{cat}</TagLabel>
                                </Flex>
                            </Tag>
                        ))}
                        {categories.filter(cat => !todoCategories.includes(cat) && cat !== "all-categories").map(cat => (
                            <Tag 
                                width="fit-content" 
                                height="fit-content"
                                padding="0.75rem"
                                key={cat} 
                                color="white"
                                background="#323C4D"
                            >
                                <Flex
                                    align="center"
                                >
                                    <TagLeftIcon 
                                        cursor="pointer"
                                        boxSize="12px" 
                                        as={AddIcon} 
                                        onClick={e => addTag(cat)}
                                    />
                                    <TagLabel>{cat}</TagLabel>
                                </Flex>
                            </Tag>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
            <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
                <Flex
                    margin="0 auto"
                    marginBottom="50px"
                    width="fit-content"
                    height="fit-content"
                    padding="1rem"
                >
                    <Button 
                        color="#323C4D"
                        leftIcon={<WarningIcon />} 
                        background="#5CF9EC"
                        pointerEvents="none"
                        padding="1.5rem 1.5rem"
                        fontSize="1.15rem"
                    >
                        Saved
                    </Button>
                </Flex>
            </Slide>
        </Flex>
    )
}