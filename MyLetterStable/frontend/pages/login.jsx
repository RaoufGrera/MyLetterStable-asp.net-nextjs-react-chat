
import ShowLogin from 'components/login/ShowLogin';
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

function Login() {
    return (
        <main className='profile page-profile d-flex justify-content-center online'>

            <ShowLogin />
        </main>
    )
}

export async function getServerSideProps({ locale }) {
    return {

        props: {

            locale: locale,
            ...await serverSideTranslations(locale, ['common', 'footer']),
        }
        //, revalidate: 10
    }
}

export default Login

