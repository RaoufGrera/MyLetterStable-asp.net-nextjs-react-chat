import { ModalImage, UserNav } from 'components';
import React, { useState, useEffect } from 'react';
import { accountService, alertService } from 'src/_services';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ModalOver } from 'components/ModalOver';
import SVGIcon from 'components/SVGIcon';
import Head from 'next/head';
const Complete = (props) => {
    const profileData = props.profileFieldsFromDb;
    const baseUrl = props.urlImage;
    const router = useRouter()

    const [userData, setUserData] = useState(null);
    const [ok, setOk] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showModalText, setShowModalText] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [dataModal, setDataModal] = useState(null);
    const [titleName, setTitleName] = useState(null);
    const [isText, setIsText] = useState(false);
    const [tableName, setTableName] = useState(null);
    const [type, setType] = useState("option");

    const [selectedName, setSelectedName] = useState(null);
    // const [noti, setNoti] = useState(null);
    const { t } = useTranslation();


    const change = (data) => {
        setUserData(data)

        console.log("Form >", data);
        if (data.gender != null && data.country != null && data.age != null) {
            const uSession = JSON.parse(localStorage.getItem('user'));
            uSession.gender = data.gender;
            uSession.country = data.country;
            accountService.updateAccount(uSession);
            setOk(false)
        } else { setOk(true) }
        //  props.pageChange(data);
    }



    useEffect(() => {
        console.log("OK", ok)
        if (accountService.accountValue.gender != null) {
            router.push("/edit")
        }
        accountService.profile().then(x => {

            setUserData(x)


        }).catch(alertService.error);
        console.log('user data', userData)





    }, []);


    function handleOpenImageModal() {
        setShowImageModal(true);
        document.body.classList.add("body-overflow");
    }
    const handleCloseImageModal = () => {
        document.body.classList.remove("body-overflow");
        setShowImageModal(false);
    }

    function handleOpenModal(obj, table, selected) {
        console.log(obj.label)
        setType(obj.type)
        setSelectedName(selected);
        setDataModal(obj.options);
        setTitleName(obj.label);
        setTableName(table);
        setShowModal(true);
        document.body.classList.add("body-overflow");

        console.log(obj)
    }



    const handleCloseModal = () => {
        document.body.classList.remove("body-overflow");
        setShowModal(false);
    }


    return (

        <div className='complete'>
            <Head>
                <title>{t('complete')}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h2 className='bg-white navbar-expand-md navbar-light shadow-sm'>
                <div className='d-flex justify-content-between p-2'>
                    <div></div>
                    <div className='mt-1'><strong className='fs-4'>{t('basic')}</strong></div>
                    <div>
                        <button disabled={ok} onClick={() => router.push('/edit')} className='btn btn-warning w-100'  >{t('next')}</button>
                    </div>
                </div>
            </h2>

            <div className='container-fluid '>
                {userData && profileData &&
                    <div>

                        <div className='row filter-shadow justify-content-center'>

                            <div className='col-md-6  align-self-center'>

                                <div className="tile portrait content-card incomplete" data-name="portrait">
                                    <span className="loading"></span>
                                    <div className='fieldset'>
                                        <div onClick={handleOpenImageModal} className="portrait-container">
                                            {!userData &&
                                                <Skeleton

                                                    height="100%"
                                                    containerClassName="avatar-skeleton"
                                                />
                                            }


                                            {(!userData.image) &&

                                                <div className="placeholder ">

                                                    <svg className="app-icon library-camera placeholder" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M37 12C35.111 12 33.333 12.889 32.200 14.400L29.200 18.400C28.445 19.407 27.259 20 26 20H16C11.582 20 8 23.582 8 28V72C8 76.418 11.582 80 16 80H80C84.418 80 88 76.418 88 72V28C88 23.582 84.418 20 80 20H70C68.741 20 67.555 19.407 66.800 18.400L63.800 14.400C62.667 12.889 60.889 12 59 12H37ZM68 33C69.657 33 71 31.657 71 30C71 28.343 69.657 27 68 27C66.343 27 65 28.343 65 30C65 31.657 66.343 33 68 33ZM48 70C59.046 70 68 61.046 68 50C68 38.954 59.046 30 48 30C36.954 30 28 38.954 28 50C28 61.046 36.954 70 48 70ZM48 66C56.837 66 64 58.837 64 50C64 41.163 56.837 34 48 34C39.163 34 32 41.163 32 50C32 58.837 39.163 66 48 66Z"></path></svg>	<p>اضغط لإضافة صورة شخصية</p>
                                                </div>
                                            }
                                            {(userData.image) &&

                                                <img src={`${baseUrl}/${userData.image}`} />
                                            }

                                            <svg className="app-icon library-plus state add" viewBox="0 0 96 96"><path d="M80 43C82.761 43 85 45.239 85 48C85 50.761 82.761 53 80 53H53V80C53 82.761 50.761 85 48 85C45.239 85 43 82.761 43 80V53H16C13.239 53 11 50.761 11 48C11 45.239 13.239 43 16 43L43 43V16C43 13.239 45.239 11 48 11C50.761 11 53 13.239 53 16V43L80 43Z"></path></svg>
                                        </div>
                                    </div>


                                </div>




                                <div className='tile content-card'>
                                    <div className="field-container">
                                        <h2>{t('basic')}</h2>
                                        <ul>


                                            {Object.entries(profileData.profile_categories.basic.fields).map((item, k) =>
                                                <li key={k} className={(userData[item[1]]) ? item[1] + " field" : item[1] + "field incomplete"} data-key={item[1]} onClick={() => handleOpenModal(profileData.profile_fields[item[1]], item[1], userData[item[1]])}>
                                                    <SVGIcon className={"profile-" + item[1] + " app-icon  field"} name={item[1]} />

                                                    <div>
                                                        <h3>{profileData.profile_fields[item[1]].label}</h3>
                                                        <p>{(userData[item[1]]) ? profileData.profile_fields[item[1]].options[userData[item[1]]] : t('add') + " " + profileData.profile_fields[item[1]].label}</p>
                                                    </div>
                                                    <svg className="app-icon library-chevron_right state" viewBox="0 0 96 96"><path d="M43.618 17.640L70.467 44.323C72.511 46.354 72.511 49.646 70.467 51.677L43.618 78.360C41.418 80.547 37.850 80.547 35.650 78.360C33.536 76.259 33.441 72.882 35.435 70.668L55.843 48L35.435 25.332C33.441 23.118 33.536 19.741 35.650 17.640C37.850 15.453 41.418 15.453 43.618 17.640Z"></path></svg>

                                                </li>

                                            )
                                            }

                                        </ul>
                                    </div>
                                </div>
                                <div className='text-center '>
                                    <button disabled={ok} onClick={() => router.push('/edit')} className='btn btn-warning w-100'  >{t('next')}</button>

                                </div>
                            </div>

                        </div>
                        <ModalImage show={showImageModal} exit={handleCloseImageModal} pathImage={userData.image} change={(e) => { change(e) }} />

                        <ModalOver type={type} show={showModal} selectedName={selectedName} exit={handleCloseModal} modalData={dataModal} titleName={titleName} tableName={tableName} change={(e) => { change(e) }} option="radio" />
                    </div>

                }
            </div>
        </div>
    );
}

export async function getStaticProps({ locale }) {

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

export default Complete;
