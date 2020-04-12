// import axios = require('axios')
import axios from 'axios';
const getCovidData = (state, district = "") => {
    
        let stateIndex = 0
        let confirmed_cases = 0;
        console.log("before getting url")
        const url = "https://api.covid19india.org/v2/state_district_wise.json";
        axios.get(url)
            .then(response => {   // step 1. Find the state in JSON response. the following loop does that
                let isStateFound = false;
                let isDistrictFound = false;
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
                if(district != "")
                {
                    console.log("got url")

                    

                    if(!isStateFound)
                    {
                        console.log(`${state} state not found!`)
                        return (`${state} state not found!`);
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
                                return (confirmed_cases);
                                break;
                                
                            }
                        }

                        if(!isDistrictFound)
                        {
                            console.log(`${district} district not found in ${state}!`);
                            return (`${district} district not found in ${state}.`);
                        }
                    }
                }

                else if(district == "" || !district || district == null || district == undefined)
                {
                    let stateConfirmed = 0;
                    for(let i = 0; i < response.data[stateIndex].districtData.length; i++)
                    {
                        console.log("===============================");
                        console.log("in districts = \"\" for loop")
                        console.log(`State is ${response.data[stateIndex].state}`)
                        // console.log(response.data[stateIndex].districtData[i]["confirmed"])
                        stateConfirmed +=  response.data[stateIndex].districtData[i]["confirmed"]
                        console.log("===============================");
                    }

                    console.log(`stateConfirmed = ${stateConfirmed}`);
                    return (stateConfirmed);
                }


        })
        .catch(error => console.error(error))
        
        console.log("Confirmed cases: " + confirmed_cases);
        
        

        
    
        
}

console.log("Calling fn")
// getCovidData(state = "Goa")


export default {
    getCovidData: getCovidData
}

