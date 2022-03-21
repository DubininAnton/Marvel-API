
import avengersImg from '../../resourses/img/Avengers.png';
import avengersLogo from '../../resourses/img/Avengerslogo.png';
import './appBanner.scss';

const AppBanner =() => {
    return (
        <div className="banner">
            <img src={avengersImg} alt="Avengers" className="banner__img" />
            <p>New comics every week! <br /> Stay tuned!</p>
            <img src={avengersLogo} alt="AvengersLogo" className="banner__logo" />
        </div>
    )
}

export default AppBanner;