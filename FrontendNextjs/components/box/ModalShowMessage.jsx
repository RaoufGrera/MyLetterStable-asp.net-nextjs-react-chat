import Modal from 'react-modal';
import React, { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next'
import { accountService } from '../../src/_services'
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const baseUrl = `${publicRuntimeConfig.imgUrl}`;
export { ModalShowMessage }
function ModalShowMessage(props) {
  const { t } = useTranslation('common');

  const show = props.show;
  const data = props.data;

  const exit = props.exit;
  const id = props.id;
  console.log("props.data", props.data)



  const [messageText, setMessageText] = useState(data.content);


  const [stamp, setStamp] = useState("/Stamp/deafult.png");



  useEffect(() => {
    setMessageText(data.content)
    setStamp(data.stampId)

  }, [data]);



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
                <button onClick={exit} type="button" className="btn btn-default btn-toolbar">الغاء</button>
              </div>
              <div className="col d-flex flex-row-reverse align-items-center text-right pr-1">


              </div></div>
          </div>

          <div className="d-flex pt-2 px-3 align-items-center">


            <div className="flex-grow-1 text-dir">

              <img className="stamp loaded" width={100} src={`${baseUrl}/${stamp}`} />

            </div>
          </div>
          <div className='center f-13'>
            <span className='stmsg'>عدد الحروف : {data.countChar}<span></span></span></div>
          <form className='form-msg'>
            <fieldset className='fade style-list'>

              <textarea disabled placeholder="أكتب شيئاً جميلاً..." rows="9" value={messageText}  ></textarea>


            </fieldset>

          </form>


        </div>

      </Modal>
    </div>
  );

}