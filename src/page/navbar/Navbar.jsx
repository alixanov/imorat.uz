import PersonIcon from '@mui/icons-material/Person';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import "./navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
     return (
          <>
               <nav className='nav'>
                    <div className="logo__project">
                         <Link to={"/"}>IMORAT</Link>
                    </div>

                    <div className="nav__right">
                         <Link className="nav__advertisement" to={"/adding"}>
                              E'lon qo'ying
                         </Link>
                         <div className="nav__user-profile">
                              <Link to={"/catalog"}><FormatAlignRightIcon sx={{ color: "white", fontSize: 33, cursor: "pointer" }} /></Link>
                              <Link to={"/user-profile"}><PersonIcon sx={{ color: "white", fontSize: 33, cursor: "pointer" }} /></Link>
                         </div>
                    </div>
               </nav>
               <hr style={{ backgroundColor: "white", width: "100%" }} className='hr' />


         
          </>
     );
}

export default Navbar
//bitdi -138