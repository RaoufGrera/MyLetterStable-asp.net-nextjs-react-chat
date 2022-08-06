import { Show } from 'components/profile';
import { accountService } from '../../src/_services';
import { useRouter } from "next/router";

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { useState, useEffect } from 'react';

export default Profile;

function Profile(props) {
    const router = useRouter();
    const { id } = router.query; // Destructuring our router object

    const profileFieldsFromDb = props.profileFieldsFromDb
    return (
        <> <Show id={id} profileFieldsFromDb={profileFieldsFromDb} /> </>
    )
}


export async function getServerSideProps({ locale }) {

    console.log('locale', locale)
    // const dirToList = '/data/';
    let profileFieldsFromDb = require('/data/profile_ar.json');

    if (locale != "ar")
        profileFieldsFromDb = require('/data/profile_en.json');



    return {

        props: {

            profileFieldsFromDb: profileFieldsFromDb,
            locale: locale,
            ...await serverSideTranslations(locale, ['common', 'footer']),
        }
        //, revalidate: 10
    }
}

