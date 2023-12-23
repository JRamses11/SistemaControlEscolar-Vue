<template>
    <div class="MateriasLista">
        <button id="btnNuevo" @click="nuevaMateria()">Nuevo</button>
        <section>
            <article>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Clave Materia</th>
                            <th>Nombre</th>
                            <th>Creditos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="mtr in materias" :key="mtr.CLAVEMATERIA">
                            <td>{{ mtr.CLAVEMATERIA }}</td>
                            <td>{{ mtr.NOMBRE }}</td>
                            <td>{{ mtr.CREDITOS }}</td>
                            <td>
                                <button id="btnEditar" @click.prevent="editarMateria(mtr.CLAVEMATERIA)"><img
                                        src="@/assets/lapiz.png" /></button>
                                <button id="btnEliminar" @click.prevent="eliminarMateria(mtr.CLAVEMATERIA)"><img
                                        src="@/assets/basura.png" alt=""></button>
                            </td>
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
import Swal from 'sweetalert2';
import footerVista from '../footerVista.vue';

export default {
    name: 'MateriasLista',
    components: {
        footerVista
    },
    data: function () {
        return {
            materias: []
        }
    },
    created() {
        this.traeMaterias();
    },
    mounted() {

    },
    methods: {
        traeMaterias: async function () {
            let ma = [];
            await axios.get(URL_DATOS + "/materias")
                .then(function (response) {
                    ma = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.materias = ma;
        },
        editarMateria: function (CLAVEMATERIA) {
            this.$router.push({ name: "editarMateria", params: { CLAVEMATERIA: CLAVEMATERIA } });
        },
        eliminarMateria: async function (CLAVEMATERIA) {
            Swal.fire({
                title: '¿Estás seguro el eliminar esta materia?',
                text: 'Esta acción no se puede deshacer puede ocasionar diversos problemas',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, estoy seguro'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete(URL_DATOS + "/materias/" + CLAVEMATERIA);
                    this.traeMaterias();
                } else {
                }
            });
        },
        nuevaMateria: function () {
            this.$router.push({ name: "nuevaMateria", params: {} });
        }
    }
}
</script>
<style lang="scss">
section article {
    height: 550px;
}

button img {
    width: 20px;
    height: 20px;
}

#btnEditar {
    background: rgb(0, 140, 255);
}

#btnEliminar {
    background: rgba(255, 0, 0, 0.562);
}

#btnNuevo {
    margin-top: 20px;
    background: rgba(0, 128, 0, 0.856);
    font-size: 16px;
}
</style>