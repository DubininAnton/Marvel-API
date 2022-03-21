import './headerLink.scss';

const HeaderLink = () => {
    return (
        <div className="headerLink">
            <a href="#" className="headerLink__marvel">
                <span>Marvel</span> information portal
            </a>
            <div className="headerLink__allChar">
                <a href="#" className="headerLink__char">Characters</a>
                <span> / </span>
                <a href="" className="headerLink__comics">Comics</a>
            </div>
        </div>
    )
}

export default HeaderLink;