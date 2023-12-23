<template>
    <div class="AlumnosLista">
        <button id="btnNuevo" @click="nuevoAlumno()">Nuevo</button>
        <section>
            <article>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Numero Control</th>
                            <th>Nombre</th>
                            <th>Carrera</th>
                            <th>Estatus</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="alm in alumnos" :key="alm.NCONTROL">
                            <td>{{ alm.NCONTROL }}</td>
                            <td>{{ alm.NOMBRE }}</td>
                            <td>{{ alm.CARRERA }}</td>
                            <td>{{ alm.ESTATUS }}</td>
                            <td>
                                <button id="btnEditar" @click.prevent="editarAlumno(alm.NCONTROL)"><img
                                        src="@/assets/lapiz.png" /></button>
                                <button id="btnEliminar" @click.prevent="eliminarAlumno(alm.NCONTROL)"><img
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
    name: 'AlumnosLista',
    components: {
        footerVista
    },
    data() {
        return {
            alumnos: []
        }
    },
    created() {
        this.traeAlumnos();
    },
    mounted() {

    },
    methods: {
        traeAlumnos: async function () {
            let a = [];
            await axios.get(URL_DATOS + "/alumnos")
                .then(function (response) {
                    a = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.alumnos = a;
        },
        editarAlumno: function (NCONTROL) {
            this.$router.push({ name: "editarAlumno", params: { NCONTROL: NCONTROL } });
        },

        eliminarAlumno: async function (NCONTROL) {
            Swal.fire({
                title: '¿Estás seguro el eliminar este alumno?',
                text: 'Esta acción no se puede deshacer puede ocasionar diversos problemas',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, estoy seguro'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete(URL_DATOS + "/alumnos/" + NCONTROL);
                    this.traeAlumnos();
                } else {
                }
            });
        },
        nuevoAlumno: function () {
            this.$router.push({ name: "nuevoAlumno", params: {} });
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
}</style>