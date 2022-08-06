import Modal from 'react-modal';
import React, { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next'
import { accountService } from '../src/_services'

export { ModalText }
function ModalText({ show, selectedName, exit, titleName, tableName, change, _isText }) {
  const { t } = useTranslation();
  const title = titleName;
  const table = tableName;
  const isText = _isText;

  const ss = selectedName;


  const { register, handleSubmit, reset, formState } = useForm();
  function onSubmit(data) {
    // return updateUser(users.id, data);

    console.log("Sbumit data")
  }
  const [selected, setSelected] = useState((selectedName) ? selectedName : "Enter Deafult Name");

  useEffect(() => {

    setSelected(selectedName);

  }, [show]);



  const handelChange = async (event) => {
    // return updateUser(users.id, data);

    event.preventDefault();
    // alert(`So your name is ${event.target.value}?`);

    accountService.edit({ "name": table, "value": selected }).then(result => {
      console.log("result", result)
      change(result)
    });
    exit();
    console.log("Sbumit")
  }
  const handleChangeText = (e) => {
    setSelected(e.target.value)

  }

  return (
    <div>
      <Modal
        isOpen={show}
        contentLabel="onRequestClose Example"
        onRequestClose={exit}
        ariaHideApp={false}
        className="dialog-input open aside"
        overlayClassName="Overlay"
      >
        <div className='container-modal open '>



          <header>
            <div>
              <h3>{title && title}</h3>
            </div>
          </header>

          <form onSubmit={handleSubmit(onSubmit)}>
            {isText &&
              <fieldset className='fade style-list'>

                <textarea onChange={handleChangeText} rows="4" value={(selected) ? selected : ""}  ></textarea>
                <p className="default-message">{t('talk_about')}</p>
              </fieldset>
            }

            {!isText &&
              <fieldset className='fade style-list'>
                <input className="field-input" type="text" placeholder={t('new_name')} onChange={handleChangeText} value={(selected) ? selected : ""} ></input>
              </fieldset>
            }
          </form>
          <button onClick={exit} className='closee'><span>{t('close')}</span></button>

          <button onClick={handelChange} className="save show"><span>{t('save')}</span></button>

        </div>

      </Modal>
    </div>
  );

}