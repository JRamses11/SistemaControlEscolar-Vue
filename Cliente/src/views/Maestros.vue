<template>
    <div class="Maestros">
        <maestros-lista></maestros-lista>
    </div>
</template>

<script>
import MaestrosLista from '../components/Maestros/MaestrosLista.vue';
 export default {
         name: 'Maestros',
         components: {MaestrosLista},
         data: function() {
             return {}
         },
         methods: {}
     }
</script>