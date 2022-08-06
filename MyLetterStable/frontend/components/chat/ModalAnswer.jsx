import Modal from 'react-modal';
import React, { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next'
import { accountService } from '../../src/_services'
import { ModalStamp } from './ModalStamp';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const baseUrl = `${publicRuntimeConfig.imgUrl}`;
export { ModalAnswer }
function ModalAnswer(props) {
  const { t } = useTranslation('common');


  const show = props.show;
  const change = props.change;
  const exit = props.exit;
  const id = props.questionId;
  console.log("props.profile", props.profile)


  const [ask, setAsk] = useState(props.ask);
  const [answer, setAnswer] = useState(props.answer);

  const { register, handleSubmit, reset, formState } = useForm();
  function onSubmit(data) {
    // return updateUser(users.id, data);

    console.log("Sbumit data")
  }



  const handelChange = async (event) => {
    // return updateUser(users.id, data);

    event.preventDefault();
    // alert(`So your name is ${event.target.value}?`);
    accountService.answerQuestion({ "answer": answer }, id).then(result => {
      // console.log("result", result)
      setAnswer("")
      change(result)
    });
    exit();

    console.log("Sbumit")
  }
  const handleChangeText = (e) => {
    setAnswer(e.target.value)
    //setCount(e.target.value.length)

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

            <div className="row w-100 m-0">
              <div className="col-1 d-flex align-items-center mx-1 p-0">
                <button onClick={exit} type="button" className="btn btn-default btn-toolbar">{t('close')}</button>
              </div>
              <div className="col d-flex flex-row-reverse align-items-center text-right pr-1">
                <button onClick={handelChange} type="button" className="btn btn-dark ml-2 btn-120">
                  <i className="icon-send mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"></path>
                  </svg></i>
                  <span>{t('save')}</span>
                </button>

              </div></div>
          </div>

          <div className="d-flex pt-2 px-3 align-items-center">



          </div>
          <div className='center f-13'>
            <span className='stmsg'>{t('answer')}<span></span></span></div>
          <form className='form-msg' onSubmit={handleSubmit(onSubmit)}>


            <fieldset className='fade style-list'>

              <textarea placeholder={t('response')} onChange={handleChangeText} rows="9" value={(answer) ? answer : ""}  ></textarea>


            </fieldset>

          </form>


        </div>

      </Modal>
    </div>
  );

}