<template>
  <div class="fullscreen text-center flex flex-center bg-image">
    <q-card>
      <div class="row">
        <div
          style="height: 600px"
          class="col-0 col-sm-5 bg-teal-8 rounded-left-borders xs-hide"
        >
          <div class="row q-ml-sm q-mt-sm">
            <div class="col-12 fredoka text-subtitle1">
              <span class="text-white text-h4">The</span>
              <span class="q-ml-sm text-h3 text-warning">NEXUS</span>
            </div>
          </div>
          <div
            class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
          >
            <div class="">
              <div
                class="text-h4 text-uppercase text-white fredoka"
                style="min-width: 220px"
              >
                WELCOME!
              </div>
              <div class="text-white q-my-sm text-subtitle1">
                The Most awaited blockchain Dapp is here!
              </div>
              <div class="text-white q-my-xl text-subtitle1">
                <router-link class="text-white" to="/"> Go Back </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-7" style="width: 500px">
          <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
            <div class="col-12 fredoka text-subtitle1">
              <router-link
                class="text-teal-8"
                style="text-decoration: none"
                to="/"
              >
              </router-link>
            </div>
          </div>
          <div class="row q-pa-sm-sm q-pa-md">
            <div class="col-12">
              <q-card-section>
                <div class="q-mb-xl">
                  <div class="flex justify-center">
                    <div
                      class="text-h4 text-uppercase q-my-none text-weight-bold text-teal-8 fredoka"
                    >
                      Login
                    </div>
                  </div>
                </div>
                <q-form class="q-gutter-md q-mt-xl">
                  <q-input
                    v-model="user.username"
                    label="Username"
                    lazy-rules
                    name="username"
                  />
                  <q-input
                    v-model="user.password"
                    label="Password"
                    lazy-rules
                    name="password"
                    type="password"
                  />
                  <div>
                    <q-btn
                      class="full-width fredoka q-mt-md"
                      color="teal-8"
                      label="Submit"
                      rounded
                      type="submit"
                      to="/admin"
                    ></q-btn>
                    <div class="q-mt-lg">
                      <div class="q-mt-sm">
                        Forgot your username or password?
                        <router-link class="text-teal-8" to="/login"
                          >Reset</router-link
                        >
                      </div>
                      <div class="q-mt-sm">
                        Sign up here
                        <router-link class="text-teal-8" to="/forgot-password"
                          >Register!</router-link
                        >
                      </div>
                    </div>
                  </div>
                </q-form>
              </q-card-section>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </div>

  <!-- <div class="fullscreen text-dark text-center q-pa-md flex flex-center">
      <div>
        <div class="text-h1">Login Page</div>

        <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

        <q-btn
          no-caps
          glossy
          class="text-h6 q-mt-xl"
          text-color="teal-5"
          label="Go Home"
          to="/Login"
        />
      </div>
    </div> -->
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",

  components: {},

  setup() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
});
</script>

<style scoped>
.bg-image {
  background-image: url(app/src/assets/login1.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
