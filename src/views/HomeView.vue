<script>

import {auth} from "../components/firebaseConfig.js";
export default {
  data(){
    return{
      displayName : ''
    }
  },
  beforeUpdate() {
    if (auth.currentUser){
      this.displayName = 'Bienvenue ' + auth.currentUser.displayName
    }
  },

}
</script>

<template>

<div class=" flex flex-col items-center justify-around bg-white h-screen px-8 py-[5%]" >

  <p v-if="displayName" class="text-black bg-primary px-4 py-4 mb-[10%] rounded shadow-2xl font-bold"  >  {{displayName}} </p>

  <div class="card w-[70%] sm:w-[30%] rounded-2xl shadow-2xl " >
  <img src="/images/logo.png" class="rounded-2xl" alt="logo-aaron-travel" >
</div>


  <div class="collapse bg-primary mt-[10%]">
    <input type="checkbox" class="peer" />
    <div class="collapse-title bg-primary text-primary-content peer-checked:bg-primary peer-checked:text-secondary-content">
    Déchargements
    </div>
    <div class=" pt-2 collapse-content bg-primary text-primary-content peer-checked:bg-primary peer-checked:text-secondary-content">
      <div class="divider h-1"  ></div>
      <router-link to="/form">
      <p>Enregistre un transporteur</p>
      </router-link>
      <div class="divider  h-1"  ></div>
        <router-link to="/liste">
      <p class="">Liste déchargement</p>
        </router-link>

    </div>

  </div>


  </div>



</template>

<style scoped>

</style>