import Modal from 'react-modal';
import React, { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next'
import { accountService } from '../src/_services'

export {ModalUser}
function ModalUser({ show,selectedName, exit,titleName,tableName,change,_isText }) {
    const { t  } = useTranslation('common');
   
    const [userData,setUserData] = useState(null);

    useEffect(() => {
      accountService.getById().then(x => {
        console.log("x")
        setUserData(x)
        console.log(x)
       

    }).catch(alertService.error);
     
  },);
    

 

    const handelChange = async (event) => {
        // return updateUser(users.id, data);
     
          event.preventDefault();
         // alert(`So your name is ${event.target.value}?`);

          accountService.edit({"name":table, "value":selected}).then(result=>{console.log("result",result)
             change(result)});
             exit();
        console.log("Sbumit")
     }
     const handleChangeText= (e) => {
     setSelected(e.target.value)
    
    }

    return (
      <div>
   <Modal 
           isOpen={show}
           contentLabel="onRequestClose Example"
           onRequestClose={exit}
           ariaHideApp={false}
           className="popup page-profile dialog-input open aside"
           overlayClassName="Overlay"
        >
            <div className='container-modal open '>
             
			 

            
         
          </div>
           
        </Modal>
      </div>
    );
  
   }