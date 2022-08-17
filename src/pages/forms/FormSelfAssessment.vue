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
                          v-model="selfAssessment.qualificationId"
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
                          v-model="selfAssessment.qualificationId"
                          :options="qualification.options"
                          label="คุณสมบัติที่กำหนด"
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
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-select
                          color="green"
                          v-model="selfAssessment.month"
                          :options="month.options"
                          label="เดือนประเมิน"
                        >
                          <template v-slot:prepend>
                            <q-icon name="flag_circle" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-select
                          color="green"
                          v-model="selfAssessment.assessment"
                          :options="asess1.options"
                          label="ประเมินตนเอง"
                        >
                          <template v-slot:prepend>
                            <q-icon name="flag_circle" />
                          </template>
                        </q-select>
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
                        <table class="table">
                          <thead>
                            <tr>
                              <th scope="col">SA-ID</th>
                              <th scope="col">QA-ID</th>
                              <th scope="col">Month</th>
                              <th scope="col">Self Assessment</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="row in selfAssessments"
                              :key="row.selfAssessmentId"
                            >
                              <td>{{ row.selfAssessmentId }}</td>
                              <td>{{ row.qualificationId }}</td>
                              <td>{{ row.month }}</td>
                              <td>{{ row.assessment }}</td>
                              <td>
                                <button
                                  class="btn btn-primary"
                                  @click="editUser(row.selfAssessmentId)"
                                >
                                  Edit
                                </button>
                              </td>
                              <td>
                                <button
                                  class="btn btn-warning"
                                  @click="deleteUser(row.selfAssessmentId)"
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
</template>

<script>
import axios from "axios";
export default {
  name: "FormSelfAssessment",
  data() {
    return {
      message: "Form Self Acessment",
      title: "การประเมินตนเอง",
      currentYear: new Date().getFullYear(),
      selfAssessments: Array,
      selfAssessments_: Array,
      careers: Array,
      career_qualifications: Array,
      employee_id: this.$store.getters.myMember_id,
      planCareerId: "",
      selfAssessment: {
        selfAssessmentId: "",
        qualificationId: "",
        month: "",
        assessment: "",
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
        options: [],
      },
      month: {
        options: [
          {
            label: "มกราคม",
            value: 1,
          },
          {
            label: "กุมภาพันธ์",
            value: 2,
          },
          {
            label: "มีนาคม",
            value: 3,
          },
          {
            label: "เมษายน",
            value: 4,
          },
          {
            label: "พฤศภาคม",
            value: 5,
          },
          {
            label: "มิถุนายน",
            value: 6,
          },
          {
            label: "กรกฏาคม",
            value: 7,
          },
          {
            label: "สิงหาคม",
            value: 8,
          },
          {
            label: "กันยายน",
            value: 9,
          },
          {
            label: "ตุลาคม",
            value: 10,
          },
          {
            label: "พฤศจิกายน",
            value: 11,
          },
          {
            label: "ธันวาคม",
            value: 12,
          },
        ],
      },
      asess1: {
        options: [
          {
            label: "ระดับ 1/รู้จักทักษะนี้เล็กน้อย",
            value: 1,
          },
          {
            label: "ระดับ 2/เคยเรียนทักษะนี้มาบ้าง",
            value: 2,
          },
          {
            label: "ระดับ 3/เคยใช้ทักษะนี้เป็นครั้งคราว",
            value: 3,
          },
          {
            label: "ระดับ 4/ได้ใช้ทักษะนี้ประจําหรือในงาน",
            value: 4,
          },
          {
            label: "ระดับ 5/ปัจจุบันสามารถสอนทักษะนี้แก่ผู้อื่นได้",
            value: 5,
          },
          {
            label: "Yes",
            value: 6,
          },
          {
            label: "No",
            value: 7,
          },
        ],
      },
    };
  },
  methods: {
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิกการบันทึกข้อมูล");
      // this.selfAssessment.selfAssessmentId = 0;
      // this.selfAssessment.qualificationId = 0;
      this.selfAssessment.month = "";
      this.selfAssessment.assessment = "";
      this.selfAssessment.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-self-assessment.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.selfAssessments = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("qualification:", this.selfAssessment);
        const newSelfAssessment = {
          selfAssessmentId: this.selfAssessment.selfAssessmentId,
          qualificationId: this.selfAssessment.qualificationId,
          month: this.selfAssessment.month,
          assessment: this.selfAssessment.assessment,
          isVisible: this.selfAssessment.isVisible,
        };
        this.$emit("saveData", newSelfAssessment);

        axios
          .post("http://localhost/ICPScoreCard/api-self-assessment.php", {
            action: "insert",
            selfAssessmentId: this.selfAssessment.selfAssessmentId,
            qualificationId: this.selfAssessment.qualificationId,
            month: this.selfAssessment.month,
            assessment: this.selfAssessment.assessment,
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
          .post("http://localhost/ICPScoreCard/api-self-assessment.php", {
            action: "update",
            selfAssessmentId: this.selfAssessment.selfAssessmentId,
            qualificationId: this.selfAssessment.qualificationId,
            month: this.selfAssessment.month,
            assessment: this.selfAssessment.assessment,
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
    getCareer() {
      console.log(" ข้อมูลอาชีพ ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-career-qualification.php", {
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
    editUser(selfAssessmentId) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-self-assessment.php", {
          action: "edit",
          selfAssessmentId: selfAssessmentId,
        })
        .then(function (response) {
          console.log(response);
          self.selfAssessment.selfAssessmentId = response.data.selfAssessmentId;
          self.selfAssessment.qualificationId = response.data.qualificationId;
          self.selfAssessment.month = response.data.month;
          self.selfAssessment.assessment = response.data.assessment;
          self.selfAssessments_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(selfAssessmentId) {
      if (confirm("คุณต้องการลบรหัส " + selfAssessmentId + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost/ICPScoreCard/api-self-assessment.php", {
            action: "delete",
            selfAssessmentId: selfAssessmentId,
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
      this.$router.replace({ name: "FormPivotTable" });
    },
    onPrevious() {
      this.$router.replace({ name: "FormPlan" });
    },
  },
  created() {
    this.getQualification();
    this.getAllUser();
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
}

input[type="radio"] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}
input[type="radio"] + label {
  font-weight: normal;
} */
</style>
