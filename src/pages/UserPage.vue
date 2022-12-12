<template>
  <q-layout view="lHh Lpr lFf" class="bg-image">
    <q-header elevated>
      <q-toolbar style="background-color: #032b21cc">
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
      class="underline text-h2 q-ml-md text-white flex flex-center text-bold"
    >
      <span>Welcome!</span>
    </div>
    <div class="q-mt-xl text-center flex flex-center">
      <div class="text-subtitle1">
        <span class="text-white text-bold">Wallet Address: </span>
        <span class="text-body1 text-white">{{ currentAccount }}</span>
      </div>
      <div class="text-subtitle1">
        <span class="q-ml-xl text-white text-bold">Wallet Eth balance: </span>
        <span class="text-body1 text-white">{{ ethBalance }}</span>
      </div>
      <div class="text-subtitle1">
        <span class="q-ml-xl text-white text-bold">Token Balance: </span>
        <span v-if="!tokenBalance" class="text-body1 text-white">0</span>
        <span class="text-body1 text-white">{{ tokenBalance }}</span>
      </div>
    </div>
    <div class="text-center flex flex-center">
      <div>
        <span class="text-subtitle1 text-white text-bold">Account Type: </span>
        <span class="text-body1 text-white">Buyer</span>
      </div>
      <div>
        <span class="q-ml-xl text-subtitle1 text-white text-bold"
          >Login Time:
        </span>
        <span class="text-body1 text-white">{{ loginTime }}</span>
      </div>
    </div>

    <q-separator class="q-mt-md" size="2px" color="teal" inset="" />

    <div class="q-mt-xl flex flex-center">
      <q-toolbar class="bg-yellow-10" style="width: 900px">
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

    <div class="flex flex-center">
      <q-slide-transition appear>
        <q-card v-if="showTokenInfo" style="width: 900px">
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
              <span class="text-subtitle1 q-ml-sm">{{ totalSupply }}</span>
            </div>

            <q-separator class="q-mt-lg" size="2px" color="teal" inset="" />

            <div class="row q-mt-lg">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1">
                  TRANSFER TOKEN</span
                >
              </div>
              <div class="col-12 col-md-3">
                <q-input
                  label="Transfer To (address)"
                  outlined
                  dense
                  placeholder="Input Wallet Address 0x000"
                  v-model="transferToAddress"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-2 q-mb-md">
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
                  @click="transferToken"
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
        <span class="text-h1 text-bold text-white">BUY NOW!</span>
      </div>
    </div>
    <div class="flex flex-center">
      <q-btn color="warning text-black text-bold text-h5" @click="buyToken"
        >BUY</q-btn
      >
    </div>
    <div class="row flex flex-center q-mt-md">
      <div class="col-12 col-md-2 bg-white">
        <q-input
          label="Input eth amount"
          outlined
          dense
          placeholder="amount"
          v-model="inputbuyToken"
        >
        </q-input>
      </div>
    </div>
    <div class="q-mt-lg flex flex-center">
      <div>
        <span class="text-subtitle1 text-bold text-white">
          <strong>Note</strong>
          Minimum buy amount is 50 usd. Check ETH to USD price
        </span>
        <q-btn
          @click="dialogPrice = true"
          flat
          dense
          class="text-subtitle1 text-white text-bold"
          label="here"
        ></q-btn>
      </div>
    </div>

    <q-dialog
      v-model="dialogPrice"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="text-white text-bold" style="width: 500px">
        <q-toolbar class="bg-yellow-10">
          <q-icon name="request_quote" size="45px" />
          <div>
            <span class="text-h5 text-bold"> ETH/USD </span>
          </div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-toolbar>

        <q-card-section>
          <div>
            <span class="text-dark text-h6 q-ml-sm">Get Price</span>
          </div>
          <div class="row q-ml-sm q-mb-sm q-mt-sm">
            <div class="col-12 col-md-3">
              <q-btn color="yellow-10" glossy label="Check" @click="getPrice" />
            </div>
            <div v-if="price">
              <span class="text-h6 text-bold text-dark"> Price : </span>
              <span class="text-h6 text-bold text-green q-ml-sm">
                ${{ price }}</span
              >
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div>
            <span class="text-dark text-h6 q-ml-sm">Conversion Rate</span>
          </div>
          <div class="row q-ml-sm q-mb-sm q-mt-sm">
            <div class="col-12 col-md-2">
              <q-btn
                color="yellow-10"
                glossy
                label="Check"
                @click="getConversionRate"
              />
            </div>
            <div class="col-12 col-md-5 q-ml-sm">
              <q-input
                v-model="inputConversionRate"
                label="Input eth amount"
                outlined
                dense
                placeholder="amount"
              />
            </div>
            <div v-if="conversionRate" class="q-ml-md">
              <span class="text-subtitle1 text-bold text-dark q-mt-sm">
                Rate :
              </span>
              <span class="text-h6 text-bold text-green q-ml-sm q-mt-sm">
                ${{ conversionRate }}</span
              >
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { api } from "boot/axios";
import { defineComponent, ref } from "vue";
import Web3 from "web3";
import icoAbi from "./icoABI.json";
import {
  QSpinnerBall,
  QSpinnerBox,
  QSpinnerFacebook,
  QSpinnerOrbit,
  QSpinnerRings,
} from "quasar";

const provider = window.ethereum;
const web3 = new Web3(provider);
const icoContractAbi = icoAbi.abi;

const icoContract = new web3.eth.Contract(
  icoContractAbi,
  process.env.CONTRACT_ADDRESS
);

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
      dialogPrice: false,
      currentAccount: "",
      ethBalance: "",
      tokenBalance: "",
      loginTime: "",
      totalSupply: "",
      price: "",
      inputConversionRate: "",
      conversionRate: "",
      inputbuyToken: "",
      transferToAddress: "",
      transferToAmount: "",
    };
  },

  async created() {
    this.showLoadingScreen();
    await this.checkConnection();
    await this.getLoginTime();
    await this.getTotalSupply();
    await this.getBalanceOf();
    this.$q.loading.hide();
    // this.showLoginSuccessful();
  },

  methods: {
    showLoadingScreen() {
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: "deep-orange",
        spinnerSize: 175,
        backgroundColor: "blue-grey-10",
        message: "Fetching details from blockchain. Please wait . . .",
        messageColor: "white",
      });
    },

    showLoginSuccessful() {
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

    async getTotalSupply() {
      try {
        const res = await icoContract.methods.totalSupply().call();
        const read = parseInt(res) / 10 ** 18;
        this.totalSupply = read.toFixed(0);
        console.log(res);
      } catch (error) {
        console.log("ERROR", error);
      }
    },

    async getBalanceOf() {
      try {
        const res = await icoContract.methods
          .balanceOf(this.currentAccount)
          .call();
        const read = parseInt(res) / 10 ** 18;
        this.tokenBalance = read.toFixed(0);
        console.log(res);
      } catch (error) {
        console.log("ERROR", error);
      }
    },

    async getPrice() {
      try {
        const res = await icoContract.methods.getPrice().call();
        const read = parseInt(res) / 10 ** 18;
        this.price = read.toFixed(2);
        console.log(res);
      } catch (error) {
        console.log("ERROR", error);
      }
    },

    async getConversionRate() {
      try {
        const res = await icoContract.methods
          .getConversionRate(this.inputConversionRate)
          .call();
        const read = parseInt(res) / 10 ** 18;
        this.conversionRate = read.toFixed(2);
        console.log(res);
      } catch (error) {
        console.log("ERROR", error);
      }
    },

    async buyToken() {
      try {
        const res = await icoContract.methods
          .buy()
          .send({ value: this.inputbuyToken, from: this.currentAccount });
        console.log(res);
        this.getBalanceOf(this.currentAccount);
      } catch (error) {
        console.log(error);
      }
    },

    async transferToken() {
      try {
      } catch (error) {
        console.log(error);
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
.bg-image {
  background-image: url(app/src/assets/buy1.jpg);
  background-repeat: no-repeat;
  background-size: auto;
}
</style>
