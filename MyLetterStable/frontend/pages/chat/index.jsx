
import { useState, useEffect } from 'react';
import { accountService, userService } from 'src/_services';
import getConfig from 'next/config';
import { Link } from 'components';

import SVGIcon from "components/SVGIcon";
import { filter } from 'rxjs/operators';
import router, { useRouter } from 'next/router';
import { Field, Formik, useFormikContext } from 'formik';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const { publicRuntimeConfig } = getConfig();
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ChatUser } from 'components/chat/ChatUser';
import { ChatLayout } from 'components/layout/ChatLayout';
import Head from 'next/head';

const baseUrl = `${publicRuntimeConfig.imgUrl}`;
Chat.PageLayout = ChatLayout


function Chat() {
  const { t } = useTranslation()
  useEffect(() => {
    const uSession = JSON.parse(localStorage.getItem('user'));
    if (uSession.messages) {
      if (uSession.messages != 0) {
        uSession.messages = 0;
        accountService.updateAccount(uSession);
      }
    }
  }, []);
  return (
    <>
      <Head>
        <title>{t('messages')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>

  );
}

//getServerSideProps
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  },
})
export default Chat