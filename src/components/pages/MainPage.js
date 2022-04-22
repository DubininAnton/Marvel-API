import { useState } from "react";
import { Helmet } from "react-helmet";
import HeaderChar from "../headerChar/headerChar";
import CharApp from "../charApp/charApp";
import CharAppDescr from "../charAppDescr/charAppDescr";
import ErrorBoundaty from "../errorBoundary/errorBoundary";


const MainPage = () => {
    const [onCharId, setId] = useState()
    const onSetId = (onCharId) => {
        setId(onCharId)
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Web site created using create-react-app"
                    />
                <title>Marvel information portal</title>
            </Helmet>
            <HeaderChar/>
            <div className="main">
                <div className="charApp">
                    <div>
                        <CharApp onSetId={onSetId} />
                    </div>
                </div>
                <ErrorBoundaty>
                    <CharAppDescr onCharId ={onCharId} />
                </ErrorBoundaty>
            </div>
        </>
    )
}

export default MainPage;