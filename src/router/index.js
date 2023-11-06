import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Form from '../views/form.vue'
import ListeView from '../views/listeView.vue'
import ListeDetailsView from '../views/listeDetailsView.vue'
import SignUpFormView from '../views/signUpFormView.vue'
import App from '../App.vue'
import SoumissionFormulaire from '../views/soumissionFormulaire.vue'
import Scan from '../views/scan.vue'
import ExportView from '../views/export.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'classActive',
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/form',
      component: Form,
    },
    {
      path: '/liste',
      component: ListeView,
    },
    {
      path: '/liste/:id',
      component: ListeDetailsView,
    },
    {
      path: '/soumission',
      component: SoumissionFormulaire,
    },
    {
      path: '/scan',
      component: Scan,
    },
    {
      path: '/export',
      component: ExportView,
    },
  ],
})

export default router
