

async function fetchData(searchParams = {}) {
  try {
    const url = `https://api.euskadi.eus/traffic/v1.0/incidences/bySource/${searchParams.bySource}?_page=${searchParams._page}`;
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

  const data = await fetchData(searchParams);

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
      /* return incidence.province === "BIZKAIA" */
      if(incidence.province=== "BIZKAIA"){
        return incidence;
      }
  });

  return filteredIncidencesArray;
}


export async function CleanedDataForIncidencesFromTheApiCall() {
  let finalResponse = []
  let page = 1;

  while (finalResponse.length < 20) {
    const data = await fetchIncidences(page);
    finalResponse = finalResponse.concat(data);
    page++;
    console.log(page)
  }

  return finalResponse

}

const apiDataClean = await CleanedDataForIncidencesFromTheApiCall();

console.log(apiDataClean)


