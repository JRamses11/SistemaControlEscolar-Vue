<template>
  <div class="NuevoGrupo">
    <h2>Datos del nuevo grupo</h2>
    <br>
    <label for="txtCLAVEMATERIA">Clave Materia</label>
    <select name="cmbCLAVEMATERIA" id="cmbCLAVEMATERIA" v-model="materiaSeleccionada">
      <option value="-1" disabled selected>Selecciona una opcion</option>
      <option v-for="clavemateria in matel" :key="clavemateria" :value="clavemateria">
        {{ clavemateria }}
      </option>
    </select>
    <br>
    <label for="txtCLAVEGRUPO">Clave Grupo</label>
    <input type="text" name="txtCLAVEGRUPO" id="txtCLAVEGRUPO" v-model="grupos.CLAVEGRUPO" class="form-control" />
    <br>
    <label for="txtCLAVEMAESTRO">Clave Maestro</label>
    <select name="cmbCLAVEMAESTRO" id="cmbCLAVEMAESTRO" v-model="maestroSeleccionado">
      <option value="-1" disabled selected>Selecciona una opcion</option>
      <option v-for="clavemaestro in maesl" :key="clavemaestro" :value="clavemaestro">
        {{ clavemaestro }}
      </option>
    </select>
    <br>
    <label for="txtLIMITEALUMNOS">Limite Alumnos</label>
    <input type="text" name="txtLIMITEALUMNOS" id="txtLIMITEALUMNOS" v-model="grupos.LIMITEALUMNOS"
      class="form-control" />
    <br>
    <label for="txtINSCRITOS">Inscritos</label>
    <input type="text" name="txtINSCRITOS" id="txtINSCRITOS" v-model="grupos.INSCRITOS" class="form-control" />
    <br>
    <label for="txtHORARIOLUNES">Horario Lunes</label>
    <input type="text" name="txtHORARIOLUNES" id="txtHORARIOLUNES" v-model="grupos.HORARIOLUNES" class="form-control" />
    <br>
    <label for="txtHORARIOMARTES">Horario Martes</label>
    <input type="text" name="txtHORARIOMARTES" id="txtHORARIOMARTES" v-model="grupos.HORARIOMARTES"
      class="form-control" />
    <br>
    <label for="txtHORARIOMIERCOLES">Horario Miercoles</label>
    <input type="text" name="txtHORARIOMIERCOLES" id="txtHORARIOMIERCOLES" v-model="grupos.HORARIOMIERCOLES"
      class="form-control" />
    <br>
    <label for="txtHORARIOJUEVES">Horario Jueves</label>
    <input type="text" name="txtHORARIOJUEVES" id="txtHORARIOJUEVES" v-model="grupos.HORARIOJUEVES"
      class="form-control" />
    <br>
    <label for="txtHORARIOVIERNES">Horario Viernes</label>
    <input type="text" name="txtHORARIOVIERNES" id="txtHORARIOVIERNES" v-model="grupos.HORARIOVIERNES"
      class="form-control" />
    <br>
    <button @click.prevent="nuevoGrupo()">Nuevo grupo</button>
  </div>
</template>
<script>
import axios from "axios";
import { URL_DATOS } from "@/utils/constantes";
import Swal from 'sweetalert2';

export default {
  name: 'NuevoGrupo',
  components: {},
  data: function () {
    return {
      grupos: [],
      matel: [],
      materiaSeleccionada: null,
      maesl: [],
      maestroSeleccionado: null
    }
  },
  created() {
    this.traeMateriasClave();
    this.traeMaestrosClave();
  },
  methods: {
    traeMateriasClave: async function () {
      try {
        const response = await axios.get(URL_DATOS + "/materias");
        this.matel = response.data.map(materia => materia.CLAVEMATERIA);
      } catch (error) {
        console.log(error);
      }
    },
    traeMaestrosClave: async function () {
      try {
        const response = await axios.get(URL_DATOS + "/maestros");
        this.maesl = response.data.map(maestro => maestro.CLAVEMAESTRO);
      } catch (error) {
        console.log(error);
      }
    },
    async nuevoGrupo() {
      try {
        // Verificar que los campos no estén vacíos
        if (
          !this.materiaSeleccionada ||
          !this.grupos.CLAVEGRUPO ||
          !this.maestroSeleccionado ||
          !this.grupos.LIMITEALUMNOS ||
          !this.grupos.INSCRITOS ||
          !this.grupos.HORARIOLUNES ||
          !this.grupos.HORARIOMARTES ||
          !this.grupos.HORARIOMIERCOLES ||
          !this.grupos.HORARIOJUEVES
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
        const res = await axios.post(URL_DATOS + "/grupos/", {
          clamat: this.materiaSeleccionada,
          clag: this.grupos.CLAVEGRUPO,
          clama: this.maestroSeleccionado,
          lim: this.grupos.LIMITEALUMNOS,
          ins: this.grupos.INSCRITOS,
          hlu: this.grupos.HORARIOLUNES,
          hma: this.grupos.HORARIOMARTES,
          hmi: this.grupos.HORARIOMIERCOLES,
          hju: this.grupos.HORARIOJUEVES,
          hvi: this.grupos.HORARIOVIERNES,
        });
        console.log(res);

        Swal.fire({
          title: '¡Nuevo Grupo!',
          text: 'Grupo registrado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.log(error);
        // Manejo de errores, puedes mostrar un mensaje personalizado si lo deseas
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar el grupo',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
}
</script>
<style lang="css">
.NuevoGrupo {
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

select,
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
