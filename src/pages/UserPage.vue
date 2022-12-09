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
          <span>Test Network Goerli</span>
          <q-btn class="q-ml-md" round dense>
            <q-avatar size="45px">
              <img :src="avatar" />
            </q-avatar>
            <q-menu style="width: 100px">
              <q-list>
                <q-item v-close-popup clickable>
                  <q-item-section> My Profile </q-item-section>
                </q-item>
                <q-separator />
                <q-item v-close-popup clickable to="/login">
                  <q-item-section class="text-bold"> Logout </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <div class="q-mt-md q-mb-xl">
      <span>.</span>
    </div>
    <div
      class="underline text-h2 q-ml-md text-grey-9 flex flex-center text-bold"
    >
      <span>Welcome!</span>
    </div>
    <div class="q-mt-xl text-center flex flex-center">
      <div class="text-subtitle1">
        <span class="text-grey-9 text-bold">Wallet Address: </span>
        <span class="text-body1">{{ currentAccount }}</span>
      </div>
      <div class="text-subtitle1">
        <span class="q-ml-xl text-grey-9 text-bold">Wallet Eth balance: </span>
        <span class="text-body1">{{ ethBalance }}</span>
      </div>
      <div class="text-subtitle1">
        <span class="q-ml-xl text-grey-9 text-bold">Token Balance: </span>
        <span class="text-body1">450000000000</span>
      </div>
    </div>
    <div class="text-center flex flex-center">
      <div>
        <span class="text-subtitle1 text-grey-9 text-bold">Account Type: </span>
        <span class="text-body1">User</span>
      </div>
      <div>
        <span class="q-ml-xl text-subtitle1 text-grey-9 text-bold"
          >Login Time:
        </span>
        <span class="text-body1">{{ loginTime }}</span>
      </div>
    </div>

    <q-separator class="q-mt-md" size="2px" color="teal" inset="" />

    <div class="q-mt-xl q-pl-xl q-pr-xl">
      <q-toolbar class="full-width bg-teal">
        <q-toolbar-title class="text-white text-h6">
          ATCP TOKEN INFORMATIONS
        </q-toolbar-title>

        <q-separator vertical size="2px" />
        <q-btn
          flat
          no-caps
          :label="showTokenInfo == true ? 'Hide' : 'Show'"
          color="white"
          class="text-h6"
          stretch
          @click="showTokenInfo = !showTokenInfo"
        />
        <q-separator vertical size="2px" />
        <q-separator vertical size="2px" />
      </q-toolbar>
    </div>

    <div class="q-pl-xl q-pr-xl">
      <q-slide-transition appear>
        <q-card v-if="showTokenInfo">
          <q-card-section>
            <div>
              <span class="text-subtitle1 text-bold text-grey-9"> Name : </span>
              <span class="text-subtitle1 q-ml-sm">
                Accentue Blockchain Token</span
              >
              <span class="q-ml-xl text-subtitle1 text-bold text-grey-9">
                Minimum Funding Amount :
              </span>
              <span class="text-subtitle1 q-ml-sm"> 50 usd</span>
              <span class="text-subtitle1 q-ml-sm"> {{}}</span>
            </div>
            <div>
              <span class="text-subtitle1 text-bold text-grey-9">
                Symbol :
              </span>
              <span class="text-subtitle1 q-ml-sm"> ATCP</span>
            </div>
            <div>
              <span class="text-subtitle1 text-bold text-grey-9">
                Decimals :
              </span>
              <span class="text-subtitle1 q-ml-sm"> 18</span>
            </div>
            <div>
              <span class="text-subtitle1 text-bold text-grey-9">
                Total Supply :
              </span>
              <span class="text-subtitle1 q-ml-sm"> 1,000,000</span>
            </div>

            <q-separator class="q-mt-lg" size="2px" color="teal" inset="" />

            <div class="row q-mt-lg">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1">
                  TRANSFER TOKEN</span
                >
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  label="Transfer To (address)"
                  outlined
                  dense
                  placeholder="Input Wallet Address 0x000"
                  v-model="transferToAddress"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-3 q-mb-md">
                <q-input
                  label="Amount"
                  class="q-ml-sm"
                  outlined
                  dense
                  placeholder="0"
                  v-model="transferToAmount"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn
                  @click="transferTo"
                  color="secondary"
                  glossy
                  label="Send"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <div class="q-mt-xl flex flex-center">
      <div>
        <span class="text-h2 text-bold text-grey-9">BUY NOW!</span>
      </div>
    </div>
    <div class="flex flex-center">
      <q-btn color="warning text-black text-bold text-h6">BUY</q-btn>
    </div>
    <div class="flex flex-center q-mt-md">
      <div class="col-12 col-md-4">
        <q-input
          label="Input eth amount"
          outlined
          dense
          placeholder="value"
          v-model="buyToken"
        >
        </q-input>
      </div>
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
      avatar: require("app/src/assets/boy-avatar.png"),
      loading: false,
      isConnected: false,
      showTokenInfo: false,
      currentAccount: "",
      ethBalance: "",
      tokenBalance: "",
      loginTime: "",
      buyToken: "",
      transferToAddress: "",
      transferToAmount: "",
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

    async transferTo() {},
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
