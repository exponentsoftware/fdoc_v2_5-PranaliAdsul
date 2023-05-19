// 1. Use the SpaceX API to fetch data about their launches, rockets, and payloads. 

//       ```js
//       const LAUNCHES_API_URL = 'https://api.spacexdata.com/v4/launches'
//       const ROCKETS_API_URL = 'https://api.spacexdata.com/v4/rockets'
//       const PAYLOADS_API_URL = 'https://api.spacexdata.com/v4/payloads'
//       ```
const LAUNCHES_API_URL = 'https://api.spacexdata.com/v4/launches';
const ROCKETS_API_URL = 'https://api.spacexdata.com/v4/rockets';
const PAYLOADS_API_URL = 'https://api.spacexdata.com/v4/payloads';

//- Fetch the data from the API and store the launches, rockets, and payloads information in separate arrays.
    async function fetchData(url) {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(`Failed to fetch data from ${url}`);
    }
  }
  
//- Write a function to count the number of successful launches and unsuccessful launches.
    async function countLaunches() {
    const launches = await fetchData(LAUNCHES_API_URL);
    let successfulCount = 0;
    let unsuccessfulCount = 0;
  
    for (const launch of launches) {
      if (launch.success) {
        successfulCount++;
      } else {
        unsuccessfulCount++;
      }
    }
  
    console.log('Successful launches:', successfulCount);
    console.log('Unsuccessful launches:', unsuccessfulCount);
  }
//- Write a function to find the 5 most common rocket IDs used in the launches and their respective counts. Also, display the full rocket name alongside the rocket ID.

    async function findMostCommonRockets() {
    const launches = await fetchData(LAUNCHES_API_URL);
    const rockets = await fetchData(ROCKETS_API_URL);
    const rocketCounts = {};
  
    for (const launch of launches) {
      const rocketId = launch.rocket;
      if (rocketCounts.hasOwnProperty(rocketId)) {
        rocketCounts[rocketId]++;
      } else {
        rocketCounts[rocketId] = 1;
      }
    }
  
    const sortedRocketCounts = Object.entries(rocketCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  
    const mostCommonRockets = sortedRocketCounts.map(([rocketId, count]) => {
      const rocket = rockets.find((r) => r.id === rocketId);
      const rocketName = rocket ? rocket.name : 'Unknown';
      return { rocket: rocketId, name: rocketName, launches: count };
    });
  
    console.log(mostCommonRockets);
  }
  // Fetch and process the data
   countLaunches();
   findMostCommonRockets();
//    Example output:
//     ```sh
//     [
//     {rocket: "falcon9", name: "Falcon 9", launches: 120},
//     {rocket: "falcon1", name: "Falcon 1", launches: 90},
//     {rocket: "starship", name: "Starship", launches: 55},
//     {rocket: "falconheavy", name: "Falcon Heavy", launches: 50},
//     {rocket: "atlas", name: "Atlas V", launches: 30}
//     ]
//     ```