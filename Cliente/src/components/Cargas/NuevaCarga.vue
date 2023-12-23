<template>
  <div class="NuevaCarga">
    <section>
      <article>
        <h2>Nueva carga</h2>
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
        <select name="cmbCLAVEGRUPO" id="cmbCLAVEGRUPO" v-model="grupoSeleccionado">
          <option value="-1" disabled selected>Selecciona una opcion</option>
          <option v-for="clavegrupo in matgrp" :key="clavegrupo" :value="clavegrupo">
            {{ clavegrupo }}
          </option>
        </select>
        <br>
        <label for="txtNCONTROL">Nom. Control</label>
        <select name="cmbNCONTROL" id="cmbNCONTROL" v-model="ncontrolSeleccionado">
          <option value="-1" disabled selected>Selecciona una opcion</option>
          <option v-for="ncontrol in matnco" :key="ncontrol" :value="ncontrol">
            {{ ncontrol }}
          </option>
        </select>
        <br>
        <button @click.prevent="nuevaCarga()">Nueva Carga</button>
      </article>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { URL_DATOS } from "@/utils/constantes";
import Swal from 'sweetalert2';

export default {
  name: 'NuevaCarga',
  components: {},
  data: function () {
    return {
      cargas: [],
      matel: [],
      materiaSeleccionada: null,
      matgrp: [],
      grupoSeleccionado: null,
      matnco: [],
      ncontrolSeleccionado: null,
    }
  },
  created() {
    this.traeMateriasClave();
    this.traeGruposClave();
    this.traeAlumnosNcontrol();
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
    traeGruposClave: async function () {
      try {
        const response = await axios.get(URL_DATOS + "/grupos");
        this.matgrp = response.data.map(grupo => grupo.CLAVEGRUPO);
      } catch (error) {
        console.log(error);
      }
    },
    traeAlumnosNcontrol: async function () {
      try {
        const response = await axios.get(URL_DATOS + "/alumnos");
        this.matnco = response.data.map(alumno => alumno.NCONTROL);
      } catch (error) {
        console.log(error);
      }
    },
    async nuevaCarga() {
      try {
        // Verificar que los campos no estén vacíos
        if (!this.materiaSeleccionada || !this.grupoSeleccionado || !this.ncontrolSeleccionado) {
          Swal.fire({
            title: 'Error',
            text: 'Por favor, selecciona valores para todos los campos',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return; // Detener la ejecución si hay campos vacíos
        }

        // Obtener el dato de los inscritos del grupo que se desea la carga
        const responseIns = await axios.get(URL_DATOS + "/inscrito/" + this.grupoSeleccionado);
        const inscritosGrp = responseIns.data[0].INSCRITOS;

        // Obtener el dato del límite de alumnos para la carga
        const responseLim = await axios.get(URL_DATOS + "/limite/" + this.grupoSeleccionado);
        const limiteGrp = responseLim.data[0].LIMITEALUMNOS;

        if (inscritosGrp === limiteGrp) {
          Swal.fire({
            title: '¡Grupo Lleno!',
            text: 'No hay espacios disponibles en el grupo',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        } else {
          // Realizar la solicitud POST solo si todos los campos están completos
          const res = await axios.post(URL_DATOS + "/cargas/", {
            clamat: this.materiaSeleccionada,
            clag: this.grupoSeleccionado,
            ncon: this.ncontrolSeleccionado,
          });
          const aumento = await axios.put(URL_DATOS + "/inscritos/" + this.grupoSeleccionado, {
            clavegrupo: this.grupoSeleccionado,
          });
          Swal.fire({
            title: '¡Nueva Carga!',
            text: 'Carga registrada exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.log(error);
        // Manejo de errores, puedes mostrar un mensaje personalizado si lo deseas
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al realizar la carga',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }


  }
}
</script>

<style lang="css">
.NuevaCarga {
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

select {
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
