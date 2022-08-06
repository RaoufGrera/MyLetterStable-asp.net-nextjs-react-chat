import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { Link } from 'components';
import { accountService, alertService } from '../../src/_services';
import { userService } from '../../src/_services';
import { useTranslation } from 'next-i18next';
import SVGIcon from "components/SVGIcon";

import getConfig from 'next/config';
import { ModalAnswer } from 'components/chat/ModalAnswer';
import { ModalImage } from 'components/ModalImage';
import { ModalOver } from 'components/ModalOver';
import { ModalText } from 'components/ModalText';
import { ModalMessage } from 'components/chat/ModalMessage';
import { ModalAsk } from 'components/chat/ModalAsk';
import Head from 'next/head';


const { publicRuntimeConfig } = getConfig();

//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const baseUrl = `${publicRuntimeConfig.imgUrl}`;
const trans = "_transparent.png";
export { Show };

function Show(props) {

	const { t } = useTranslation();
	const profileData = props.profileFieldsFromDb;

	console.log("profileData", profileData);
	const user = props?.user;
	const isAddMode = !user;
	const router = useRouter();
	const [userData, setUserData] = useState(null);

	const [questions, setQuestions] = useState([]);
	const [showModalAnswer, SetshowModalAnswer] = useState(false);
	const [questionId, setQuestionId] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showModalText, setShowModalText] = useState(false);
	const [showImageModal, setShowImageModal] = useState(false);
	const [dataModal, setDataModal] = useState(null);
	const [titleName, setTitleName] = useState(null);
	const [isText, setIsText] = useState(false);
	const [tableName, setTableName] = useState(null);
	const [selectedName, setSelectedName] = useState(null);
	const [type, setType] = useState("option");

	const pattern = /[\u0600-\u06FF\u0750-\u077F]/;
	const [showModalMessage, setShowModalMessage] = useState(false);

	const [showModalAsk, setShowModalAsk] = useState(false);
	function handleOpenModalMessage() {

		setShowModalMessage(true);
		document.body.classList.add("body-overflow");

	}

	function handleOpenModalAsk() {

		setShowModalAsk(true);
		document.body.classList.add("body-overflow");

	}

	function handleOpenImageModal() {
		setShowImageModal(true);
		document.body.classList.add("body-overflow");
	}
	const handleCloseImageModal = () => {
		document.body.classList.remove("body-overflow");
		setShowImageModal(false);
	}

	function handleOpenModal(obj, table, selected) {
		console.log(obj.label)
		setType(obj.type)
		setSelectedName(selected);
		setDataModal(obj.options);
		setTitleName(obj.label);
		setTableName(table);
		setShowModal(true);
		document.body.classList.add("body-overflow");

		console.log(obj)
	}

	function handleOpenModalText(tiitem, table, selected, isText) {
		setSelectedName(selected);
		setTitleName(tiitem);
		setIsText(isText);
		setTableName(table);
		setShowModalText(true);
		document.body.classList.add("body-overflow");
	}

	const handleCloseModal = () => {
		document.body.classList.remove("body-overflow");
		setShowModal(false);
	}

	const handleCloseModalText = () => {
		document.body.classList.remove("body-overflow");
		setSelectedName(null);
		setTitleName(null);
		setTableName(null);
		setShowModalText(false);
		setShowModalAsk(false);
		setShowModalMessage(false);
	}

	useEffect(() => {
		accountService.getById(props.id).then(x => {
			console.log("x")
			setUserData(x)
			console.log(x)


		}).catch(alertService.error);

		loadQuestions()
	}


		, []);

	const change = (data) => {
		setUserData(data)

	}
	function loadQuestions() {
		accountService.getAsks(props.id).then(o => setQuestions(o));
	}
	function answerQuestoin(_questionId) {
		SetshowModalAnswer(true);
		setQuestionId(_questionId)
	}

	const handleCloseModalAnswer = () => {

		SetshowModalAnswer(false);
	}
	return (

		<div>

			{userData && profileData && accountService.accountValue &&
				<>
					<Head>
						<title>{userData.name}</title>
						<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					</Head>
					<div className="container tile  card-last mt-5">


						<div className="card h-100 shadow-sm">
							<div className={"text-center p-2 " + (userData.country ? userData.country : "card-bg")} href={"/profile/" + userData.id}>

								<div className='tile portrait content-card incomplete'>
									<div className='fieldset'>
										<div id={(accountService.accountValue.id == userData.id) ? '' : 'view'} onClick={handleOpenImageModal} className={(accountService.accountValue.id == userData.id) ? 'mt-2 portrait-container' : "mt-2 pe-none   portrait-container"}>




											{(userData.image) &&

												<img className="p-1" width={120} height={120} src={`${process.env.imgUrl}/${userData.image}`} />
											}

											<svg className="app-icon library-plus state add" viewBox="0 0 96 96"><path d="M80 43C82.761 43 85 45.239 85 48C85 50.761 82.761 53 80 53H53V80C53 82.761 50.761 85 48 85C45.239 85 43 82.761 43 80V53H16C13.239 53 11 50.761 11 48C11 45.239 13.239 43 16 43L43 43V16C43 13.239 45.239 11 48 11C50.761 11 53 13.239 53 16V43L80 43Z"></path></svg>
										</div>
									</div>
								</div>



								<div lang='ar' className='stamp-header'>
									<div className='stamp-img'>

									</div>
									{(userData.country) ? userData.country.toUpperCase() : "LY"}
								</div>
							</div>

							<div className="card-body mt-15">



								<div className="text-center mt-3">
									<h1 > {userData.name}</h1>
									<div className="d-flex justify-content-center p1">
										<div onClick={() => handleOpenModalMessage()} className="p-2 bd-highlight">

											<button className='btn  btn-md btn-light'>
												<span>{t('message')}</span>
												<i className="icon-send m-2">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path className="icon_svg-fill_as_stroke" d="M20.582 1.469a2.757 2.757 0 0 1 1.369 4.468l-.134.143L7.594 20.299a.615.615 0 0 1-.129.099l-.073.036-1.238.514.006.006-.1.033-3.82 1.59a.615.615 0 0 1-.662-.116l-.058.019.019-.058a.615.615 0 0 1-.147-.569l.031-.093 1.592-3.831.031-.089.005.005.515-1.237a.637.637 0 0 1 .081-.141l.054-.061L17.92 2.182a2.756 2.756 0 0 1 2.662-.713zm.918 8.406c.314 0 .574.231.618.533l.007.092v11a.624.624 0 0 1-.533.618l-.092.007h-11a.625.625 0 0 1-.092-1.243l.092-.007h10.375V10.5c0-.314.231-.574.533-.618l.092-.007zm-2.577-6.916-.119.107L4.673 17.201l-.666 1.6 1.19 1.19 1.601-.665 14.136-14.13c.304-.304.46-.72.439-1.14l-.016-.158-.033-.157a1.504 1.504 0 0 0-2.4-.782zM13.5 1.875a.625.625 0 0 1 .092 1.243l-.092.007H3.124L3.125 13.5a.624.624 0 0 1-.533.618l-.092.007a.624.624 0 0 1-.618-.533l-.007-.092v-11c0-.314.231-.574.533-.618l.092-.007h11z" fill="#666"></path></svg></i>
											</button>
										</div>

										<div onClick={() => handleOpenModalAsk()} className="p-2 bd-highlight">
											<button className='btn  btn-md btn-light'>
												<span>{t('ask')}</span>
												<i className="icon-send m-2">
													<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g className="icon_svg-stroke" stroke="#666" stroke-width="1.5" fill="none" fill-rule="evenodd"><g transform="translate(9 7)"><path d="M3 6v-.5A2.5 2.5 0 1 0 .5 3" stroke-linecap="round" stroke-linejoin="round"></path><circle className="icon_svg-fill_as_stroke" fill="#666" cx="3" cy="8.5" r="1" stroke="none"></circle></g><path d="M7.5 4h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-3L9 22v-3H7.5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z" stroke-linejoin="round"></path></g></svg></i>
											</button>
										</div>
									</div>
								</div>

							</div>



						</div>
					</div>

					<div className='container mt-3'>
						<div className='row'>

							<div id={(accountService.accountValue.id == userData.id) ? '' : 'view'} className='col-lg-4 '>

								<div className=" tile desc  content-card">
									<div className={(userData.about != null) ? "field-container shadow-sm" : "field-container shadow-sm incomplete"} onClick={() => handleOpenModalText(profileData.profile_fields['about'], "about", userData.about, true)}>
										<svg className="app-icon state library-pencil edit" viewBox="0 0 96 96">
											<path fillRule="evenodd" clipRule="evenodd" d="M84.142 21.742L74.243 11.843C71.900 9.500 68.100 9.500 65.757 11.843L58.416 19.184C57.891 19.710 58.083 20.654 58.741 21.000C60.502 21.925 63.742 23.970 67.879 28.106C72.015 32.243 74.060 35.483 74.985 37.244C75.331 37.902 76.275 38.094 76.801 37.569L84.142 30.228C86.485 27.884 86.485 24.085 84.142 21.742ZM71.517 42.852L33.916 80.453C33.471 80.899 32.895 81.193 32.273 81.294L15.411 84.013C13.392 84.339 11.646 82.593 11.972 80.574L14.691 63.712C14.792 63.090 15.086 62.514 15.532 62.069L53.133 24.468C53.936 23.664 55.123 23.400 56.122 23.940C57.925 24.914 61.073 26.958 65.050 30.935C69.027 34.912 71.071 38.060 72.045 39.863C72.585 40.862 72.321 42.049 71.517 42.852ZM23.069 78.134L30.261 77.027C30.749 76.952 31.109 76.532 31.109 76.039L31.109 73.947C31.109 72.842 30.214 71.947 29.109 71.947L26.038 71.947C24.933 71.947 24.038 71.052 24.038 69.947L24.038 66.876C24.038 65.771 23.143 64.876 22.038 64.876L19.946 64.876C19.453 64.876 19.033 65.236 18.958 65.724L17.851 72.916C17.758 73.522 18.234 74.106 18.803 74.335C19.296 74.533 19.899 74.879 20.503 75.482C21.106 76.086 21.452 76.689 21.650 77.182C21.879 77.751 22.463 78.227 23.069 78.134Z"></path></svg>

										<h2>{profileData.profile_fields['about']}</h2>
										<p className={pattern.test(userData.about) ? "ar p-wrap" : "en p-wrap"}>{userData.about} </p>
									</div>
								</div>



								<div className='tile content-card'>
									<div className="field-container shadow-sm">
										<ul>

											<li className={(userData.name) ? "field-text" : "field-text incomplete"} onClick={() => handleOpenModalText(profileData.profile_fields['name'], "name", userData.name, false)} data-key="name">
												<SVGIcon className="profile-name app-icon  field" name="name" />

												<div>
													<h3>{profileData.profile_fields['name']}</h3>
													<p>{(userData.name) ? userData.name : "ادخل اسم رمزي"}</p>
												</div>
												<svg className="app-icon library-chevron_right state" viewBox="0 0 96 96"><path d="M43.618 17.640L70.467 44.323C72.511 46.354 72.511 49.646 70.467 51.677L43.618 78.360C41.418 80.547 37.850 80.547 35.650 78.360C33.536 76.259 33.441 72.882 35.435 70.668L55.843 48L35.435 25.332C33.441 23.118 33.536 19.741 35.650 17.640C37.850 15.453 41.418 15.453 43.618 17.640Z"></path></svg>		</li>



											{Object.entries(profileData.profile_categories.basic.fields).map((item, k) =>
												<li key={k} className={(userData[item[1]]) ? item[1] + " field" : item[1] + "field incomplete"} data-key={item[1]} onClick={() => handleOpenModal(profileData.profile_fields[item[1]], item[1], userData[item[1]])}>
													<SVGIcon className={"profile-" + item[1] + " app-icon  field"} name={item[1]} />

													<div>
														<h3>{profileData.profile_fields[item[1]].label}</h3>
														<p>{(userData[item[1]]) ? profileData.profile_fields[item[1]].options[userData[item[1]]] : t('add') + " " + profileData.profile_fields[item[1]].label}</p>
													</div>
													<svg className="app-icon library-chevron_right state" viewBox="0 0 96 96"><path d="M43.618 17.640L70.467 44.323C72.511 46.354 72.511 49.646 70.467 51.677L43.618 78.360C41.418 80.547 37.850 80.547 35.650 78.360C33.536 76.259 33.441 72.882 35.435 70.668L55.843 48L35.435 25.332C33.441 23.118 33.536 19.741 35.650 17.640C37.850 15.453 41.418 15.453 43.618 17.640Z"></path></svg>

												</li>

											)
											}

										</ul>
									</div>
								</div>
								<div className="tile content-card details-social_status " data-name="details-social_status">
									<div className="field-container shadow-sm">
										<ul>



											{Object.entries(profileData.profile_categories.social_status.fields).map((item, k) =>
												<li key={k} className={(userData[item[1]] && userData[item[1]]?.length) ? item[1] + " field" : item[1] + "field incomplete"} data-key={item[1]} onClick={() => handleOpenModal(profileData.profile_fields[item[1]], item[1], userData[item[1]])}>
													<SVGIcon className={"profile-" + item[1] + " app-icon  field"} name={item[1]} />

													<div>
														<h3>{profileData.profile_fields[item[1]].label}</h3>
														{(profileData.profile_fields[item[1]].type == "option") ?


															<p>{(userData[item[1]]) ?
																profileData.profile_fields[item[1]].options[userData[item[1]]] :
																t('add') + " " + profileData.profile_fields[item[1]].label}</p>

															:
															<p>{(userData[item[1]].length > 0) ?
																userData[item[1]].map(element => (<li>{profileData.profile_fields[item[1]].options[element]}</li>)) :
																t('add') + " " + profileData.profile_fields[item[1]].label}</p>
														}
													</div>
													<svg className="app-icon library-chevron_right state" viewBox="0 0 96 96"><path d="M43.618 17.640L70.467 44.323C72.511 46.354 72.511 49.646 70.467 51.677L43.618 78.360C41.418 80.547 37.850 80.547 35.650 78.360C33.536 76.259 33.441 72.882 35.435 70.668L55.843 48L35.435 25.332C33.441 23.118 33.536 19.741 35.650 17.640C37.850 15.453 41.418 15.453 43.618 17.640Z"></path></svg>

												</li>

											)
											}
										</ul>
									</div>
								</div>









							</div>

							<div className='col-lg-8'>
								<h1 className="header-logged-h1 mt-2">{t('questions')}</h1>

								<div className='mt-2'>
									{(questions.length == 0) &&
										<div className="card  shadow-sm h-100 text-center rounded-0 letter-sm  no-underline" >
											<div className="p-3 pb-3">
												<p>{t('no_questions')}</p>
											</div>
										</div>
									}
									{questions && questions.map(question =>
										<div className="col-12  mb-3">
											<div className={`card  shadow-sm h-100 rounded-0 letter-sm  no-underline`} >
												<div className="p-3 pb-0 mb-0 c-blue">
													<div className="d-flex flex-row ">
														<div className="flex-grow-1 mt-2 p-2">
															<div className={pattern.test(question.ask) ? "ar" : "en"}>
																{question.ask}
															</div>
														</div>
														<div>
															<img src={`${process.env.imgUrl}/${question.stamp}`} width="100" height="100" alt="free" className="stamp loaded" /></div></div></div>

												<div className={pattern.test(question.answer) ? "ar p-3 pb-3" : "en p-3 pb-3"} >
													{((accountService.accountValue.id == userData.id) && (question.answer == null)) ?
														<button onClick={() => answerQuestoin(question.id)} className='btn btn-primary' >{t('response')}</button>
														:
														question.answer
													}
												</div>
											</div>
										</div>


									)}
									<ModalAnswer questionId={questionId} show={showModalAnswer} exit={handleCloseModalAnswer} change={(e) => { loadQuestions(e) }} />
									<ModalImage show={showImageModal} exit={handleCloseImageModal} pathImage={userData.image} change={(e) => { change(e) }} />

									<ModalOver type={type} show={showModal} selectedName={selectedName} exit={handleCloseModal} modalData={dataModal} titleName={titleName} tableName={tableName} change={(e) => { change(e) }} option="radio" />
									<ModalMessage user={userData} show={showModalMessage} exit={handleCloseModalText} change={(e) => { loadQuestions(e) }} />
									<ModalAsk id={props.id} show={showModalAsk} exit={handleCloseModalText} change={(e) => { loadQuestions(e) }} />
									<ModalText show={showModalText} selectedName={selectedName} exit={handleCloseModalText} titleName={titleName} tableName={tableName} change={(e) => { change(e) }} _isText={isText} />

								</div>
							</div>
						</div >
					</div >

				</>}
		</div >


	);
}


export async function getStaticProps({ locale }) {

	console.log('locale', locale)
	// const dirToList = '/data/';
	let profileFieldsFromDb = require('/data/profile_ar.json');

	if (locale != "ar")
		profileFieldsFromDb = require('/data/profile_en.json');




	return {

		props: {
			id: id,
			profileFieldsFromDb: profileFieldsFromDb,
			locale: locale,
			...await serverSideTranslations(locale, ['common', 'footer']),
		}
		//, revalidate: 10
	}
}

