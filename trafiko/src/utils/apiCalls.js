const BASE_URL = "https://api.euskadi.eus/traffic/v1.0/";
async function fetchData(route, searchParams= {}) {
    
    try {
        const url = new URL(BASE_URL + route);

        for ( const key of Object.keys(searchParams) ) {
            url.searchParams.append(key, searchParams[key]);
        }

        const response = await fetch(url);
        const responseData = await response.json();
        return responseData
    } catch (error) {
        console.error(error);
        return {error: error};
    }
}
const route = "incidences";
const searchParams = {limit: 10};
const call = await fetchData(route, searchParams);

