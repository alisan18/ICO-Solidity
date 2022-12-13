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
        <span class="q-ml-lg text-grey-9 text-bold">Wallet Eth Balance: </span>
        <span class="text-body1">{{ ethBalance }}</span>
      </div>
    </div>
    <div class="text-center flex flex-center">
      <div>
        <span class="text-subtitle1 text-grey-9 text-bold">Account Type :</span>
        <span class="text-body1">Admin</span>
      </div>
      <div>
        <span class="q-ml-lg text-subtitle1 text-grey-9 text-bold"
          >Login Time:
        </span>
        <span class="text-body1">{{ loginTime }}</span>
      </div>
    </div>

    <q-separator class="q-mt-md" size="2px" color="teal" inset="" />

    <div v-if="tokenInformation">
      <div class="q-mt-md q-pl-xl q-pr-xl">
        <q-toolbar class="full-width bg-yellow-10">
          <q-toolbar-title class="text-white text-h6">
            ATCP TOKEN INFORMATIONS
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
                <span class="text-subtitle1 text-bold text-grey-9">
                  Name :
                </span>
                <span class="text-subtitle1 q-ml-sm">
                  Accenture Blockchain Token</span
                >
                <span class="q-ml-xl text-subtitle1 text-bold text-grey-9">
                  Minimum Funding Amount :
                </span>
                <span class="text-subtitle1 q-ml-sm"> 50 usd</span>
                <span class="text-subtitle1 text-bold text-grey-9 q-ml-xl">
                  Total Funds Accumulated :
                </span>
                <span
                  v-if="totalFundedAmount"
                  class="text-subtitle1 q-ml-sm text-green-9 text-bold"
                >
                  {{ totalFundedAmount }} Eth</span
                >
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
                <span class="text-subtitle1 q-ml-sm"> {{ totalSupply }}</span>
              </div>
            </q-card-section>
          </q-card>
        </q-slide-transition>
      </div>
    </div>

    <div v-if="icoContractView">
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
                    color="secondary"
                    glossy
                    label="Query"
                    @click="getPrice"
                  />
                </div>
                <div class="col-12 col-md-4">
                  <span class="text-subtitle1 text-bold text-grey-9">
                    Price :
                  </span>
                  <span
                    v-if="tokenInfo.price"
                    class="text-h6 text-bold text-deep-orange"
                  >
                    ${{ tokenInfo.price }}</span
                  >
                </div>
              </div>

              <div class="row q-ml-sm q-mt-lg">
                <div class="col-12 col-md-12">
                  <span class="text-bold text-grey-9 text-subtitle1">
                    GET CONVERSION RATE (ETH/USD)</span
                  >
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    v-model="functions.conversionRate"
                    label="Input eth amount"
                    outlined
                    dense
                    placeholder="amount"
                  />
                </div>
                <div class="col-12 col-md-1 q-ml-sm">
                  <q-btn
                    color="secondary"
                    glossy
                    label="Query"
                    @click="getConversionRate"
                  />
                </div>
                <div
                  v-if="this.tokenInfo.conversionRate"
                  class="col-12 col-md-4"
                >
                  <span class="text-subtitle1 text-bold text-grey-9">
                    Rate :
                  </span>
                  <span class="text-h6 text-bold text-deep-orange">
                    ${{ tokenInfo.conversionRate }}</span
                  >
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-slide-transition>
      </div>
    </div>

    <div class="q-pl-xl q-pr-xl">
      <q-slide-transition appear>
        <q-card v-if="showTimeLock">
          <q-card-section>
            <div class="row q-ml-sm">
              <div class="col-12 col-md-12">
                <span class="text-bold text-grey-9 text-subtitle1">
                  TIMELOCK</span
                >
              </div>
              <div class="col-12 col-md-2">
                <q-input
                  v-model="functions.timeLock"
                  label="value"
                  outlined
                  dense
                  placeholder="time in seconds"
                />
              </div>
              <div class="col-12 col-md-1 q-ml-sm">
                <q-btn
                  :loading="loadingTimelock"
                  color="secondary"
                  glossy
                  label="LOCK"
                  @click="timeLock"
                />
              </div>
              <div v-if="endTime" class="col-12 col-md-4 q-ml-lg">
                <span class="text-bold text-grey-9 text-subtitle1">
                  End Time :
                </span>
                <span class="text-bold text-grey-9 text-subtitle1 q-ml-sm">
                  {{ endTime }}
                </span>
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
                  color="secondary"
                  glossy
                  label="Query"
                  @click="getTimeLeft"
                />
              </div>
              <div v-if="tokenInfo.timeLeft" class="col-12 col-md-4 q-mt-sm">
                <span class="text-subtitle1 text-bold text-grey-9">
                  Remaining Time :
                </span>
                <span class="text-subtitle1 text-bold text-deep-orange">
                  {{ tokenInfo.timeLeft }}s</span
                >
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <div v-if="tokenContractView">
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
                  <span class="text-bold text-grey-9 text-subtitle1">
                    GET BALANCE</span
                  >
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    v-model="functions.getBalanceOf"
                    label="input receiver address"
                    outlined
                    dense
                    placeholder="address"
                  />
                </div>
                <div class="col-12 col-md-1 q-ml-sm">
                  <q-btn
                    color="secondary"
                    glossy
                    label="QUERY"
                    @click="getBalanceOf"
                  />
                </div>
                <div
                  v-if="tokenInfo.balanceOf"
                  class="col-12 col-md-4 q-ml-sm q-mt-sm"
                >
                  <span class="text-bold text-subtitle1">Balance : </span>
                  <span class="text-subtitle1">{{ tokenInfo.balanceOf }}</span>
                </div>
              </div>
              <div class="row q-ml-sm q-mt-md">
                <div class="col-12 col-md-12">
                  <span class="text-bold text-grey-9 text-subtitle1">
                    MINT</span
                  >
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    v-model="functions.mintAddress"
                    label="input receiver address"
                    outlined
                    dense
                    placeholder="address"
                  />
                </div>
                <div class="col-12 col-md-2 q-ml-sm">
                  <q-input
                    v-model="functions.mintAmount"
                    label="input amount"
                    outlined
                    dense
                    placeholder="amount"
                  />
                </div>
                <div class="col-12 col-md-1 q-ml-sm">
                  <q-btn
                    :loading="loadingMint"
                    color="secondary"
                    glossy
                    label="MINT"
                    @click="mint"
                  />
                </div>
              </div>

              <div class="row q-ml-sm q-mt-sm">
                <div class="col-12 col-md-12">
                  <span class="text-bold text-grey-9 text-subtitle1">
                    BURN</span
                  >
                </div>
                <div class="col-12 col-md-3">
                  <q-input
                    v-model="functions.burnAddress"
                    label="input address"
                    outlined
                    dense
                    placeholder="addresss"
                  />
                </div>
                <div class="col-12 col-md-2 q-ml-sm">
                  <q-input
                    v-model="functions.burnAmount"
                    label="input amount"
                    outlined
                    dense
                    placeholder="amount"
                  />
                </div>
                <div class="col-12 col-md-1 q-ml-sm">
                  <q-btn
                    :loading="loadingBurn"
                    color="secondary"
                    glossy
                    label="burn"
                    @click="burn"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-slide-transition>
      </div>
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
          :label="showMultiSigRead == true ? 'Hide' : 'Show'"
          color="white"
          class="text-h6"
          stretch
          @click="showMultiSigRead = !showMultiSigRead"
        />
        <q-separator vertical size="2px" />
        <q-separator vertical size="2px" />
      </q-toolbar>
    </div>
    <div class="q-pl-xl q-pr-xl">
      <q-slide-transition appear>
        <q-card v-if="showMultiSigRead">
          <q-card-section>
            <div class="row q-ml-sm">
              <div class="col-12 col-md-11 q-mb-sm">
                <span class="text-bold text-grey-8 text-subtitle1">
                  Note:
                </span>
                <span class="text-grey-9 text-subtitle2">
                  At least <strong>2</strong> confirmations is required to
                  proceed execution.
                </span>
              </div>
            </div>

            <div class="q-mt-md q-mb-xl flex flex-center">
              <q-table
                :rows="rows"
                :columns="columns"
                separator="cell"
                title="Transactions"
                row-key="to"
                :visible-columns="[
                  'to',
                  'value',
                  'numConfirmations',
                  'executed',
                  'revoke',
                  'confirm',
                  'execute',
                ]"
                :loading="loading"
                :pagination="{ sortBy: 'id', rowsPerPage: 5, page: 1 }"
                :rows-per-page-options="[5, 10, 15, 20, 0]"
              >
                <template #top>
                  <div class="col-2 q-table__title text-h5">Transactions</div>
                  <q-space />
                  <q-btn
                    no-caps
                    class="text-bold"
                    color="primary"
                    @click="dialogSubmit = true"
                  >
                    Create Transaction
                  </q-btn>
                </template>
                <template #body="props">
                  <q-tr
                    :props="props"
                    :class="props.row.executed == true ? 'bg-grey-4' : ''"
                  >
                    <!-- <pre>{{ props }}</pre> -->
                    <q-td key="index" :props="props">
                      {{ props.row.index }}
                    </q-td>
                    <q-td key="to" :props="props">
                      {{ props.row.to }}
                    </q-td>
                    <q-td key="value" :props="props">
                      {{ (props.row.value / 10 ** 18).toFixed(4) }}
                    </q-td>
                    <q-td key="numConfirmations" :props="props">
                      {{ props.row.numConfirmations }}/2
                    </q-td>
                    <q-td key="executed" :props="props">
                      {{ props.row.executed }}
                    </q-td>
                    <q-td key="revoke" :props="props">
                      <q-btn
                        :disable="props.row.executed == true"
                        color="red-4"
                        class="text-white"
                        no-caps
                        @click="revokeConfirmation(props.row)"
                      >
                        Revoke
                      </q-btn>
                    </q-td>
                    <q-td key="confirm" :props="props">
                      <q-btn
                        :disable="props.row.executed == true"
                        color="amber"
                        class="text-black"
                        no-caps
                        @click="confirmTransaction(props.row)"
                      >
                        Confirm
                      </q-btn>
                    </q-td>
                    <q-td key="execute" :props="props">
                      <q-btn
                        :disable="props.row.executed == true"
                        color="green"
                        no-caps
                        @click="executeTransaction(props.row)"
                      >
                        Execute
                      </q-btn>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>

    <div v-if="buyersTable">
      <div class="q-mt-md q-pl-xl q-pr-xl">
        <q-toolbar class="full-width bg-secondary">
          <q-toolbar-title class="text-white text-h6">
            BUYERS TABLE
          </q-toolbar-title>
          <q-separator vertical size="2px" />
          <q-btn
            flat
            no-caps
            :label="showBuyersTable == true ? 'Hide' : 'Show'"
            color="white"
            class="text-h6"
            stretch
            @click="showBuyersTable = !showBuyersTable"
          />
          <q-separator vertical size="2px" />
          <q-separator vertical size="2px" />
        </q-toolbar>
      </div>
      <div class="q-pl-xl q-pr-xl">
        <q-slide-transition appear>
          <q-card v-if="showBuyersTable">
            <q-card-section>
              <div class="q-mt-xl q-mb-xl flex flex-center">
                <q-table
                  :rows="buyers"
                  :columns="buyersColumns"
                  separator="cell"
                  title="Buyers List"
                  row-key="to"
                  :visible-buyersColumns="['address', 'amount', 'tokenBalance']"
                  :loading="loading"
                  :pagination="{ sortBy: 'id', rowsPerPage: 5, page: 1 }"
                  :rows-per-page-options="[5, 10, 15, 20, 0]"
                >
                  <template #body="props">
                    <q-tr :props="props">
                      <q-td key="address" :props="props">
                        {{ props.row.buyerAdd }}
                      </q-td>
                      <q-td key="amount" :props="props">
                        {{ props.row.fundedAmount / 10 ** 18 }}
                      </q-td>
                      <q-td key="tokenBalance" :props="props">
                        {{ (props.row.tokenBalance / 10 ** 18).toFixed(0) }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </q-card-section>
          </q-card>
        </q-slide-transition>
      </div>
    </div>

    <div>
      <q-dialog v-model="dialogSubmit" persistent>
        <q-card style="width: 600px">
          <q-toolbar class="bg-teal">
            <q-avatar color="warning" icon="receipt_long" />

            <q-toolbar-title class="text-white"
              ><span class="text-weight-bold">Create</span>
              Transaction</q-toolbar-title
            >

            <!-- <q-btn flat round dense icon="close" v-close-popup /> -->
          </q-toolbar>
          <q-card-section>
            <div class="row q-ml-md">
              <div class="col-12 col-md-2 q-mt-sm">
                <span class="text-grey-9 text-subtitle1 text-bold"
                  >Receiver :
                </span>
              </div>
              <div class="col-12 col-md-8">
                <q-input
                  label="Address"
                  outlined
                  dense
                  placeholder="0x00"
                  v-model="functions.submitTransactionTo"
                >
                </q-input>
              </div>
            </div>
            <div class="row q-ml-md q-mt-md">
              <div class="col-12 col-md-2 q-mt-sm">
                <span class="text-grey-9 text-subtitle1 text-bold"
                  >Amount :
                </span>
              </div>
              <div class="col-12 col-md-8">
                <q-input
                  label="value"
                  outlined
                  dense
                  placeholder="0"
                  v-model="functions.submitTransactionAmount"
                >
                </q-input>
              </div>
            </div>
          </q-card-section>

          <q-separator class="q-mt-md" size="1px" color="teal" />

          <q-card-section align="right">
            <div class="q-mt-sm">
              <q-btn
                :loading="loadingSubmitTx"
                no-caps
                label
                color="secondary"
                class="text-bold"
                @click="submitTransaction"
                >Submit</q-btn
              >
              <q-btn
                no-caps
                color="red"
                class="text-bold q-ml-sm"
                label="Cancel"
                v-close-popup
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <q-dialog v-model="alert">
      <q-card>
        <q-toolbar class="bg-warning text-white">
          <q-icon name="warning" size="27px" />
          <div class="text-h6 q-ml-sm">Alert</div>
        </q-toolbar>

        <q-card-section class="q-mt-md flex flex center">
          <div>
            <span class="q-mt-md text-bold">Please set Time Lock first.</span>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="teal" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[22, 22]">
      <q-fab icon="airplay" label="settings" direction="left" color="accent">
        <q-fab-action
          color="red"
          icon="hide_source"
          label="Info"
          @click="tokenInformation = !tokenInformation"
        />
        <q-fab-action
          color="orange"
          icon="token"
          label="ICO"
          @click="icoContractView = !icoContractView"
        />
        <q-fab-action
          color="blue"
          icon="generating_tokens"
          label="Token"
          @click="tokenContractView = !tokenContractView"
        />
        <q-fab-action
          color="light-green"
          icon="generating_tokens"
          label="Buyers"
          @click="buyersTable = !buyersTable"
        />
      </q-fab>
    </q-page-sticky>

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
  QSpinnerHourglass,
  QSpinnerInfinity,
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
      alert: false,
      tokenInformation: true,
      icoContractView: true,
      tokenContractView: true,
      buyersTable: true,
      url: require("app/src/assets/acnlogo.png"),
      avatar: require("app/src/assets/boy-avatar.png"),
      dialogSubmit: false,
      loading: false,
      isConnected: false,
      showTokenInfo: true,
      showTokenContract: false,
      showRead: false,
      showTimeLock: false,
      showMultiSigRead: false,
      showBuyersTable: false,
      loadingTimelock: false,
      loadingMint: false,
      loadingBurn: false,
      loadingSubmitTx: false,
      totalSupply: "",
      currentAccount: "",
      ethBalance: "",
      loginTime: "",
      totalFundedAmount: "",
      functions: {
        getBalanceOf: "",
        conversionRate: "",
        getBuyersList: "",
        getPrice: "",
        mintAddress: "",
        mintAmount: "",
        burnAddress: "",
        burnAmount: "",
        timeLock: "",
        getTimeLeft: "",
        // getTransaction: "",
        submitTransactionTo: "",
        submitTransactionAmount: "",
      },
      tokenInfo: {
        balanceOf: "",
        conversionRate: "",
        buyersList: "",
        price: "",
        mint: "",
        burn: "",
        getTimeLeft: "",
        endTime: "",
      },
      transactionInfo: {
        receiver: "",
        amount: "",
        executed: "",
        confirmations: "",
      },
      selected: [],
      rows: [],
      columns: [
        {
          name: "index",
          label: "Index",
          field: "index",
          align: "left",
          sortable: true,
          // style: "border-bottom: 1px solid green",
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 150px",
        },
        {
          name: "to",
          label: "Receiver",
          field: "to",
          align: "left",
          sortable: true,
          // style: "border-bottom: 1px solid green",
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 150px",
        },
        {
          name: "value",
          label: "Amount",
          field: "value",
          align: "left",
          sortable: true,
          // style: "border-bottom: 1px solid green",
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 150px",
        },
        {
          name: "numConfirmations",
          label: "Confirmations",
          field: "numConfirmations",
          align: "center",
          sortable: true,
          // style: "border-bottom: 1px solid green",
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 150px",
        },
        {
          name: "executed",
          label: "Executed",
          field: "executed",
          align: "left",
          sortable: true,
          // style: "border-bottom: 1px solid green",
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 150px",
        },
        {
          name: "revoke",
          label: "Revoke",
          field: "revoke",
          align: "center",
          sortable: false,
          // style: "border-bottom: 1px solid green",
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 200px",
        },
        {
          name: "confirm",
          label: "Confirm",
          field: "confirm",
          align: "center",
          sortable: false,
          // style: "border-bottom: 1px solid green",
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 200px",
        },
        {
          name: "execute",
          label: "Execute",
          field: "execute",
          align: "center",
          sortable: false,
          // style: "border-bottom: 1px solid green",
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 200px",
        },
      ],
      buyers: [],
      buyersColumns: [
        {
          name: "address",
          label: "Address",
          field: "address",
          align: "center",
          sortable: true,
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 300px",
        },
        {
          name: "amount",
          label: "Amount (Eth)",
          field: "amount",
          align: "center",
          sortable: true,
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 300px",
        },
        {
          name: "tokenBalance",
          label: "Token Balance",
          field: "tokenBalance",
          align: "center",
          sortable: true,
          headerClasses: "bg-teal-5 text-white",
          headerStyle: "font-size: 1.2em",
          style: "width: 300px",
        },
      ],
    };
  },

  async created() {
    this.showLoadingScreen();
    await this.checkConnection();
    await this.getLoginTime();
    await this.getAllTransactions();
    await this.getEndTime();
    await this.getTotalSupply();
    await this.getFundedAmount();
    await this.getBuyersList();
    this.$q.loading.hide();
    // this.showTransactionConfirmed();
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

    showMultiSigLoading() {
      this.$q.loading.show({
        spinner: QSpinnerBox,
        spinnerColor: "deep-orange",
        spinnerSize: 180,
        backgroundColor: "blue-grey-10",
        message: "Waiting for Confirmations. Please wait . . .",
        messageColor: "white",
      });
    },
    // this.$q.loading.hide();

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

    showTransactionSuccess() {
      this.$q.notify({
        message: "Transaction Completed",
        type: "positive",
        position: "top-right",
        progress: true,
        iconSize: "30px",
        timeout: 5000,
      });
    },

    async getLoginTime() {
      this.loading = true;
      const date = await new Date().toLocaleString();
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

    async getPrice() {
      try {
        const res = await icoContract.methods.getPrice().call();

        const read = parseInt(res) / 10 ** 18;
        this.tokenInfo.price = read.toFixed(2);
        console.log(res);
      } catch (error) {
        console.log("ERROR", error);
      }
    },

    async getConversionRate() {
      try {
        const res = await icoContract.methods
          .getConversionRate(this.functions.conversionRate)
          .call();
        const read = parseInt(res) / 10 ** 18;
        this.tokenInfo.conversionRate = read.toFixed(2);
        console.log(res);
      } catch (error) {
        console.log("ERROR", error);
      }
    },

    async getFundedAmount() {
      try {
        const res = await icoContract.methods.getFundedAmount().call();
        const read = parseInt(res) / 10 ** 18;
        this.totalFundedAmount = read.toFixed(2);
        console.log(res);
      } catch (error) {
        console.log("ERROR", error);
      }
    },

    async getBuyersList() {
      try {
        const res = await icoContract.methods.getAllBuyerList().call();
        this.buyers = res;
        console.log("BUYERS LIST", this.buyers);
      } catch (error) {
        console.log(error);
      }
    },

    async getBalanceOf() {
      try {
        const res = await icoContract.methods
          .balanceOf(this.functions.getBalanceOf)
          .call();
        const read = parseInt(res) / 10 ** 18;
        this.tokenInfo.balanceOf = read.toFixed(0);
        console.log(res);
      } catch (error) {
        console.log("ERROR", error);
      }
    },

    async mint() {
      this.loadingMint = true;
      try {
        const res = await icoContract.methods
          .mint(
            this.functions.mintAddress,
            this.functions.mintAmount.concat("000000000000000000")
          )
          .send({ from: this.currentAccount });
        console.log(res);
        await this.getTotalSupply();
        this.showTransactionConfirmed();
        this.loadingMint = false;
      } catch (error) {
        console.log("ERROR", error);
        this.loadingMint = false;
      }
    },

    async burn() {
      this.loadingBurn = true;
      try {
        const res = await icoContract.methods
          .burn(
            this.functions.burnAddress,
            this.functions.burnAmount.concat("000000000000000000")
          )
          .send({ from: this.currentAccount });
        console.log(res);
        await this.getTotalSupply();
        this.showTransactionConfirmed();
        this.loadingBurn = false;
      } catch (error) {
        console.log("ERROR", error);
        this.loadingBurn = false;
      }
    },

    async timeLock() {
      this.loadingTimelock = true;
      try {
        const res = await icoContract.methods
          .timeLock(this.functions.timeLock)
          .send({ from: this.currentAccount });
        console.log(res);
        this.showTransactionSuccess();
        await this.getEndTime();
        this.loadingTimelock = false;
      } catch (error) {
        console.log("ERROR", error);
        this.loadingTimelock = false;
      }
    },

    async getEndTime() {
      try {
        const res = await icoContract.methods.getOpenTimeLeft().call();
        this.endTime = new Date(res * 1000).toLocaleString();
      } catch (error) {
        // console.log("ERROR", error);
      }
    },

    async getTimeLeft() {
      try {
        const res = await icoContract.methods.getTimeLeft().call();
        console.log(res);
        this.tokenInfo.timeLeft = res;
      } catch (error) {
        console.log("ERROR", error);
        if (error) {
          this.alert = true;
        }
      }
    },

    // async getTransaction() {
    //   try {
    //     const res = await icoContract.methods
    //       .getTransaction(this.functions.getTransaction)
    //       .call();
    //     this.data = res;
    //     console.log("DATA", this.data);
    //     this.transactionInfo.receiver = res.to;
    //     const read = parseInt(res.value) / 10 ** 18;
    //     this.transactionInfo.amount = read.toFixed(4);
    //     this.transactionInfo.executed = res.executed;
    //     this.transactionInfo.confirmations = res.numConfirmations;
    //   } catch (error) {
    //     console.log("ERROR", error);
    //   }
    // },

    async submitTransaction() {
      this.loadingSubmitTx = true;
      try {
        const res = await icoContract.methods
          .submitTransaction(
            this.functions.submitTransactionTo,
            this.functions.submitTransactionAmount
          )
          .send({ from: this.currentAccount });
        console.log(res);
        this.showTransactionConfirmed();
        this.loadingSubmitTx = false;
        await this.getAllTransactions();
        this.dialogSubmit = false;
      } catch (error) {
        console.log("ERROR", error);
        this.loadingSubmitTx = false;
      }
    },

    async getAllTransactions() {
      try {
        const res = await icoContract.methods.getAllTransactions().call();
        this.rows = res;
        console.log("DATA", this.rows);
      } catch (error) {
        console.log("ERROR", error);
      }
    },

    async confirmTransaction(data) {
      this.showMultiSigLoading();
      try {
        const res = await icoContract.methods
          .confirmTransaction(data.index)
          .send({ from: this.currentAccount });
        console.log(res);
        await this.getAllTransactions();
        this.$q.loading.hide();
      } catch (error) {
        console.log("ERROR", error);
        this.$q.loading.hide();
      }
    },

    async executeTransaction(data) {
      this.showMultiSigLoading();
      try {
        const res = await icoContract.methods
          .executeTransaction(data.index)
          .send({ from: this.currentAccount });
        console.log(res);
        await this.getAllTransactions();
        this.$q.loading.hide();
      } catch (error) {
        console.log(error);
        this.$q.loading.hide();
      }
    },

    async revokeConfirmation(data) {
      this.showMultiSigLoading();
      try {
        const res = await icoContract.methods
          .revokeConfirmation(data.index)
          .send({ from: this.currentAccount });
        console.log(res);
        await this.getAllTransactions();
        this.$q.loading.hide();
      } catch (error) {
        console.log("ERROR", error);
        this.$q.loading.hide();
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
