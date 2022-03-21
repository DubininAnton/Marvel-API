import xmen from '../../resourses/img/x-men.png';
import uv from '../../resourses/img/UW.png';
import './comicsList.scss';

const Comicslist = () => {
    return (
        <div className="container">
            <div className="comicsList">
                <div className="comicsList__item">
                    <img src={uv} alt="xmen" />
                    <p>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</p>
                    <span>9.99$</span>
                </div>
                <div className="comicsList__item">
                    <img src={xmen} alt="xmen" />
                    <p>X-Men: Days of Future Past</p>
                    <span>NOT AVAILABLE</span>
                </div>
                <div className="comicsList__item">
                    <img src={uv} alt="xmen" />
                    <p>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</p>
                    <span>9.99$</span>
                </div>
                <div className="comicsList__item">
                    <img src={xmen} alt="xmen" />
                    <p>X-Men: Days of Future Past</p>
                    <span>NOT AVAILABLE</span>
                </div>
                <div className="comicsList__item">
                    <img src={uv} alt="xmen" />
                    <p>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</p>
                    <span>9.99$</span>
                </div>
                <div className="comicsList__item">
                    <img src={xmen} alt="xmen" />
                    <p>X-Men: Days of Future Past</p>
                    <span>NOT AVAILABLE</span>
                </div>
                <div className="comicsList__item">
                    <img src={uv} alt="xmen" />
                    <p>ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</p>
                    <span>9.99$</span>
                </div>
                <div className="comicsList__item">
                    <img src={xmen} alt="xmen" />
                    <p>X-Men: Days of Future Past</p>
                    <span>NOT AVAILABLE</span>
                </div>
            </div>
            <div className="button button__long button__main">
                <div className="inner">LOAD MORE</div>
            </div>
        </div>
    )
}

export default Comicslist;