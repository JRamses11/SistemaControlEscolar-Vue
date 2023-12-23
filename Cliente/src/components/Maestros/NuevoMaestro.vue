<template>
  <div class="NuevoMaestro">
    <h2>Datos del maestro</h2>
    <br>
    <label for="txtCLAVEMAESTRO">Clave Maestro</label>
    <input type="text" name="txtCLAVEMAESTRO" id="txtCLAVEMAESTRO" v-model="maestros.CLAVEMAESTRO" class="form-control" />
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
    <button @click.prevent="nuevoMaestro()">Nuevo maestro</button>
  </div>
</template>

<script>
import axios from "axios";
import { URL_DATOS } from "@/utils/constantes";
import Swal from 'sweetalert2';

export default {
  name: 'NuevoMaestro',
  components: {},
  data: function () {
    return {
      maestros: []
    }
  },
  methods: {
    async nuevoMaestro() {
      try {
        // Verificar que los campos no estén vacíos
        if (
          !this.maestros.CLAVEMAESTRO ||
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

        // Si todos los campos están completos, realiza la solicitud POST
        const res = await axios.post(URL_DATOS + "/maestros/", {
          clama: this.maestros.CLAVEMAESTRO,
          nom: this.maestros.NOMBRE,
          dep: this.maestros.DEPARTAMENTO,
          est: this.maestros.ESTATUS
        });

        Swal.fire({
          title: '¡Nuevo Maestro!',
          text: 'Maestro registrado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.log(error);
        // Manejo de errores, puedes mostrar un mensaje personalizado si lo deseas
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar el maestro',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
}
</script>
<style lang="css">
.NuevoMaestro {
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

.swal2-title,
.swal2-html-container {
  font-family: 'Arial', sans-serif;
}
</style>
