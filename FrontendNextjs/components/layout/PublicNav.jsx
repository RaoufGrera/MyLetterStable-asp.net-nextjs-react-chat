
export { PublicNav };
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { Link } from '../Link';
import { ModalLogin } from '../login/ModalLogin';



function PublicNav({ show }) {
	console.log("PublicNav is Load")
	const [isListOpen, setIsListOpen] = useState(false);
	const ref = useRef(null);
	const { t } = useTranslation();

	const [showModal, setShowModal] = useState(false);
	function handleOpenModal() {
		setShowModal(true);
		console.log(showModal)
	}

	const handleCloseModal = () => {
		setShowModal(false);
	}

	function toggleList() {
		setIsListOpen(!isListOpen)
	}

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsListOpen(false);
		}
	};



	useEffect(() => {

		setTimeout(() => {
			if (isListOpen) {
				window.addEventListener('click', handleClickOutside, true)
			}
			else {
				window.removeEventListener('click', handleClickOutside, true)
			}
		})
	})



	return (
		<nav className='shadow-sm  navbar sticky-top navbar-expand-md navbar-light bg-white p-0'>
			<div className="container-fluid px-1">

				<div id="navbarID" className=" navbar-collapse ">


					<ul className="menu mr-auto mt-md-0">

						<li>
							<Link href="/login">
								<button className='btn btn-warning'>{t('login')}</button>
							</Link>
						</li>
						<li className="nav-item">

							<a ref={ref} onClick={toggleList} className="language " >
								<svg width="24" height="24" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M32.091 52C32.507 61.125 34.333 69.268 37.050 75.221C27.459 71.360 20.379 62.577 18.937 52H32.091ZM40.100 52C40.492 59.792 42.005 66.500 44.039 71.247C45.233 74.032 46.449 75.775 47.392 76.705C47.653 76.964 47.856 77.125 48 77.225C48.144 77.125 48.347 76.964 48.608 76.705C49.551 75.775 50.767 74.032 51.961 71.247C53.995 66.500 55.508 59.792 55.900 52H40.100ZM55.900 44H40.100C40.492 36.208 42.005 29.500 44.039 24.753C45.233 21.967 46.449 20.225 47.392 19.294C47.653 19.036 47.856 18.874 48 18.775C48.144 18.874 48.347 19.036 48.608 19.294C49.551 20.225 50.767 21.967 51.961 24.753C53.995 29.500 55.508 36.208 55.900 44ZM63.909 52C63.493 61.125 61.667 69.268 58.950 75.221C68.540 71.360 75.621 62.577 77.063 52H63.909ZM77.063 44H63.909C63.493 34.875 61.667 26.732 58.950 20.779C68.541 24.640 75.621 33.423 77.063 44ZM32.091 44H18.937C20.379 33.423 27.459 24.640 37.050 20.779C34.333 26.732 32.507 34.875 32.091 44ZM85.333 48.000C85.333 27.381 68.619 10.666 48 10.666C27.381 10.666 10.667 27.381 10.667 48.000C10.667 68.618 27.381 85.333 48 85.333H48.007C68.622 85.330 85.333 68.616 85.333 48.000Z"></path></svg>



							</a>

							<ul className={isListOpen ? "dropdown-content " : "dropdown-content hide"} >
								<li>
									<Link href="/en">
										<span>English</span>
									</Link>
								</li>
								<li>
									<Link href="/ar">
										<span className='w-100'>العربية</span>
									</Link>
								</li>
							</ul>
						</li>




					</ul>







				</div>
				<Link className="navbar-brand" href="/">

					<img width={120} className="logo" src="/logo.png" alt="myletter" />
					<img width={40} className="logo-sm" src='/logo-sm.png' alt="myletter" />

				</Link>
			</div>
		</nav >
	);
}