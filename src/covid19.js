const axios = require('axios')

function capitalizeWords(str)
{
 return str.replace(/\w\S*/g, (txt) => {
     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

const getCovidData = (state, district) => {
    return new Promise((resolve, reject) => {
        let confirmed_cases = 0;
        console.log("before getting url")
        
        const url = "https://api.covid19india.org/v2/state_district_wise.json";
        axios.get(url)
            .then(response => {        
                //  console.log(response.data)
                let isStateFound = false;
                let isDistrictFound = false;
                let stateIndex = 0
                console.log("got url")

                for(let i = 0; i < response.data.length; i++)
                {
                    console.log("in states for loop")
                    if(response.data[i].state == state)
                    {
                    console.log("state found")
                    stateIndex = i;
                    isStateFound = true;
                    break;
                    }
                }

                if(!isStateFound)
                {
                    console.log(`${state} state not found!`)
                    reject(`${state} state not found!`);
                }
                else
                {
                    for(let i = 0; i < response.data[stateIndex].districtData.length; i++)
                    {
                        console.log("in districts for loop")
                        if(response.data[stateIndex].districtData[i]["district"] == district)
                        {
                            console.log("district found")
                            isDistrictFound = true;
                            confirmed_cases = response.data[stateIndex].districtData[i]["confirmed"];
                            console.log("in district found bloc, confirmed = " + confirmed_cases)
                            resolve(confirmed_cases);
                            break;
                            
                        }
                    }

                    if(!isDistrictFound)
                    {
                        console.log(`${district} district not found in ${state}!`);
                        reject(`${district} district not found in ${state}.`);
                    }
                }

        })
        .catch(error => console.error(error))
        
        console.log("Confirmed cases: " + confirmed_cases);
        
    })
        
}

module.exports = {
    getCovidData: getCovidData
}

