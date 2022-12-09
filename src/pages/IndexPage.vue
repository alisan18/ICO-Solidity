<template>
  <q-page>
    <div>
      <q-carousel
        infinite
        arrows
        animated
        v-model="slide"
        height="900px"
        control-color="blue-grey-14"
        control-type="push"
        :autoplay="autoplay"
      >
        <q-carousel-slide name="first" :img-src="image1">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Decentralized</div>
            <div class="text-subtitle1">No Central Authority</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="second" :img-src="image2">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Distributed</div>
            <div class="text-subtitle1">Distributed Ledger Technology</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="third" :img-src="image3">
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">Immutable</div>
            <div class="text-subtitle1">Data Integrity</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="flex flex-center q-mt-md">
      <div>
        <q-btn
          glossy
          class="text-h6 text-bold"
          color="warning"
          text-color="dark"
          label="SIGN UP NOW"
        />
      </div>
      <div class="q-ml-xl">
        <q-btn
          glossy
          class="text-h6 text-bold"
          color="warning"
          text-color="dark"
          label="LOGIN HERE"
          to="/Login"
        />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-12 col-md-1 q-ml-xl"></div>
      <div class="col-12 col-md-6 q-ml-xl">
        <q-img :src="ethereum" style="height: 130px; max-width: 500px" />
      </div>
      <div class="col-12 col-md-2 q-mt-sm">
        <q-img :src="solidity" style="height: 110px; max-width: 500px" />
      </div>
    </div>
    <div class="row q-ml-xl q-mb-md q-mt-sm text-dark">
      <div class="col-12 col-md-6">
        <span class="text-subtitle1">
          A decentralized blockchain platform that establishes a peer-to-peer
          network that securely executes and verifies application code,
          <br />called smart contracts. Smart contracts allow participants to
          transact with each other without a trusted central authority.
        </span>
      </div>
      <div class="col-12 col-md-5 q-ml">
        <span class="text-subtitle1">
          Solidity is an advanced programming language used for implementing
          Ethereum-based smart contracts. It's an object-oriented language that
          targets the Ethereum virtual machine (EVM).
        </span>
      </div>
    </div>
    <div class="row q-ml-xl q-mb-sm">
      <!-- <div class="col-12 col-md-6">
        <q-img :src="ethereum" style="height: 150px; max-width: 500px" />
      </div> -->
      <!-- <div class="col-12 col-md-6 q-mt-sm">
        <q-img :src="solidity" style="height: 110px; max-width: 500px" />
      </div> -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",

  components: {},

  setup() {
    return {
      ethereum: require("app/src/assets/ethereum2.png"),
      solidity: require("app/src/assets/solidity2.png"),
      image1: require("app/src/assets/blockchain1v2.jpg"),
      image2: require("app/src/assets/blockchain2.jpg"),
      image3: require("app/src/assets/blockchain3.jpg"),
      // ethereum: require("app/src/assets/ethereum.png"),
      slide: ref("first"),
      autoplay: ref(true),
      // src="~assets/quasar-logo-vertical.svg"
    };
  },
});
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
