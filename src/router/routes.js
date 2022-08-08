// import HomeView from "@/views/HomeView.vue";
import FormComponent from 'pages/forms/FormComponent.vue'
import FormBehavior from 'pages/forms/FormBehavior.vue'
import FormPivotTable from 'pages/forms/FormPivotTable.vue'
import FormPlan from 'pages/forms/FormPlan.vue'
import FormPlanCareer from 'pages/forms/FormPlanCareer.vue'
import FormQualification from 'pages/forms/FormQualification.vue'
import FormSelfAssessment from 'pages/forms/FormSelfAssessment.vue'
import PersonData from 'pages/forms/PersonData.vue'
import PlanCareerData from 'pages/forms/PlanCareerData.vue'
import ForgotPassword from 'pages/registration/ForgotPassword.vue'
import LoginPage from 'pages/registration/LoginPage.vue'
import LoginPage1 from 'pages/registration/LoginPage1.vue'
import LoginPage2 from 'pages/registration/LoginPage2.vue'
import LogoutPage from 'pages/registration/LogoutPage.vue'
import RegistrationPage from 'pages/registration/RegistrationPage.vue'
import FormChart from 'pages/forms/FormChart.vue'
import FormDashboard from 'pages/forms/FormDashboard.vue'
import FormIndividual from 'pages/forms/FormIndividual.vue'
import FormProgress from 'pages/forms/FormProgress.vue'
import FormSearch from 'pages/forms/FormSearch.vue'
import PlanetChart from 'pages/forms/PlanetChart.vue'
// import MainLayout from "layouts/MainLayout.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    // component: () => import("layouts/MainLayout.vue"),
    // children: [{ path: "/", component: () => import("pages/IndexPage.vue") }],
    component: () => import('pages/IndexPage.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: '/FormComponent',
    name: 'FormComponent',
    component: FormComponent
  },
  {
    path: '/FormBehavior',
    name: 'FormBehavior',
    component: FormBehavior
  },
      {
    path: '/FormIndividual',
    name: 'FormIndividual',
    component: FormIndividual
  },
  {
    path: '/FormDashboard',
    name: 'FormDashboard',
    component: FormDashboard
  },
  {
    path: '/FormPivotTable',
    name: 'FormPivotTable',
    component: FormPivotTable
  },
  {
    path: '/FormPlan',
    name: 'FormPlan',
    component: FormPlan
  },
  {
    path: '/FormPlanCareer',
    name: 'FormPlanCareer',
    component: FormPlanCareer
  },
  {
    path: '/FormQualification',
    name: 'FormQualification',
    component: FormQualification
  },
  {
    path: '/FormSelfAssessment',
    name: 'FormSelfAssessment',
    component: FormSelfAssessment
  },
  {
    path: '/FormSearch',
    name: 'FormSearch',
    component: FormSearch
  },
  {
    path: '/FormProgress',
    name: 'FormProgress',
    component: FormProgress
  },
  {
    path: '/PersonData',
    name: 'PersonData',
    component: PersonData
  },
  {
    path: '/PlanCareerData',
    name: 'PlanCareerData',
    component: PlanCareerData
  },
  {
    path: '/ForgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/LoginPage1',
    name: 'LoginPage1',
    component: LoginPage1
  },
  {
    path: '/LoginPage2',
    name: 'LoginPage2',
    component: LoginPage2
  },
  {
    path: '/LogoutPage',
    name: 'LogoutPage',
    component: LogoutPage
  },
  {
    path: '/RegistrationPage',
    name: 'RegistrationPage',
    component: RegistrationPage
  },
  {
    path: '/FormChart',
    name: 'FormChart',
    component: FormChart
  },
  {
    path: '/PlanetChart',
    name: 'PlanetChart',
    component: PlanetChart
  }
]

export default routes
