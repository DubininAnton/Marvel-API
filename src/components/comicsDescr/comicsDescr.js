import xmenBig from '../../resourses/img/x-menBig.png';
import './comicsDescr.scss';

const ComicsDescr =() => {
    return (
        <div className="comicsDescr">
            <img src={xmenBig} alt="x-men" />
            <div className="comicsDescr__block">
                <h3>X-Men: Days of Future Past</h3>
                <p>Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                <span>144 pages</span>
                <h4>Language: en-us</h4>
                <h2>9.99$</h2>
            </div>
            <div className="comicsDescr__link">Back to all</div>
        </div>
    )
}

export default ComicsDescr;