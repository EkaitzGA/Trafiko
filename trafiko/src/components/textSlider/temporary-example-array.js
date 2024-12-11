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


let LAST_PAGE = 1;
async function apiDataClean() {

  let filteredData = [];
  const params = {
    bySource: 1,
    _page: LAST_PAGE
  };
  
  const data = await fetchData("incidences", params);

  if (!data || !data.incidences || data.incidences.length === 0) {
    console.log("No results")
    // No more pages
  }

  const cleanedData = data.incidences.map((item) => ({
    incidenceType: item.incidenceType,
    province: item.province,
    startDate: item.startDate,
  }));

  const newFilteredData = cleanedData.filter((item) => {
    return item.incidenceType === "Obras" && item.province === "BIZKAIA" || item.province === "Bizkaia" 
  });

  filteredData.push(...newFilteredData);

  return filteredData

}

async function getMoreDataForTheApiToAutocomplete(oldArray){
  while(oldArray.length < 20){
    LAST_PAGE++;
    const data = await apiDataClean();
    oldArray.push(...data);
  }
  return oldArray;
}
const response = await apiDataClean();
const newArray = await getMoreDataForTheApiToAutocomplete(response);
console.log(newArray)
