import React, { useState, useEffect } from "react";
import { animated, interpolate } from "@react-spring/web";
import { accountService } from "src/_services";
import { toast } from 'react-toastify';
import { ModalShowMessage } from "./ModalShowMessage";
import SVGIcon from "components/SVGIcon";
import { ModalMessage } from "components/chat/ModalMessage";
import { ModalAsk } from "components/chat/ModalAsk";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

function Card(props) {
  const router = useRouter()
  const { where, i, x, y, rot, scale, trans, cards, bind, objs } = props;
  //const { name, image, id } = objs[i];
  const profileData = props.profileData
  const { t } = useTranslation();
  const user = objs[i]
  const [id, setId] = useState(0);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const pattern = /[\u0600-\u06FF\u0750-\u077F]/;

  const [showModalAsk, setShowModalAsk] = useState(false);

  const handleShowProfile = (id) => {

    router.push(`/${id}`, undefined, { shallow: true })

  }
  const change = () => {
    //loadMessages()
    //props.pageChange(data);
    //firemessage
  }
  function handleOpenModalMessage(userId) {
    setId(userId)
    setShowModalMessage(true);
    document.body.classList.add("body-overflow");

  }

  function handleOpenModalAsk(userId) {
    setId(userId)
    setShowModalAsk(true);
    document.body.classList.add("body-overflow");

  }
  const handleCloseModalText = () => {
    document.body.classList.remove("body-overflow");
    setShowModalAsk(false);
    setShowModalMessage(false);
  }

  return (
    <animated.div id={where} >
      <animated.div


        className=" card-1 "


        style={{
          transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${0}px,0)`),
        }}

      >




        <animated.div
          className="card-2"
          {...bind(i)}



          style={{
            //          transform: interpolate([rot, scale], trans)
          }}
        >

          <div className="card-last">


            <div className="card h-100 shadow-sm">
              <div className="text-center card-bg" href={"/profile/" + user.id}>


                <div className="img-hover-zoom img-hover-zoom--colorize">
                  <img className="shadow" src={`${process.env.imgUrl}/${user.image}`} />
                  <span className="box-num">{user.id}</span>
                </div>

                <div className='stamp-header ' lang="ar">
                  <div className='stamp-img'>

                  </div>
                  LY
                </div>
              </div>

              <div className="card-body mt-15">



                <div className="my-2 text-center mt-3">
                  <h1 > {user.name}  <span className={(user.online) ? "dot green" : "dot gray"}></span></h1>

                </div>
                <div className="clearfix mb-3">
                  {<p className={pattern.test(user.aboutMe) ? "ar" : "en"}> {user.aboutMe}</p>
                  }
                </div>
                <div className="mb-3">

                  <animated.svg

                    className="tinder-icon relation-interest reject"
                    style={{
                      opacity: interpolate([x, y], (x, y) => `${x / -80} `),
                      transform: interpolate([x, scale], (x, scale) => `translate(${x / 10}px, -50%) scale(${(x > -140) ? x / -80 : 1.6})`),
                    }}
                    viewBox="0 0 96 96"><path d="M19.716 69.213C17.763 71.165 17.763 74.331 19.716 76.284C21.668 78.237 24.834 78.237 26.787 76.284L48.000 55.071L69.213 76.284C71.166 78.237 74.332 78.237 76.284 76.284C78.237 74.332 78.237 71.166 76.284 69.213L55.071 48.000L76.284 26.787C78.237 24.834 78.237 21.668 76.284 19.715C74.332 17.763 71.166 17.763 69.213 19.715L48.000 40.929L26.787 19.716C24.834 17.763 21.668 17.763 19.716 19.716C17.763 21.668 17.763 24.834 19.716 26.787L40.929 48.000L19.716 69.213Z"></path>
                  </animated.svg>
                  <animated.svg

                    className="tinder-icon relation-interest interest"
                    style={{
                      opacity: interpolate([x, y], (x, y) => `${x / 80} `),
                      transform: interpolate([x, scale], (x, scale) => `translate(${x / 10}px, -50%) scale(${(x < 140) ? x / 80 : 1.6})`),
                    }}
                    viewBox="0 0 96 96"><path d="M68.661 15.923C59.769 15.923 53.384 20.706 48.445 29.217C48.248 29.556 47.752 29.556 47.555 29.217C42.616 20.706 36.231 15.923 27.339 15.923C15.597 15.923 6 25.858 6 38.165C6 59.802 35.672 79.763 45.136 85.580C46.905 86.667 49.095 86.667 50.864 85.580C60.328 79.766 90 59.819 90 38.278C90 25.858 80.403 15.923 68.661 15.923Z"></path>

                  </animated.svg>

                </div>
                <div className="box bt-dash pt-2">
                  <div>
                    <ul className="list-inline">
                      {user.ageId &&
                        <li className="list-inline-item btn-list p-2">
                          <SVGIcon className="profile-age app-icon  field" name="age" />

                          {profileData.profile_fields.age.options[user.ageId]}
                        </li>
                      }

                      {user.educationId &&
                        <li className="list-inline-item btn-list p-2">
                          <SVGIcon className="profile-education  app-icon  field" name="education" />

                          {profileData.profile_fields.education.options[user.educationId]}
                        </li>
                      }

                      {user.relationshipId &&
                        <li className="list-inline-item btn-list p-2">
                          <SVGIcon className="profile-relationship   app-icon  field" name="relationship" />

                          {profileData.profile_fields.relationship.options[user.relationshipId]}
                        </li>
                      }
                      {user.countryId &&
                        <li className="list-inline-item btn-list p-2">
                          <SVGIcon className="profile-country app-icon  field" name="country" />

                          {profileData.profile_fields.country.options[user.countryId]}
                        </li>
                      }

                      {user.driverId &&
                        <li className="list-inline-item btn-list p-2">
                          <SVGIcon className="profile-driver app-icon  field" name="driver" />

                          {profileData.profile_fields.driver.options[user.driverId]}
                        </li>
                      }
                    </ul>

                  </div>
                </div>


              </div>


              <div className="d-flex justify-content-between p1">
                <div onClick={() => handleOpenModalMessage(user.id)} className="p-2 bd-highlight">

                  <button className='btn  btn-md btn-light'>
                    <span>{t('message')}</span>
                    <i className="icon-send m-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path className="icon_svg-fill_as_stroke" d="M20.582 1.469a2.757 2.757 0 0 1 1.369 4.468l-.134.143L7.594 20.299a.615.615 0 0 1-.129.099l-.073.036-1.238.514.006.006-.1.033-3.82 1.59a.615.615 0 0 1-.662-.116l-.058.019.019-.058a.615.615 0 0 1-.147-.569l.031-.093 1.592-3.831.031-.089.005.005.515-1.237a.637.637 0 0 1 .081-.141l.054-.061L17.92 2.182a2.756 2.756 0 0 1 2.662-.713zm.918 8.406c.314 0 .574.231.618.533l.007.092v11a.624.624 0 0 1-.533.618l-.092.007h-11a.625.625 0 0 1-.092-1.243l.092-.007h10.375V10.5c0-.314.231-.574.533-.618l.092-.007zm-2.577-6.916-.119.107L4.673 17.201l-.666 1.6 1.19 1.19 1.601-.665 14.136-14.13c.304-.304.46-.72.439-1.14l-.016-.158-.033-.157a1.504 1.504 0 0 0-2.4-.782zM13.5 1.875a.625.625 0 0 1 .092 1.243l-.092.007H3.124L3.125 13.5a.624.624 0 0 1-.533.618l-.092.007a.624.624 0 0 1-.618-.533l-.007-.092v-11c0-.314.231-.574.533-.618l.092-.007h11z" fill="#666"></path></svg></i>
                  </button>
                </div>
                <div onClick={() => handleShowProfile(user.id)} className="p-2 bd-highlight">
                  <button className="btn btn-light">{t('show_profile')}</button>
                </div>
                <div onClick={() => handleOpenModalAsk(user.id)} className="p-2 bd-highlight">
                  <button className='btn  btn-md btn-light'>
                    <span> {t('ask')}</span>
                    <i className="icon-send m-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" strokeWidth="1.5" fill="none" fillRule="evenodd"><g transform="translate(9 7)"><path d="M3 6v-.5A2.5 2.5 0 1 0 .5 3" strokeLinecap="round" strokeLinejoin="round"></path><circle className="icon_svg-fill_as_stroke" fill="#666" cx="3" cy="8.5" r="1" stroke="none"></circle></g><path d="M7.5 4h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3L9 22v-3H7.5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" strokeLinejoin="round"></path></g></svg></i>
                  </button>
                </div>

              </div>
            </div>
          </div>
          <ModalMessage user={user} show={showModalMessage} exit={handleCloseModalText} change={(e) => { change(e) }} />
          <ModalAsk id={user.id} show={showModalAsk} exit={handleCloseModalText} change={(e) => { change(e) }} />
        </animated.div>
      </animated.div>

    </animated.div>
  );
}


export default Card;
