import React, {useEffect, useMemo, useState} from 'react';
import Head from "next/head";
import Card from "../components/Card";
import store from "../store/store";
import {$routes} from "../http/routes";
import Shops from "../components/Shops";
import {Box, Button, Grid, GridItem, Input, Stack, Text} from "@chakra-ui/react";
import ItemList from "../components/ItemList";
import useUser from "../hooks/useUser";
import styles from "../styles/CustomPages.module.scss";
import {showMessage} from "../utils/showMessage";
import {showError} from "../utils/showError";

const Profile = () => {
    const user = useUser()

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [old_password, setOldPassword] = useState('')
    const [new_password, setNewPassword] = useState('')
    const [new_password_again, setNewPasswordAgain] = useState('')

    const handleNameChange = e => setName(e.target.value)
    const handleEmailChange = e => setEmail(e.target.value)
    const handleOldPasswordChange = e => setOldPassword(e.target.value)
    const handleNewPasswordChange = e => setNewPassword(e.target.value)
    const handleNewPasswordAgainChange = e => setNewPasswordAgain(e.target.value)

    const handleSave = () => {
        store.updateUser({
            name, email
        }).then(rs => {
            if(rs.ok) {
                showMessage('Изменения сохранены')
                store.requestUser()
            }
            else showError(rs.message)
        })
    }

    const handleChangePassword = () => {
        store.changePassword({
            old_password, new_password, new_password_again
        }).then(rs => {
            if(rs.ok) showMessage('Изменения сохранены')
            else showError(rs.message)
        })
    }

    return (
        <>
            <Head>
                <title>Профиль - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }' />
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <h1 className={'page-title'}>{`Привет${user.name ? ', '+user.name : ''}!`}</h1>


            <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                <GridItem w='100%'>
                    <Card
                        title={'Личные данные'}
                        style={{marginBottom: '1rem'}}
                    >
                        <Stack mb={4} spacing={2}>
                            <Box>
                                <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Имя</Text>
                                <Input onChange={handleNameChange} placeholder='Имя' value={name} />
                            </Box>
                            <Box>
                                <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Почта</Text>
                                <Input type={'email'} onChange={handleEmailChange} placeholder='Почта' value={email} />
                            </Box>
                        </Stack>
                        <Button colorScheme={'facebook'} onClick={handleSave}>Сохранить</Button>
                    </Card>
                </GridItem>
                <GridItem w='100%'>
                    <Card
                        title={`Пароль`}
                        style={{marginBottom: '1rem'}}
                    >
                        <Stack mb={4} spacing={2}>
                            <Box>
                                <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Старый пароль</Text>
                                <Input type={'password'} onChange={handleOldPasswordChange} placeholder='Старый пароль' value={old_password} />
                            </Box>
                            <Box>
                                <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Новый пароль</Text>
                                <Input type={'password'} onChange={handleNewPasswordChange} placeholder='Старый пароль' value={new_password} />
                            </Box>
                            <Box>
                                <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Новый пароль еще раз</Text>
                                <Input type={'password'} onChange={handleNewPasswordAgainChange} placeholder='Новый пароль еще раз' value={new_password_again} />
                            </Box>
                        </Stack>
                        <Button colorScheme={'facebook'} onClick={handleChangePassword}>Изменить пароль</Button>
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default Profile;