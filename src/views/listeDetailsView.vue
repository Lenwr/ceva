<script setup>
import {useCollection, useFirestore} from "vuefire";
import {collection, doc, getFirestore, updateDoc} from "firebase/firestore";
import {computed, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import {format} from "date-fns";
import frLocale from "date-fns/locale/fr";
import QrcodeVue from "qrcode.vue";
import Export from '../views/export.vue'
import {jsPDF} from "jspdf";
import {StreamBarcodeReader} from "vue-barcode-reader";



const route = useRoute()
const db = useFirestore()
const datas = useCollection(collection(db, 'dechargements'))
const database = getFirestore()
const messageFromParent = 'Ceci est un message du parent.'

const detailId = ref(route.params.id)

const liste = computed(()=>{
  return datas.value.find(detail => detail.id === detailId.value)

})
const today = new Date()
const statut = false


//formatage date
const   formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const options = {
    weekday: 'long', // Jour de la semaine (ex: "Mardi")
    day: 'numeric',   // Jour du mois (ex: "9")
    month: 'long',    // Mois (ex: "décembre")
    year: 'numeric',  // Année (ex: "2023")
    hour: 'numeric',  // Heure (ex: "20")
    minute: 'numeric' // Minute (ex: "13")
  };
  return format(date, "EEEE d MMMM yyyy - HH'h' mm" , { locale: frLocale } );
}

//recuperer le pms
//generer le pdf

const updateStatut = async (id) => {
  const DocRef = doc(database, "dechargements", id);
 const change = document.getElementById('sel')
  console.log(change.value)
  await updateDoc(DocRef, {
    statut: change.value,
  })

  watch(change , (odlValue, newValue) =>{

  })
}




/*

const dateDebut = ref('');
const dateFin = ref('');
const filtrerListe = () => {
  return datas.value.filter((dechargement) => {
    const dateArrivee = new Date(dechargement.date); // Supposons que vous avez une propriété "date" dans votre modèle
    const dateDebutValue = dateDebut.value ? new Date(dateDebut.value) : null;
    const dateFinValue = dateFin.value ? new Date(dateFin.value) : null;

    // Filtrer en fonction des dates de début et de fin
    return (
      (!dateDebutValue || dateArrivee >= dateDebutValue) &&
      (!dateFinValue || dateArrivee <= dateFinValue)
    );
  });
};

const listeFiltree = computed(() => {
  return filtrerListe();
});

const test = ()=>{
  console.log(listeFiltree)
}

*/
</script>

<template>
  <div>

  </div>

  <div  class="bg-white h-full ">
    <div  class=" flex justify-center py-10">
      <div class="down w-[40%] h-auto">
        <h1 class="mt-4 text-xl font-medium text-gray-700" > Immatriculation </h1>
        <h1 class="mt-4 text-xl font-medium text-gray-700">{{ liste.immatriculation }}</h1>
        <h1 class="mt-4 text-xl font-medium text-gray-700"> Arrivée </h1>
        <p class="mt-1 text-sm font-medium text-gray-900" >{{formatDateTime(liste.date)}}</p>
        <h1 class="mt-4 text-xl font-medium text-gray-700"> {{ liste.endTime }}</h1>
        <h1 class="mt-4 text-xl font-medium text-gray-700"> </h1>


        <p class="mt-4 text-xl font-medium text-gray-700 my-4"> Statut du camion :    <select v-on:change="updateStatut(liste.id)"  id="sel" class="sm:select sm:bg-gray-100 bg-gray-100 mobile:w-30 mobile:py-4 mobile:px-4  ">
            <option selected disabled>{{liste.statut}}</option>
          <option disabled> - - - - </option>
          <option> En attente </option>
          <option> Entré </option>
        </select></p>

        <router-link to="/liste">
        <button class="btn btn-outline text-black shadow-2xl w-full"> Retour </button>
          </router-link>
        <button class="btn btn-outline text-black mt-4 shadow-2xl w-full mb-10" onclick="qrCode.showModal()">Générer code Qr</button>
      </div>


      <dialog id="qrCode" class="modal">
        <div class="modal-box bg-white">
          <h3 class="font-bold text-lg text-black">QrCode de {{liste.immatriculation}}</h3>
          <p class="py-4">
            <qrcode-vue :value ="liste.id" :size="300" level="H" ></qrcode-vue>
          </p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn mx-4">Télécharger</button>
              <button class="btn">Fermer</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>



<!--
    <div>
      <input class="text-black px-4 py-4" type="date" v-model="dateDebut" @input="filtrerListe" />
    <input class="text-black  px-4 py-4"  type="date" v-model="dateFin" @input="filtrerListe" />
    </div>
  -->
   

  </div>



</template>

<style scoped>
@media (max-width: 720px) {
  .container{
    display: flex;
    flex-direction: column;
  }
  .up{
    width: 80%
  }
  .down{
    width: 80% ;
    align-self: center;
  }
}
</style>