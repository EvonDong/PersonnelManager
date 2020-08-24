import axios from 'axios';

//const url = "http://localhost:5000/api/profiles/";
const url = "api/profiles/";

class ProfileService {

    static getProfiles() {
        return new Promise((resolve, reject)=>{
            fetch(url)
            .then((res)=>{
                return res.json();
            })
            .then((res)=>{
                const data = res.data
                resolve(
                    data.map(profile => ({
                        ...profile,
                        createdAt: new Date(profile.createdAt),
                        editMode: false
                    }))
                )
            })
            .catch((err) => {
                reject(err)
            })
            
        })
    }

    static createNewProfile(name, role, gender, email, phone) {
        return axios.post(url, {
            name,
            role,
            email,
            gender,
            phone
        })
    }

    static updateProfile(id, name, role, gender, email, phone) {
        return axios.put(`${url}${id}`, {
            name,
            role,
            email,
            gender,
            phone
        });
    }

    static deleteProfile(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default ProfileService;