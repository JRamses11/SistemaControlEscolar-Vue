<template>
  <div class="home">
    <section>
      <article>
        <h1>BIENVENIDO AL SISTEMA DE INTEGRACION ESCOLAR</h1>
        <img src="@/assets/conocimiento.png" alt="no esta">
      </article>
    </section>
    <footerVista></footerVista>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import footerVista from '@/components/footerVista.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    footerVista
  }
}
</script>

<style scoped lang="scss">
div{
  font-size: 14px; /*1em*/
}
section article{
  background-color: #f1f1f2;
  height: 600px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.192);

}
section article h1{
  font-weight: bold;
  font-size: 30px; /*1em*/
}
section article img{
  margin-top: 30px;
  width: 400px;
  height: 400px;
}
</style>