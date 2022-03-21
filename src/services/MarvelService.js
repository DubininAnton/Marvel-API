
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=20c26b4efdd33bab6be0ccc36922b68a';
    _baseOffset = 0;

    getResourse = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error (`Could not fetch ${url}, status:${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = (offset = this._baseOffset) => {
        return this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    }

    getAllCharactersPerson = () => {
        return this.getResourse(`${this._apiBase}characters?limit=100&${this._apiKey}`);
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?limit=9&${this._apiKey}`);
        return this._transformCharacter(res.data.results[0])

    }

    _transformCharacter = (char) => {

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
}

export default MarvelService;