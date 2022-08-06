import { ChatUser } from 'components/chat/ChatUser';
import { ChatLayout } from 'components/layout/ChatLayout';
import { Show } from 'components/profile';
import { accountService } from '../../../src/_services';
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState, useEffect } from 'react';
import { ModalMessage } from 'components/chat/ModalMessage';
import { Link } from 'components/Link';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const baseUrl = `${publicRuntimeConfig.imgUrl}`;
Messages.PageLayout = ChatLayout;
//const messages = await accountService.getMessagesById(id);

function Messages(props) {
  const { t } = useTranslation();

  const id = props.id;
  const [messagesData, setMessages] = useState(null)
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [showMessage, setShowMessage] = useState(false)
  const [msgIndex, setMsgIndex] = useState(null)
  //const [user, setUser] = useState(null);
  const profile = props.profile;

  useEffect(() => {
    loadMessages()


  }, []);


  function openPage(_index) {
    setMsgIndex(_index)
    setShowMessage(!showMessage)
  }
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        document
          .querySelector(hash)
          .scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  })//092565656

  const loadMessages = () => {
    accountService.getMessagesById(props.id).then(x => {
      setMessages(x)
    });
  }

  const change = () => {
    loadMessages()
    //props.pageChange(data);
  }

  const handleCloseModalText = () => {
    document.body.classList.remove("body-overflow");

    setShowModalMessage(false);
  }
  function handleOpenModalMessage() {
    setShowModalMessage(true);
    document.body.classList.add("body-overflow");

  }

  console.log(messagesData);

  return (

    <>

      {!showMessage &&
        <div>
          <div id="message" className="friend-header-wrapper">
            <div className="friend-header link p-2 pl-2 pr-4 pb-1">

              <Link href={`/profile/${profile.id}`}>
                <img src={`${process.env.imgUrl}/${profile.image}`} className="rounded-circle link avatar-border " alt={profile.name} width="80" height="80" />
                <span className="h4 m-2">{profile.name}</span>
              </Link>
            </div>
          </div>
          <hr></hr>
          <div className='mt-3'>
            <button className='btn btn-reply btn-lg btn-warning' onClick={() => handleOpenModalMessage()}>
              <span>{t('write_message')}</span>

              <i className="icon-send m-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
              </svg></i>
            </button>





            <div className="friend-letters-wrapper p-2">


              <div className="row row-eq-height pt-2 pb-2">
                {messagesData && messagesData.map((msg, index) =>
                  <div className="col-md-6 col-xl-4 mb-3">
                    <div onClick={() => openPage(index)} className={`card  shadow-sm h-100 rounded-0 letter-sm link no-underline ${(msg.ago == "before") && ` pe-none`}`} href={"/chat/" + id + "/" + msg.id}>
                      <div className="p-3 pb-0 mb-0"><div className="d-flex flex-row "><div className="flex-grow-1"><i className="icon-done text-lightest">
                        {(msg.ago == "before") &&
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16"><path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path></svg>
                        }


                        {(msg.ago == "ago") &&
                          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="18" height="18" x="0" y="0" viewBox="0 0 512 512"><g>
                            <g>
                              <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z" fill={(msg.dateRead) ? "#ffd700" : "9e9e9e"} data-original="#000000" className=""></path>
                            </g>
                          </g></svg>
                        }
                      </i>

                        {msg.dateRead &&
                          <i className="m15">   <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="18" height="18" x="0" y="0" viewBox="0 0 512 512"><g>
                            <g>
                              <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0    c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7    C514.5,101.703,514.499,85.494,504.502,75.496z" fill="#ffd700" data-original="#000000" className=""></path>
                            </g>
                          </g></svg></i>
                        }
                        {msg.publicMessageId &&
                          <i className='me-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="18" height="18" x="0" y="0" viewBox="0 0 128 128" ><g><path xmlns="http://www.w3.org/2000/svg" id="Random" d="m31.648 40h-19.648c-2.209 0-4-1.791-4-4s1.791-4 4-4h19.648c9.021 0 17.541 4.383 22.785 11.725l4.651 6.511-4.916 6.882-6.245-8.743c-3.745-5.244-9.829-8.375-16.275-8.375zm87.18 49.172-16-16c-1.563-1.563-4.094-1.563-5.656 0s-1.563 4.094 0 5.656l9.172 9.172h-9.992c-6.445 0-12.529-3.131-16.275-8.375l-6.245-8.743-4.916 6.882 4.651 6.511c5.244 7.342 13.763 11.725 22.785 11.725h9.992l-9.172 9.172c-1.563 1.563-1.563 4.094 0 5.656.781.781 1.805 1.172 2.828 1.172s2.047-.391 2.828-1.172l16-16c1.563-1.562 1.563-4.094 0-5.656zm0-56-16-16c-1.563-1.563-4.094-1.563-5.656 0s-1.563 4.094 0 5.656l9.172 9.172h-9.992c-9.021 0-17.541 4.383-22.787 11.727l-25.639 35.896c-3.748 5.246-9.832 8.377-16.278 8.377h-19.648c-2.209 0-4 1.791-4 4s1.791 4 4 4h19.648c9.021 0 17.541-4.383 22.787-11.727l25.639-35.896c3.748-5.246 9.832-8.377 16.278-8.377h9.992l-9.172 9.172c-1.563 1.563-1.563 4.094 0 5.656.781.781 1.805 1.172 2.828 1.172s2.047-.391 2.828-1.172l16-16c1.563-1.562 1.563-4.094 0-5.656z" fill="#000000" data-original="#000000" className="">
                            </path></g></svg>
                          </i>
                        }
                      </div>
                        <div>
                          <img src={`${baseUrl}/${msg.stampId}`} width="100" height="100" alt="free" className="stamp loaded" /></div></div></div>
                      <div className="p-3 pt-0" dir="auto">
                        <p className="card-text">{(msg.content == "onway" ? t(msg.content) : msg.content)}
                        </p>
                      </div>
                      <div className="p-3 pb-0">
                        <p className="text-black-100 fw-bold ">{msg.senderName}</p>
                        <p className="text-black-50 small mb-2">{t(msg.ago)} {msg.messageNumber} {t(msg.messageAgo)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      }


      <div>
        {showMessage &&


          <div className="friend-header p-2 pl-4 pr-4 pb-1">
            <div className="d-flex flex-row p-2 border-bottom ">
              <span onClick={openPage} aria-current="page" className="no-underline link py-2 px-2 ml-n2 col-pixel-width-50 flip active">
                {t('back')}</span>


            </div>

            <div className='p-3'>


              <div className='letter shadow-sm position-relative mb-5 p-wrap text-body'>
                <div className="d-flex w-100 justify-content-between p-0 rtl ">
                  <div className="d-flex p-1 ">
                    <div className="mr-2 ml-2">
                      <img src={`${process.env.imgUrl}/${messagesData[msgIndex].senderImage}`} className="p-1 border " alt="user logo" width="80" height="80" /></div>
                    <div className="col"><div className="d-flex text-truncate">
                      <p className="col p-1 text-black-100 fw-bold mr-1 ">{messagesData[msgIndex].senderName}</p>
                    </div><div className="text-black-50 d-flex p-0 m-0 align-items-center small text-truncate">
                        <p className="mt-1"></p></div>

                    </div>

                  </div>

                  <div className="flex-grow-1 text-start">

                    <img className="stamp loaded" width={100} src={`${process.env.imgUrl}/${messagesData[msgIndex].stampId}`} />
                  </div>
                </div>
                <p className='p-2'>{messagesData[msgIndex].content}</p>
              </div>

            </div>
          </div>

        }

        <ModalMessage user={profile} show={showModalMessage} exit={handleCloseModalText} change={(e) => { change(e) }} />
      </div >

    </>

  )
}

/* <Link href={`/profile/${messagesData[msgIndex].senderId}`} >

                <img src={`${process.env.imgUrl}/${messagesData[msgIndex].senderImage}`} className="rounded-circle link avatar-border " alt={messagesData[msgIndex].senderName} width="40" height="40" />
                <span className="h4 m-2">{messagesData[msgIndex].senderName}</span>

              </Link>*/
export async function getServerSideProps({ locale, query }) {


  const { id } = query;

  const data = await accountService.getById(id);

  return {

    props: {

      profile: data,
      id: id,
      locale: locale,
      ...await serverSideTranslations(locale, ['common', 'footer']),
    }

  }
}
export default Messages;
