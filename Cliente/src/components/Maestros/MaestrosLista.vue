<template>
  <div class="MaestrosLista">
    <button id="btnNuevo" @click="nuevoMaestro()">Nuevo</button>
    <section>
      <article>
        <table class="styled-table">
          <thead>
            <tr>
              <th>Clave Maestro</th>
              <th>Nombre</th>
              <th>Departamento</th>
              <th>Estatus</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mst in maestros" :key="mst.CLAVEMAESTRO">
              <td>{{ mst.CLAVEMAESTRO }}</td>
              <td>{{ mst.NOMBRE }}</td>
              <td>{{ mst.DEPARTAMENTO }}</td>
              <td>{{ mst.ESTATUS }}</td>
              <td>
                <button id="btnEditar" @click.prevent="editarMaestro(mst.CLAVEMAESTRO)"><img src="@/assets/lapiz.png" /></button>
                <button id="btnEliminar" @click.prevent="eliminarMaestro(mst.CLAVEMAESTRO)"><img src="@/assets/basura.png" alt=""></button>
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
  name: 'MaestrosLista',
  components: {
    footerVista
  },
  data: function () {
    return {
      maestros: []
    }
  },
  created() {
    this.traeMaestros();
  },
  mounted() {

  },
  methods: {
    traeMaestros: async function () {
      let m = [];
      await axios.get(URL_DATOS + "/maestros")
        .then(function (response) {
          m = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      this.maestros = m;
    },
    editarMaestro: function (CLAVEMAESTRO) {
      this.$router.push({ name: "editarMaestro", params: { CLAVEMAESTRO: CLAVEMAESTRO } });
    },
    eliminarMaestro: async function (CLAVEMAESTRO) {
      Swal.fire({
        title: '¿Estás seguro el eliminar este maestro?',
        text: 'Esta acción no se puede deshacer puede ocasionar diversos problemas',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(URL_DATOS + "/maestros/" + CLAVEMAESTRO);
          this.traeMaestros();
        } else {
        }
      });
    },
    nuevoMaestro: function () {
      this.$router.push({ name: "nuevoMaestro", params: {} });
    }
  }
}
</script>
<style lang="css">
section article {
  height: 550px;
}

button {
  padding: 10px 15px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.styled-table {
  font-family: 'Arial', sans-serif;
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.styled-table th {
  background-color: #3498db;
  color: #fff;
}

.styled-table tbody tr:hover {
  background-color: #ecf0f1;
}

.styled-table button {
  padding: 8px 12px;
  margin-right: 5px;
  cursor: pointer;
  font-size: 14px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
}

.styled-table button:hover {
  background-color: #27ae60;
}

.btnNuevo {
  margin-top: 20px;
}
</style>
<style lang="scss">
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