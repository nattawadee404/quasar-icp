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
                          v-model="planCareerId"
                          label="อาชีพ"
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
                          v-model="planCareerId"
                          :options="career.options"
                          label="อาชีพที่ต้องการ"
                        >
                          <template v-slot:prepend>
                            <q-icon name="flag_circle" />
                          </template>
                        </q-select>
                      </div>
                    </div>
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
                          label="คุณสมบัติที่กำหนด"
                        >
                          <template v-slot:prepend>
                            <q-icon name="flag_circle" />
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="green"
                          standout
                          bottom-slots
                          v-model="plan.leaning"
                          label="แผนการเรียนรู้"
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
                          label="แผนการปฏิบัติ"
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

  <!-- <h3>แผนปฏิบัติ/เรียนรู้</h3>
  <form @submit.prevent="submitForm" @reset.prevent="resetForm" method="post">
    <div class="row">
      <div class="input-field col s4">
        <label for="plan-id">PL-ID/รหัสแผนเรียน/ทำ:</label>
        <input
          type="text"
          name="planId"
          v-model="plan.planId"
          placeholder="PL-ID/รหัสแผนเรียน/ทำ"
          required
          disabled
          class="form-control form-control-lg"
        />
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="career_plan-id">CA-ID/รหัสอาชีพ:</label>
        <input
          type="text"
          name="Career"
          v-model="planCareerId"
          placeholder="Career/อาชีพ"
          required
          disabled
          class="form-control form-control-lg"
        />
        <select
          :size="4"
          v-model="planCareerId"
          :required="true"
          @change="getQualification()"
        >
          <option value="" disabled selected>อาชีพ:</option>
          <option
            v-for="career in careers"
            :value="career.Plan_Career_id"
            :key="career.index"
          >
            {{ career.Plan_Career_id }} {{ career.Name_Plan_Career }}
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="input-field col s4">
        <label for="qualification-id">QA-ID/รหัสคุณสมบัติ:</label>
        <input
          type="text"
          name="qualification"
          v-model="plan.qualificationId"
          placeholder="Qualification/คุณสมบัติ"
          required
          disabled
          class="form-control form-control-lg"
        />
        <select :size="4" v-model="plan.qualificationId">
          <option value="" disabled selected>กำหนดคุณสมบัติ:</option>
          <option
            v-for="career_qualification in career_qualifications"
            :value="career_qualification.qualificationId"
            :key="career_qualification.index"
          >
            {{ career_qualification.qualificationId }}
            {{ career_qualification.skill }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="leaning">Learning plan/แผนการเรียนรู้:</label>
        <input
          type="text"
          name="leaning"
          v-model="plan.leaning"
          placeholder="Learnning plan/แผนการเรียนรู้"
          class="form-control form-control-lg"
        />
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <label for="doing">Doing plan/แผนปฏิบัติการ:</label>
        <input
          type="text"
          name="doing"
          v-model="plan.doing"
          placeholder="Do/แผนปฏิบัติการ"
          class="form-control form-control-lg"
        />
      </div>
    </div>
    <div class="form-contol">
      <input type="submit" value="Save/บันทึก" class="btn btn-success" />
      <input type="reset" value="Cancel/ยกเลิก" class="btn btn-danger" />
    </div>
  </form> -->

  <!-- <div class="py-2">
    {{ plans_ }}
  </div>
  <div class="py-2">
    {{ plan }}
  </div> -->
  <!-- <div>employee_id: {{ employee_id }} careers: {{ careers }}</div>
  <div>career_qualifications: {{ career_qualifications }}</div> -->

  <!-- <div class="py-2">
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
            <button class="btn btn-primary" @click="editUser(row.planId)">
              Edit
            </button>
          </td>
          <td>
            <button class="btn btn-warning" @click="deleteUser(row.planId)">
              Delete
            </button>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div> -->
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
        planId: "",
        qualificationId: "",
        doing: "",
        leaning: "",
        isVisible: false,
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
        options: [
          {
            label: this.qualificationIds,
            value: this.skills,
          },
        ],
      },
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
      this.plan.leaning = "";
      this.plan.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-plan.php", {
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
    getCareer() {
      console.log(" ข้อมูลอาชีพ ");
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-career-qualification.php", {
          action: "getEmpCareer",
          employee_id: this.employee_id,
        })
        .then(function (res) {
          self.careers = res.data;
          console.log("careers:", self.careers);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getQualification() {
      console.log(" แสดงข้อมูลคุณสมบัติ ");
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-career-qualification.php", {
          action: "getCareer_Qualifiation",
          career_id: this.planCareerId,
        })
        .then(function (res) {
          console.log(res);
          self.career_qualifications = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึก");
        console.log("Form Plan Career:", this.planCareer);
        const newPlan = {
          planId: this.plan.planId,
          qualificationId: this.plan.qualificationId,
          doing: this.plan.doing,
          leaning: this.plan.leaning,
        };
        this.$emit("saveData", newPlan);

        axios
          .post("http://localhost:85/ICPScoreCard/api-plan.php", {
            action: "insert",
            planId: this.plan.planId,
            qualificationId: this.plan.qualificationId,
            doing: this.plan.doing,
            leaning: this.plan.leaning,
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
          .post("http://localhost:85/ICPScoreCard/api-plan.php", {
            action: "update",
            planId: this.plan.planId,
            qualificationId: this.plan.qualificationId,
            doing: this.plan.doing,
            leaning: this.plan.leaning,
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
    editUser(planId) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-plan.php", {
          action: "edit",
          planId: planId,
        })
        .then(function (response) {
          console.log(response);
          self.plan.planId = response.data.planId;
          self.plan.qualificationId = response.data.qualificationId;
          self.plan.doing = response.data.doing;
          self.plan.leaning = response.data.leaning;

          self.plans_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(planId) {
      if (confirm("คุณต้องการลบรหัส " + planId + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost:85/ICPScoreCard/api-plan.php", {
            action: "delete",
            planId: planId,
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
  created() {
    this.getAllUser();
    this.getCareer();
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
