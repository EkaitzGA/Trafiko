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

async function fetchIncidences(page) {
  const searchParams = {
    bySource: 1,
    _page: page
  };

  const data = await fetchData("incidences", searchParams);

  //We only need the incidenceType, province, cause, cityTown and startDate
  const incidencesArray = data.incidences.map((incidence) => ({
    incidenceType: incidence.incidenceType,
    province: incidence.province,
    cause: incidence.cause,
    startDate: incidence.startDate,
    road: incidence.road,
    direction: incidence.direction
  }));

  //Filter incidencesArray to only get the objects with province= Bizkaia or Bizkaia

  const filteredIncidencesArray = incidencesArray.filter((incidence) => {
    return (
      incidence.incidenceType === "Obras" || incidence.incidenceType === "Accidente") &&
      incidence.province === "BIZKAIA"
  });

  return filteredIncidencesArray;
}


async function CleanedDataForTextSliderFromTheApiCall() {
  let finalResponse = []
  let page = 1;

  while (finalResponse.length < 10) {
    const data = await fetchIncidences(page);
    finalResponse = finalResponse.concat(data);
    page++;
    console.log(page)
  }

  return finalResponse

}

export {CleanedDataForTextSliderFromTheApiCall};



