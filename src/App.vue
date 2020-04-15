<template>
  <div id="app">
    <vue-page-transition name="overlay-up-full">
    <router-view/>
  </vue-page-transition>
  </div>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    color: $darker;
    font-size: 1em;
    font-weight: 500;
  }

  *:focus{
    outline: none;
  }

  body{
    background-color: $blueish_white;
  }

  *::placeholder {
    color: $def_color;
  }

  @keyframes scale{
    0%   { transform: scale(1); }
    20%   { transform: scale(0.8); }
    100%   { transform: scale(1.2); }
  }

</style>
