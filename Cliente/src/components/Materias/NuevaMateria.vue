<template>
  <div class="EditarMateria">
    <h2>Datos de la materia</h2>
    <br>
    <label for="txtCLAVEMATERIA">Clave Materia</label>
    <input type="text" name="txtCLAVEMATERIA" id="txtCLAVEMATERIA" v-model="materias.CLAVEMATERIA" class="form-control" />
    <br>
    <label for="txtNOMBRE">Nombre</label>
    <input type="text" name="txtNOMBRE" id="txtNOMBRE" v-model="materias.NOMBRE" class="form-control" />
    <br>
    <label for="txtCREDITOS">Creditos</label>
    <input type="text" name="txtCREDITOS" id="txtCREDITOS" v-model="materias.CREDITOS" class="form-control" />
    <br>
    <button @click.prevent="nuevaMateria()">Nueva materia</button>
  </div>
</template>
<script>
import axios from "axios";
import { URL_DATOS } from "@/utils/constantes";
import Swal from 'sweetalert2';

export default {
  name: 'NuevaMateria',
  components: {},
  data: function () {
    return {
      materias: []
    }
  },
  methods: {
    nuevaMateria: async function () {
      // Verificar que los campos no estén vacíos
      if (
        !this.materias.CLAVEMATERIA ||
        !this.materias.NOMBRE ||
        !this.materias.CREDITOS
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
        // Si todos los campos están completos, realiza la solicitud POST
        const res = await axios.post(URL_DATOS + "/materias/", {
          clamat: this.materias.CLAVEMATERIA,
          nom: this.materias.NOMBRE,
          cre: this.materias.CREDITOS,
        });
        Swal.fire({
          title: '¡Nueva Materia!',
          text: 'Materia registrada exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.log(error);
        // Manejo de errores, puedes mostrar un mensaje personalizado si lo deseas
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar la materia',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
}
</script>
<style lang="css">
.EditarMateria {
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
