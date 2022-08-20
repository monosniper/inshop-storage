import React, {useEffect, useMemo, useState} from 'react';
import Head from "next/head";
import {
    Button,
    Grid,
    GridItem,
    Input,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Skeleton,
    Text, Textarea, useDisclosure, useToast
} from "@chakra-ui/react";
import Card from "../../components/Card";
import styles from "../../styles/Form.module.scss";
import {useRouter} from "next/router";
import shop from "../../store/shop";
import {$routes} from "../../http/routes";
import {observer} from "mobx-react-lite";
import editorStyles from "../../styles/Editor.module.scss";
import Editor, {createEditorStateWithText} from "@draft-js-plugins/editor";
import {
    BlockquoteButton,
    BoldButton, CodeBlockButton,
    CodeButton,
    ItalicButton,
    OrderedListButton,
    UnderlineButton,
    UnorderedListButton
} from "@draft-js-plugins/buttons";
import createToolbarPlugin, {Separator} from "@draft-js-plugins/static-toolbar";
import {stateToHTML} from "draft-js-export-html";
import {convertFromHTML} from "draft-js";
import EditorState from "draft-js/lib/EditorState";
import ContentState from "draft-js/lib/ContentState";

const CustomPage = () => {
    const toast = useToast()
    const router = useRouter()
    const {id} = router.query
    const data = useMemo(() => shop.getCustomPage(id), [shop.customPages])

    const [startTitle, setStartTitle] = useState('');
    const [pageName, setPageName] = useState('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if(data) {
            setStartTitle(data.title)
            setTitle(data.title)
            setSlug(data.slug)
            setDescription(data.description)
            setContent(data.content)
        }
    }, [data])

    useEffect(() => {
        shop.requestCustomPages()
    }, [])

    const onTitleChange = (e) => setTitle(e.target.value)
    const onSlugChange = (e) => setSlug(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)
    const onPageNameChange = (e) => setPageName(e.target.value)

    const handleSave = () => {
        shop.updateCustomPage(data.id,{
            title,
            slug,
            description,
            content: stateToHTML(editorState.getCurrentContent()),
        }).then(() => {
            shop.requestCustomPages()
            toast({
                title: 'Изменения сохранены.',
                description: '',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            router.push($routes.custom_pages.index)

        })
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDelete = () => {
        if(pageName === startTitle) {
            shop.deleteCustomPage(id).then(rs => {
                if(rs.ok) router.push($routes.custom_pages.index)
                else {
                    toast({
                        title: rs.message ? rs.message : 'Произошла какая-то ошибка.',
                        description: '',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                }
            })
        } else {
            onClose()
            toast({
                title: 'Названия не совпадают',
                description: '',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const blocksFromHTML = useMemo(() => data ? convertFromHTML(data.content) : null, [data]);
    const state = useMemo(() => blocksFromHTML ? ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
    ) : null, [blocksFromHTML]);

    const [editor, setEditor] = useState(null)
    const [editorState, setEditorState] = useState(() => createEditorStateWithText('Загрузка...'))
    const toolbarPlugin = createToolbarPlugin();
    const { Toolbar } = toolbarPlugin;
    const plugins = [toolbarPlugin];

    useEffect(() => {
        if(state) setEditorState(EditorState.createWithContent(state))
    }, [state])

    const focus = () => {}

    return (
        <div>
            <Head>
                <title>Склад - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <Grid templateColumns='repeat(2, 1fr)' mb={4} gap={4}>
                <GridItem w='100%'>
                    {data ? (
                        <>
                            <Card
                                title={'Страница '+data.title}
                                linkText={'Назад'}
                                linkHref={$routes.custom_pages.index}
                            >
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Название</Text>
                                    <Input onChange={onTitleChange} placeholder='Название' value={title} />
                                </div>
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Путь <small>(Например: {shop.domain}/<b>help</b>)</small></Text>
                                    <Input onChange={onSlugChange} placeholder='Слоган' value={slug} />
                                </div>
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Описание</Text>
                                    <Textarea onChange={onDescriptionChange} value={description}></Textarea>
                                </div>
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Контент</Text>
                                    <div className={editorStyles.editor} onClick={focus}>
                                        <Editor
                                            editorState={editorState}
                                            onChange={setEditorState}
                                            plugins={plugins}
                                            ref={(element) => {
                                                setEditor(element);
                                            }}
                                        />
                                        <Toolbar>
                                            {
                                                // may be use React.Fragment instead of div to improve perfomance after React 16
                                                (externalProps) => {
                                                    const props = {...externalProps}

                                                    props.getEditorState = () => editorState
                                                    props.setEditorState = setEditorState

                                                    return (
                                                        <div>
                                                            <BoldButton {...props} />
                                                            <ItalicButton {...props} />
                                                            <UnderlineButton {...props} />
                                                            <CodeButton {...props} />
                                                            <Separator {...props} />
                                                            <UnorderedListButton {...props} />
                                                            <OrderedListButton {...props} />
                                                            <BlockquoteButton {...props} />
                                                            <CodeBlockButton {...props} />
                                                        </div>
                                                    )
                                                }
                                            }
                                        </Toolbar>
                                    </div>
                                </div>

                                <Button colorScheme={'facebook'} onClick={handleSave} mr={3}>Сохранить</Button>
                                <Button colorScheme={'red'} onClick={onOpen}>Удалить</Button>

                                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Удаление страницы</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <p>Чтобы удалить страницу, введите ее полное название (<b>{startTitle}</b>) ниже:</p>
                                            <Input mt={2} placeholder={startTitle} value={pageName} onChange={onPageNameChange} />
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button onClick={handleDelete} colorScheme='red' mr={3}>
                                                Удалить
                                            </Button>
                                            <Button variant='ghost' onClick={onClose}>Отмена</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Card>
                        </>
                    ) : <Skeleton height={100} />}
                </GridItem>
            </Grid>
        </div>
    );
};

export default observer(CustomPage);