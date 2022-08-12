import React from 'react';
import Sidebar from "./Sidebar";
import Footer from "../Footer";
import Header from "../Header";
import styles from '../../styles/Layout.module.scss'
import Head from "next/head";

const Layout = (props) => {
    return (
        <>
            <Header />
            <div className={styles.body}>
                <Sidebar />

                <div className={styles.content}>
                    { props.children }

                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Layout;