import Modal from 'react-modal';
import React, { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next'
import { accountService } from '../src/_services'

export {ProfileModal}
function ProfileModal({ show, exit, modalData}) {
    const users = modalData;
    const { t  } = useTranslation('common');

    console.log(users)
    const r = "no";
    const ob =  t('smoking.options.'+r);
    const { register, handleSubmit, reset, formState } = useForm();
    console.log(ob)
    function onSubmit(data) {
       // return updateUser(users.id, data);

       console.log("Sbumit data")
    }

    const handelChange = async (event) => {
        // return updateUser(users.id, data);
     
          event.preventDefault();
         // alert(`So your name is ${event.target.value}?`);
          accountService.edit({"name":table, "value":event.target.value}).then(result=> change(result)).then(exit());
         
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
              <div>
              <svg className="profile-education app-icon" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M84 36C84 38.209 82.209 40 80 40H16C13.791 40 12 38.209 12 36V34.354C12 32.901 12.788 31.562 14.057 30.857L46.057 13.079C47.266 12.408 48.734 12.408 49.943 13.079L81.943 30.857C83.212 31.562 84 32.901 84 34.354V36ZM48 32C50.209 32 52 30.209 52 28C52 25.791 50.209 24 48 24C45.791 24 44 25.791 44 28C44 30.209 45.791 32 48 32ZM68 44C66.895 44 66 44.895 66 46C66 46.720 66.380 47.350 66.950 47.703C67.454 48.014 67.949 48.511 67.890 49.099L66.440 63.602C66.204 65.957 68.053 68 70.420 68H73.580C75.947 68 77.796 65.957 77.560 63.602L76.110 49.099C76.051 48.511 76.546 48.014 77.050 47.703C77.620 47.350 78 46.720 78 46C78 44.895 77.105 44 76 44H68ZM34.343 84H14C12.895 84 12 83.105 12 82V78C12 76.895 12.895 76 14 76C15.105 76 16 75.105 16 74C16 72.895 16.895 72 18 72H78C79.105 72 80 72.895 80 74C80 75.105 80.895 76 82 76C83.105 76 84 76.895 84 78V82C84 83.105 83.105 84 82 84H61.657C60.596 84 59.579 83.579 58.828 82.828L57.172 81.172C56.421 80.421 55.404 80 54.343 80H41.657C40.596 80 39.579 80.421 38.828 81.172L37.172 82.828C36.421 83.579 35.404 84 34.343 84ZM50.950 47.703C51.454 48.014 51.949 48.511 51.890 49.099L50.440 63.602C50.204 65.957 52.053 68 54.420 68H57.580C59.947 68 61.796 65.957 61.560 63.602L60.110 49.099C60.051 48.511 60.546 48.014 61.050 47.703C61.620 47.350 62 46.720 62 46C62 44.895 61.105 44 60 44H52C50.895 44 50 44.895 50 46C50 46.720 50.380 47.350 50.950 47.703ZM35.890 49.099C35.949 48.511 35.454 48.014 34.950 47.703C34.380 47.350 34 46.720 34 46C34 44.895 34.895 44 36 44H44C45.105 44 46 44.895 46 46C46 46.720 45.620 47.350 45.050 47.703C44.546 48.014 44.051 48.511 44.110 49.099L45.560 63.602C45.796 65.957 43.947 68 41.580 68H38.420C36.053 68 34.204 65.957 34.440 63.602L35.890 49.099ZM18.950 47.703C19.454 48.014 19.949 48.511 19.890 49.099L18.440 63.602C18.204 65.957 20.053 68 22.420 68H25.580C27.947 68 29.796 65.957 29.560 63.602L28.110 49.099C28.051 48.511 28.546 48.014 29.050 47.703C29.620 47.350 30 46.720 30 46C30 44.895 29.105 44 28 44H20C18.895 44 18 44.895 18 46C18 46.720 18.380 47.350 18.950 47.703Z"></path></svg>

             
              <h3>{  title && title }</h3>
              </div>
              </header>
        
              <form onSubmit={handleSubmit(onSubmit)}>
                  <fieldset className='fade style-list'>
                  <label>
          <input onChange={handelChange} name="single" type={option}      checked={ (selected) ? "" : "checked" } />
              <span><div>لم يحدد</div></span> 
           </label>

          { users && Object.entries(users).map((tr,k) => 
          <label key={k}>
          <input onChange={handelChange} name="single" type={option}  value={tr[0]} checked= { (selected == tr[0]) ? "checked" :""  } />
          <span><div>{tr[0]} : {tr[1]}</div></span> 
      </label>
         ) } 
         </fieldset>
<span className='fade'></span>
         <button onClick={handleSubmit}>submit</button>

         </form>
         <button  onClick={exit} className='closee'><span>close</span></button>

         <button className="save hide disabled"><span>حفظ</span></button>
         
          </div>
           
        </Modal>
      </div>
    );
  
   }