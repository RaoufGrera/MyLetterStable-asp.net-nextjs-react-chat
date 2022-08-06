import { useRouter } from 'next/router';
import { useState, useEffect, Children } from 'react';
import { useTranslation } from "next-i18next";

import Link from 'next/link'
import { accountService, alertService } from '../../src/_services';

import SVGIcon from "components/SVGIcon";
export { ChatLayout };

function ChatLayout(props, p) {
  console.log("props", props)
  console.log("props", props)
  const { t } = useTranslation();

  const childrens = props.children;
  const [users, setUsers] = useState(null);



  useEffect(() => {
    loadFriends();
  }, []);

  function loadFriends() {
    accountService.getChat().then(res => {
      setUsers(res);
    });
  }
  //const users = props.users;
  console.log('Layout Caht ')

  return (
    <>
      <h1 className="header-logged-h1">{t('messages')}</h1>

      <br></br>
      <div className="container">

        <div className="row">
          <div className='col-lg-3'>
            <div className='card rounded-0'>





              <div className="card-header">
                {t('messages')}                </div>
              <ul className="list-group list-group-flush">

                {users && users.map(user =>

                  <Link key={user.id} href={"/chat/" + user.id + "/#message"} scroll={false} >
                    <li className="list-group-item d-flex pe-click">
                      <div className="mr-2">
                        <img src={`${process.env.imgUrl}/${user.image}`} className="rounded-circle avatar-border " alt="avatar" width="42" height="42" />
                      </div>
                      <div className="col"><div className="d-flex text-truncate">
                        <h6 className="col pl-0 pr-0 mt-1 mb-0 text-truncate ">{user.name}</h6>

                      </div>
                        <div className="text-black-50 d-flex p-0 m-0 align-items-center small text-truncate">
                          <span className="mr-1">
                          </span>{user.userName}</div>
                      </div>
                      {(!user.isReceived) &&
                        <div>*</div>
                      }
                    </li>
                  </Link>

                )}
              </ul>


            </div>
          </div>

          <div className='col-lg-9'>
            {childrens}
          </div>
        </div>

      </div>
    </>

  );
}