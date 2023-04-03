import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import logo2 from "../Assets/Logo 2.png"

// Mobile footer setup
const ExpandButton = ({name, cls, contents}) => {
    return (
        <div className="ExpandSections">
            <div className={cls}>
                <p className="fName">{name}</p>
                <FontAwesomeIcon icon={faChevronDown} size="1x" color="#00000" className="arrow" />
            </div>
            <div>
                {contents}
            </div>
        </div>
    )
}

const allLinks = [
    {
        name: "Navigation",
        cls: "expand expand_1",
        contents: () => {
            return (
                <ul>
                    <li className="fitem mf">
                        <a className="fLink" href="/">About</a>
                    </li>
                    <li className="fitem mf">
                        <a className="fLink" href="/">Menu</a>
                    </li>
                    <li className="fitem mf">
                        <Link className="fLink" to="reserve-a-table">Reservations</Link>
                    </li>
                    <li className="fitem mf">
                        <a className="fLink" href="/">Order Online</a>
                    </li>
                    <li className="fitem mf">
                        <a className="fLink" href="/">Login</a>
                    </li>
                </ul>
            )
        }
    },
    {
        name: "Contact",
        cls: "expand expand_2",
        contents: () => {
            return (
                <ul>
                    <li className="fitem mf">
                        <a className="fLink" href="mailto: hello@example.com">Email</a>
                    </li>
                    <li className="fitem mf">
                        <a className="fLink" href="/">Phone Number</a>
                    </li>
                    <li className="fitem mf">
                        <a className="fLink" href="/">Address</a>
                    </li>
                </ul>
            )
        }
    },
    {
        name: "Socials",
        cls: "expand expand_3",
        contents: () => {
            return (
                <ul className='mfLogos'>
                    <li className="fitem mf">
                        <a className="fLink" href="https://instagram.com/">
                            <FontAwesomeIcon icon={faInstagram} size="2x" color="#b9b9b9"/>
                        </a>
                    </li>
                    <li className="fitem mf">
                        <a className="fLink" href="https://facebook.com/">
                            <FontAwesomeIcon icon={faFacebook} size="2x" color="#b9b9b9"/>
                        </a>
                    </li>
                    <li className="fitem mf">
                        <a className="fLink" href="https://tiktok.com/">
                            <FontAwesomeIcon icon={faTiktok} size="2x" color="#b9b9b9"/>
                        </a>
                    </li>
                </ul>
            )
        }
    }
]


const Footer = ({ vw }) => {
    const dropdowns = {
        nv: document.querySelector(".expand_1"),
        ct: document.querySelector(".expand_2"),
        sc: document.querySelector(".expand_3")
    }

    const expand = (which) => {
        if (which === 1) {
            dropdowns.nv.classList.toggle("active");
        } else if (which === 2) {
            dropdowns.ct.classList.toggle("active");
        } else if (which === 3) {
            dropdowns.sc.classList.toggle("active");
        }
    }

    useEffect(() => {
        if (dropdowns.nv) {
            dropdowns.nv.addEventListener('click', () => expand(1))
            return () => dropdowns.nv.removeEventListener('click', () => expand(1))
        }
    })
    useEffect(() => {
        if (dropdowns.ct) {
            dropdowns.ct.addEventListener('click', () => expand(2))
            return () => dropdowns.ct.removeEventListener('click', () => expand(2))
        }
    })
    useEffect(() => {
        if (dropdowns.sc) {
            dropdowns.sc.addEventListener('click', () => expand(3))
            return () => dropdowns.sc.removeEventListener('click', () => expand(3))
        }
    })


    return (
        <>
            {vw > 850 ?
            <>
                <footer>
                    <div className="fLogo">
                        <Link to="/">
                            <img src={logo2} alt="Logo 2" />
                        </Link>
                    </div>
                    <div aria-label="expand" className="fList fCol">
                        <ul>
                            <li className="listTitle">
                                Navigation
                            </li>
                            <li className="fItem">
                                <a className="fLink" href="/">About</a>
                            </li>
                            <li className="fItem">
                                <a className="fLink" href="/">Menu</a>
                            </li>
                            <li className="fItem">
                                <Link className="fLink" to="reserve-a-table">Reservations</Link>
                            </li>
                            <li className="fItem">
                                <a className="fLink" href="/">Order Online</a>
                            </li>
                            <li className="fItem">
                                <a className="fLink" href="/">Login</a>
                            </li>
                        </ul>
                    </div>
                    <div aria-label="expand" className="fList fCol">
                        <ul>
                            <li className="listTitle">
                                Contact
                            </li>
                            <li className="fItem">
                                <a className="fLink" href="mailto: hello@example.com">Email</a>
                            </li>
                            <li className="fItem">
                                <a className="fLink" href="/">Phone Number</a>
                            </li>
                            <li className="fItem">
                                <a className="fLink" href="/">Address</a>
                            </li>
                        </ul>
                    </div>
                    <div aria-label="expand" className="fList fCol">
                        <ul>
                            <li className="listTitle">
                                Socials
                            </li>
                            <div className="socials">
                                <li className="fItem">
                                    <a className="fLink" href="https://instagram.com/">
                                        <FontAwesomeIcon icon={faInstagram} size="2x" color="#b9b9b9"/>
                                    </a>
                                </li>
                                <li className="fItem">
                                    <a className="fLink" href="https://facebook.com/">
                                        <FontAwesomeIcon icon={faFacebook} size="2x" color="#b9b9b9"/>
                                    </a>
                                </li>
                                <li className="fItem">
                                    <a className="fLink" href="https://tiktok.com/">
                                        <FontAwesomeIcon icon={faTiktok} size="2x" color="#b9b9b9"/>
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </footer>
            </>
            :
            <>
                <footer>
                    <div className="fLogo">
                        <Link to="/">
                            <img src={logo2} alt="Logo 2" />
                        </Link>
                    </div>
                    <div className="footerRight">
                        {allLinks.map((item, i) => (
                            <ExpandButton
                              name={item.name}
                              cls={item.cls}
                              key={i}
                              contents={item.contents()}
                            />
                        ))}
                    </div>
                </footer>
            </>}
        </>
    )
};

export default Footer;