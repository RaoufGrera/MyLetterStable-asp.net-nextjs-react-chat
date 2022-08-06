
import { useState, useEffect } from 'react';
import { accountService, userService } from 'src/_services';
import getConfig from 'next/config';
import { Link } from 'components';

import SVGIcon from "components/SVGIcon";
import { filter } from 'rxjs/operators';
import router, { useRouter } from 'next/router';
import { Field, Formik, useFormikContext } from 'formik';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ChatUser } from 'components/chat/ChatUser';
import { ChatLayout } from '/components/layout/ChatLayout';
import { ModalAnswer } from 'components/chat/ModalAnswer';

Ask.PageLayout = ChatLayout

function Ask() {
  const [questions, setQuestions] = useState([]);
  const [showModalMessage, setShowModalMessage] = useState(false);

  const change = () => {
    loadQuestions()
    //props.pageChange(data);
  }

  const handleCloseModalText = () => {
    document.body.classList.remove("body-overflow");

    setShowModalMessage(false);
  }
  function handleOpenModalMessage() {
    setShowModalMessage(true);
    document.body.classList.add("body-overflow");

  }
  function loadQuestions() {
    accountService.getAsks().then(o => setQuestions(o));
  }
  useEffect(() => {
    loadQuestions()
  }, []);
  return (
    <>
      <h2>Asking index</h2>

      {questions && questions.map(user =>
        <li key={user.id} onClick={() => handleOpenModalMessage()}>
          <span href={"/chat/ask/" + user.id}>
            {user.ask}
          </span>


          <ModalAnswer id={user.id} ask={user.ask} answer={user.answer} show={showModalMessage} exit={handleCloseModalText} change={(e) => { change(e) }} />

        </li>
      )}
    </>

  );
}

//getServerSideProps
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  },
})
export default Ask