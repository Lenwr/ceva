<script>
import {getFirestore, collection, addDoc} from 'firebase/firestore';
import {getStorage, ref as storageRef, uploadBytes, getDownloadURL} from 'firebase/storage';
import {ref} from "vue";
import Return from "../components/return.vue";
import router from "../router/index.js";

export default {
  components: {Return},
  data() {
    return {
      locale: "fr",
      formData: {
        marque: ref(''),
        nombreDeVoiture : ref(''),
        transporteur: ref(''),
        immatriculation: ref(''),
        telephone: ref(''),
        date: ref(''),
        image: null,
      },
    };
  },

  methods: {
    toggleLocale() {
      this.locale = this.locale === "fr" ? "en" : "fr"; // Basculement entre français et anglais
    },
    async submitForm() {
      try {
        // Obtenez les instances de Firestore et de Storage depuis la configuration Firebase
        const db = getFirestore();
        const dechargementsCollection = collection(db, 'dechargements'); // Référence à la collection 'dechargements'
        // Créez un document dans Firestore avec les données du formulaire
        const Data = {
          marque: marque.value,
          telephone: telephone.value,
          nombreDeVoiture : nombreDeVoiture.value ,
          transporteur: transporteur.value,
          immatriculation: immatriculation.value,
          date: date.value,
          statut : 'En attente'
        };
        const newDocumentRef = await addDoc(dechargementsCollection, Data);
        console.log('Document ajouté avec ID :', newDocumentRef.id);
        await router.push({path: '/soumission'})
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire :', error);
      }
    },
  },
};


</script>


<template>
  <div class="bg-white  flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
   <span class="flex flex-row items-center ">
    <img class="w-[3%] mx-2" src="/images/france.png" alt="drapeauFrançais" srcset="">
     <input type="checkbox" @click="toggleLocale" class="toggle" />
     <img class="w-[3%] mx-2" src="/images/drapeauAnglais.png" alt="drapeauAnglais" srcset=""></span> 
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-[15em] w-auto rounded-xl shadow-2xl" src="/images/car_ceva.jpeg" alt="aaron-travel"/>
      <h2 v-if="locale === 'fr'" class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Enregistrement </h2>
        <h2 v-if="locale === 'en'" class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"> Registration </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submitForm">

        <div class="date mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="date" class="block text-sm font-medium leading-6 text-gray-900">Date</label>
            <div class="mt-2">
              <input type="datetime-local" name="date" v-model="date" id="date" autocomplete="given-name"
                     class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
            </div>
          </div>
        </div>



        <div v-if="locale === 'fr'" >
          <label for="nombreDeVoiture" class="block text-sm font-medium leading-6 text-gray-900">Nombre de Voiture </label>
          <div class="mt-2">
            <input id="nombreDeVoiture" name="nombreDeVoiture" v-model="nombreDeVoiture"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Nombre de Voiture"/>
          </div>
        </div>  <div v-if="locale === 'en'">
          <label for="nombreDeVoiture" class="block text-sm font-medium leading-6 text-gray-900">Number of trucks</label>
          <div class="mt-2">
            <input id="nombreDeVoiture" name="nombreDeVoiture" v-model="nombreDeVoiture"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Number of trucks"/>
          </div>
        </div>



        <div v-if="locale === 'fr'">
          <label for="marque" class="block text-sm font-medium leading-6 text-gray-900">Marque</label>
          <div class="mt-2">
            <input id="marque" name="marque" v-model="marque"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Marque(s) des voitures"/>
          </div>
        </div> <div v-if="locale === 'en'">
          <label for="marque" class="block text-sm font-medium leading-6 text-gray-900">Car Brands</label>
          <div class="mt-2">
            <input id="marque" name="marque" v-model="marque"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Car brands"/>
          </div>
        </div>


        <div class="transporteur" div v-if="locale === 'fr'">
          <label for="transporteur" class="block text-sm font-medium leading-6 text-gray-900">Transporteur</label>
          <div class="mt-2">
            <input type="text" id="transporteur" name="transporteur" v-model="transporteur"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="transporteur"/>
          </div>
        </div>
        <div class="transporteur" v-if="locale === 'en'">
          <label for="transporteur" class="block text-sm font-medium leading-6 text-gray-900">Carrier</label>
          <div class="mt-2">
            <input type="text" id="transporteur" name="transporteur" v-model="transporteur"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Carrier"/>
          </div>
        </div>



        <div class="immatriculation"  v-if="locale === 'fr'" >
          <label for="immatriculation" class="block text-sm font-medium leading-6 text-gray-900">immatriculation</label>
          <div class="mt-2">
            <input type="text" id="immatriculation" name="immatriculation" v-model="immatriculation"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="immatriculation"/>
          </div>
        </div>
        <div class="immatriculation" v-if="locale === 'en'">
          <label for="immatriculation" class="block text-sm font-medium leading-6 text-gray-900">Car Registration</label>
          <div class="mt-2">
            <input type="text" id="immatriculation" name="immatriculation" v-model="immatriculation"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Car Registration"/>
          </div>
        </div>

        <div class="telephone">
          <label for="telephone" class="block text-sm font-medium leading-6 text-gray-900">Telephone
          </label>
          <div class="mt-2">
            <input type="tel" id="telephone" name="telephoneExpediteur" v-model="telephone"
                   class="block h-[3em] w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                   placeholder="Telephone"/>
          </div>
        </div>

        <div>
          <button type="submit" v-if="locale === 'fr'"
                  class="flex h-[3em] w-full justify-center rounded-md bg-primary px-3 py-1.5 mb-[2em] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Enregistrer
          </button>
        </div>
        <div>
          <button type="submit" v-if="locale === 'en'"
                  class="flex h-[3em] w-full justify-center rounded-md bg-primary px-3 py-1.5 mb-[2em] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Submit
          </button>
        </div>
      </form>


    </div>
  </div>
</template>


<style scoped>

</style>