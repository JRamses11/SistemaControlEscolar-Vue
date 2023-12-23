<template>
  <div class="EditarGrupo">
    <h2>Datos del grupo</h2>
    <br>
    <label for="txtCLAVEMATERIA">Clave Materia</label>
    <input type="text" name="txtCLAVEMATERIA" id="txtCLAVEMATERIA" v-model="grupos.CLAVEMATERIA" class="form-control"
      disabled />
    <br>
    <label for="txtCLAVEGRUPO">Clave Grupo</label>
    <input type="text" name="txtCLAVEGRUPO" id="txtCLAVEGRUPO" v-model="grupos.CLAVEGRUPO" class="form-control"
      disabled />
    <br>
    <label for="txtCLAVEMAESTRO">Clave Maestro</label>
    <input type="text" name="txtCLAVEMAESTRO" id="txtCLAVEMAESTRO" v-model="grupos.CLAVEMAESTRO" class="form-control" />
    <br>
    <label for="txtLIMITEALUMNOS">Limite Alumnos</label>
    <input type="text" name="txtLIMITEALUMNOS" id="txtLIMITEALUMNOS" v-model="grupos.LIMITEALUMNOS" class="form-control"
      disabled />
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
    <button @click.prevent="actualizarGrupo()">Actualizar grupo</button>
  </div>
</template>
<script>
import axios from 'axios';
import { URL_DATOS } from '@/utils/constantes';
import Swal from 'sweetalert2';

export default {
  name: 'EditarGrupo',
  components: {},
  data() {
    return {
      grupos: []
    }
  },
  props: {
    CLAVEGRUPO: Number
  },
  created() {
    this.traeUnGrupo();
  },
  mounted() {

  },
  methods: {
    traeUnGrupo: async function () {
      let g = [];
      await axios.get(URL_DATOS + "/grupos/" + this.CLAVEGRUPO)
        .then(function (response) {
          g = response.data[0];
        })
        .catch(function (error) {
          console.log(error);
        });
      this.grupos = g;
    },
    actualizarGrupo: async function () {
      // Verificar que los campos no estén vacíos
      if (
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

      try {
        // Si todos los campos están completos, realiza la solicitud PUT
        const res = await axios.put(URL_DATOS + "/grupos/" + this.CLAVEGRUPO, {
          lim: this.grupos.LIMITEALUMNOS,
          ins: this.grupos.INSCRITOS,
          hlu: this.grupos.HORARIOLUNES,
          hma: this.grupos.HORARIOMARTES,
          hmi: this.grupos.HORARIOMIERCOLES,
          hju: this.grupos.HORARIOJUEVES,
          hvi: this.grupos.HORARIOVIERNES,
        });
        Swal.fire({
          title: 'Grupo Editado!',
          text: 'Grupo actualizado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        console.log(error);
        // Manejo de errores, puedes mostrar un mensaje personalizado si lo deseas
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar el grupo',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
}

</script>
<style lang="css">
.EditarGrupo {
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
}</style>
