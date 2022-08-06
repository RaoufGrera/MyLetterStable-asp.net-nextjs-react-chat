import React, { useState, useEffect } from "react";
import { animated, interpolate } from "@react-spring/web";
import { accountService } from "src/_services";
import { toast } from 'react-toastify';
import { ModalShowMessage } from "./ModalShowMessage";
import { useTranslation } from "next-i18next";

function Card(props) {
  const { where, i, x, y, rot, scale, trans, cards, bind, objs } = props;
  const { content, stampId, id, senderId, senderName, messageNumber, senderCountry, isPublic, ago, messageAgo } = objs[i];


  const [secret, SetSecret] = useState(getRandomInt(10));
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [data, setData] = useState("");
  const pattern = /[\u0600-\u06FF\u0750-\u077F]/;

  const { t } = useTranslation();


  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const handleCloseModalText = () => {
    document.body.classList.remove("body-overflow");

    setShowModalMessage(false);
  }






  return (
    <animated.div key={i} id={where} >
      <animated.div


        className=" card-1 "


        style={{
          transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
        }}

      >



        <ModalShowMessage data={data} id={id} show={showModalMessage} exit={handleCloseModalText} />

        <animated.div
          className="card-2 "
          {...bind(i)}



          style={{
            //          transform: interpolate([rot, scale], trans)
          }}
        >

          <div className="card-last max-message">


            <div dir="rtl" className="d-flex flex-row ">
              <div className="flex-grow-1"><i className="icon-done text-lightest"></i><i className="icon-done text-calm"></i></div>


              <div className="position-relative mx-n2"><img src={`${process.env.imgUrl}/${stampId}`} width="90" height="90" alt="stamp" className="stamp loaded" /></div></div>

            <div className="p-2 pb-1 text-start">
              <p className={pattern.test(content) ? "ar  p-wrap text-body" : "en p-wrap text-body"}> {content}</p>
            </div>


            <div className="stamp-header" lang="ar"><div className="stamp-img"></div>{(senderCountry) ? senderCountry.toUpperCase() : "LY"}</div>

            <div className="p-3 pb-0"><p className="text-black-100 fw-bold ">{isPublic ? senderName : t(senderName)}</p>
              <p className="text-black-50  rtl small mb-2" dir="rtl" >{t(ago)} {messageNumber} {t(messageAgo)}</p>

            </div>

          </div>
        </animated.div>
      </animated.div>

    </animated.div>
  );
}


export default Card;
