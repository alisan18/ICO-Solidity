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
            label="ACCOUNT"
            to="/"
          />
        </div>
      </q-toolbar>
    </q-header>

    <div class="q-mt-md q-mb-xl">
      <span>.</span>
    </div>
    <div
      class="underline text-h2 q-ml-md text-grey-9 flex flex-center text-bold"
    >
      <span>Welcome User!</span>
    </div>
    <div class="q-mt-xl text-center flex flex-center">
      <div class="text-subtitle1">
        <span class="text-grey-9 text-bold">Wallet Address: </span>
        <span class="text-body1">{{ currentAccount }}</span>
      </div>
      <div class="text-subtitle1">
        <span class="q-ml-xl text-grey-9 text-bold">Balance: </span>
        <span class="text-body1">{{ ethBalance }}</span>
      </div>
    </div>
    <div class="text-center flex flex-center">
      <div>
        <span class="text-subtitle1 text-grey-9 text-bold">Account Type :</span>
        <span class="text-body1">Admin</span>
      </div>
      <div>
        <span class="q-ml-xl text-subtitle1 text-grey-9 text-bold"
          >Login Time:
        </span>
        <span class="text-body1">{{ loginTime }}</span>
      </div>
    </div>

    <q-separator class="q-mt-md" size="2px" color="teal" inset="" />

    <div class="q-mt-xl q-pl-md q-pr-md">
      <q-toolbar class="full-width bg-secondary">
        <q-toolbar-title class="text-white text-h6">
          ICO CONTRACT FUNCTIONS
        </q-toolbar-title>

        <q-separator vertical size="2px" />
        <q-btn
          flat
          no-caps
          label="Read Contract"
          color="white"
          class="text-h6"
          stretch
          @click="showRead = !showRead"
        />
        <q-separator vertical size="2px" />
        <q-btn
          flat
          no-caps
          label="Write Contract"
          color="white"
          class="text-h6"
          stretch
          @click="showWrite = !showWrite"
        />
        <q-separator vertical size="2px" />
      </q-toolbar>
    </div>

    <div class="q-pl-md q-pr-md">
      <q-slide-transition appear>
        <q-card v-if="showRead">
          <q-card-section>
            <span> GET OWNER</span>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <div class="q-pl-md q-pr-md">
      <q-slide-transition appear>
        <q-card v-if="showWrite">
          <q-card-section>
            <span> Buy</span>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { api } from "boot/axios";

const provider = window.ethereum;

export default defineComponent({
  name: "MainLayout",
  components: {},

  data() {
    return {
      url: require("app/src/assets/acnlogo.png"),
      loading: false,
      isConnected: false,
      showRead: false,
      showWrite: false,
      currentAccount: "",
      ethBalance: "",
      loginTime: "",
    };
  },

  async created() {
    await this.checkConnection();
    await this.getLoginTime();
    this.showTransactionConfirmed();
  },

  methods: {
    showTransactionConfirmed() {
      this.$q.notify({
        // actions: [
        //   {
        //     label: "Login Successful. Welcome! ",
        //     color: "white",
        //   },
        // ],
        message: "Login Successful. Welcome!",
        type: "positive",
        position: "top-right",
        progress: true,
        iconSize: "30px",
        timeout: 6000,
      });
    },

    async getLoginTime() {
      this.loading = true;
      const date = new Date().toLocaleString();
      this.loginTime = date;
      console.log(this.loginTime);

      this.loading = false;
    },

    async connectMetamask() {
      if (provider) {
        this.loading = true;
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
        this.loading = false;
      } else {
        console.log("Please Install Metamask!");
      }
    },

    async checkConnection() {
      this.loading = true;
      const res = await ethereum.isConnected();
      this.isConnected = res;
      console.log(this.isConnected);

      if (res == true) {
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
        this.loading = false;
      } else {
        console.log("Connect Wallet to continue");
      }
    },
  },
});
</script>

<style scoped>
.underline {
  text-decoration: underline;
  text-decoration-color: goldenrod;
  text-decoration-thickness: 0.2rem;
}
</style>
