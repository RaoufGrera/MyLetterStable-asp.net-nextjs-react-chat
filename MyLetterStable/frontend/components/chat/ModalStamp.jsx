import Modal from 'react-modal';
import React, { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next'
import { accountService } from '../../src/_services'
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const baseUrl = `${publicRuntimeConfig.imgUrl}`;
export { ModalStamp }
function ModalStamp(props) {
  const { t } = useTranslation('common');

  const show = props.show;
  const change = props.change;
  const exit = props.exit;
  const id = props.id;
  console.log("props.profile", props.profile)



  const [messageText, setMessageText] = useState("");
  const [isShownHoverContent, setIsShownHoverContent] = useState(false);

  const [stamps, setStamps] = useState(null);
  const [stampTitle, setStampTitle] = useState("pick up")
  const changeStampTitle = (title) => {
    setStampTitle(t(title))
  }
  function loadStamps() {
    accountService.getStamps().then(x => setStamps(x));
  }
  useEffect(() => {
    loadStamps();
  }, [])




  function handelChange(stamp) {
    // return updateUser(users.id, data);

    console.log("Sbumit", stamp)
    change(stamp)
    exit();

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
        <div className='container-modal open  modal-stamp'>



          <div id='headerMessage'>

            <div className="row w-100 m-0">
              <div className="col-1 d-flex align-items-center mx-1 p-0">
                <button onClick={exit} type="button" className="btn btn-default btn-toolbar">{t('close')}</button>
              </div>

            </div>
          </div>

          <div className="d-flex overflow-auto pt-3 px-3 align-items-center max-text">
            <div className="row">
              {stamps && stamps.map(stamp =>
                <div className='col-6 col-md-3' key={stamp.id}>
                  <button onMouseOver={() => changeStampTitle(stamp.title)} onClick={() => handelChange(stamp.id)} className='btn btn-default pr-2'>
                    <img width={100} src={`${process.env.imgUrl}/${stamp.id}`} /></button>
                </div>
              )}

            </div>




          </div>
          <div className='p-3 border-top bt-1'>
            <p>{stampTitle}</p>

          </div>
        </div>
      </Modal>
    </div>
  );

}