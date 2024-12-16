const BASE_URL = "https://api.euskadi.eus/traffic/v1.0/";
async function fetchData(route, searchParams= {}) {
    
    try {
        const url = new URL(BASE_URL + route);

        for ( const key of Object.keys(searchParams) ) {
            url.searchParams.append(key, searchParams[key]);
        }

        const response = await fetch(url);
        console.log(url);
        const responseData = await response.json();
        return responseData
    } catch (error) {
        console.error(error);
        return {error: error};
    }
}

export {fetchData};

const params = {
    sourceId: 5,
    _page: 5
  };
  const route = "incidences";

  const response = await fetchData(route, params);
  console.log(response);