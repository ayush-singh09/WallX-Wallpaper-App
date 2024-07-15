const API_KEY = "21612667-ab9c8455a93aa49d700f4746a"

export const apiCall = async (params) => {
    try {
        let querry = encodeURIComponent(params);
        const res = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&per_page=50&q=${querry}`
        );
        const data = await res.json()
        const photos = data.hits
        return photos
    }
    catch (err) {
        console.log(err);
    }
}