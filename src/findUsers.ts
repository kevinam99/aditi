import User from '../models/user.model'
async function searchAllUsers(){
    User.countDocuments({}, (error,response) => {
        if(error)
        {
            console.error(error)
        }
        else{
            console.log(response)
        }
    })

}
