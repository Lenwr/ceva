import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Form from '../views/form.vue'
import ListeView from '../views/listeView.vue'
import ListeDetailsView from '../views/listeDetailsView.vue'
import SoumissionFormulaire from '../views/soumissionFormulaire.vue'
import Scan from '../views/scan.vue'
import ExportView from '../views/export.vue'

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'classActive',
  routes: [
    {
      path: '/',
      component: Form,
    },
    {
      path: '/home',
      component: HomeView,
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
