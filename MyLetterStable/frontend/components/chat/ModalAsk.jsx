import Modal from 'react-modal';
import React, { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next'
import { accountService } from '../../src/_services'
import { ModalStamp } from './ModalStamp';
import getConfig from 'next/config';
import { toast } from 'react-toastify';

const { publicRuntimeConfig } = getConfig();

//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const baseUrl = `${publicRuntimeConfig.imgUrl}`;
export { ModalAsk }
function ModalAsk(props) {
  const { t } = useTranslation();

  const show = props.show;
  const change = props.change;
  const exit = props.exit;
  const id = props.id;



  const { register, handleSubmit, reset, formState } = useForm();
  function onSubmit(data) {
    // return updateUser(users.id, data);

    console.log("Sbumit data")
  }
  const [messageText, setMessageText] = useState("");
  const [count, setCount] = React.useState(0);

  const [showModalMessage, setShowModalMessage] = useState(false);

  const [stamp, setStamp] = useState("/Stamp/deafult.png");



  const changeStamp = (stamp) => {
    setStamp(stamp)

  }

  const handleCloseModalText = () => {

    setShowModalMessage(false);
  }
  function handleOpenModalMessage() {
    setShowModalMessage(true);
  }



  const handelChange = async (event) => {
    // return updateUser(users.id, data);

    event.preventDefault();
    // alert(`So your name is ${event.target.value}?`);

    accountService.sendAsk({ "ask": messageText, "Stamp": stamp, "CountChar": count }, id).then(result => {
      console.log("result", result)
      setMessageText("")
      setCount(0)
      change(result)
      toast.success(t('send_new_ask'))

    });
    exit();
    console.log("Sbumit")
  }
  const handleChangeText = (e) => {
    setMessageText(e.target.value)
    setCount(e.target.value.length)

  }

  return (
    <div>
      <Modal
        isOpen={show}
        contentLabel="onRequestClose Example"

        ariaHideApp={false}
        className="dialog-input open aside"
        overlayClassName="Overlay"
      >
        <div className='container-modal open '>



          <div id='headerMessage'>

            <div className="d-flex w-100 justify-content-between p-1 ">
              <div>
                <button onClick={exit} type="button" className="btn btn-default btn-toolbar">{t('close')}</button>
              </div>
              <div>
                <button onClick={handelChange} type="button" className="btn btn-warning ml-2 btn-120">
                  <i className="icon-send mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
                  </svg></i>
                  <span>{t('send')}</span>
                </button>

              </div></div>
          </div>
          <ModalStamp id={id} show={showModalMessage} exit={handleCloseModalText} change={(e) => { changeStamp(e) }} />

          <div className="d-flex pt-2 px-3 align-items-center">
            <div className="d-flex align-items-center mt-n2">


            </div>

            <div className="flex-grow-1 text-dir text-start">
              <button onClick={handleOpenModalMessage} className="btn btn-default pr-2">

                <img className="stamp loaded" width={100} src={`${baseUrl}/${stamp}`} />
              </button>
            </div>
          </div>

          <form className='form-msg' onSubmit={handleSubmit(onSubmit)}>
            <fieldset className='fade style-list'>

              <textarea placeholder={t('write_question')} onChange={handleChangeText} rows="9" value={(messageText) ? messageText : ""}  ></textarea>


            </fieldset>

          </form>


        </div>

      </Modal>
    </div>
  );

}