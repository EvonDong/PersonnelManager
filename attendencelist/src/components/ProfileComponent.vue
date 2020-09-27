<template>
    <div class="container">
      <h1>Attendance Tracker</h1>
        <div class="create-profile">
          <label for="create-profile">New member? Add your details here!</label><br>
          <input type="text" class="create-profile" v-model="name" placeholder="Name"><br>
          <input type="text" class="create-profile" v-model="role" placeholder="Role"><br>
          <input type="text" class="create-profile" v-model="gender" placeholder="Gender"><br>
          <input type="text" class="create-profile" v-model="phone" placeholder="Phone"><br>
          <input type="text" class="create-profile" v-model="email" placeholder="Email"><br>
          <button v-if="this.isEdit == false" v-on:click="createProfile" class="btn btn-success btn-block mt-3">
              Submit
          </button>
          <button v-else type="button" v-on:click="updateProfile(name, role, email, gender, phone)" class="btn btn-primary btn-block  mt-3">
              Update Here
          </button>
       </div>
       <b-container align-v="center">
      <b-row style="min-width:70vw; margin: 1rem 1rem">
        <div class="profile"
          v-for="(profile) in profiles"
          v-bind:item="profile"
          v-bind:name="profile.name"
          v-bind:role="profile.role"
          v-bind:email="profile.email"
          v-bind:gender="profile.gender"
          v-bind:phone="profile.phone"
          v-bind:key="profile._id"
        >
          <b-col>
            <b-card
              img-src="../assets/sampleImg.jpg"
              img-alt="../assets/sampleImg.jpg"
              img-top
              style="max-width:20rem; max-height:30rem; margin: 0.5rem 0.5rem;"
              class="mb-2">
              <b-card-text>

                <p class="text" style="font-weight: 900;">{{ profile.name }}</p>
                <p class="text">{{ profile.gender }}</p>
                <p class="text">{{ profile.phone }}</p>
                <p class="text">{{ profile.role }}</p>
                <p class="text">{{ profile.email }}</p>
                <button v-on:click="editProfile(profile._id, profile.name, profile.role, profile.email, profile.gender, profile.phone)" class=" btn btn-info ">Edit</button>
                <button v-on:click="deleteProfile(profile._id)" class=" btn btn-danger ">Delete</button>
              </b-card-text>
            </b-card>
          </b-col>
        </div>
      </b-row>
    </b-container>
    </div>

</template>

<script>
import ProfileService from '../ProfileService';

export default {
  name: 'ProfileComponent',
  updateProfile: null,
  data() {
    return {
      profiles: [],
      isEdit: false,
      error: '',
      id: '',
      name: '',
      role: '',
      email: '',
      gender: '',
      phone: ''
    }
  },
  async created() {
    try {
      this.profiles = await ProfileService.getProfiles();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createProfile() {
      await ProfileService.createNewProfile(this.name, this.role, this.email, this.gender, this.phone);
      this.profiles = await ProfileService.getProfiles();
      this.name = '';
      this.role = '';
      this.email = '';
      this.gender = '';
      this.phone = '';
    },
    editProfile(id, name, role, email, gender, phone) {
      this.id = id;
      this.name = name;
      this.role = role;
      this.email = email;
      this.gender = gender;
      this.phone = phone;
      this.isEdit = true;
    },
    async deleteProfile(id) {
      await ProfileService.deleteProfile(id);
      this.profiles = await ProfileService.getProfiles();
    },
    updateProfile: async function() {
      await ProfileService.updateProfile(this.id, this.name, this.role, this.email, this.gender, this.phone);
      this.profiles = await ProfileService.getProfiles();
      this.id = '';
      this.name = '';
      this.role = '';
      this.email = '';
      this.gender = '';
      this.phone = '';
      this.isEdit = false;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div .container {
  max-width: 90vw;
  margin: 1rem 1rem;
  padding: 1rem 1rem;
  justify-content: center;
  align-content: center;
  align-items: center;
}

p .error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div .create-profile {
  min-width: 40vw;
  max-width: 800rem;
  margin: 1rem 1rem;
  padding: 1rem 2rem;
}


div .profile {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 5px 5px 5px 5px;
  margin-bottom: 15px;
  max-width: 20rem;
  margin: 1rem 1rem;
}


p .text {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0;
}
</style>


