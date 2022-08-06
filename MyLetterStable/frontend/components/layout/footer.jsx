export { Footer };
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from "next-i18next";
import { accountService } from "../../src/_services";
import { Link } from 'components';

function Footer(props) {
	const [isListOpen, setIsListOpen] = useState(false);
	const ref = useRef(null);

	console.log("page", props.title)

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

		<footer>
			<div className="wrapper">
				<nav>
					<ul>
						<li><a id="link-footer-success_story" href="success-story">Success stories</a></li>
						<li><a id="link-footer-blog" href="blog">Blog</a></li>


						<li><a id="link-footer-contact" href="contact">Contact us</a></li>
						<li><a id="link-footer-faq" href="faq">FAQ</a></li>

						<li><a id="link-footer-safety" href="safety">Safety advice</a></li>
						<li><a id="link-footer-rules" href="rules">Terms of Use</a></li>
						<li><a id="link-footer-privacy_policy" href="privacy-policy">Privacy Policy</a></li>
					</ul>
				</nav>

				<div className="related">
					<div className="apps">
						<a className="apple" target="_blank" rel="noopener" href="https://apps.apple.com/app/soudfa/id1009160172" title="Download on the App Store">
							<svg className="app-icon external-apple" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M63.410 3.699C63.907 8.228 62.079 12.778 59.382 16.052C56.676 19.320 52.247 21.866 47.905 21.530C47.318 17.082 49.507 12.460 52.011 9.557C54.806 6.286 59.517 3.856 63.410 3.699ZM77.417 30.114C76.583 30.634 69.031 35.343 69.125 44.814C69.228 56.248 78.931 60.227 79.483 60.453C79.496 60.458 79.504 60.461 79.506 60.462C79.501 60.478 79.491 60.509 79.477 60.555C79.234 61.330 77.667 66.322 74.147 71.468C70.923 76.183 67.581 80.873 62.309 80.969C59.775 81.017 58.082 80.285 56.321 79.523C54.480 78.726 52.564 77.897 49.534 77.897C46.359 77.897 44.354 78.752 42.423 79.575C40.750 80.288 39.132 80.978 36.856 81.068C31.770 81.261 27.894 75.977 24.643 71.281C17.994 61.673 12.915 44.130 19.739 32.292C23.121 26.410 29.177 22.686 35.748 22.589C38.578 22.539 41.321 23.628 43.722 24.581C45.557 25.310 47.192 25.959 48.513 25.959C49.700 25.959 51.292 25.331 53.147 24.600C56.068 23.447 59.644 22.037 63.328 22.411C65.849 22.515 72.933 23.427 77.479 30.075C77.467 30.083 77.446 30.096 77.417 30.114Z"></path></svg>	<span>
								Download on the<br />
								<span>App Store</span>
							</span>
						</a>

						<a className="google" target="_blank" rel="noopener" href="https://play.google.com/store/apps/details?id=com.soudfa" title="Get it on Google Play">
							<svg className="app-icon external-google_play" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M30.911 14.438L67.740 34.155L56.502 45.392L25.125 14.015C26.922 13.361 28.997 13.413 30.911 14.438ZM70.866 35.829L81.474 41.508C86.493 44.195 86.493 51.390 81.474 54.076L70.866 59.756L58.902 47.792L70.866 35.829ZM22.253 15.941C21.128 17.178 20.418 18.829 20.418 20.721V74.862C20.418 76.754 21.128 78.405 22.253 79.641L54.103 47.791L22.253 15.941ZM30.911 81.147C28.997 82.171 26.922 82.224 25.125 81.569L56.502 50.192L67.740 61.429L30.911 81.147Z"></path></svg>	<span>
								Get it on<br />
								<span>Google Play</span>
							</span>
						</a>
					</div>

					<ul className="social">
						<li>
							<a className="facebook" target="_blank" rel="noopener" href="https://www.facebook.com/SoudfaZawaj" title="Facebook">
								<svg className="app-icon external-facebook" viewBox="0 0 96 96"><path d="M86 48C86 27.013 68.987 10 48 10C27.013 10 10 27.013 10 48C10 66.967 23.896 82.688 42.063 85.538V58.984H32.414V48H42.063V39.628C42.063 30.104 47.736 24.844 56.416 24.844C60.573 24.844 64.922 25.586 64.922 25.586V34.938H60.130C55.410 34.938 53.938 37.867 53.938 40.872V48H64.477L62.792 58.984H53.938V85.538C72.104 82.688 86 66.967 86 48Z"></path></svg>						<span>Facebook</span>
							</a>
						</li>



						<li>
							<a className="twitter" target="_blank" rel="noopener" href="https://twitter.com/SoudfaZawaj" title="Twitter">
								<svg className="app-icon external-twitter" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M77.442 20.471C80.390 20.222 84.222 18.595 86.480 17.462C87.211 17.066 87.942 16.671 88.673 16.275C87.385 19.717 85.638 22.411 82.948 24.454C82.352 24.908 81.760 25.521 81.013 25.811C84.843 25.813 87.998 24.110 91 23.183C89.422 25.699 87.291 28.207 85.015 30.006C84.099 30.726 83.179 31.447 82.260 32.167C82.311 36.171 82.201 39.990 81.443 43.355C77.036 62.911 65.361 76.189 46.879 81.876C40.241 83.917 29.518 84.755 21.915 82.892C18.145 81.966 14.737 80.923 11.541 79.543C9.765 78.779 8.120 77.948 6.548 77.001C6.032 76.690 5.513 76.380 5 76.069C6.715 76.120 8.720 76.587 10.638 76.281C12.372 76.003 14.073 76.077 15.672 75.730C19.666 74.867 23.208 73.723 26.261 71.958C27.742 71.104 29.988 70.098 31.039 68.864C29.058 68.901 27.261 68.445 25.788 67.933C20.080 65.942 16.758 62.285 14.597 56.786C16.325 56.975 21.308 57.418 22.474 56.449C20.295 56.330 18.204 55.085 16.707 54.162C12.117 51.325 8.370 46.566 8.400 39.244C9.002 39.528 9.604 39.810 10.208 40.091C11.359 40.571 12.533 40.829 13.909 41.107C14.490 41.227 15.651 41.564 16.317 41.320C15.344 40.298 13.898 39.619 13.003 38.523C10.058 34.908 7.298 29.343 9.045 22.716C9.488 21.036 10.190 19.550 10.939 18.181C11.367 18.934 12.133 19.455 12.616 20.047C14.121 21.888 15.978 23.544 17.868 25.006C24.312 29.983 30.115 33.037 39.432 35.303C41.797 35.877 44.530 36.315 47.352 36.320C46.559 34.040 46.815 30.349 47.438 28.141C49.011 22.589 52.421 18.590 57.425 16.445C58.621 15.933 59.949 15.559 61.341 15.259C62.061 15.174 62.776 15.089 63.493 15.004C70.328 14.885 73.967 17.345 77.442 20.471Z"></path></svg>						<span>Twitter</span>
							</a>
						</li>


					</ul>

					<div className="language-toggle">
						<div ref={ref} onClick={toggleList} className="handler">
							<svg className="app-icon library-globe language" viewBox="0 0 96 96"><path fillRule="evenodd" clipRule="evenodd" d="M32.091 52C32.507 61.125 34.333 69.268 37.050 75.221C27.459 71.360 20.379 62.577 18.937 52H32.091ZM40.100 52C40.492 59.792 42.005 66.500 44.039 71.247C45.233 74.032 46.449 75.775 47.392 76.705C47.653 76.964 47.856 77.125 48 77.225C48.144 77.125 48.347 76.964 48.608 76.705C49.551 75.775 50.767 74.032 51.961 71.247C53.995 66.500 55.508 59.792 55.900 52H40.100ZM55.900 44H40.100C40.492 36.208 42.005 29.500 44.039 24.753C45.233 21.967 46.449 20.225 47.392 19.294C47.653 19.036 47.856 18.874 48 18.775C48.144 18.874 48.347 19.036 48.608 19.294C49.551 20.225 50.767 21.967 51.961 24.753C53.995 29.500 55.508 36.208 55.900 44ZM63.909 52C63.493 61.125 61.667 69.268 58.950 75.221C68.540 71.360 75.621 62.577 77.063 52H63.909ZM77.063 44H63.909C63.493 34.875 61.667 26.732 58.950 20.779C68.541 24.640 75.621 33.423 77.063 44ZM32.091 44H18.937C20.379 33.423 27.459 24.640 37.050 20.779C34.333 26.732 32.507 34.875 32.091 44ZM85.333 48.000C85.333 27.381 68.619 10.666 48 10.666C27.381 10.666 10.667 27.381 10.667 48.000C10.667 68.618 27.381 85.333 48 85.333H48.007C68.622 85.330 85.333 68.616 85.333 48.000Z"></path></svg>		<svg className="app-icon library-chevron_down triangle" viewBox="0 0 96 96"><path d="M78.360 43.618L51.677 70.467C49.646 72.511 46.354 72.511 44.323 70.467L17.640 43.618C15.453 41.418 15.453 37.850 17.640 35.650C19.741 33.536 23.118 33.441 25.332 35.435L48 55.843L70.668 35.435C72.882 33.441 76.259 33.536 78.360 35.650C80.547 37.850 80.547 41.418 78.360 43.618Z"></path></svg>	</div>
						{isListOpen && (
							<div className="options">
								<ul>
									<li className="lang active">
										<a href={(props.title == "/en") ? "/" : props.title} >العربية</a>
									</li>
									<li className="lang">
										<Link href={"/en" + props.title} >English</Link>
									</li>

								</ul>
							</div>)}
					</div>
				</div>

				<h2 className="about">Soudfa is for any hopeless romantic, looking for love and marriage in the spirit of the Arabic culture. Providing Arabic singles with the latest technology in online matchmaking, Soudfa connects people worldwide and creates a fun and safe space to chat and find a match for marriage, Nikah, Zawaj and Misyar. With millions of members, you'll be able to match with a potential soulmate and build a relationship based on love, respect and friendship. Your love journey will become more exciting when you put the power in your own hands on Soudfa. Soudfa exclusively follows ethical standards and rules that adheres to the local cultural guidelines of courtship.</h2>
			</div>
		</footer>
	);
}