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
                      </div>
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-select
                          color="green"
                          v-model="qualification.planCareerId"
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
                      </div>
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-select
                          color="green"
                          v-model="qualification.skill"
                          :options="ca_qualification.options"
                          label="คุณสมบัติที่กำหนด"
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
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-option-group
                          v-model="qualification.level"
                          :options="level.options"
                          color="green"
                          inline
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 col-xs-12 q-pa-md">
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
                      <div class="col-md-6 col-xs-12 q-pa-md">
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
                            title="ข้อมูลคุณสมบัติ/ทักษะ"
                            :rows="qualifications1"
                            :columns="columns"
                            row-key="skill"
                            :filter="filter"
                            :loading="loading"
                          >
                            <template v-slot:top-left>
                              <div class="col-9">
                                <q-toggle
                                  v-model="filterToggle.nice_to_have"
                                  val="Nice to have"
                                  label="Nice to have"
                                />
                                <q-toggle
                                  v-model="filterToggle.must_have"
                                  val="Must have"
                                  label="Must have"
                                />
                                <q-toggle
                                  v-model="filterToggle.optional"
                                  val="Optional"
                                  label="Optional"
                                />
                                <q-toggle
                                  v-model="showAll"
                                  val="showAll"
                                  label="Show All"
                                />
                              </div>
                            </template>
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
                                  @click="onEdit(props.row)"
                                ></q-btn>
                                <q-btn
                                  icon="delete"
                                  @click="onDelete(props.row)"
                                ></q-btn>
                              </q-td>
                            </template>
                          </q-table>
                          <div>{{ filter1 }}</div>
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
    {{ qualifications_ }}
  </div>
  <div class="py-2">
    {{ qualification }}
  </div> -->
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  name: "FormQualification",
  components: {},
  data() {
    return {
      filterToggle: {
        nice_to_have: true,
        must_have: true,
        optional: true,
      },
      search: "",
      message: "Form Qualification",
      title: "คุณสมบัติของอาชีพ",
      selected: "",
      qualifications: Array,
      // qualifications_: Array,
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
          "Yes",
          "No",
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
      ca_qualification_ids: Array,
      ca_qualifications: Array,
      ca_qualification: {
        options: [
          {
            label: this.Plan_Career_ids,
            value: this.Name_Plan_Careers,
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
      this.qualification.skill = "";
      this.qualification.level = "";
      this.qualification.goal = "";
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
          self.Plan_Career_ids = res.data.map((item) => item.Plan_Career_id);
          self.Name_Plan_Careers = res.data.map(
            (item) => item.Name_Plan_Career
          );
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
          self.ca_qualification_ids = res.data.map(
            (item) => item.career_qualification_id
          );
          self.ca_qualifications = res.data.map((item) => item.qualification);
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
          // self.qualifications_ = response.data;
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
    customFilter(rows, terms) {
      console.log(terms, rows);
      let lowerSearch = terms.search ? terms.search.toLowerCase : "";
      const filteredRows = rows.filter((row, i) => {
        let ans = false;
        let c1 = this.filterToggle.nice_to_have && row.level == "Nice to have";
        let c2 = this.filterToggle.must_have && row.level == "Must have";
        let c3 = this.filterToggle.optional && row.level == "Optional";
        console.log("c1:", c1);
        console.log("c2:", c2);
        console.log("c3:", c3);
        let s1 = true;
        if (lowerSearch != "") {
          s1 = false;
          let s1_values = Object.values(row);
          let s1_lower = s1_values.map((x) => x.toString().toLowerCase());
          for (let val = 0; val < s1_lower.length; val++) {
            if (s1_lower[val].includes(lowerSearch)) {
              s1 = true;
              break;
            }
          }
        }
        ans = false;
        if ((c1 && s1) || (c2 && s1) || (c3 && s1)) {
          ans = true;
        }
        return ans;
      });
      return filteredRows;
    },
  },

  setup() {
    const loading = ref(true);
    const qualifications1 = ref([]);
    const qualifications1_ = ref([]);
    const QC = [
      {
        qualificationId: "",
        planCareerId: "",
        skill: "",
        level: "",
        goal: "",
      },
    ];
    const columns = [
      {
        name: "qualificationId",
        required: true,
        label: "รหัสคุณสมบัติ",
        align: "center",
        field: (row) => row.qualificationId,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "planCareerId",
        label: "รหัสแผนอาชีพ",
        align: "center",
        field: (row) => row.planCareerId,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "skill",
        label: "คุณสมบัติ/ทักษะ",
        field: (row) => row.skill,
        format: (val) => `${val}`,
      },
      {
        name: "level",
        label: "ระดับ",
        field: (row) => row.level,
        format: (val) => `${val}`,
      },
      {
        name: "goal",
        label: "เป้าหมาย",
        field: (row) => row.goal,
        format: (val) => `${val}`,
      },
      { name: "actions", align: "center", label: "Action" },
    ];
    axios
      .post("http://localhost:85/ICPScoreCard/api-qualification.php", {
        action: "getall",
      })
      .then(function (res) {
        console.log("q-table:", res);
        qualifications1.value = res.data;
        console.log("qualifications1.value:", qualifications1.value);
      })
      .finally(() => {
        loading.value = false;
      });
    const onEdit = (row) => {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost:85/ICPScoreCard/api-qualification.php", {
          action: "edit",
          qualificationId: row.qualificationId,
        })
        .then(function (response) {
          console.log(response);
          QC.qualificationId = response.data.qualificationId;
          QC.planCareerId = response.data.planCareerId;
          QC.skill = response.data.skill;
          QC.level = response.data.level;
          QC.goal = response.data.goal;
          qualifications1_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const onDelete = (row) => {
      if (confirm("คุณต้องการลบรหัส " + row.qualificationId + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost:85/ICPScoreCard/api-qualification.php", {
            action: "delete",
            qualificationId: row.qualificationId,
          })
          .then(function (response) {
            console.log(response);
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
      qualifications1,
      qualifications1_,
      QC,
      // onEdit,
      // onDelete,
    };
  },
  created() {
    this.getAllUser();
    this.getCareer();
  },
  computed: {
    showAll: {
      get: function () {
        console.log(this.filterToggle);
        return (
          this.filterToggle.nice_to_have &&
          this.filterToggle.must_have &&
          this.filterToggle.optional
        );
      },
      set: function (newValue) {
        this.filterToggle.nice_to_have = newValue;
        this.filterToggle.must_have = newValue;
        this.filterToggle.optional = newValue;
      },
    },
    filter1() {
      return {
        search: this.search,
        nice_to_have: this.filterToggle.nice_to_have,
        must_have: this.filterToggle.must_have,
        optional: this.filterToggle.optional,
      };
    },
  },
};
</script>

<style scoped></style>
