<template>
    <div class="GruposLista">
        <button id="btnNuevo" @click="nuevoGrupo()">Nuevo</button>
        <section>
            <article>
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Clave Materia</th>
                            <th>Clave Grupo</th>
                            <th>Clave Maestro</th>
                            <th>Limite Alumnos</th>
                            <th>Inscritos</th>
                            <th>Horario Lunes</th>
                            <th>Horario Martes</th>
                            <th>Horario Miercoles</th>
                            <th>Horario Jueves</th>
                            <th>Horario Viernes</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="gpr in grupos" :key="gpr.CLAVEGRUPO">
                            <td>{{ gpr.CLAVEMATERIA }}</td>
                            <td>{{ gpr.CLAVEGRUPO }}</td>
                            <td>{{ gpr.CLAVEMAESTRO }}</td>
                            <td>{{ gpr.LIMITEALUMNOS }}</td>
                            <td>{{ gpr.INSCRITOS }}</td>
                            <td>{{ gpr.HORARIOLUNES }}</td>
                            <td>{{ gpr.HORARIOMARTES }}</td>
                            <td>{{ gpr.HORARIOMIERCOLES }}</td>
                            <td>{{ gpr.HORARIOJUEVES }}</td>
                            <td>{{ gpr.HORARIOVIERNES }}</td>
                            <td>
                                <button id="btnEditar" @click.prevent="editarGrupo(gpr.CLAVEGRUPO)"><img
                                        src="@/assets/lapiz.png" /></button>
                                <button id="btnEliminar" @click.prevent="eliminarGrupo(gpr.CLAVEGRUPO)"><img
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
    name: 'GruposLista',
    components: {
        footerVista
    },
    data: function () {
        return {
            grupos: []
        }
    },
    created() {
        this.traeGrupos();
    },
    mounted() {

    },
    methods: {
        traeGrupos: async function () {
            let g = [];
            await axios.get(URL_DATOS + "/grupos")
                .then(function (response) {
                    g = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.grupos = g;
        },
        editarGrupo: function (CLAVEGRUPO) {
            this.$router.push({ name: "editarGrupo", params: { CLAVEGRUPO: CLAVEGRUPO } });
        },
        eliminarGrupo: async function (CLAVEGRUPO) {
            Swal.fire({
                title: '¿Estás seguro el eliminar este grupo?',
                text: 'Asegura que ningun alumno este inscrito antes de eliminar',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, estoy seguro'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axios.delete(URL_DATOS + "/grupos/" + CLAVEGRUPO);
                    this.traeGrupos();;
                } else {
                }
            });
        },
        nuevoGrupo: function () {
            this.$router.push({ name: "nuevoGrupo", params: {} });
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