import Modal from 'react-modal';
import React, { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next'
import { accountService } from '../src/_services'

export { ModalOver }
function ModalOver({ show, selectedName, exit, modalData, option, titleName, tableName, change, type }) {
  const users = modalData;
  const { t } = useTranslation('common');
  const title = titleName;
  const table = tableName;
  const selected = selectedName;
  console.log("selectedName", selectedName);
  const [checkData, setCheckData] = useState((selected) ? selected : {});
  useEffect(() => {

    console.log("checkedItems: ", checkData);
  }, [checkData]);

  useEffect(() => {
    console.log("selected", selected);

    if (type == "options") {

      var obj = {};

      // Loop to insert key & value in this object one by one
      for (var i = 0; i < selectedName.length; i++) {
        obj[selectedName[i]] = true;

      }

      setCheckData(obj)
      console.log("tagsArray", obj);
    }
  }, [show]);
  console.log(users)
  const r = "no";
  const ob = t('smoking.options.' + r);
  const { register, handleSubmit, reset, formState } = useForm();
  console.log(ob)
  function onSubmit(data) {
    // return updateUser(users.id, data);

    console.log("Sbumit data")
  }

  const handelChange = async (event) => {
    // return updateUser(users.id, data);
    event.target.checked
    setCheckData({ ...checkData, [event.target.name]: event.target.checked });

    if (type != "option")
      return
    event.preventDefault();
    // alert(`So your name is ${event.target.value}?`);

    accountService.edit({ "name": table, "value": event.target.value }).then(result => {
      console.log("result", result)
      change(result)
    });
    exit();
    console.log("Sbumit")
  }
  function saveOptions() {
    let text = "";
    for (const x in checkData) {

      if (checkData[x] == true)
        text += x + ",";
    }
    console.log("Text", text)

    accountService.edit({ "name": table, "value": text }).then(result => {
      console.log("result", result)
      change(result)
    });
    exit();
    console.log("Sbumit")
  }
  function updateUser(id, data) {
    return userService.update(id, data)
      .then(() => {
        alertService.success('User updated', { keepAfterRouteChange: true });
        router.push('..');
      })
      .catch(alertService.error);
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

            <div className="d-flex w-100 justify-content-between p-1 ">
              <div>
                <button onClick={exit} className="closee" ><span>{t('close')}</span></button>

              </div>
              <div><h3>{title && title}</h3></div>
              <div>
                {(type != "option") &&
                  <button onClick={saveOptions} className="save"  ><span>{t('save')}</span></button>
                }
              </div>


            </div>
          </header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className={(type == "option") ? 'fade style-list ' : 'fade style-grid'} >
              {(type == "option") &&
                <label>
                  <input onChange={handelChange} name="single" type={option} checked={(selected) ? "" : "checked"} />
                  <span><div>{t('not_selected')}</div></span>
                </label>
              }
              {users && Object.entries(users).map((tr, k) =>
                <label key={k}>
                  <input onChange={handelChange} name={tr[0]} type={(type == "option") ? 'radio' : 'checkbox'} value={tr[0]} checked={(type == "option") ? (selected == tr[0]) ? "checked" : "" : checkData[tr[0]]} />
                  <span><div> {tr[1]}</div></span>
                </label>
              )}
            </fieldset>
            <span className='fade'></span>

          </form>


        </div>

      </Modal>
    </div>
  );

}