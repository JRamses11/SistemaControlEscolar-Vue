import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Alumnos from '../views/Alumnos.vue'
import Maestros from '../views/Maestros.vue'
import Materias from '../views/Materias.vue'
import Grupos from '../views/Grupos.vue'
import Cargas from '../views/Cargas.vue'
import EditarAlumno from '../components/Estudiantes/EditarAlumno.vue'
import NuevoAlumno from '../components/Estudiantes/NuevoAlumno.vue'
import EditarMaestro from '../components/Maestros/EditarMaestro.vue'
import NuevoMaestro from '../components/Maestros/NuevoMaestro.vue'
import EditarMateria from '../components/Materias/EditarMateria.vue'
import NuevaMateria from '../components/Materias/NuevaMateria.vue'
import EditarGrupo from '../components/Grupos/EditarGrupo.vue'
import NuevoGrupo from '../components/Grupos/NuevoGrupo.vue'
import NuevaCarga from '../components/Cargas/NuevaCarga.vue'
import footerVista from '../components/footerVista.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/alumnos',
    name: 'alumnos',
    component: Alumnos
  },
  {
    path:'/editarAlumno',
    name:'editarAlumno',
    component: EditarAlumno,
    props: true
  },
  {
    path:'/nuevoAlumno',
    name:'nuevoAlumno',
    component: NuevoAlumno
  },
  {
    path: '/maestros',
    name: 'maestros',
    component: Maestros
  },
  {
    path:'/editarMaestro',
    name:'editarMaestro',
    component: EditarMaestro,
    props: true
  },
  {
    path:'/nuevoMaestro',
    name:'nuevoMaestro',
    component: NuevoMaestro
  },
  {
    path: '/materias',
    name: 'materias',
    component: Materias
  },
  {
    path:'/editarMateria',
    name:'editarMateria',
    component: EditarMateria,
    props: true
  },
  {
    path:'/nuevaMateria',
    name:'nuevaMateria',
    component: NuevaMateria
  },
  {
    path: '/grupos',
    name: 'grupos',
    component: Grupos
  },
  {
    path:'/editarGrupo',
    name:'editarGrupo',
    component: EditarGrupo,
    props: true
  },
  {
    path:'/nuevoGrupo',
    name:'nuevoGrupo',
    component: NuevoGrupo
  },
  {
    path: '/cargas',
    name: 'cargas',
    component: Cargas
  },
  {
    path:'/nuevaCarga',
    name:'nuevaCarga',
    component: NuevaCarga
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
