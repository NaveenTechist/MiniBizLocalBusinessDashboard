import {FaBusinessTime} from 'react-icons/fa'
import {CiSearch} from 'react-icons/ci'
import './index.css'

const Header = () => (
  <nav className="nav-header">
    <div className="row-wise">
      <img
        className="website-logo"
        src="https://i.postimg.cc/MT4LZp1k/Red-and-Black-Business-Strategy-Logo.png"
        alt="website logo"
      />
      <h1 className="header">MiniBiz</h1>
    </div>
    <div className="search-container">
      <input type="search" placeholder="Search" className="input-search" />
      <CiSearch className="search-icon" />
    </div>
    <FaBusinessTime className="business-icon" />
  </nav>
)

export default Header
