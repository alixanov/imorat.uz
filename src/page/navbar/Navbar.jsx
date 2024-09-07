import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import "./navbar.css"
import { Link} from 'react-router-dom';


const Navbar = () => {
     return (
          <nav className='nav'>
               <div className="logo__project">
                    <h2>imorat</h2>
               </div>

               <div className="nav__right">
                    <div className="nav__user-profile">
                         < PersonIcon sx={{ color: "white", fontSize: 33, cursor: "pointer" }} />
                         <Link> Sizning profilingiz</Link>
                    </div>
                    <Link className="nav__advertisement" to={"/adding"}>
                         E'lon qo'ying
                    </Link>
           </div>
          </nav>

     )
}

export default Navbar
