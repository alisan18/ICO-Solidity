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
      <span>Welcome Admin!</span>
    </div>
    <div class="q-mt-xl text-center flex flex-center">
      <div class="text-subtitle1">
        <span class="text-grey-9 text-bold">Wallet Address: </span>
        <span class="text-body1">{{ currentAccount }}</span>
      </div>
      <div class="text-subtitle1">
        <span class="q-ml-xl text-grey-9 text-bold">Eth Balance: </span>
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

    <div class="q-mt-md q-pl-xl q-pr-xl">
      <q-toolbar class="full-width bg-yellow-10">
        <q-toolbar-title class="text-white text-h6">
          TOKEN INFORMATIONS
        </q-toolbar-title>

        <q-separator vertical size="2px" />
        <q-btn
          flat
          no-caps
          :label="showTokenInfo == false ? 'Show' : 'Hide'"
          color="white"
          class="text-h6"
          stretch
          @click="showTokenInfo = !showTokenInfo"
        />
        <q-separator vertical size="2px" />
      </q-toolbar>
    </div>

    <div class="q-pl-xl q-pr-xl">
      <q-slide-transition appear>
        <q-card v-if="showTokenInfo">
          <q-card-section>
            <div>
              <span class="text-subtitle1 text-bold text-grey-9"> Name: </span>
              <span class="text-subtitle1 q-ml-sm">
                Accentue Blockchain Token</span
              >
              <span class="q-ml-xl text-subtitle1 text-bold text-grey-9">
                Minimum USD:
              </span>
              <span class="text-subtitle1 q-ml-sm"> 50</span>
            </div>
            <div>
              <span class="text-subtitle1 text-bold text-grey-9">
                Symbol:
              </span>
              <span class="text-subtitle1 q-ml-sm"> ATCP</span>
            </div>
            <div>
              <span class="text-subtitle1 text-bold text-grey-9">
                Decimals:
              </span>
              <span class="text-subtitle1 q-ml-sm"> 18</span>
            </div>
            <div>
              <span class="text-subtitle1 text-bold text-grey-9">
                Total Supply:
              </span>
              <span class="text-subtitle1 q-ml-sm"> 1,000,000</span>
            </div>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <div class="q-mt-md q-pl-xl q-pr-xl">
      <q-toolbar class="full-width bg-secondary">
        <q-toolbar-title class="text-white text-h6">
          ICO CONTRACT
        </q-toolbar-title>

        <q-separator vertical size="2px" />
        <q-btn
          flat
          no-caps
          label="Read"
          color="white"
          class="text-h6"
          stretch
          @click="showRead = !showRead"
        />
        <q-separator vertical size="2px" />
        <q-btn
          flat
          no-caps
          label="TimeLock"
          color="white"
          class="text-h6"
          stretch
          @click="showTimeLock = !showTimeLock"
        />
        <q-separator vertical size="2px" />
      </q-toolbar>
    </div>

    <div class="q-pl-xl q-pr-xl">
      <q-slide-transition appear>
        <q-card v-if="showRead">
          <q-card-section>
            <div class="row q-ml-sm">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1">
                  GET ETH/USD PRICE</span
                >
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn
                  @click="getPrice"
                  color="secondary"
                  glossy
                  label="Query"
                />
              </div>
              <div class="col-12 col-md-4">
                <span class="text-subtitle1 text-bold text-grey-9">
                  Price :
                </span>
                <span class="text-subtitle1 text-bold text-deep-orange">
                  {{ tokenInfo.price }}</span
                >
              </div>
            </div>

            <div class="row q-ml-sm q-mt-lg">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1">
                  GET CONVERSION RATE (ETH/USD)</span
                >
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  label="Input eth amount"
                  outlined
                  dense
                  placeholder="amount"
                  v-model="functions.conversionRate"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn
                  @click="getConversionRate"
                  color="secondary"
                  glossy
                  label="Query"
                />
              </div>
              <div class="col-12 col-md-4">
                <span class="text-subtitle1 text-bold text-grey-9">
                  Rate :
                </span>
                <span class="text-subtitle1 text-bold text-deep-orange">
                  {{ tokenInfo.conversionRate }}</span
                >
              </div>
            </div>

            <div class="row q-ml-sm q-mt-sm">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1">
                  BUYERS</span
                >
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  label="Input index"
                  outlined
                  dense
                  placeholder="index number"
                  v-model="functions.buyersList"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn
                  @click="getBuyersList"
                  color="secondary"
                  glossy
                  label="Query"
                />
              </div>
              <div class="col-12 col-md-3">
                <span class="text-subtitle1 text-bold text-grey-9">
                  Address :
                </span>
                <span class="text-subtitle1 text-bold text-deep-orange">
                  {{ tokenInfo.address }}</span
                >
              </div>
              <div class="col-12 col-md-2">
                <span class="text-subtitle1 text-bold text-grey-9">
                  Amount :
                </span>
                <span class="text-subtitle1 text-bold text-deep-orange">
                  {{ tokenInfo.amount }}</span
                >
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <div class="q-pl-xl q-pr-xl">
      <q-slide-transition appear>
        <q-card v-if="showTimeLock">
          <q-card-section>
            <div class="row q-ml-sm">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1">
                  TimeLock</span
                >
              </div>
              <div class="col-12 col-md-2">
                <q-input
                  label="value"
                  outlined
                  dense
                  placeholder="amount"
                  v-model="functions.timeLock"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn
                  @click="timeLock"
                  color="secondary"
                  glossy
                  label="LOCK"
                />
              </div>
            </div>

            <div class="row q-ml-sm q-mt-md">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1">
                  TIME LEFT</span
                >
              </div>
              <div class="col-12 col-md-1 q-ml-sm q-mt-sm">
                <q-btn
                  @click="getTimeLeft"
                  color="secondary"
                  glossy
                  label="Query"
                />
              </div>
              <div class="col-12 col-md-4 q-mt-sm">
                <span class="text-subtitle1 text-bold text-grey-9">
                  Remaining Time :
                </span>
                <span class="text-subtitle1 text-bold text-deep-orange">
                  {{ tokenInfo.timeLeft }}</span
                >
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <div class="q-mt-md q-pl-xl q-pr-xl">
      <q-toolbar class="full-width bg-secondary">
        <q-toolbar-title class="text-white text-h6">
          TOKEN CONTRACT
        </q-toolbar-title>

        <q-separator vertical size="2px" />
        <q-btn
          flat
          no-caps
          :label="showTokenContract == false ? 'Show' : 'Hide'"
          color="white"
          class="text-h6"
          stretch
          @click="showTokenContract = !showTokenContract"
        />
        <q-separator vertical size="2px" />
      </q-toolbar>
    </div>
    <div class="q-pl-xl q-pr-xl">
      <q-slide-transition appear>
        <q-card v-if="showTokenContract">
          <q-card-section>
            <div class="row q-ml-sm">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1"> MINT</span>
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  label="value"
                  outlined
                  dense
                  placeholder="amount"
                  v-model="functions.mint"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn @click="mint" color="secondary" glossy label="MINT" />
              </div>
            </div>

            <div class="row q-ml-sm q-mt-sm">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1"> BURN</span>
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  label="value"
                  outlined
                  dense
                  placeholder="amount"
                  v-model="functions.burn"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn @click="burn" color="secondary" glossy label="burn" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <div class="q-mt-md q-pl-xl q-pr-xl">
      <q-toolbar class="full-width bg-secondary">
        <q-toolbar-title class="text-white text-h6">
          MULTI-SIG CONTRACT
        </q-toolbar-title>

        <q-separator vertical size="2px" />
        <q-btn
          flat
          no-caps
          label="Read"
          color="white"
          class="text-h6"
          stretch
          @click="showMultiSigRead = !showMultiSigRead"
        />
        <q-separator vertical size="2px" />
        <q-btn
          flat
          no-caps
          label="Write"
          color="white"
          class="text-h6"
          stretch
          @click="showMultiSigWrite = !showMultiSigWrite"
        />
        <q-separator vertical size="2px" />
      </q-toolbar>
    </div>
    <div class="q-pl-xl q-pr-xl">
      <q-slide-transition appear>
        <q-card v-if="showMultiSigRead">
          <q-card-section>
            <div class="row q-ml-sm">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1">
                  GET TRANSACTION</span
                >
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  label="Input index"
                  outlined
                  dense
                  placeholder="index"
                  v-model="functions.getTransaction"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn
                  @click="getTransaction"
                  color="secondary"
                  glossy
                  label="QUERY"
                />
              </div>
            </div>

            <div class="row q-ml-sm q-mt-sm">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1"> BURN</span>
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  label="value"
                  outlined
                  dense
                  placeholder="amount"
                  v-model="functions.burn"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn @click="burn" color="secondary" glossy label="burn" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <div class="q-pl-xl q-pr-xl">
      <q-slide-transition appear>
        <q-card v-if="showMultiSigWrite">
          <q-card-section>
            <div class="row q-ml-sm">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1"> MINT</span>
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  label="value"
                  outlined
                  dense
                  placeholder="amount"
                  v-model="functions.mint"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn @click="mint" color="secondary" glossy label="MINT" />
              </div>
            </div>

            <div class="row q-ml-sm q-mt-sm">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1"> BURN</span>
              </div>
              <div class="col-12 col-md-5">
                <q-input
                  label="value"
                  outlined
                  dense
                  placeholder="amount"
                  v-model="functions.burn"
                >
                </q-input>
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn @click="burn" color="secondary" glossy label="burn" />
              </div>
            </div>
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
      avatar: require("app/src/assets/boy-avatar.png"),
      loading: false,
      isConnected: false,
      showTokenInfo: true,
      showTokenContract: false,
      showRead: false,
      showTimeLock: false,
      showMultiSigRead: false,
      showMultiSigWrite: false,
      currentAccount: "",
      ethBalance: "",
      loginTime: "",
      functions: {
        getConversionRate: "",
        getBuyersList: "",
        getPrice: "",
        burn: "",
        mint: "",
        timeLock: "",
        getTimeLeft: "",
        getTransaction: "",
      },
      tokenInfo: {
        conversionRate: "",
        buyersList: "",
        price: "",
        mint: "",
        burn: "",
        getTimeLeft: "",
        transactionInfo: "",
      },
    };
  },

  async created() {
    await this.checkConnection();
    await this.getLoginTime();
    // this.showTransactionConfirmed();
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

    async getPrice() {},

    async getConversionRate() {},

    async getBuyersList() {},

    async mint() {},

    async burn() {},

    async timeLock() {},

    async getTimeLeft() {},
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
