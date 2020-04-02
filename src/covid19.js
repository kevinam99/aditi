const axios = require('axios')

const getData = (state, district) => {
    const confirmed = 0;

    state = state.toLowerCase()
    district = district.toLowerCase()

    state = state[0].toUpperCase() + state.slice(1); 
    district = district[0].toUpperCase() + district.slice(1); 

    const url = "https://api.covid19india.org/v2/state_district_wise.json";
    axios.get(url)
         .then(response => {        
            //  console.log(response.data)
            let isStateFound = false;
            let isDistrictFound = false;
            let stateIndex = 0

            for(let i = 0; i < response.data.length; i++)
            {
                if(response.data[i].state == state)
                {
                   stateIndex = i;
                   isStateFound = true;
                   break;
                }
            }

            if(!isStateFound)
            {
                console.log("State not found")
                return "State not found"
            }
            else
            {
                for(let i = 0; i < response.data[stateIndex].districtData.length; i++)
                {
                    if(response.data[stateIndex].districtData[i]["district"] == district)
                    {
                        isDistrictFound = true;
                        confirmed = response.data[stateIndex].districtData[i]["confirmed"];
                        console.log(confirmed)
                        break;
                    }
                }

                if(!isDistrictFound)
                {
                    console.log("District not found!");
                    return "District not found!"
                }
            }

        })
        .catch(error => console.error(error));


        return confirmed;
}

module.exports = {
    getData: getData()
}

