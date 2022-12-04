<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar style="background-color: #032b21cc">
        <q-toolbar-title class="text-weight-bolder text-white">
          <div class="row q-mt-md">
            <div class="col-md-5">
              <span> Accenture Philippines </span>
              <q-img :src="url" style="height: 45px; max-width: 55px" />
              <span class="text-subtitle1 text-bold text-grey-5">
                Blockchain Technology
              </span>
            </div>
            <span class="q-ml-xl"></span>
            <span class="q-ml-xl text-h5 text-bold">The</span>
            <span class="q-ml-sm text-warning text-h3 text-bold">NEXUS</span>
          </div>
        </q-toolbar-title>

        <div>
          <q-btn
            class="text-subtitle2"
            flat
            color="white"
            text-color="white"
            label="Login"
            to="/Login"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-toolbar style="background-color: #032b21cc">
        <q-toolbar-title class="text-center text-caption text-grey-5">
          Copyright 2022 <br />
          Developed By: Solidity Team
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    // EssentialLink,
  },

  setup() {
    return {
      url: require("app/src/assets/acnlogo.png"),
    };
  },
});
</script>
