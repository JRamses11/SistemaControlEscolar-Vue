<template>
    <footer>
      <article>
        <p class="letrablanca nito">CONTACT</p>
        <ul>
          <li>Calle Juan Antonio Batiz</li>
          <li>Ciudad: Culiacan</li>
          <li>Estado: Sinaloa</li>
          <li>Codigo Postal: 6006</li>
          <li>Numero telefonico: 443-498-7166</li>
        </ul>
      </article>
      <article>
         <p class="letrablanca nito">MENU</p>
         <ul>
          <li>Alumnos</li>
          <li>Maestros</li>
          <li>Materias</li>
          <li>Grupos</li>
          <li>Cargas</li>
         </ul>
      </article>
      <article>
        <p class="letrablanca nito">PUBLICACIONES</p>
        <ul>
          <li>Nuevo sistema de integracion academica</li>
          <li>Alumnos de la carrera de Ing. Sistemas computacionales desarrollan nuevo sistema academico</li>
          <li>Capacitacion del nuevo sistema para docentes y alumnos</li>
        </ul>
      </article>
      <article>
        <p class="letrablanca nito">LEGAL</p>
        <ul>
          <li>Politica de privacidad</li>
          <li>Reportes</li>
          <li>Informacion legal</li>
          <li>Temas de licencia</li>
        </ul>
      </article>
    </footer>
</template>

<style lang="scss">
footer{
  background-color: #191b57;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.836);
  height: 220px;
  font-family: 'Arial', sans-serif;
}
footer article{
  color: white;
  display: inline-block;
  width: 24.85%;
  vertical-align: top;
  border: 1px solid white;
  height: 220px;
}
footer article p{
  margin-left: 38px;
  font-weight: bold;
  padding: 10px;
}
footer article ul li{
    list-style:none;
    text-align: center;
    padding:0;
    margin-bottom: 10px;
}
</style>