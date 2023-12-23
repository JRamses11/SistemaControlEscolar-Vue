<template>
    <div class="Alumnos">
        <alumnos-lista></alumnos-lista>
    </div>
</template>

<script>
import AlumnosLista from '../components/Estudiantes/AlumnosLista.vue';
 export default {
         name: 'Alumnos',
         components: {AlumnosLista},
         data: function() {
             return {}
         },
         methods: {}
     }
</script>