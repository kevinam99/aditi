import axios from 'axios'

interface caseNumbers {
    confirmedCasesIndian: number,
    discharged: number,
    deaths: number,
    confirmedCasesForeign: number,
    totalConfirmed: number
}
function getCovidData(state: string) {
        return new Promise((resolve, reject) => {
            console.log("before getting url")
            // const url = "https://api.covid19india.org/v2/state_district_wise.json";
            const url = "https://api.rootnet.in/covid19-in/stats/latest"
            axios.get(url)
                .then(response => {   // step 1. Find the state in JSON response. the following loop does that
                    let isStateFound = false;
                    const states = response.data.data.regional
                    console.log("got states")
                    // console.log(states)
                    for(let i = 0; i < states.length; i++)
                    {
                        console.log("in states for loop")
                        if(states[i].loc == state)
                        {
                            console.log(states[i].loc)
                            const numbers: caseNumbers = {
                                confirmedCasesIndian: states[i].confirmedCasesIndian,
                                discharged: states[i].discharged,
                                deaths: states[i].deaths,
                                confirmedCasesForeign: states[i].confirmedCasesForeign,
                                totalConfirmed: states[i].totalConfirmed
                            }
                            console.log(`Case numbers from module covid19 \n ${numbers}`)
                            isStateFound = true;
                            resolve(numbers)
                        }
    
                    }     
                    if(!isStateFound)
                    {
                        reject("State not found");
                    }
    
            })
            .catch(error => {
                reject(`Error in module covid19 ${error}`)
            })
        })
        
}

console.log("Calling fn")
// getCovidData("Goa")


export default getCovidData