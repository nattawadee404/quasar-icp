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
                          bg-color="green"
                          standout
                          bottom-slots
                          v-model="plan.qualificationId"
                          label="คุณสมบัติ"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="work_outline" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-select
                          color="green"
                          v-model="plan.qualificationId"
                          :options="qualification.options"
                          label="คุณสมบัติตามอาชีพที่ต้องการ"
                          emit-value
                          map-options
                        >
                          <!-- <template v-slot:prepend>
                            <q-icon name="flag_circle" />
                          </template> -->
                          <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps">
                              <q-item-section avatar>
                                <q-icon :name="scope.opt.icon" />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{ scope.opt.label }}</q-item-label>
                                <q-item-label caption>{{
                                  scope.opt.description
                                }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 col-xs-12 q-pa-md row justify-center">
                        <label>เลือกแผนการพัฒนา:</label>
                      </div>
                      <div class="col-md-9 col-xs-12 q-pa-md row justify-center">
                        <q-option-group :options="level.options" color="green" inline />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="green"
                          standout
                          bottom-slots
                          v-model="plan.learning"
                          label="เรื่อง"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="work_outline" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="green"
                          standout
                          bottom-slots
                          v-model="plan.doing"
                          label="ช่องทาง"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="work_outline" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 col-xs-12 q-pa-md row justify-center">
                        <label>ความถี่/การแจ้งเตือน:</label>
                      </div>
                      <div class="col-md-9 col-xs-12 q-pa-md row justify-center">
                        <!-- <h6>เลือกแผนการพัฒนาตนเอง</h6> -->
                        <q-option-group
                          :options="frequency.options"
                          color="green"
                          inline
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3 col-xs-12 q-pa-md row justify-center">
                        <label>ระบุระดับความเร่งด่วน:</label>
                      </div>
                      <div class="col-md-9 col-xs-12 q-pa-md row justify-center">
                        <!-- <h6>เลือกแผนการพัฒนาตนเอง</h6> -->
                        <q-option-group
                          :options="importance.options"
                          color="green"
                          inline
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <!-- v-model="employee.date" -->
                        <q-input
                          filled
                          label="วัน/เดือน/ปี:ที่จะดำเนินการสำเร็จ"
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
                    <!-- <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">PL-ID</th>
                              <th scope="col">QA-ID</th>
                              <th scope="col">Do</th>
                              <th scope="col">Lean</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="row in plans" :key="row.index">
                              <td>{{ row.planId }}</td>
                              <td>{{ row.qualificationId }}</td>
                              <td>{{ row.doing }}</td>
                              <td>{{ row.leaning }}</td>
                              <td>
                                <button
                                  class="btn btn-primary"
                                  @click="editUser(row.planId)"
                                >
                                  Edit
                                </button>
                              </td>
                              <td>
                                <button
                                  class="btn btn-warning"
                                  @click="deleteUser(row.planId)"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                            <tr></tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        {{ qualification.options }}
                      </div>
                    </div> -->
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <div class="q-pa-md">
                          <q-table
                            :grid="$q.screen.xs"
                            title="ข้อมูลแผนการพัฒนาตนเอง"
                            :rows="plans1"
                            :columns="columns"
                            row-key="skill"
                            :filter="filter"
                            :loading="loading"
                          >
                            <template v-slot:top-right>
                              <div class="col-9">
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
                              </div>
                            </template>
                            <template v-slot:body-cell-actions="props">
                              <q-td :props="props">
                                <q-btn
                                  icon="mode_edit"
                                  @click="editUser(props.row.plan_id)"
                                ></q-btn>
                                <q-btn
                                  icon="delete"
                                  @click="onDelete(props.row.plan_id)"
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
</template>

<script>
import axios from "axios";

export default {
  name: "FormPlan",
  data() {
    return {
      message: "Form Plan Career",
      title: "แผนการพัฒนาตนเอง",
      careers: Array,
      career_qualifications: Array,
      plans: Array,
      plans_: Array,
      employee_id: this.$store.getters.myMember_id,
      planCareerId: "",
      //planId	qualificationId	doing leaning
      plan: {
        plan_id: "",
        qualification_id: "",
        doing: "",
        learning: "",
      },
      isEdit: false,
      status: "บันทึก",
      Plan_Career_ids: Array,
      Name_Plan_Careers: Array,
      career: {
        options: [
          {
            label: this.Plan_Career_ids,
            value: this.Name_Plan_Careers,
          },
        ],
      },
      qualificationIds: Array,
      skills: Array,
      qualification: {
        options: [],
      },
      level: {
        options: [
          {
            label: "แผนพัฒนาตนเองโดยการเรียน",
            value: "1",
          },
          {
            label: "แผนพัฒนาตนเองโดยการทำ",
            value: "2",
          },
        ],
      },
      frequency: {
        options: [
          {
            label: "ทุกวัน",
            value: "1",
          },
          {
            label: "ทุกสัปดาห์",
            value: "2",
          },
          {
            label: "ทุกเดือน",
            value: "3",
          },
        ],
      },
      importance: {
        options: [
          {
            label: "สำคัญมาก",
            value: "1",
          },
          {
            label: "สำคัญปานกลาง",
            value: "2",
          },
          {
            label: "สำคัญน้อย",
            value: "3",
          },
        ],
      },
      columns: [
        {
          name: "plan_id",
          required: true,
          label: "รหัสแผนพัฒนาตนเอง",
          align: "center",
          field: (row) => row.plan_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "qualification_id",
          label: "รหัสคุณสมบัติ",
          align: "center",
          field: (row) => row.qualification_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "doing",
          label: "แผนพัฒนาตนเองการทำ",
          align: "left",
          field: (row) => row.doing,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "learning",
          label: "แผนพัฒนาตนเองการเรียน",
          align: "left",
          field: (row) => row.learning,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "planing",
          label: "แผนการพัฒนา",
          align: "center",
          field: (row) => row.planing,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "title",
          label: "เรื่อง",
          align: "center",
          field: (row) => row.title,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "chanel",
          label: "ช่องทาง",
          align: "center",
          field: (row) => row.chanel,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "frequency",
          label: "ความถี่",
          align: "center",
          field: (row) => row.frequency,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "importance",
          label: "ความเร่งด่วน",
          align: "center",
          field: (row) => row.importance,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "date",
          label: "วันแล้วสำเร็จ",
          align: "center",
          field: (row) => row.date,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      filter: "",
      loading: true,
      plans1: [],
    };
  },
  methods: {
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิก");
      // this.plan.planId = 0;
      // this.plan.qualificationId = 0;
      this.plan.doing = "";
      this.plan.learning = "";
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-plan.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.plans = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // getCareer() {
    //   console.log(" ข้อมูลอาชีพ ");
    //   var self = this;
    //   axios
    //     .post("http://localhost:85/ICPScoreCard/api-career-qualification.php", {
    //       action: "getEmpCareer",
    //       employee_id: this.employee_id,
    //     })
    //     .then(function (res) {
    //       self.careers = res.data;
    //       console.log("careers:", self.careers);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    // getQualification() {
    //   console.log(" แสดงข้อมูลคุณสมบัติ ");
    //   var self = this;
    //   axios
    //     .post("http://localhost:85/ICPScoreCard/api-career-qualification.php", {
    //       action: "getCareer_Qualifiation",
    //       career_id: this.planCareerId,
    //     })
    //     .then(function (res) {
    //       console.log(res);
    //       self.career_qualifications = res.data;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึก");
        console.log("Form Plan Career:", this.planCareer);
        const newPlan = {
          planId: this.plan.plan_id,
          qualificationId: this.plan.qualification_id,
          doing: this.plan.doing,
          learning: this.plan.learning,
        };
        this.$emit("saveData", newPlan);

        axios
          .post("http://localhost/ICPScoreCard/api-plan.php", {
            action: "insert",
            planId: this.plan.plan_id,
            qualificationId: this.plan.qualification_id,
            doing: this.plan.doing,
            learning: this.plan.learning,
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
          .post("http://localhost/ICPScoreCard/api-plan.php", {
            action: "update",
            planId: this.plan.plan_id,
            qualificationId: this.plan.qualification_id,
            doing: this.plan.doing,
            learning: this.plan.learning,
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
    editUser(plan_id) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-plan.php", {
          action: "edit",
          planId: plan_id,
        })
        .then(function (response) {
          console.log(response);
          self.plan.plan_id = response.data.plan_id;
          self.plan.qualification_id = response.data.qualification_id;
          self.plan.doing = response.data.doing;
          self.plan.learning = response.data.learning;

          self.plans_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(plan_id) {
      if (confirm("คุณต้องการลบรหัส " + plan_id + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost/ICPScoreCard/api-plan.php", {
            action: "delete",
            planId: plan_id,
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
    onNext() {
      this.$router.replace({ name: "FormSelfAssessment" });
    },
    onPrevious() {
      this.$router.replace({ name: "FormQualification" });
    },
    getQualification() {
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-plan.php", {
          action: "getAll",
          // career_id: this.planCareerId,
        })
        .then(function (res) {
          console.log("getUpdate():", res);
          var qualifications = res.data;
          console.log("getUpdate():", qualifications);
          var qualification_ids = res.data.map((item) => item.qualification_id);
          var skills = res.data.map((item) => item.skill);
          var careers = res.data.map((item) => item.career);
          for (var i = 0; i < qualification_ids.length; i++) {
            self.qualification.options.push({
              label: skills[i],
              value: qualification_ids[i],
              description: careers[i],
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getUpdate() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-plan.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.plans1 = res.data;
        })
        .finally(() => {
          self.loading = false;
        });
    },
  },
  created() {
    this.getQualification();
    // this.getAllUser();
    this.getUpdate();
  },
};
</script>

<style scoped>
/* h3 {
  color: #2f855a;
}
form {
  margin: 2rem auto;
  max-width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  color: white;
  text-align: left;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  color: #2f855a;
  font-weight: bold;
}
input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}
button {
  font: inherit;
  cursor: pointer;
  padding: 0.05rem 1rem;
  border-radius: 15px;
} */
</style>
