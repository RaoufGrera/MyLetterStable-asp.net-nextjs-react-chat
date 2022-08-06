import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Link from 'next/link'
import { accountService, alertService } from '../../src/_services';

import SVGIcon from "components/SVGIcon";

export { ChatUser };

function ChatUser() {

  const [users, setUsers] = useState(null);



  useEffect(() => {
    loadFriends();
  }, []);

  function loadFriends() {
    accountService.getChat().then(res => {
      setUsers(res);
    });
  }

  return (
    <div className='col-md-3'>

      {users && users.map(user =>
        <li key={user.id}>
          <Link href={"/chat/" + user.id + ""}>
            user.name
          </Link>

        </li>
      )}

    </div>

  );
}