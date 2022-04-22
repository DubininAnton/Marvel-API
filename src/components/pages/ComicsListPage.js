import AppBanner from "../appBanner/appBanner";
import {Helmet} from 'react-helmet';
import ComicsList from "../comicsList/comicsList";

const ComicsListPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                    />
                <title>Comics page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsListPage;