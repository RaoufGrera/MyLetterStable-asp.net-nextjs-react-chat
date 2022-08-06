
import { useState, useEffect } from 'react';
import { accountService, userService } from 'src/_services';
import getConfig from 'next/config';
import { useTranslation } from 'next-i18next';
import { Link } from 'components';

import SVGIcon from "components/SVGIcon";
import { filter } from 'rxjs/operators';
import router, { useRouter } from 'next/router';
import { Field, Formik, useFormikContext } from 'formik';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const { publicRuntimeConfig } = getConfig();
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Masonry from 'react-masonry-css'
import { ModalAsk } from 'components/chat/ModalAsk';
import { ModalMessage } from 'components/chat/ModalMessage';
import Showindex from 'components/ShowIndex';
import Head from 'next/head';

//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const pattern = /[\u0600-\u06FF\u0750-\u077F]/;


export default User;





function User(props) {

  const educations = props.educations;
  const secotrs = props.secotrs;
  const profileData = props.profileFieldsFromDb;
  const { query } = useRouter();
  console.log("Query", query);

  const initialValue = {
    education: query.education || 'all',
    sector: query.sector || 'all',

    page: parseInt(query.page, 1) || 1
  }


  const { t } = useTranslation();
  const [isFetching, setIsFetching] = useState(false);
  const [isLogin, setisLogin] = useState(false);

  const [users, setUsers] = useState([]);
  //const [filters, setFilters] = useState(null);
  const [user, setUser] = useState(null);
  const [myProfile, setMyProfile] = useState(null);

  const [showModalMessage, setShowModalMessage] = useState(false);
  const [session, setSession] = useState(null);
  //setting tha initial page
  const [page, setPage] = useState(1);
  //we need to know if there is more data
  const [HasMore, setHasMore] = useState(true);
  const pattern = /[\u0600-\u06FF\u0750-\u077F]/;

  const [showModalAsk, setShowModalAsk] = useState(false);
  function handleOpenModalMessage(userObj) {
    setUser(userObj)

    setShowModalMessage(true);
    document.body.classList.add("body-overflow");

  }
  const change = () => {
    //loadMessages()
    //props.pageChange(data);
    //firemessage
  }
  function handleOpenModalAsk(userObj) {
    setUser(userObj.id)
    setShowModalAsk(true);
    document.body.classList.add("body-overflow");

  }
  const handleCloseModalText = () => {
    document.body.classList.remove("body-overflow");
    setShowModalAsk(false);
    setShowModalMessage(false);
  }
  useEffect(() => {

    if (!accountService.accountValue)
      return
    accountService.getById(accountService.accountValue.id).then(x => {
      console.log("x")
      setMyProfile(x)
      console.log("Myprofile", x)
    })
    loadMoreItems();
    /*
        console.log("initialValue", initialValue)
        const uSession = localStorage.getItem('user');
        console.log("pageChange Appsss", uSession)
        const jsonsesson = JSON.parse(uSession)
    
        console.log(" accountService.onlineUserstValue();", accountService.onlineUserstValue);
        // accountService.createHubConnection(session.token)
       /* const subscription = accountService.onlineUsers.subscribe(x => {
          setSession(x)
        });
    
        return () => subscription.unsubscribe();
    
        console.log("inintial Filter", initialValue)
    */
  }, []);

  function loadMoreItems() {
    setIsFetching(true);

    accountService.getAll(initialValue.education, initialValue.sector, page).then(res => {
      setUsers((prevTitles) => {


        return [...new Set([...prevTitles, ...res])];
      });
      // setUsers(x)
      initialValue.page = initialValue.page + 1;
      console.log("setPage(initialValue.page", initialValue.page)
      setPage(page + 1);
      setHasMore(res.length > 0)
      setIsFetching(false);
    });



  }

  const submitMyForm = (values) => {
    router.push(
      {
        pathname: '/',
        query: { ...values, page: 1 },
      },
      undefined,
      { shallow: true }
    );
    console.log("Submit")


  };


  return (

    <>
      {!accountService.accountValue &&
        <Showindex />

      }

      {accountService.accountValue &&
        <div className='py-5'>
          <Head>
            <title>{t('main')}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>

          <div className='search-col'>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={initialValue}
              onSubmit={submitMyForm} >
              {({ values, submitForm, handleChange }) => (
                <div >

                  <Field
                    name="education"
                    as="select"
                    className="search-select"
                    value={initialValue.education}
                    labelId="search-education"
                    label="education"
                    onChange={(e) => {
                      handleChange(e);
                      setTimeout(submitForm, 0)

                    }} >

                    <option value="all">
                      {t('all_educations')}
                    </option>

                    {educations && educations.map(filter =>

                      <option key={filter.id} value={filter.id}>
                        {`${profileData.profile_fields.education.options[filter.id]} `}
                      </option>
                    )}
                  </Field>



                  <Field
                    name="sector"
                    as="select"
                    className="search-select"

                    value={initialValue.sector}
                    labelId="search-sector"
                    label="sector"
                    onChange={(e) => {
                      handleChange(e);
                      setTimeout(submitForm, 0)

                    }} >

                    <option value="all">
                      {t('all_sectors')}
                    </option>

                    {secotrs && secotrs.map(filter =>

                      <option key={filter.id} value={filter.id}>
                        {`${profileData.profile_fields.sector.options[filter.id]} `}
                      </option>
                    )}
                  </Field>




                </div>

              )}
            </Formik></div>
          <div className="container my-5">

            <div className="row ">



              {users && myProfile && profileData && users.map(user =>


                <div key={user.id} className="col-lg-4 p-2">
                  <div className="card h-100 shadow-sm">
                    <Link className={"text-center p-2 " + (user.country ? user.country : "card-bg")}
                      href={"/" + user.id}>


                      <div className="img-hover-zoom img-search">
                        <img className="shadow" src={`${process.env.imgUrl}/${user.image}`} />
                        <span className="box-num">{user.id}</span>
                      </div>

                      <div className='stamp-header ' lang="ar">
                        <div className='stamp-img'>

                        </div>
                        {(user.country) ? user.country.toUpperCase() : "LY"}
                      </div>
                    </Link>

                    <div className="card-body mt-15">



                      <div className="mt-2 text-center">
                        <p className='fs-5' ><Link href={"/" + user.id}>{user.name}</Link><span className={(user.online) ? "dot green" : "dot gray"}></span></p>
                        {(!user.online) && <span className='fs-7'>
                          {user.activeNumber} {t(user.activeAgo)}
                        </span>}
                      </div>
                      {(user.about) &&
                        <div className="clearfix  pt-1 fs-7 mb-3">
                          {<p className={pattern.test(user.about) ? "ar" : "en"}> {user.about}</p>
                          }

                        </div>
                      }
                      <div className="box bt-dash  pt-2">
                        <div>
                          <ul className="list-inline">
                            {Object.entries(profileData.profile_categories.basic.fields).map((item, k) =>

                              (user[item[1]]) &&
                              <li key={k} className={(myProfile[item[1]] == user[item[1]]) ?
                                "list-inline-item btn-list p-2 same"
                                :
                                "list-inline-item btn-list p-2"
                              }>
                                <SVGIcon className={"profile-" + item[1] + " app-icon  field"} props={"0 0 24 24"} name={item[1]} />
                                {profileData.profile_fields[item[1]].options[user[item[1]]]}
                              </li>


                            )
                            }
                            {Object.entries(profileData.profile_categories.social_status.fields).map((item, k) =>

                              (user[item[1]] && profileData.profile_fields[item[1]].type == "option") ?
                                <li key={k} className={(myProfile[item[1]] == user[item[1]]) ?
                                  "list-inline-item btn-list p-2 same"
                                  :
                                  "list-inline-item btn-list p-2"
                                }>
                                  <SVGIcon className={"profile-" + item[1] + " app-icon  field"} name={item[1]} />
                                  {profileData.profile_fields[item[1]].options[user[item[1]]]}
                                </li>
                                :
                                ((user[item[1]]?.length > 0) &&
                                  user[item[1]].map(element => (
                                    <li className={

                                      (myProfile[item[1]].includes(element)) ?
                                        "list-inline-item btn-list p-2 same"

                                        :
                                        "list-inline-item btn-list p-2"


                                    }

                                    >{profileData.profile_fields[item[1]].options[element]}
                                    </li>
                                  ))


                                ))

                            }


                          </ul>

                        </div>
                      </div>


                    </div>


                    <div className="d-flex justify-content-between p1">
                      <div onClick={() => handleOpenModalMessage(user)} className="p-2 bd-highlight">

                        <button className='btn  btn-md btn-light'>
                          <span>{t('message')}</span>
                          <i className="icon-send m-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path className="icon_svg-fill_as_stroke" d="M20.582 1.469a2.757 2.757 0 0 1 1.369 4.468l-.134.143L7.594 20.299a.615.615 0 0 1-.129.099l-.073.036-1.238.514.006.006-.1.033-3.82 1.59a.615.615 0 0 1-.662-.116l-.058.019.019-.058a.615.615 0 0 1-.147-.569l.031-.093 1.592-3.831.031-.089.005.005.515-1.237a.637.637 0 0 1 .081-.141l.054-.061L17.92 2.182a2.756 2.756 0 0 1 2.662-.713zm.918 8.406c.314 0 .574.231.618.533l.007.092v11a.624.624 0 0 1-.533.618l-.092.007h-11a.625.625 0 0 1-.092-1.243l.092-.007h10.375V10.5c0-.314.231-.574.533-.618l.092-.007zm-2.577-6.916-.119.107L4.673 17.201l-.666 1.6 1.19 1.19 1.601-.665 14.136-14.13c.304-.304.46-.72.439-1.14l-.016-.158-.033-.157a1.504 1.504 0 0 0-2.4-.782zM13.5 1.875a.625.625 0 0 1 .092 1.243l-.092.007H3.124L3.125 13.5a.624.624 0 0 1-.533.618l-.092.007a.624.624 0 0 1-.618-.533l-.007-.092v-11c0-.314.231-.574.533-.618l.092-.007h11z" fill="#666"></path></svg></i>
                        </button>
                      </div>

                      <div onClick={() => handleOpenModalAsk(user)} className="p-2 bd-highlight">
                        <button className='btn  btn-md btn-light'>
                          <span> {t('ask')}</span>
                          <i className="icon-send m-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd"><g transform="translate(9 7)"><path d="M3 6v-.5A2.5 2.5 0 1 0 .5 3" strokeLinecap="round" strokeLinejoin="round"></path><circle className="icon_svg-fill_as_stroke" fill="#666" cx="3" cy="8.5" r="1" stroke="none"></circle></g><path d="M7.5 4h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3L9 22v-3H7.5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" strokeLinejoin="round"></path></g></svg></i>
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              )}
            </div>






            <ModalMessage user={user} show={showModalMessage} exit={handleCloseModalText} change={(e) => { change(e) }} />
            <ModalAsk id={user} show={showModalAsk} exit={handleCloseModalText} change={(e) => { change(e) }} />
            {isFetching && [...Array(3)].map(i => (



              <div className="cv-div"> <div className="cv-body">
                <div className="devimgseeker">
                  <Skeleton height="100%" containerClassName="imgseeker-view" />
                </div>
                <table><tr> <td height="30" ><h2 >
                  <Skeleton width={210} /> </h2>
                  <span className="texts"><Skeleton count={2} width={130} /></span><hr /></td></tr>
                  <tr>
                    <td><Skeleton width={210} /> </td>
                  </tr>
                </table>
              </div></div>

            )
            )
            }

            {isFetching && <p>{t('wait')}</p>}
            {
              !isFetching && HasMore && (
                <div className='center'>
                  <button className='btn btn-lg btn-warning' onClick={loadMoreItems}>{t('show_more')}</button>
                </div>
              )
            }

            {
              users && !users.length &&

              <div colSpan="4" className="text-center">
                <div className="p-2 ">{t('no_users')}</div>
              </div>

            }

          </div>
        </div >
      }
    </>
  );
}

//getServerSideProps

export async function getServerSideProps({ locale }) {
  const data = await accountService.getFilter();
  console.log(" accountService.getFilter()", data);


  const educations = (data) ? data.education : null;
  const secotrs = (data) ? data.secotr : null;

  console.log('locale', locale)
  // const dirToList = '/data/';
  let profileFieldsFromDb = require('/data/profile_ar.json');

  if (locale != "ar")
    profileFieldsFromDb = require('/data/profile_en.json');



  return {

    props: {
      educations, secotrs,
      profileFieldsFromDb: profileFieldsFromDb,
      locale: locale,
      ...await serverSideTranslations(locale, ['common', 'footer']),
    }
    //, revalidate: 10
  }
}