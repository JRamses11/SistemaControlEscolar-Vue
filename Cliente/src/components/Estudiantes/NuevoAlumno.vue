<template>
  <div class="NuevoAlumno">
    <h2>Nuevo alumno</h2>
    <br>
    <label for="txtNCONTROL">Numero de Control</label>
    <input type="text" name="txtNCONTROL" id="txtNCONTROL" v-model="alumnos.NCONTROL" class="form-control" />
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
    <button @click.prevent="nuevoAlumno()">Nuevo alumno</button>
  </div>
</template>

<script>
import axios from "axios";
import { URL_DATOS } from "@/utils/constantes";
import Swal from 'sweetalert2';

export default {
  name: 'NuevoAlumno',
  components: {},
  data: function () {
    return {
      alumnos: []
    }
  },
  methods: {
    nuevoAlumno: async function () {
      // Verifica que los campos no estén vacíos
      if (
        !this.alumnos.NCONTROL ||
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
        return; // Detiene la ejecución si hay campos vacíos
      }

      // Si todos los campos están completos, realiza la solicitud POST
      try {
        const res = await axios.post(URL_DATOS + "/alumnos/", {
          ncon: this.alumnos.NCONTROL,
          nom: this.alumnos.NOMBRE,
          carr: this.alumnos.CARRERA,
          est: this.alumnos.ESTATUS
        });
        Swal.fire({
          title: '¡Nuevo Alumno!',
          text: 'Alumno registrado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.error(error);
        // Manejo de errores, puedes mostrar un mensaje personalizado si lo deseas
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar al alumno',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
}
</script>
<style lang="css">
.NuevoAlumno {
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
