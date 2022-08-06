import { ChatLayout } from 'components/layout/ChatLayout';
import { Link } from 'components/Link';
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState, useEffect } from 'react';
ShowMsg.PageLayout = ChatLayout;


function ShowMsg(props) {
    const id = props.id;

    const msgId = props.msgid;
    console.log("msgId", msgId);
    return (
        <>
            <div className="friend-header p-2 pl-4 pr-4 pb-1">
                <div className="d-flex flex-row">
                    <Link aria-current="page" className="no-underline link py-2 px-2 ml-n2 col-pixel-width-50 flip active" href={"/chat/" + id}>
                        <i className="icon-caret-right ">back</i></Link>
                    <div className="col-pixel-width-50 pl-1">
                        <img src="https://cdn.getslowly.com/assets/images/avatar/other/user/WO3XKOW790/8.png" className="rounded-circle avatar-border " alt="raoufgr" width="42" height="42" /></div>
                    <div className="col ml-n1"><div className="text-primary mb-n1 h6 mt-0">raoufgr</div>
                        <div className="mt-n1"><span className="text-light small pr-1 ml-n1"><i className="icon-pencil px-1"></i>1:43 PM</span><span className="text-light small pr-1"><i className="icon-info-circle px-1"></i>Words: 1 / Characters: 4</span></div>
                    </div>
                    <div className="col-pixel-width-200 text-right mr-n1">
                        <button type="button" className="btn px-2 mx-1 my-0 text-primary"><span className="icon-copy h5 font-weight-normal"></span></button>
                        <button type="button" className="btn px-2 mx-1 my-0 text-primary"><span className="icon-print h5 font-weight-normal"></span></button>
                        <span className="icon-chevron-left py-2 px-3 mx-1 text-lighter"></span><a className="no-underline link py-2 px-3 mx-1" href="/friend/7wzgaDy6/MOEKdKQ7"><i className="icon-chevron-right"></i>
                        </a>
                    </div></div></div>
            <hr className="my-0"></hr>
            <h2>الرسالة</h2>
            <p>{msgId}</p>
        </>
    )
}


export async function getServerSideProps({ locale, query }) {


    const { id, msgid } = query;

    return {

        props: {

            msgid: msgid,
            id: id,
            locale: locale,
            ...await serverSideTranslations(locale, ['common', 'footer']),
        }

    }
}
export default ShowMsg;