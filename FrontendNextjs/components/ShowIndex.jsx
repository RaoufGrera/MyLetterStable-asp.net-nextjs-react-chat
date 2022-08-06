import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';


const Showindex = () => {
    const { t } = useTranslation()
    return (
        <>
            <Head>
                <title>{t('main')}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='bg-gold p-3 pt-3'>

                <div className="row justify-content-md-center pt-2">

                    <div className="col-md-5 my-4 text-center">
                        <p lang="ar" className='col-md-auto text-center fs-1 fw-bold p-1 mb-3  px-3'>{t('app_name')}</p>

                        <p lang="ar" className=' ccenter col-10 fs-6'>{t('p1')}</p>



                    </div>
                    <div className='col-md-7 my-4'>

                        <div className="card-2 ccenter ">

                            <div className="card-last max-message">


                                <div dir="rtl" className="d-flex flex-row ">
                                    <div className="flex-grow-1"><i className="icon-done text-lightest"></i><i className="icon-done text-calm"></i></div>


                                    <div className="position-relative mb-2 p-2"><img src="/logo.png" width="145" height="50" alt="stamp" className="stamp loaded" /></div></div>

                                <div className="p-3 pb-1 text-start">
                                    <p className=" p-wrap fs-6 text-body">We are on mission to change the way people <span className="think">think</span> about social media</p>
                                    <br></br>
                                    <p className="text-center"><Link href={"login"} ><button className="btn btn-warning" >
                                        {t('login')}</button></Link></p>
                                </div>


                                <div className="stamp-header" lang="ar"><div className="stamp-img"></div>LY</div>

                                <div className="p-2 pb-0"><p className="text-black-100 fw-bold ">{"My Letter"}</p>
                                    <p className="text-black-50  rtl small mb-2" dir="rtl" >{t('ago')} {"3"} {t("hours_ago")}</p>

                                </div>

                            </div>
                        </div>
                    </div>



                </div>

            </div>
            <div className='bg-letter pt-3'>

                <div className='container-fluid '>
                    <div className='row'>
                        <div className="col-md-12 ">
                            <div className='ccenter text-center my-3'>
                                <p lang="ar" className='fw-bold  fs-5  p-1   '>{t('p2')}</p>
                                <p className='fs-6 '>{t('p3')}</p>

                            </div>

                        </div>
                        <div className='col-md-10 ccenter my-2'>
                            <img className=' ccenter bg-avatars' src='ava.png'></img>

                        </div>


                        <div className='p-3 pb-5 pt-3 mt-5 '>


                            <div className='row '>
                                <div className="col-sm-7 ">
                                    <div className='ccenter col-11 my-3  '>
                                        <p className='fs-4 fw-bold p-1 mb-2'>{t('p4')}</p>
                                        <p lang="ar" className='  fs-6 fw-bold   '>
                                            {t('p5')}                                        </p>
                                    </div>

                                </div>
                                <div className='col-sm-5  my-2'>
                                    <img className='bg-mail ccenter' src='writing-letter.png'></img>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className='bg-dark p-3 pt-3'>

                <div className='row'>
                    <div className="col-sm-7 ">
                        <div className='ccenter col-11 my-3 text-light'>
                            <p lang="ar" className='  fs-5 fw-bold p-1 mb-2  '>{t('p6')}
                            </p>
                            <p className='fs-2 fw-bold'>{t('p7')}</p>

                            <Link href={"/login"}><button className='btn mt-4 btn-warning'>{t('login_now')}</button>
                            </Link>   </div>

                    </div>
                    <div className='col-sm-5  my-2'>
                        <img className='bg-mail ccenter' src='bg-mail3.png'></img>

                    </div>
                </div>

            </div>
            <div id="acf-block-faq-block_5ffd9a927f7ab" className="acf-block-faq c-pt-9 c-pb-9 bg-gray decor--primary-color position-relative overflow-hidden">


                <div className='p-3 pt-3 mt-5  bg-letter '>

                    <div className='row'>
                        <div className="col-sm-12 p-1 ccenter text-center">

                            <p><Link className="link px-4" href={"privacy"}>privacy-policy</Link>    <a className='px-4' href='https://www.facebook.com/MyLetterApp'> Faecbook</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};




export default Showindex;
