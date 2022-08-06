export { HeaderNavOld };
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "next-i18next";
import { accountService } from "../../src/_services";
import { Link } from 'components';
import getConfig from 'next/config';


const { publicRuntimeConfig } = getConfig();

//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const baseUrl = `${publicRuntimeConfig.imgUrl}`;
function HeaderNavOld(props) {
	const userData = props.userData;
	console.log("userData", userData);
	const [isListOpen, setIsListOpen] = useState(false);
	const [isProfileListOpen, setIsProfileListOpen] = useState(false);
	const ref = useRef(null);
	const { t } = useTranslation();

	function toggleList() {
		setIsListOpen(!isListOpen)
	}
	function close() {
		setIsListOpen(false);
	};

	function toggleListProfile() {
		setIsProfileListOpen(!isProfileListOpen)
	}
	function closeProfile() {
		setIsProfileListOpen(false);
	};
	function logout() {
		accountService.logout();
	}


	useEffect(() => {

		setTimeout(() => {
			if (isListOpen) {
				window.addEventListener('click', close, true)
				document.body.classList.add("bodyMarrgin");
			}
			else {
				window.removeEventListener('click', close, true)
				document.body.classList.remove("bodyMarrgin");
			}


		}, 400)
	})

	return (

		<div className="logged">






			<nav >
				<div className=' navbar navbar-expand-md navbar-light bg-white navpadd'>

					{(isListOpen) && <div className='overflow'></div>}

					<Link className="navbar-brand" href="/">

						<img width={140} className="logo" src="/logo.png" alt="صدفة" />
					</Link>

					<a onClick={toggleList} className="navbar-toggler" >
						<span>قائمة</span>
						<svg className="app-icon library-menu" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M13 17C10.239 17 8 19.239 8 22C8 24.761 10.239 27 13 27H83C85.761 27 88 24.761 88 22C88 19.239 85.761 17 83 17H13ZM8 48C8 45.239 10.239 43 13 43H83C85.761 43 88 45.239 88 48C88 50.761 85.761 53 83 53H13C10.239 53 8 50.761 8 48ZM8 74C8 71.239 10.239 69 13 69H83C85.761 69 88 71.239 88 74C88 76.761 85.761 79 83 79H13C10.239 79 8 76.761 8 74Z"></path></svg>

					</a>


					<div id="navbarID" className={(!isListOpen) ? ' navbar-collapse sidebar' : 'showside navbar-collapse sidebar'}>


						<ul className="menu navbar-nav mr-auto mt-2 mt-md-0">
							<Link className='p2 profile-top' href={`/${userId}`}>
								<div className="profile-content">
									<div className="mr-3">
										{(userData) && <img src={`${baseUrl}/${userData.image}`} className='rounded-circle' width='60' height={60} />}
									</div>

									<div className="media-body">
										<div className="mt-2 text-primary mb-0 text-truncate h5" >{userData.name}</div>

									</div>
								</div>
							</Link>
							<li className="nav-item closebtn">
								<a onClick={close}>
									<svg className="app-icon library-cross" viewBox="0 0 96 96"><path d="M19.716 69.213C17.763 71.166 17.763 74.332 19.716 76.284C21.668 78.237 24.834 78.237 26.787 76.284L48 55.071L69.213 76.284C71.166 78.237 74.332 78.237 76.284 76.284C78.237 74.332 78.237 71.166 76.284 69.213L55.071 48.000L76.284 26.787C78.237 24.834 78.237 21.668 76.284 19.716C74.332 17.763 71.166 17.763 69.213 19.716L48 40.929L26.787 19.716C24.834 17.763 21.668 17.763 19.716 19.716C17.763 21.668 17.763 24.834 19.716 26.787L40.929 48.000L19.716 69.213Z"></path></svg>
									<span>اغلاق</span></a>

							</li>
							<li className="nav-item active">
								<Link href="/users">

									<svg className="app-icon page-feature-match" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M36.234 10H19.586C16.501 10 14 12.501 14 15.586V77.697C14 80.782 16.501 83.282 19.586 83.282H24.582C23.041 81.314 22.330 78.712 22.845 76.065L35.122 12.903C35.327 11.847 35.711 10.871 36.234 10ZM44.748 10.221C42.325 9.750 39.980 11.333 39.509 13.755L27.231 76.918C26.760 79.341 28.343 81.687 30.765 82.157L70.685 89.917C73.107 90.388 75.453 88.806 75.924 86.383L88.202 23.220C88.673 20.798 87.090 18.452 84.668 17.981L44.748 10.221ZM69.363 36.565C68.355 41.750 63.335 45.136 58.150 44.129C52.965 43.121 49.579 38.100 50.587 32.916C51.595 27.731 56.615 24.345 61.800 25.352C66.985 26.360 70.371 31.381 69.363 36.565ZM73.438 65.724C71.957 73.343 63.045 74.308 52.676 72.293C42.306 70.277 34.405 66.043 35.886 58.425C37.367 50.806 47.172 45.242 57.542 47.258C67.912 49.273 74.919 58.105 73.438 65.724Z"></path></svg>

								</Link>
							</li>
							<li className="nav-item">
								<Link href="/chat">
									<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M7 4.5h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-3l-3.5 4v-4H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Zm13 8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2v2l-2-2h-2" className="icon_svg-stroke" stroke-width="1.5" stroke="#666" stroke-linecap="round" stroke-linejoin="round"></path><g className="icon_svg-fill_as_stroke" fill="#666"><circle cx="8" cy="10.5" r="1"></circle><circle cx="11" cy="10.5" r="1"></circle><circle cx="14" cy="10.5" r="1"></circle></g></g></svg>
								</Link>
							</li>



							<div id='profile-hide'>

								<li className="nav-item match ">
									<Link href="/notifcation">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path className="icon_svg-fill_as_stroke" d="M7.526 20.785H2.79a.625.625 0 0 1-.625-.625v-2.87c0-.283.19-.53.463-.604a3.359 3.359 0 0 0 2.093-1.655c.207-.456.349-1.126.426-1.944a18.81 18.81 0 0 0 .044-2.578l-.025-.44a6.84 6.84 0 0 1 4.402-6.386 2.54 2.54 0 0 1 4.133-2.658 2.54 2.54 0 0 1 .692 2.678 6.866 6.866 0 0 1 4.346 6.415l-.022.381a19.11 19.11 0 0 0 .046 2.585c.076.811.214 1.476.415 1.932a3.376 3.376 0 0 0 2.079 1.657.625.625 0 0 1 .459.603v2.885c0 .345-.28.625-.625.625h-4.616a4.93 4.93 0 0 1-8.948 0zm1.432 0a3.68 3.68 0 0 0 6.084 0H8.958zm-1.155-1.25a.62.62 0 0 1 .273 0h7.847a.62.62 0 0 1 .273 0h4.269v-1.81a4.62 4.62 0 0 1-2.402-2.143l-.018-.037c-.272-.605-.439-1.399-.527-2.346a20.211 20.211 0 0 1-.05-2.758l.022-.371a5.594 5.594 0 0 0-4.219-5.418A6.03 6.03 0 0 0 12 4.485h-.089a6.048 6.048 0 0 0-1.291.186.713.713 0 0 1-.12.019c-2.358.657-4.083 2.813-4.087 5.331l.026.43c.042.89.037 1.847-.048 2.754-.089.945-.257 1.738-.548 2.377a4.623 4.623 0 0 1-2.428 2.161v1.793h4.389zm2.969-16.189a6.907 6.907 0 0 1 1.104-.111h.133c.402.006.796.048 1.178.121a1.29 1.29 0 0 0-2.078-1.409 1.29 1.29 0 0 0-.337 1.4z" fill="#666"></path></svg> 									</Link>
								</li>

								<li className="nav-item match ">
									<a onClick={logout}>
										<svg className="app-icon page-auth-logout" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M38 24V18C38 16.895 37.105 16 36 16H22C13.716 16 7 22.716 7 31V65C7 73.284 13.716 80 22 80H36C37.105 80 38 79.105 38 78V72C38 70.895 37.105 70 36 70H23C19.686 70 17 67.314 17 64V32C17 28.686 19.686 26 23 26H36C37.105 26 38 25.105 38 24ZM28 57.000V39.000C28 37.343 29.343 36.000 31 36.000H54V20.478C54 16.940 58.256 15.144 60.791 17.612L90.528 46.567C91.335 47.352 91.335 48.648 90.528 49.433L60.791 78.388C58.256 80.856 54 79.060 54 75.522V60.000H31C29.343 60.000 28 58.657 28 57.000Z"></path></svg>
										<span>تسجيل الخروج</span>
									</a>
								</li>

							</div>
							<li id="account-hide" className=" dropdown account">

								<a onClick={toggleListProfile} id="link-header-account">
									<span className="portrait">
										{(userData) &&
											<img src={`${baseUrl}/${userData.image}`} />

										}


										<badge-indicator count="1" max="99" should-shake=""> 1</badge-indicator>			 		</span>

								</a>
								{isProfileListOpen && (
									<ul className='dropdown-content' >
										<li className="edit_profile ">
											<Link href="/edit">
												<svg className="app-icon page-account-edit_profile" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M84.142 21.742L74.243 11.843C71.900 9.500 68.100 9.500 65.757 11.843L58.416 19.184C57.891 19.710 58.083 20.654 58.741 21.000C60.502 21.925 63.742 23.970 67.879 28.106C72.015 32.243 74.060 35.483 74.985 37.244C75.331 37.902 76.275 38.094 76.801 37.569L84.142 30.228C86.485 27.884 86.485 24.085 84.142 21.742ZM71.517 42.852L33.916 80.453C33.471 80.899 32.895 81.193 32.273 81.294L15.411 84.013C13.392 84.339 11.646 82.593 11.972 80.574L14.691 63.712C14.792 63.090 15.086 62.514 15.532 62.069L53.133 24.468C53.936 23.664 55.123 23.400 56.122 23.940C57.925 24.914 61.073 26.958 65.050 30.935C69.027 34.912 71.071 38.060 72.045 39.863C72.585 40.862 72.321 42.049 71.517 42.852ZM23.069 78.134L30.261 77.027C30.749 76.952 31.109 76.532 31.109 76.039L31.109 73.947C31.109 72.842 30.214 71.947 29.109 71.947H26.038C24.933 71.947 24.038 71.052 24.038 69.947L24.038 66.876C24.038 65.771 23.143 64.876 22.038 64.876L19.946 64.876C19.453 64.876 19.033 65.236 18.958 65.724L17.851 72.916C17.758 73.522 18.234 74.106 18.803 74.335C19.296 74.533 19.899 74.879 20.503 75.482C21.106 76.086 21.452 76.689 21.650 77.182C21.879 77.751 22.463 78.227 23.069 78.134Z"></path></svg>								<span>Edit profile</span>

											</Link>
										</li>



										<li className="settings  ">
											<a id="link-header-edit-index-setting" href="setting">
												<svg className="app-icon page-account-settings" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M45.285 86.999H50.582C51.803 86.992 52.983 86.564 53.924 85.788C54.865 85.012 55.509 83.935 55.747 82.739L57.309 75.437C57.370 75.206 57.486 74.994 57.647 74.819C57.809 74.643 58.011 74.510 58.236 74.431C60.980 73.481 63.561 72.116 65.890 70.383C66.074 70.227 66.293 70.118 66.529 70.068C66.764 70.017 67.009 70.025 67.241 70.092L74.365 72.421C75.522 72.802 76.776 72.774 77.914 72.340C79.053 71.907 80.007 71.094 80.615 70.039L83.264 65.541C83.884 64.492 84.123 63.260 83.940 62.055C83.757 60.850 83.162 59.745 82.257 58.927L76.722 53.874C76.552 53.703 76.426 53.493 76.356 53.262C76.287 53.031 76.276 52.787 76.325 52.551C76.817 49.590 76.817 46.569 76.325 43.608C76.276 43.372 76.287 43.127 76.356 42.897C76.426 42.666 76.552 42.456 76.722 42.285L82.257 37.232C83.162 36.414 83.757 35.309 83.940 34.103C84.123 32.898 83.884 31.667 83.264 30.617L80.615 26.119C80.007 25.065 79.053 24.252 77.914 23.818C76.776 23.385 75.522 23.356 74.365 23.738L67.241 26.067C67.009 26.134 66.764 26.142 66.529 26.091C66.293 26.040 66.074 25.932 65.890 25.775C63.656 23.991 61.165 22.555 58.501 21.516C58.276 21.437 58.074 21.304 57.912 21.128C57.750 20.953 57.634 20.741 57.574 20.510L56.011 13.208C55.758 12.000 55.090 10.918 54.123 10.149C53.156 9.381 51.950 8.975 50.715 9.001H45.418C44.182 8.975 42.977 9.381 42.009 10.149C41.042 10.918 40.374 12.000 40.121 13.208L38.558 20.510C38.498 20.741 38.382 20.953 38.220 21.128C38.059 21.304 37.856 21.437 37.631 21.516C34.982 22.534 32.500 23.943 30.269 25.696C30.087 25.855 29.867 25.965 29.631 26.015C29.395 26.066 29.149 26.056 28.918 25.987L21.794 23.659C20.637 23.277 19.383 23.305 18.245 23.739C17.106 24.173 16.152 24.985 15.543 26.040L12.895 30.538C12.274 31.587 12.036 32.819 12.219 34.024C12.402 35.229 12.997 36.334 13.902 37.152L19.278 42.126C19.448 42.297 19.574 42.507 19.643 42.738C19.713 42.969 19.724 43.213 19.675 43.449C19.183 46.410 19.183 49.431 19.675 52.392C19.724 52.628 19.713 52.873 19.643 53.103C19.574 53.334 19.448 53.544 19.278 53.715L13.743 58.768C12.838 59.586 12.243 60.691 12.060 61.897C11.877 63.102 12.116 64.333 12.736 65.383L15.385 69.881C15.993 70.935 16.947 71.748 18.086 72.182C19.224 72.615 20.478 72.644 21.635 72.262L28.759 69.933C28.991 69.867 29.235 69.858 29.471 69.909C29.707 69.960 29.926 70.068 30.110 70.225C32.344 72.008 34.835 73.445 37.499 74.484C37.724 74.563 37.926 74.696 38.088 74.871C38.250 75.047 38.366 75.259 38.426 75.490L39.989 82.792C40.242 84.000 40.910 85.082 41.877 85.850C42.844 86.619 44.050 87.025 45.285 86.999ZM63 48C63 56.284 56.284 63 48 63C39.716 63 33 56.284 33 48C33 39.716 39.716 33 48 33C56.284 33 63 39.716 63 48Z"></path></svg>								<span>Settings</span>
												<badge-indicator count="1" max="99" should-shake="">1</badge-indicator>															</a>
										</li>

										<li onClick={logout} className="logout">
											<a id="link-header-logout"  >
												<svg className="app-icon page-auth-logout" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M38 24V18C38 16.895 37.105 16 36 16H22C13.716 16 7 22.716 7 31V65C7 73.284 13.716 80 22 80H36C37.105 80 38 79.105 38 78V72C38 70.895 37.105 70 36 70H23C19.686 70 17 67.314 17 64V32C17 28.686 19.686 26 23 26H36C37.105 26 38 25.105 38 24ZM28 57.000V39.000C28 37.343 29.343 36.000 31 36.000H54V20.478C54 16.940 58.256 15.144 60.791 17.612L90.528 46.567C91.335 47.352 91.335 48.648 90.528 49.433L60.791 78.388C58.256 80.856 54 79.060 54 75.522V60.000H31C29.343 60.000 28 58.657 28 57.000Z"></path></svg>								<span>Log out</span>
											</a>
										</li>
									</ul>)}
							</li>
						</ul>

					</div>
				</div>
			</nav></div>
	);
}