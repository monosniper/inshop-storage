import React from 'react';
import styles from '../styles/Modules.module.scss'
import {
    Button,
    Input, List, ListIcon, ListItem, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import GetButton from "./GetButton";
import shop from "../store/shop";
import {AiFillCloseCircle, AiFillCheckCircle} from "react-icons/ai";

const Module = ({ module, hasModule =false }) => {
    const _price = parseFloat(module.price);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleOnClick = () => {
        if(module.dependencies.length) onOpen()
        else handleGet()
    }

    const handleGet = () => {
        shop.getModule(module.id).then(rs => {
            onClose()
            if(rs.ok) shop.requestModules()
            else toast({
                title: rs.message ? rs.message : 'Произошла какая-то ошибка.',
                description: '',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }

    const handleModuleActive = (e) => {
        shop.toggleModule(module.id, e.target.checked).then(() => {
            shop.requestModules()
        })
    }

    return (
        <div className={styles.module}>
            <div className={styles.module__header}>
                <div className={styles.module__title}>{module.title}</div>

                <div className={styles.module__descriprion}>
                    {module.description.length > 100 ? module.description.substring(0, 100) + '...' : module.description}
                </div>
            </div>
            <div className={styles.module__footer}>
                {hasModule ? <span></span> : (
                    <div className={styles.module__price + ' ' + (_price ? '' : styles.free)}>
                        {_price ? '$' + module.price : 'Бесплатно'}
                    </div>
                )}
                <div className={styles.module__switch}>
                    {hasModule ? <Switch isChecked={module.isActive} onChange={handleModuleActive} /> : <GetButton onClick={handleOnClick} {...module} />}
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Внимание!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Данный модуль не будет работать без пречисленных ниже модулей:</p>
                        <List mt={3} spacing={3}>
                            {module.dependencies.map((dep, i) => {
                                const has = shop.hasModule(dep.id);
                                const ModuleIcon = has ? AiFillCheckCircle : AiFillCloseCircle;
                                const color = has ? 'green.500' : 'red.500' ;

                                return <ListItem key={'list-item-'+i}>
                                    <ListIcon as={ModuleIcon} color={color} />
                                    {dep.title}
                                </ListItem>
                            })}
                        </List>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleGet} colorScheme='facebook' mr={3}>
                            Ок
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Отмена</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Module;