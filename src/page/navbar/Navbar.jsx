import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import "./navbar.css"
import { Link} from 'react-router-dom';


const Navbar = () => {
     return (
          <nav className='nav'>
               <div className="logo__project">
                    <h2>IMORAT</h2>
               </div>

               <div className="nav__right">
                    <Link className="nav__advertisement" to={"/adding"}>
                         E'lon qo'ying
                    </Link>
                    <div className="nav__user-profile">
                         <FormatAlignRightIcon sx={{ color: "white", fontSize: 33, cursor: "pointer" }} />
                         <Link to={"/user-profile"}>< PersonIcon sx={{ color: "white", fontSize: 33, cursor: "pointer" }} /></Link>
                         {/* <Link>Kabinetingiz</Link> */}
                         
                    </div>
                 
           </div>
          </nav>

     )
}

export default Navbar
