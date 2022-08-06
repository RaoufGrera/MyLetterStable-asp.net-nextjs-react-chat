import { UserNav } from 'components';
import React, { useState, useEffect } from 'react';
import { accountService } from 'src/_services';
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head';
const Setting = (props) => {

    const { t } = useTranslation();

    const deleteAccount = () => {
        accountService.deleteMyAccount();
    }
    useEffect(() => {
        // accountService.deleteMyAccount().then();


    }, []);
    return (
        <div>
            <Head>
                <title>{t('setting')}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <br></br>
            <div className='container'>
                <div className="card" >
                    <div className="card-header">
                        <h1>{t('setting')}</h1>

                    </div>
                    <br></br><br></br>
                    <div className="list-group list-group-flush">


                        <button onClick={deleteAccount} className='btn btn-warning'>{t('delete-account')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'footer']),
    },
})
export default Setting;
