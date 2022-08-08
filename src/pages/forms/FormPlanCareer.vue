<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="bg-grey-2">
      <q-page
        padding
        class="row items-center justify-center"
        style="background: linear-gradient(#74c588, #0ad13c)"
      >
        <div class="row full-width">
          <div
            class="col-md-8 offset-md-2 col-xs-16 q-pl-md q-pr-md q-pt-sm q-mt-xl q-mr-sm"
          >
            <q-card flat class="bg-white text-black">
              <q-card-section class="bg-blue-14">
                <h4 class="text-h5 text-white q-my-md text-center">
                  {{ title }}
                </h4>
              </q-card-section>
              <div class="row">
                <div class="col-md-12 col-xs-12 q-pa-md">
                  <q-form
                    @submit.prevent="submitForm"
                    @reset.prevent="resetForm"
                    method="post"
                    class="q-gutter-md"
                  >
                    <div class="row">
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="blue-5"
                          standout
                          bottom-slots
                          v-model="planCareer.Name_Plan_Career"
                          label="แผนอาชีพ"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="work_history" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-select
                          color="blue-5"
                          v-model="planCareer.Name_Plan_Career"
                          :options="career.options"
                          label="เลือกสาขา"
                        >
                          <template v-slot:prepend>
                            <q-icon name="work_history" />
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-btn
                          label="บันทึก"
                          type="submit"
                          color="primary"
                          icon="save"
                        />
                        <q-btn
                          label="ยกเลิก"
                          type="reset"
                          color="primary"
                          flat
                          class="q-ml-sm"
                          icon="clear"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <div class="q-pa-md">
                          <q-table
                            :grid="$q.screen.xs"
                            title="ข้อมูลส่วนตัว"
                            :rows="planCareers1"
                            :columns="columns"
                            row-key="Name_Plan_Career"
                            :filter="filter"
                            :loading="loading"
                          >
                            <template v-slot:top-right>
                              <q-input
                                borderless
                                dense
                                debounce="300"
                                v-model="filter"
                                placeholder="Search"
                              >
                                <template v-slot:append>
                                  <q-icon name="search" />
                                </template>
                              </q-input>
                            </template>
                            <template v-slot:body-cell-actions="props">
                              <q-td :props="props">
                                <q-btn
                                  icon="mode_edit"
                                  @click="onEdit(props.row)"
                                ></q-btn>
                                <q-btn
                                  icon="delete"
                                  @click="onDelete(props.row)"
                                ></q-btn>
                              </q-td>
                            </template>
                          </q-table>
                        </div>
                      </div>
                    </div>
                  </q-form>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

  <!-- <div class="py-2">
    {{ planCareers_ }}
  </div>
  <div class="py-2">
    {{ planCareer }}
  </div> -->
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  name: "FormPlanCareer",
  data() {
    return {
      message: "Form Plan Career",
      title: "แผนอาชีพ",
      planCareers: Array,
      planCareers_: Array,
      careers: Array,

      //Plan_Career_id	Employee_id	Name_Plan_Career Description
      planCareer: {
        Plan_Career_id: "",
        Employee_id: this.$store.getters.myMember_id,
        Name_Plan_Career: "",
        isVisible: false,
      },
      isEdit: false,
      status: "บันทึก",
      career: {
        options: [],
      },
    };
  },
  methods: {
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิก");
      // this.planCareer.Plan_Career_id = 0;
      // this.planCareer.Employee_id = 0;
      this.planCareer.Name_Plan_Career = "";
      this.planCareer.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-plan-career.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.planCareers = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getCareer() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-career.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.careers = res.data;
          self.career.options = res.data.map((item) => item.career);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("Form Plan Career:", this.planCareer);
        const newPlanCareer = {
          Plan_Career_id: this.planCareer.Plan_Career_id,
          Employee_id: this.planCareer.Employee_id,
          Name_Plan_Career: this.planCareer.Name_Plan_Career,
          isVisible: this.planCareer.isVisible,
        };
        this.$emit("saveData", newPlanCareer);

        axios
          .post("http://localhost:85/ICPScoreCard/api-plan-career.php", {
            action: "insert",
            Plan_Career_id: this.planCareer.Plan_Career_id,
            Employee_id: this.planCareer.Employee_id,
            Name_Plan_Career: this.planCareer.Name_Plan_Career,
          })
          .then((res) => {
            console.log(res);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("http://localhost:85/ICPScoreCard/api-plan-career.php", {
            action: "update",
            Plan_Career_id: this.planCareer.Plan_Career_id,
            Employee_id: this.planCareer.Employee_id,
            Name_Plan_Career: this.planCareer.Name_Plan_Career,
          })
          .then((response) => {
            console.log(response);
            this.resetForm();
            this.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    editUser(Plan_Career_id) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-plan-career.php", {
          action: "edit",
          Plan_Career_id: Plan_Career_id,
        })
        .then(function (response) {
          console.log(response);
          self.planCareer.Plan_Career_id = response.data.Plan_Career_id;
          self.planCareer.Employee_id = response.data.Employee_id;
          self.planCareer.Name_Plan_Career = response.data.Name_Plan_Career;

          self.planCareers_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(Plan_Career_id) {
      if (confirm("คุณต้องการลบรหัส " + Plan_Career_id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost:85/ICPScoreCard/api-plan-career.php", {
            action: "delete",
            Plan_Career_id: Plan_Career_id,
          })
          .then(function (response) {
            console.log(response);
            self.resetForm();
            self.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
  setup() {
    const loading = ref(true);
    const planCareers1 = ref([]);
    const PC = [
      {
        Plan_Career_id: "",
        Employee_id: "",
        Name_Plan_Career: "",
      },
    ];
    const planCareers1_ = ref([]);
    const columns = [
      {
        name: "Plan_Career_id",
        required: true,
        label: "รหัสอาชีพ",
        align: "center",
        field: (row) => row.Plan_Career_id,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Employee_id",
        label: "รหัสผู้ใช้",
        align: "center",
        field: (row) => row.Employee_id,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "Name_Plan_Career",
        label: "อาชีพ",
        field: (row) => row.Name_Plan_Career,
        format: (val) => `${val}`,
      },
      { name: "actions", align: "center", label: "Action" },
    ];

    // Fetch dogs
    axios
      .post("http://localhost:85/ICPScoreCard/api-plan-career.php", {
        action: "getall",
      })
      .then(function (res) {
        console.log("q-table:", res);
        planCareers1.value = res.data;
        console.log("planCareers1.value:", planCareers1.value);
      })
      .finally(() => {
        loading.value = false;
      });

    const onEdit = (row) => {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-plan-career.php", {
          action: "edit",
          Plan_Career_id: row.Plan_Career_id,
        })
        .then(function (response) {
          console.log(response);
          PC.Plan_Career_id = response.data.Plan_Career_id;
          PC.Employee_id = response.data.Employee_id;
          PC.Name_Plan_Career = response.data.Name_Plan_Career;
          planCareers1_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const onDelete = (row) => {
      if (confirm("คุณต้องการลบรหัส " + row.Plan_Career_id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost:85/ICPScoreCard/api-plan-career.php", {
            action: "delete",
            Plan_Career_id: row.Plan_Career_id,
          })
          .then(function (response) {
            console.log(response);
            // self.resetForm();
            // self.getAllUser();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    };
    return {
      filter: ref(""),
      columns,
      loading,
      planCareers1,
      PC,
      onEdit,
      onDelete,
    };
  },
  created() {
    this.getAllUser();
    this.getCareer();
  },
};
</script>

<style scoped></style>
