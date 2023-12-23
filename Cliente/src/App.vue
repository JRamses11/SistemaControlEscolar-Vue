<template>
  <div id="app">
    <nav>
      <article>
        <img src="@/assets/hogar.png" alt="">
        <router-link to="/">Inicio</router-link> |
      </article>
      <article>
        <img src="@/assets/alumno.png" alt="">
        <router-link to="/alumnos">Alumnos</router-link>
      </article>
      <article>
        <img src="@/assets/lider.png" alt="">
        <router-link to="/maestros">Maestros</router-link>
      </article>
      <article>
        <img src="@/assets/examen.png" alt="">
        <router-link to="/materias">Materias</router-link>
      </article>
      <article>
        <img src="@/assets/mesa.png" alt="">
        <router-link to="/grupos">Grupos</router-link>
      </article>
      <article>
        <img src="@/assets/cargando.png" alt="">
        <router-link to="/cargas">Cargas</router-link>
      </article>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  font-size: 17px; /*1em*/
  padding: 20px;
  font-family: 'Arial', sans-serif;
  a {
    font-weight: bold;
    color: white;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  background-color: #191b57;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.836);
}
nav article{
  display: inline-block;
  width: 14%;
}
nav article img{
  width: 30px;
  height: 30px;
  top: 5px;
  right: 5px;
  position: relative;
}
</style>
