
export { HeadPage };
import Head from 'next/head'
import { useTranslation } from "react-i18next";

function HeadPage({title}) {
console.log(title)
const { t }  = useTranslation();

    return (

        <Head>
        <title>{ t(title) }</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    );
}
