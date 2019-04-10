const db = require('./conn');
const Dog = require('./dog');

class Organization {

    constructor(id, name, address, city, state, zip, phone, email, password, description, website) {
        this.id = id; 
        this.name = name;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone; 
        this.email = email;
        this.password = password;
        this.description = description; 
        this.website = website;
    }


    // needs to retrieve all dogs by org ID 
       static retrieveDogsById(id) {
        return db.any(`
        select dog_name, breed, age, dogs.description, image_url, org_id from dogs 
        inner join organizations 
        on dogs.org_id= organizations.id
        where organizations.id=$1, [id]
        `)
        .then((arrayOfDogs) => {
            return arrayOfDogs.map((dogData)=> {
                const dogInstance = new Dog(
                    dogData.id,
                    dogData.name,
                    dogData.breed,
                    dogData.age,
                    dogData.description,
                    dogData.image_url,
                    dogData.org_id
                );
                return dogInstance
            })

        })
    }




    // needs to retrieve all org info by state .
    static retrieveInfoByState(state) {
        return db.any(`
        select * from organizations where state =$1, [state]`
        )
        .then((arrayOfOrgs) => {
            return arrayOfOrgs.map((orgData) => {
                const orgInstance = new Organization(
                    orgData.id,
                    orgData.name,
                    orgData.address,
                    orgData.city,
                    orgData.state,
                    orgData.zip,
                    orgData.phone,
                    orgData.email,
                    orgData.password,
                    orgData.description,
                    orgData.website
                );
                return orgInstance; 
            })
        })
    }

}



//Export

module.exports = Organization