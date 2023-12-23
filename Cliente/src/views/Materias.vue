<template>
    <div class="Materias">
        <materias-lista></materias-lista>
    </div>
</template>

<script>
import MateriasLista from '../components/Materias/MateriasLista.vue';
 export default {
         name: 'Materias',
         components: {MateriasLista},
         data: function() {
             return {}
         },
         methods: {}
     }
</script>