<template>
    <div class="CargasLista">
        <button id="btnNuevo" @click="nuevaCarga()">Nuevo</button>
        <section>
            <article>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Clave Materia</th>
                            <th>Clave Grupo</th>
                            <th>Nom. Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="car in cargas" :key="car.NCONTROL">
                            <td>{{ car.CLAVEMATERIA }}</td>
                            <td>{{ car.CLAVEGRUPO }}</td>
                            <td>{{ car.NCONTROL }}</td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </section>
        <footerVista></footerVista>
    </div>
</template>

<script>
import axios from 'axios';
import { URL_DATOS } from '@/utils/constantes';
import footerVista from '../footerVista.vue';

export default {
    name: 'CargasLista',
    components: {
        footerVista
    },
    data: function () {
        return {
            cargas: []
        }
    },
    created() {
        this.traeCargas();
    },
    mounted() {

    },
    methods: {
        traeCargas: async function () {
            let c = [];
            await axios.get(URL_DATOS + "/cargas")
                .then(function (response) {
                    c = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.cargas = c;
        },
        nuevaCarga: function () {
            this.$router.push({ name: "nuevaCarga", params: {} });
        }
    }
}

</script>
<style lang="scss">
section article {
    height: 550px;
}

#btnNuevo {
    margin-top: 20px;
    background: rgba(0, 128, 0, 0.856);
    font-size: 16px;
}
