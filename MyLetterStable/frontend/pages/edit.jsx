import { useState, useEffect } from 'react';

import { Link } from 'components';
import { userService, accountService, alertService } from 'src/_services';
import { ModalOver } from 'components/ModalOver';
import { ModalText } from 'components/ModalText';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SVGIcon from "components/SVGIcon";
import { HeadPage } from 'components/HeadPage';
import { UserNav } from 'components/UserNav';
import { ModalImage } from 'components/ModalImage';
import Head from 'next/head';


export default Edit;

function Edit(props) {

  const profileData = props.profileFieldsFromDb;
  const baseUrl = props.urlImage;

  const [userData, setUserData] = useState(null);
  const [type, setType] = useState("option");
  const [showModal, setShowModal] = useState(false);
  const [showModalText, setShowModalText] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [titleName, setTitleName] = useState(null);
  const [isText, setIsText] = useState(false);
  const [tableName, setTableName] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  console.log(props)

  const { t } = useTranslation();





  const change = (data) => {
    setUserData(data)
    console.log("Form >", data);
    //  props.pageChange(data);
  }

  useEffect(() => {

    accountService.profile().then(x => {
      console.log("x")
      setUserData(x)
      console.log(x)


    }).catch(alertService.error);
    console.log('userdata', userData)





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

  function handleOpenModalText(tiitem, table, selected, isText) {
    setSelectedName(selected);
    setTitleName(tiitem);
    setIsText(isText);
    setTableName(table);
    setShowModalText(true);
    document.body.classList.add("body-overflow");
  }

  const handleCloseModal = () => {
    document.body.classList.remove("body-overflow");
    setShowModal(false);
  }

  const handleCloseModalText = () => {
    document.body.classList.remove("body-overflow");
    setSelectedName(null);
    setTitleName(null);
    setTableName(null);
    setShowModalText(false);
  }

  return (
    <div>
      <Head>
        <title>{t('edit_profile')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HeadPage title={props.title} />
      <h1 className="header-logged-h1">{t('edit')}</h1>
      <section className='index'>
        <div className="container header">
          {userData && profileData &&
            <Link href={"/" + userData.id} className="preview" >
              <span>{t('show_my_profile')}</span>
            </Link>
          }

          <p>{t('why_build')}  &nbsp;</p>
        </div>

        <div className='container'>
          {!userData &&
            <Skeleton />
          }

          {userData && profileData &&
            <div>

              <div className='row filter-shadow'>

                <div className='col-md-6'>
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
                  <div className=" tile desc  content-card">
                    <div className="field-container" onClick={() => handleOpenModalText(profileData.profile_fields['about'], "about", userData.about, true)}>
                      <svg className="app-icon library-pencil edit" viewBox="0 0 96 96">
                        <path fillRule="evenodd" clipRule="evenodd" d="M84.142 21.742L74.243 11.843C71.900 9.500 68.100 9.500 65.757 11.843L58.416 19.184C57.891 19.710 58.083 20.654 58.741 21.000C60.502 21.925 63.742 23.970 67.879 28.106C72.015 32.243 74.060 35.483 74.985 37.244C75.331 37.902 76.275 38.094 76.801 37.569L84.142 30.228C86.485 27.884 86.485 24.085 84.142 21.742ZM71.517 42.852L33.916 80.453C33.471 80.899 32.895 81.193 32.273 81.294L15.411 84.013C13.392 84.339 11.646 82.593 11.972 80.574L14.691 63.712C14.792 63.090 15.086 62.514 15.532 62.069L53.133 24.468C53.936 23.664 55.123 23.400 56.122 23.940C57.925 24.914 61.073 26.958 65.050 30.935C69.027 34.912 71.071 38.060 72.045 39.863C72.585 40.862 72.321 42.049 71.517 42.852ZM23.069 78.134L30.261 77.027C30.749 76.952 31.109 76.532 31.109 76.039L31.109 73.947C31.109 72.842 30.214 71.947 29.109 71.947L26.038 71.947C24.933 71.947 24.038 71.052 24.038 69.947L24.038 66.876C24.038 65.771 23.143 64.876 22.038 64.876L19.946 64.876C19.453 64.876 19.033 65.236 18.958 65.724L17.851 72.916C17.758 73.522 18.234 74.106 18.803 74.335C19.296 74.533 19.899 74.879 20.503 75.482C21.106 76.086 21.452 76.689 21.650 77.182C21.879 77.751 22.463 78.227 23.069 78.134Z"></path></svg>

                      <h2>{t('about')}</h2>
                      <p className='p-wrap'>{userData.about} </p>
                    </div>
                  </div>



                  <div className='tile content-card'>
                    <div className="field-container">
                      <h2>{t('basic')}</h2>
                      <ul>

                        <li className={(userData.name) ? "field-text" : "field-text incomplete"} onClick={() => handleOpenModalText(profileData.profile_fields['name'], "name", userData.name, false)} data-key="name">
                          <SVGIcon className="profile-name app-icon  field" name="name" />

                          <div>
                            <h3>الاسم</h3>
                            <p>{(userData.name) ? userData.name : "ادخل اسم رمزي"}</p>
                          </div>
                          <svg className="app-icon library-chevron_right state" viewBox="0 0 96 96"><path d="M43.618 17.640L70.467 44.323C72.511 46.354 72.511 49.646 70.467 51.677L43.618 78.360C41.418 80.547 37.850 80.547 35.650 78.360C33.536 76.259 33.441 72.882 35.435 70.668L55.843 48L35.435 25.332C33.441 23.118 33.536 19.741 35.650 17.640C37.850 15.453 41.418 15.453 43.618 17.640Z"></path></svg>		</li>



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




                </div>

                <div className='col-md-6'>


                  <div className="tile content-card details-social_status incomplete" data-name="details-social_status">
                    <div className="field-container">
                      <h2>{t('social_status')}</h2>
                      <ul>



                        {Object.entries(profileData.profile_categories.social_status.fields).map((item, k) =>
                          <li key={k} className={(userData[item[1]] && userData[item[1]]?.length) ? item[1] + " field" : item[1] + "field incomplete"} data-key={item[1]} onClick={() => handleOpenModal(profileData.profile_fields[item[1]], item[1], userData[item[1]])}>
                            <SVGIcon className={"profile-" + item[1] + " app-icon  field"} name={item[1]} />

                            <div>
                              <h3>{profileData.profile_fields[item[1]].label}</h3>
                              {(profileData.profile_fields[item[1]].type == "option") ?


                                <p>{(userData[item[1]]) ?
                                  profileData.profile_fields[item[1]].options[userData[item[1]]] :
                                  t('add') + " " + profileData.profile_fields[item[1]].label}</p>

                                :
                                <p>{(userData[item[1]].length > 0) ?
                                  userData[item[1]].map(element => (<li>{profileData.profile_fields[item[1]].options[element]}</li>)) :
                                  t('add') + " " + profileData.profile_fields[item[1]].label}</p>
                              }
                            </div>
                            <svg className="app-icon library-chevron_right state" viewBox="0 0 96 96"><path d="M43.618 17.640L70.467 44.323C72.511 46.354 72.511 49.646 70.467 51.677L43.618 78.360C41.418 80.547 37.850 80.547 35.650 78.360C33.536 76.259 33.441 72.882 35.435 70.668L55.843 48L35.435 25.332C33.441 23.118 33.536 19.741 35.650 17.640C37.850 15.453 41.418 15.453 43.618 17.640Z"></path></svg>

                          </li>

                        )
                        }
                      </ul>
                    </div>
                  </div>







                  <ModalImage show={showImageModal} exit={handleCloseImageModal} pathImage={userData.image} change={(e) => { change(e) }} />

                  <ModalOver type={type} show={showModal} selectedName={selectedName} exit={handleCloseModal} modalData={dataModal} titleName={titleName} tableName={tableName} change={(e) => { change(e) }} option="radio" />


                  <ModalText show={showModalText} selectedName={selectedName} exit={handleCloseModalText} titleName={titleName} tableName={tableName} change={(e) => { change(e) }} _isText={isText} />




                </div>

              </div> </div>
          }
        </div> </section>  </div>
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

