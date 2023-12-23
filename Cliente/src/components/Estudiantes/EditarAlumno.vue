<template>
  <div class="EditarAlumno">
    <h2>Datos del alumno</h2>
    <br>
    <label for="txtNCONTROL">Numero de Control</label>
    <input type="text" name="txtNCONTROL" id="txtNCONTROL" v-model="alumnos.NCONTROL" class="form-control" disabled />
    <br>
    <label for="txtNOMBRE">Nombre</label>
    <input type="text" name="txtNOMBRE" id="txtNOMBRE" v-model="alumnos.NOMBRE" class="form-control" />
    <br>
    <label for="txtCARRERA">Carrera</label>
    <input type="text" name="txtCARRERA" id="txtCARRERA" v-model="alumnos.CARRERA" class="form-control" />
    <br>
    <label for="txtESTATUS">Estatus</label>
    <input type="text" name="txtESTATUS" id="txtESTATUS" v-model="alumnos.ESTATUS" class="form-control" />
    <br>
    <button @click.prevent="actualizarAlumno()">Actualizar alumno</button>
  </div>
</template>
<script>
import axios from 'axios';
import { URL_DATOS } from '@/utils/constantes';
import Swal from 'sweetalert2';


export default {
  name: 'EditarAlumno',
  components: {},
  props: {
    NCONTROL: Number,
  },
  data: function () {
    return {
      alumnos: []
    }
  },
  created() {
    this.traeUnAlumno();
  },
  mounted() {

  },
  methods: {
    traeUnAlumno: async function () {
      let a = [];
      await axios.get(URL_DATOS + "/alumnos/" + this.NCONTROL)
        .then(function (response) {
          a = response.data[0];
        })
        .catch(function (error) {
          console.log(error);
        });
      this.alumnos = a;
    },
    actualizarAlumno: async function () {
      // Verificar que los campos no estén vacíos
      if (
        !this.alumnos.NOMBRE ||
        !this.alumnos.CARRERA ||
        !this.alumnos.ESTATUS
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
        const res = await axios.put(URL_DATOS + "/alumnos/" + this.NCONTROL, {
          nom: this.alumnos.NOMBRE,
          carr: this.alumnos.CARRERA,
          est: this.alumnos.ESTATUS
        });
        Swal.fire({
          title: 'Alumno Editado!',
          text: 'Alumno actualizado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.log(error);
        // Manejo de errores, puedes mostrar un mensaje personalizado si lo deseas
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar el alumno',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
}
</script>
<style lang="css">
.EditarAlumno {
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