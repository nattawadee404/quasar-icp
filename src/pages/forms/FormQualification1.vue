<template>
  <form @submit.prevent="submitForm" @reset.prevent="resetForm" method="post">
    <div class="q-title text-center">
      <h4>คุณสมบัติ/ทักษะ</h4>
    </div>

    <!-- <div class="row">
      <div class="input-field col s4">
        <label for="qualification-id">QA-ID/รหัสคุณสมบัติ:</label>
        <input
          type="text"
          name="qualification-id"
          v-model="qualification.qualificationId"
          placeholder="QA-ID/รหัสคุณสมบัติ"
          required
          disabled
          class="form-control form-control-lg"
        />
      </div>
    </div> -->
    <div class="row">
      <div class="input-field col s4">
        <!-- <label for="planCareer-id">PC-ID/รหัสแผนอาชีพ:</label>
        <input
          type="text"
          name="Name_Plan_Career"
          v-model="qualification.planCareerId"
          placeholder="Career/อาชีพ"
          required
          disabled
          class="form-control form-control-lg"
        /> -->
        <q-input
          color="white"
          bg-color="green"
          standout
          bottom-slots
          v-model="qualification.planCareerId"
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

        <select
          :size="4"
          v-model="qualification.planCareerId"
          :required="true"
          @change="getQualification()"
        >
          <option value="" disabled selected>อาชีพที่ต้องการ:</option>
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
        <q-input
          color="white"
          bg-color="green"
          standout
          bottom-slots
          v-model="qualification.skill"
          label="คุณสมบัติที่กำหนด"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="person_add_alt" />
          </template>
          <template v-slot:append>
            <q-icon name="favorite" />
          </template>
        </q-input>

        <select :size="4" v-model="qualification.skill">
          <option value="" disabled selected>คุณสมบัติที่กำหนด:</option>
          <option
            v-for="career_qualification in career_qualifications"
            :value="career_qualification.skill"
            :key="career_qualification.index"
          >
            {{ career_qualification.career_qualification_id }}
            {{ career_qualification.qualification }}
            {{ career_qualification.level }}
          </option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <q-input
          color="white"
          bg-color="green"
          standout
          bottom-slots
          v-model="qualification.level"
          label="ระดับ"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="download_done" />
          </template>
          <template v-slot:append>
            <q-icon name="favorite" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <q-option-group
          v-model="qualification.level"
          :options="level.options"
          color="green"
          inline
        />
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <q-input
          color="white"
          bg-color="green"
          standout
          bottom-slots
          v-model="qualification.goal"
          label="เป้าหมาย"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="flag_circle" />
          </template>
          <template v-slot:append>
            <q-icon name="favorite" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s4">
        <q-select
          color="green"
          v-model="qualification.goal"
          :options="target.options"
          label="กำหนดเป้าหมาย"
          @change="getLevel()"
        >
          <template v-slot:prepend>
            <q-icon name="flag_circle" />
          </template>
        </q-select>
      </div>
    </div>
    <div class="input-field col s4">
      <q-option-group
        v-model="qualification.goal"
        :options="target.choices"
        color="green"
        inline
      />
    </div>

    <div class="form-contol">
      <div style="padding: 16px" class="flex justify-center">
        <q-btn
          type="submit"
          color="grey-4"
          text-color="black"
          glossy
          unelevated
          icon="save"
          label="Save/บันทึก"
        />
        <q-btn
          type="reset"
          color="grey-4"
          text-color="black"
          glossy
          unelevated
          icon="clear"
          label="Cancel/ยกเลิก"
        />
      </div>
    </div>
  </form>
  <!-- <div class="py-2">
    {{ qualifications_ }}
  </div>
  <div class="py-2">
    {{ qualification }}
  </div> -->
  <!-- <div class="py-2">employee_id:{{ employee_id }} careers:{{ careers }}</div>
  <div class="py-2">career_qualifications: {{ career_qualifications }}</div> -->
  <div class="py-2">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">QA-ID</th>
          <th scope="col">PC-ID</th>
          <th scope="col">Qualification/Skill</th>
          <th scope="col">Level</th>
          <th scope="col">Goal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in qualifications" :key="row.index">
          <td>{{ row.qualificationId }}</td>
          <td>{{ row.planCareerId }}</td>
          <td>{{ row.skill }}</td>
          <td>{{ row.level }}</td>
          <td>{{ row.goal }}</td>
          <td>
            <button
              class="btn btn-primary"
              @click="editUser(row.qualificationId)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              class="btn btn-warning"
              @click="deleteUser(row.qualificationId)"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FormQualification",
  components: {},
  data() {
    return {
      message: "Form Qualification",
      selected: "",
      qualifications: Array,
      qualifications_: Array,
      employee_id: this.$store.getters.myMember_id,
      careerPath: "",
      careers: Array,
      career_qualifications: Array,
      qualification: {
        qualificationId: "",
        planCareerId: "",
        skill: "",
        level: "",
        goal: "",
        // month: "มกราคม",
        // self_assessment: "Yes",
        isVisible: false,
      },
      isEdit: false,
      status: "บันทึก",
      target: {
        options: [
          "ระดับ 1: รู้จักทักษะเล็กน้อย",
          "ระดับ 2: เคยเรียนทักษะมาบ้าง",
          "ระดับ 3: เคยใช้ทักษะเป็นครั้งคราว",
          "ระดับ 4: ได้ใช้ทักษะประจําหรือในงาน",
          "ระดับ 5: ปัจจุบันสามารถสอนทักษะนี้แก่ผู้อื่นได้",
        ],
        choices: [
          {
            label: "Yes",
            value: "Yes",
          },
          {
            label: "No",
            value: "No",
          },
        ],
      },
      level: {
        options: [
          {
            label: "Must have",
            value: "Must have",
          },
          {
            label: "Nice to have",
            value: "Nice to have",
          },
          ,
          {
            label: "Option",
            value: "Option",
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
      // this.qualification.qualificationId = 0;
      // this.qualification.planCareerId = 0;
      this.qualification.skill = "";
      this.qualification.level = "";
      this.qualification.goal = "";
      // this.qualification.month = "";
      // this.qualification.self_assessment = "";
      this.qualification.isVisible = false;
    },
    getAllUser() {
      console.log(" แสดงข้อมูลทั้งหมด ");
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-qualification.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log(res);
          self.qualifications = res.data;
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
          action: "getCareerQualifiation",
          career_id: this.qualification.planCareerId,
        })
        .then(function (res) {
          console.log(res);
          self.career_qualifications = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getLevel() {
      console.log(" แสดงข้อมูลระดับ ");
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล");
        console.log("qualification:", this.qualification);
        const newQualification = {
          qualificationId: this.qualification.qualificationId,
          planCareerId: this.qualification.planCareerId,
          skill: this.qualification.skill,
          level: this.qualification.level,
          goal: this.qualification.goal,
          // month: this.qualification.month,
          // result: this.qualification.self_assessment,
          isVisible: this.qualification.isVisible,
        };
        this.$emit("saveData", newQualification);

        axios
          .post("http://localhost:85/ICPScoreCard/api-qualification.php", {
            action: "insert",
            qualificationId: this.qualification.qualificationId,
            planCareerId: this.qualification.planCareerId,
            skill: this.qualification.skill,
            level: this.qualification.level,
            goal: this.qualification.goal,
            // month: this.qualification.month,
            // result: this.qualification.self_assessment,
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
          .post("http://localhost:85/ICPScoreCard/api-qualification.php", {
            action: "update",
            qualificationId: this.qualification.qualificationId,
            planCareerId: this.qualification.planCareerId,
            skill: this.qualification.skill,
            level: this.qualification.level,
            goal: this.qualification.goal,
            // month: this.qualification.month,
            // result: this.qualification.self_assessment,
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
    editUser(qualificationId) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-qualification.php", {
          action: "edit",
          qualificationId: qualificationId,
        })
        .then(function (response) {
          console.log(response);
          self.qualification.qualificationId = response.data.qualificationId;
          self.qualification.planCareerId = response.data.planCareerId;
          self.qualification.skill = response.data.skill;
          self.qualification.level = response.data.level;
          self.qualification.goal = response.data.goal;
          // self.qualification.month = response.data.month;
          // self.qualification.self_assessment = response.data.self_assessment;
          self.qualifications_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(qualificationId) {
      if (confirm("คุณต้องการลบรหัส " + qualificationId + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost:85/ICPScoreCard/api-qualification.php", {
            action: "delete",
            qualificationId: qualificationId,
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
h4 {
  color: #2f855a;
  text-shadow: 2px 2px #00ff33;
}
form {
  margin: 2rem auto;
  max-width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  padding: 2rem;
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
}
</style>
