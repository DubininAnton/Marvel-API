import './headerLink.scss';
import {NavLink, Link} from 'react-router-dom';

const HeaderLink = () => {
    return (
        <div className="headerLink">
            <Link to='/' href="#" className="headerLink__marvel">
                <span>Marvel</span> information portal
            </Link>
            <div className="headerLink__allChar">
                <NavLink exact activeStyle={{"color": "red"}} to='/' className="headerLink__char">Characters</NavLink>
                <span> / </span>
                <NavLink   to='/comics' exact activeStyle={{"color": "red"}} className="headerLink__comics">Comics</NavLink>
            </div>
        </div>
    )
}

export default HeaderLink;