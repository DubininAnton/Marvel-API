
const useMarvelService = () => {
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=20c26b4efdd33bab6be0ccc36922b68a';
    const _baseOffset = 0;

   

    const getResourse = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error (`Could not fetch ${url}, status:${res.status}`);
        }

        return await res.json();
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        return await getResourse(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    }

    const getAllCharactersPerson = async () => {
        return await getResourse(`${_apiBase}characters?limit=100&${_apiKey}`);
    }

    const getCharacter = async (id) => {
        const res = await getResourse(`${_apiBase}characters/${id}?limit=9&${_apiKey}`);
        return _transformCharacter(res.data.results[0])

    }

    const _transformCharacter = (char) => {

            return {
                name: char.name,
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                description: char.description ? char.description.slice(0, 150) + '...' : "Описание персонажа отсутствует",
                homepage: char.urls[0].url,
                wiki: char.urls[1].url,
                stories: char.stories.items,
                key: char.id
            }

    }
   
    const getComicsList = async (offset = _baseOffset) => {
        const res = await getResourse(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return (res.data.results)
    }

    const getComicsItem = async (id) => {
        const res = await getResourse(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComiscItem (res.data.results[0])
    }

    const _transformComiscItem = (comicsId) => {
        return {
            id: comicsId.id,
            title: comicsId.title,
            description: comicsId.description ? comicsId.description : "Описание комикса отсутствует",
            page: comicsId.pageCount,
            language: "en-us",
            thumbnail: comicsId.thumbnail.path + "." +comicsId.thumbnail.extension,
            price: comicsId.prices[0].price + "$"

        }
    }

    return {getAllCharacters, getAllCharactersPerson, getCharacter, getComicsList ,getComicsItem}

}

export default useMarvelService;