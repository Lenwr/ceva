<script setup>
import {useCollection, useFirestore} from "vuefire";
import {collection, updateDoc, doc, getFirestore} from "firebase/firestore";
import {format} from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import {computed, ref, watch} from "vue";
import Return from "../components/return.vue";

const db = useFirestore()
const database = getFirestore()



const Liste = useCollection(collection(db, 'dechargements'))
let change = ref('')
const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const options = {
    weekday: 'long', // Jour de la semaine (ex: "Mardi")
    day: 'numeric',   // Jour du mois (ex: "9")
    month: 'long',    // Mois (ex: "décembre")
    year: 'numeric',  // Année (ex: "2023")
    hour: 'numeric',  // Heure (ex: "20")
    minute: 'numeric' // Minute (ex: "13")
  };
  return format(date, "EEEE d MMMM yyyy", {locale: frLocale});
}
const formatTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const options = {
    weekday: 'long', // Jour de la semaine (ex: "Mardi")
    day: 'numeric',   // Jour du mois (ex: "9")
    month: 'long',    // Mois (ex: "décembre")
    year: 'numeric',  // Année (ex: "2023")
    hour: 'numeric',  // Heure (ex: "20")
    minute: 'numeric' // Minute (ex: "13")
  };
  return format(date, "HH'h' mm", {locale: frLocale});
}

//mise a jour du statut
const statut = ref('')
  const updateStatut = async (event, transporter) => {
    const DocRef = doc(database, "dechargements", transporter);
    const change = event.target.value
    const endTime = `Rentré le ${formatDateTime(new Date())} a ${formatTime(new Date())}`
    //  console.log(transporter)
    // console.log(statut.value)
    if(change === "Entré"){
      await updateDoc(DocRef, {
      endTime : endTime
    })
    }
    await updateDoc(DocRef, {
      statut: change,
    })
    const modal = document.getElementById('alert')
   modal.showModal();
    }



const sumLinesEnAttente = () => {
  if (!Liste.value) return 0; // Gérez le cas où Liste.value n'est pas encore chargé

  return Liste.value.reduce((acc, item) => {
    if (item.statut === "En attente") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
};

const statuts = [
  '',
  'En attente',
  'Entré',
];
const selectedStatut = ref('');
const filteredListe = computed(() => {
  return selectedStatut.value
      ? Liste.value.filter(liste => liste.statut === selectedStatut.value)
      : Liste.value;
});
const isTabActive = (statut) => selectedStatut.value === statut;


//test gildas

</script>

<template>

  <div class="tabs bg-primary flex  w-screen py-2 px-4">
    <a class="tab my-2 rounded-full " v-for="statut in statuts" :key="statut"
       :class="{
  'tab text-white': true,
  'bg-white': isTabActive(statut),
  'text-primary': isTabActive(statut)
}"
       @click="selectedStatut = statut">{{ statut }}</a>
  </div>

  <!-- component -->
  <div class="flex flex-col w-screen">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">

              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                date
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                heure
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                marque
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nbre
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                transporter
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                immatriculation
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                telephone
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                statut
              </th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-gray-100 border-b" v-for="item in filteredListe " :key="item.id">
              <td class="text-sm text-gray-900  font-light px-6 py-4 whitespace-nowrap">
                <div class="h-8 w-8 rounded-full" :class="{ 'bg-error': item.statut === 'En attente', 'bg-success': item.statut !== 'En attente' }"
                >   </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatDateTime(item.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ formatTime(item.date) }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ item.marque }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ item.nombreDeVoiture }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ item.transporteur }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ item.immatriculation }}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {{ item.telephone }}
              </td>
              <td class="text-sm text-gray-900  font-light px-6 py-4 whitespace-nowrap">
                <select class="px-4 py-2 select-info max-w-xs bg-white"  @change="updateStatut($event, item.id)">
                  <option selected disabled>{{item.statut}}</option>
                  <option disabled> - - - - </option>
                  <option value="En attente" > En attente </option>
                  <option value="Entré" > Entré </option>
                </select>
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <router-link :to="'/liste/' + item.id">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                </router-link>
              </td>

            </tr>


            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>


  <!-- Open the modal using ID.showModal() method -->

  <dialog id="alert" class="modal">
    <div class="modal-box bg-white">
      <p class="py-4 text-primary"> Mise à jour éffectué  </p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-primary">Fermer</button>
        </form>
      </div>
    </div>
  </dialog>

  <div class="toast">
    <div class="alert alert-primary mb-[40%]">
      <span>Nombre de camions en attente  :  {{ sumLinesEnAttente() }} </span>
    </div>
  </div>

</template>

<style scoped>
.text-primary {
  color: #021d49;
}
</style>