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
                          v-model="planCareer.Career_id"
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
                          filled
                          color="blue-5"
                          v-model="planCareer.Career_id"
                          use-input
                          input-debounce="0"
                          :options="career.options"
                          @new-value="createValue"
                          hint="ระบุอักษร"
                          emit-value
                          map-options
                        >
                          <template v-slot:prepend>
                            <q-icon name="work_history" />
                          </template>
                          <template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                ค้นหาไม่พบ
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <!-- v-model="employee.date" -->
                        <q-input
                          filled
                          label="วัน/เดือน/ปี:ที่กำหนดแผนอาชีพ"
                          mask="date"
                          :rules="['date']"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                cover
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <!-- <q-date v-model="employee.date"> -->
                                <q-date>
                                  <div class="row items-center justify-end">
                                    <q-btn
                                      v-close-popup
                                      label="Close"
                                      color="primary"
                                      flat
                                    />
                                  </div>
                                </q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md row justify-center">
                        <q-btn label="บันทึก" type="submit" color="primary" icon="save" />
                        <q-btn
                          label="ยกเลิก"
                          type="reset"
                          color="primary"
                          flat
                          class="q-ml-sm"
                          icon="clear"
                        />
                        <q-btn
                          color="primary"
                          no-caps
                          flat
                          icon="skip_previous"
                          @click="onPrevious"
                        />
                        <q-btn
                          color="primary"
                          no-caps
                          flat
                          icon="skip_next"
                          @click="onNext"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <div class="q-pa-md">
                          <q-table
                            class="my-sticky-header-table"
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
                                  @click="editUser(props.row.Plan_Career_id)"
                                ></q-btn>
                                <q-btn
                                  icon="delete"
                                  @click="
                                    deleteUser(
                                      props.row.Plan_Career_id,
                                      props.row.Name_Plan_Career
                                    )
                                  "
                                ></q-btn>
                              </q-td>
                            </template>
                          </q-table>
                          <div>
                            member_id:
                            {{ this.$store.getters.myMember_id }}
                            MemberID:
                            {{ planCareer.Member_id }}
                            EmployeeID:
                            {{ planCareer.Employee_id }}
                            Career:
                            {{ career.options }}
                            Plane career:
                            {{ planCareers1 }}
                          </div>
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

export default {
  name: "FormPlanCareer",
  data() {
    return {
      message: "Form Plan Career",
      title: "แผนอาชีพ",
      planCareers: Array,
      mem_id: Array,
      emp_id: Array,
      planCareers_: Array,
      careers: Array,
      //Plan_Career_id	Employee_id	Name_Plan_Career Description
      planCareer: {
        Plan_Career_id: "",
        Member_id: "",
        Employee_id: "",
        Career_id: "",
      },
      status: "บันทึก",
      Ca: {
        label: Array,
        id: Array,
      },
      career: {
        options: [],
      },
      columns: [
        {
          name: "Member_id",
          label: "MemID",
          field: (row) => row.Member_id,
          format: (val) => `${val}`,
        },
        {
          name: "Career_id",
          label: "CaID",
          field: (row) => row.Career_id,
          format: (val) => `${val}`,
        },
        {
          name: "Career",
          label: "Career",
          field: (row) => row.career,
          format: (val) => `${val}`,
        },
        { name: "actions", align: "center", label: "Action" },
      ],
      planCareers1: [],
      loading: true,
      filter: "",
    };
  },
  methods: {
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิก");
      // this.planCareer.Plan_Career_id = 0;
      // this.planCareer.Employee_id = 0;
      this.planCareer.Career_id = "";
    },

    getCareer() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-career.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.careers = res.data;
          var ids = res.data.map((item) => item.career_id);
          var careers = res.data.map((item) => item.career);
          for (var i = 0; i < ids.length; i++) {
            self.career.options.push({
              label: careers[i],
              value: ids[i],
            });
          }
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
          Member_id: this.planCareer.Member_id,
          Career_id: this.planCareer.Career_id,
        };
        this.$emit("saveData", newPlanCareer);
        axios
          .post("http://localhost/ICPScoreCard/api-plan-career.php", {
            action: "insert",
            Plan_Career_id: this.planCareer.Plan_Career_id,
            Member_id: this.planCareer.Member_id,
            Career_id: this.planCareer.Career_id,
          })
          .then((res) => {
            console.log(res);
            this.resetForm();
            this.getUpdate();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post("http://localhost/ICPScoreCard/api-plan-career.php", {
            action: "update",
            Plan_Career_id: this.planCareer.Plan_Career_id,
            Member_id: this.planCareer.Member_id,
            Career_id: this.planCareer.Career_id,
          })
          .then((response) => {
            console.log(response);
            this.resetForm();
            this.getUpdate();
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
        .post("http://localhost/ICPScoreCard/api-plan-career.php", {
          action: "edit",
          Plan_Career_id: Plan_Career_id,
        })
        .then(function (response) {
          console.log(response);
          self.planCareer.Plan_Career_id = response.data.Plan_Career_id;
          self.planCareer.Member_id = response.data.Member_id;
          self.planCareer.Career_id = response.data.Career_id;
          self.planCareers_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(Plan_Career_id, career) {
      if (confirm("คุณต้องการลบรหัส [" + career + "] หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost/ICPScoreCard/api-plan-career.php", {
            action: "delete",
            Plan_Career_id: Plan_Career_id,
          })
          .then(function (response) {
            console.log(response);
            self.resetForm();
            self.getUpdate();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    getUpdate() {
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-plan-career.php", {
          action: "getAll",
        })
        .then(function (res) {
          console.log("q-table:", res);
          self.planCareers1 = res.data;
          console.log("planCareers1:", self.planCareers1);
        })
        .finally(() => {
          self.loading = false;
        });
    },
    getEmployeeID() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      var memId = parseInt(this.$store.getters.myMember_id);
      axios
        .post("http://localhost/ICPScoreCard/api-career.php", {
          action: "getEmployeeId",
          member_id: memId,
        })
        .then(function (res) {
          self.mem_id = res.data;
          console.log("getMemberID:", self.mem_id["id"]);
          self.planCareer.Member_id = self.mem_id["id"];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    createValue(val, done) {
      done(val, "add-unique");
      console.log("val:", val);
      if (confirm("คุณต้องการเพิ่มอาชีพ [" + val + "] ใหม่หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost/ICPScoreCard/api-career.php", {
            action: "insert",
            career: val,
            member_id: this.planCareer.Member_id,
          })
          .then(function (response) {
            console.log(response);
            self.resetForm();
            self.getUpdate();
            // self.getCareer();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    onNext() {
      this.$router.replace({ name: "FormQualification" });
    },
    onPrevious() {
      this.$router.replace({ name: "FormComponent" });
    },
  },
  mounted() {
    this.getUpdate();
  },
  created() {
    this.getCareer();
    this.getUpdate();
    this.getEmployeeID();
  },
};
</script>

<style lang="sass">
.my-sticky-header-table
  height: 310px
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #c1f4cd
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
  &.q-table--loading thead tr:last-child th
    top: 48px
</style>
