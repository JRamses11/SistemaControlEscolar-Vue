<template>
  <div class="EditarMaestro">
    <h2>Datos del maestro</h2>
    <br>
    <label for="txtCLAVEMAESTRO">Clave Maestro</label>
    <input type="text" name="txtCLAVEMAESTRO" id="txtCLAVEMAESTRO" v-model="maestros.CLAVEMAESTRO" class="form-control"
      disabled />
    <br>
    <label for="txtNOMBRE">Nombre</label>
    <input type="text" name="txtNOMBRE" id="txtNOMBRE" v-model="maestros.NOMBRE" class="form-control" />
    <br>
    <label for="txtDEPARTAMENTO">Departamento</label>
    <input type="text" name="txtDEPARTAMENTO" id="txtDEPARTAMENTO" v-model="maestros.DEPARTAMENTO" class="form-control" />
    <br>
    <label for="txtESTATUS">Estatus</label>
    <input type="text" name="txtESTATUS" id="txtESTATUS" v-model="maestros.ESTATUS" class="form-control" />
    <br>
    <button @click.prevent="actualizarMaestro()">Actualizar maestro</button>
  </div>
</template>
<script>
import axios from 'axios';
import { URL_DATOS } from '@/utils/constantes';
import Swal from 'sweetalert2';

export default {
  name: 'EditarMaestro',
  components: {},
  props: {
    CLAVEMAESTRO: Number,
  },
  data() {
    return {
      maestros: []
    }
  },
  created() {
    this.traeUnMaestro();
  },
  mounted() {

  },
  methods: {
    traeUnMaestro: async function () {
      let m = [];
      await axios.get(URL_DATOS + "/maestros/" + this.CLAVEMAESTRO)
        .then(function (response) {
          m = response.data[0];
        })
        .catch(function (error) {
          console.log(error);
        });
      this.maestros = m;
    },
    actualizarMaestro: async function () {
      // Verificar que los campos no estén vacíos
      if (
        !this.maestros.NOMBRE ||
        !this.maestros.DEPARTAMENTO ||
        !this.maestros.ESTATUS
      ) {
        // Muestra un mensaje de error si algún campo está vacío
        Swal.fire({
          title: 'Error',
          text: 'Por favor, completa todos los campos',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return; // Detener la ejecución si hay campos vacíos
      }

      try {
        // Si todos los campos están completos, realiza la solicitud PUT
        const res = await axios.put(URL_DATOS + "/maestros/" + this.CLAVEMAESTRO, {
          nom: this.maestros.NOMBRE,
          dep: this.maestros.DEPARTAMENTO,
          est: this.maestros.ESTATUS
        });
        Swal.fire({
          title: 'Maestro Editado!',
          text: 'Maestro actualizado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.log(error);
        // Manejo de errores, puedes mostrar un mensaje personalizado si lo deseas
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar el maestro',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
}
</script>
<style lang="css">
.EditarMaestro {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Arial', sans-serif;
}

h2 {
  color: #3498db;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
</style>
