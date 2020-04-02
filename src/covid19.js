const axios = require('axios')

const getData = (state, district) => {

    state = state.toLowerCase()
    district = district.toLowerCase()
    state = state[0].toUpperCase() +  
    state.slice(1); 

    district = district[0].toUpperCase() +  
    district.slice(1); 
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
            }
            else
            {
                for(let i = 0; i < response.data[stateIndex].districtData.length; i++)
                {
                    if(response.data[stateIndex].districtData[i]["district"] == district)
                    {
                        isDistrictFound = true;
                        console.log(response.data[stateIndex].districtData[i]["confirmed"])
                    
                        break;
                    }
                }

                if(!isDistrictFound)
                {
                    console.log("District not found!");
                }
            }

        })
        .catch(error => console.error(error))
}

getData("assam", "cachar")

// const cov = require('./ncov19.json')
// const stringfy = JSON.stringify(cov)
// console.log(stringfy)

// console.log(cov.findIndex(state => cov.state = "Goa"))
// console.log(cov[0].districtData[0]["confirmed"])
// console.log(cov[0].districtData.length)