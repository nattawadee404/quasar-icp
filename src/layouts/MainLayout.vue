<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          ICP score card :
          <label for="myName">{{ $store.getters.myName }}</label>
        </q-toolbar-title>

        <div>
          <q-toolbar-title shrink class="text-weight-bold">
            <router-link
              v-if="!$store.getters.myAuthenticate"
              class="nav-link pr-3"
              to="/LoginPage1"
            >
              Sign in
            </router-link>
            <router-link
              v-if="!$store.getters.myAuthenticate"
              class="nav-link pr-3"
              to="/LogoutPage"
            >
              Sign uot
            </router-link>
            <!-- <q-btn flat round dense>Sign in</q-btn>
            <q-btn flat round dense>Sign out</q-btn> -->
          </q-toolbar-title>
          <q-btn
            v-if="!$store.getters.myAuthenticate"
            flat
            round
            dense
            icon="login"
            @click="onLogin"
            >Sign in
          </q-btn>
          <q-btn
            v-if="!$store.getters.myAuthenticate"
            flat
            round
            dense
            icon="logout"
            @click="onLogout"
            >Sign out</q-btn
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> ICP SCORE CARD </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "ข้อมูลส่วนตัว",
    caption: "การศึกษา ความพิการ",
    icon: "school",
    link: "/FormComponent",
  },
  {
    title: "อาชีพเป้าหมาย",
    caption: "อาชีพในอนาคต",
    icon: "work",
    link: "/FormPlanCareer",
  },
  {
    title: "คุณสมบัติ/ทักษะ",
    caption: "คุณสมบัติและทักษะ เป้าหมาย",
    icon: "menu_book",
    link: "/FormQualification",
  },
  {
    title: "ประเมินตนเอง",
    caption: "การประเมินตนเอง",
    icon: "fact_check",
    link: "/FormSelfAssessment",
  },
  {
    title: "รายงานการประเมินตนเอง",
    caption: "ผลการประเมินตนเอง",
    icon: "signal_cellular_alt",
    link: "/FormChart",
  },
  // {
  //   title: "ติดตามความก้าวหน้า",
  //   caption: "ระดับขั้นการประเมิน",
  //   icon: "signal_cellular_alt",
  //   link: "/FormProgress",
  // },
  {
    title: "ค้นหาข้อมูล",
    caption: "ชื่อ-สกุล อาชีพ",
    icon: "search",
    link: "/FormSearch",
  },
  // {
  //   title: "ผลการประเมินตนเอง",
  //   caption: "รายงานผลการประเมิน",
  //   icon: "signal_cellular_alt",
  //   link: "/FormChart",
  // },
  //   {
  //     title: "Quasar Awesome",
  //     caption: "Community Quasar projects",
  //     icon: "favorite",
  //     link: "https://awesome.quasar.dev",
  //   },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  methods: {
    onLogin() {
      this.$router.replace({ name: LoginPage1 });
    },
    onLogout() {
      this.$router.replace({ name: LogoutPage });
    },
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
