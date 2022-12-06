<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-teal-9">
        <q-toolbar-title class="text-weight-bolder text-white">
          <div class="row">
            <div class="col-md-5">
              <span> Accenture Philippines </span>
              <q-img :src="url" style="height: 45px; max-width: 55px" />
              <span class="text-subtitle1 text-bold text-warning">
                Blockchain Technology
              </span>
            </div>
          </div>
        </q-toolbar-title>
        <div>
          <q-btn
            class="text-subtitle2"
            flat
            color="white"
            text-color="white"
            :label="isConnected == true ? 'Connected' : 'Connect Wallet'"
            :disable="isConnected == true"
            @click="connectMetamask"
          />
          <q-btn
            class="text-subtitle2"
            flat
            color="white"
            text-color="white"
            label="Admin"
            to="/"
          />
        </div>
      </q-toolbar>
    </q-header>

    <div class="q-mt-md">
      <span>.</span>
    </div>
    <div class="q-mt-xl text-center flex flex-center">
      <div class="text-subtitle1">
        <span class="text-grey-9 text-bold">ADDRESS: </span>
        <span>{{ currentAccount }}</span>
      </div>
      <div class="text-subtitle1">
        <span class="q-ml-xl text-grey-9 text-bold">BALANCE: </span>
        <span>{{ ethBalance }}</span>
      </div>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

const provider = window.ethereum;

export default defineComponent({
  name: "MainLayout",
  components: {},

  data() {
    return {
      url: require("app/src/assets/acnlogo.png"),
      isConnected: false,
      currentAccount: "",
      ethBalance: "",
    };
  },

  async created() {
    await this.connectMetamask();
    await this.checkConnection();
  },

  methods: {
    async connectMetamask() {
      if (provider) {
        const res = await ethereum.request({ method: "eth_requestAccounts" });
        const account = res[0];
        this.currentAccount = account;
        console.log(this.currentAccount);
        let balance = await ethereum.request({
          method: "eth_getBalance",
          params: [account, "latest"],
        });
        const read = parseInt(balance) / 10 ** 18;
        this.ethBalance = read.toFixed(4);
        this.checkConnection();
      } else {
        console.log("Please Install Metamask!");
      }
    },

    async checkConnection() {
      const res = await ethereum.isConnected();
      this.isConnected = res;
      console.log(this.isConnected);
    },
  },
});
</script>
