import React, {Component, useState} from 'react';
import Head from "next/head";
import Card from "../../components/Card";
import styles from "../../styles/CustomPages.module.scss";
import Link from "next/link";
import {$routes} from "../../http/routes";
import {useRouter, withRouter} from "next/router";
import {Button, Input, Text, Textarea, useToast} from "@chakra-ui/react";
import store from "../../store/store";
import shop from "../../store/shop";
import createToolbarPlugin, {
    Separator,
} from '@draft-js-plugins/static-toolbar';
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from '@draft-js-plugins/buttons';
import editorStyles from '../../styles/Editor.module.scss';
import {stateToHTML} from 'draft-js-export-html';
import {observer} from "mobx-react-lite";


const Create = () => {
    const router = useRouter()
    const toast = useToast()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editorState, setEditorState] = useState(() => createEditorStateWithText(''))
    const [editor, setEditor] = useState(null)

    const onTitleChange = (e) => setTitle(e.target.value)
    const onDescriptionChange = (e) => setDescription(e.target.value)

    const toolbarPlugin = createToolbarPlugin();
    const { Toolbar } = toolbarPlugin;
    const plugins = [toolbarPlugin];

    const save = () => {
        if(
            title.trim() !== ''
        ) {
            shop.createCustomPage({
                title,
                description,
                content: stateToHTML(editorState.getCurrentContent()),
            }).then(rs => {
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
            toast({
                title: 'Необходимо заполнить поле название.',
                description: '',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const focus = () => {

    }

    return (
        <div>
            <Head>
                <title>Дополнительные страницы - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
            </Head>

            <Card
                title={'Новая страница'}
                linkText={'Назад'}
                linkHref={$routes.custom_pages.index}
            >
                <div className={styles.row}>
                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Название</Text>
                    <Input onChange={onTitleChange} placeholder='Название' value={title} />
                </div>
                <div className={styles.row}>
                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Описание</Text>
                    <Textarea onChange={onDescriptionChange} placeholder='Описание' value={description} />
                </div>
                <div className={styles.row}>
                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Контент страницы</Text>
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
                <Button colorScheme={'facebook'} onClick={save}>Сохранить</Button>
            </Card>
        </div>
    );
};

export default observer(Create);