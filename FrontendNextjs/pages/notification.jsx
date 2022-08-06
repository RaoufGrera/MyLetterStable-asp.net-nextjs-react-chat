import { Link, UserNav } from 'components';
import React, { useState, useEffect } from 'react';
import { accountService } from 'src/_services';
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head';
const Notification = (props) => {
    const [noti, setNoti] = useState(null);
    const { t } = useTranslation();

    useEffect(() => {
        accountService.getNotification().then(p => setNoti(p));
        const uSession = JSON.parse(localStorage.getItem('user'));
        if (uSession.likes) {
            if (uSession.likes != 0) {
                uSession.likes = 0;
                accountService.updateAccount(uSession);
            }
        }

    }, []);
    return (
        <div>
            <Head>
                <title>{t('notification')}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1 className="header-logged-h1">{t('notification')}</h1>

            <br></br>
            <div className='container px-1'>
                <div className="card rounded-0" >

                    <div className="list-group list-group-flush">
                        {noti && noti.map(user =>
                            <Link key={user.id} href={user.url} className="list-group-item list-group-item-action ">
                                <div className="d-flex flex-row">
                                    <div className='p-2'>
                                        <img src={`${process.env.imgUrl}/${user.image}`} className="rounded-circle avatar-border " alt="avatar" width="42" height="42" />
                                    </div>
                                    <div className="flex-grow-1 d-flex flex-column">
                                        <div className="p-1"> {t(user.name)}</div>
                                        <div className="p-1 text-secondary">{t(user.content)}</div>


                                    </div>
                                    <div className="py-3"> {t(user.ago)} {user.timeNumber} {t(user.timeAgo)}</div>


                                </div>

                            </Link>

                        )}
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
export default Notification;
