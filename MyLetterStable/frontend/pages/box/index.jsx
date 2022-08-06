import { Link, HeaderNav } from 'components';
import Deck from 'components/box/Deck';
import Showindex from 'components/ShowIndex';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Avatar, { genConfig } from 'react-nice-avatar'
import { accountService } from 'src/_services';
import { useEffect, useState } from 'react';
import { ModalMessage } from 'components/chat/ModalMessage';
import Head from 'next/head';
function Home() {
    const { t } = useTranslation();

    const [isLogin, setisLogin] = useState(false);
    const [showModalMessage, setShowModalMessage] = useState(false);
    const change = (e) => {

    }
    const handleCloseModalText = () => {
        document.body.classList.remove("body-overflow");

        setShowModalMessage(false);
    }
    function handleOpenModalMessage() {
        setShowModalMessage(true);
        document.body.classList.add("body-overflow");

    }
    useEffect(() => {

        setisLogin(accountService.accountValue)

    }, []);
    return (
        <div>

            <Head>
                <title>{t('box')}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='root-card'>
                <Deck />

                <button className='btn btn-reply btn-lg btn-light' onClick={() => handleOpenModalMessage()}>
                    <span>{t('write_message')}</span>

                    <i className="icon-send m-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
                    </svg></i>
                </button>

                <ModalMessage change={(e) => { change(e) }} show={showModalMessage} exit={handleCloseModalText} />

            </div>

        </div>
    );
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...await serverSideTranslations(locale, ['common', 'footer']),
    },
})
export default Home