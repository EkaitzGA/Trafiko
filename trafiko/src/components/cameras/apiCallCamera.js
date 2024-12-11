const BASE_URL = "https://api.euskadi.eus/traffic/v1.0/";

async function fetchData(route, searchParams = {}) {
  try {
    const url = `${BASE_URL}${route}/bySource/${searchParams.bySource}?_page=${searchParams._page}`;
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

export async function apiDataClean(currentPage = 1) {
   
  const params = {
    bySource: 2,
    _page: currentPage
  };
  
  const data = await fetchData("cameras", params);

  if (!data || !data.cameras || data.cameras.length === 0) {
    console.log("No results");
    return [];
  
  }

  const cleanedData = data.cameras.filter(item => item.urlImage && item.urlImage.trim() !== '').map((item) => ({
    cameraName: item.cameraName,
    road: item.road,
    address: item.address,
    urlImage: item.urlImage
  }));
  return cleanedData

}

const response = await apiDataClean();

console.log(response)
