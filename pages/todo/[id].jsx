import { 
    Flex, Editable,
    EditableTextarea,
    EditablePreview,
    Text, Button, Tag,
    TagLabel, TagLeftIcon,
    Checkbox, Spinner
} from "@chakra-ui/react";
import { CheckIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Menu from "@/components/Menu";

export default function Todo() {
    // API call for all categories
    const [categories, setCategories] = useState(undefined);

    // API call for todoItem attributes given id
    const [todoCategories, setTodoCategories] = useState(undefined);
    const [checkStatus, setCheckStatus] = useState(undefined);
    const [summary, setSummary] = useState(undefined);
    const router = useRouter();
    const router_id = router.query.id

    useEffect(() => {
        if (!router_id) return;

        const validateData = async () => {
            let response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/categories", {
                method: "GET",
                headers: {
                    "x-apikey": process.env.NEXT_PUBLIC_API_KEY
                }
            });
            
            const data = await response.json();
            const all_cats = data.map(cat => cat.category);
            setCategories(all_cats);

            response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + "/todoitems?" 
                + new URLSearchParams({
                    _id: router_id
                }), {
                method: "GET",
                headers: {
                    "x-apikey": process.env.NEXT_PUBLIC_API_KEY
                }
            });

            const result = await response.json();
            if (result == null || result.length === 0) {
                router.push("/404"); return;
            }

            const res_cats = result[0].categories;
            const res_summary = result[0].summary;
            const res_state = result[0].state;
            const cats = res_cats.filter(cat => all_cats.includes(cat));

            cats.unshift("all-categories");

            if (cats.length !== res_cats.length) {
                await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/todoitems/${router_id}`, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "x-apikey": process.env.NEXT_PUBLIC_API_KEY
                    },
                    body: JSON.stringify({ _id: router_id, summary: res_summary, state: res_state, categories: cats}) 
                });
            }

            setSummary(res_summary);
            setTodoCategories(cats);
            setCheckStatus(res_state);
        }
        validateData();
    }, [router_id, router]);

    const save = async e => {
        await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + `/todoitems/${router_id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-apikey": process.env.NEXT_PUBLIC_API_KEY
            },
            body: JSON.stringify({ _id: router_id, summary: summary, state: checkStatus, categories: todoCategories}) 
        });
    }

    const addTag = cat => {
        setTodoCategories(cats => [cat, ...cats]);
    }

    const removeTag = cat => {
        setTodoCategories(cats => cats.filter(item => item !== cat))
    }

    if (categories === undefined || summary === undefined || todoCategories === undefined || checkStatus === undefined) {
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
                                height="250px"
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
            </Flex>
        </Flex>
    );
}
