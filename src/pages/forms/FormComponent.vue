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
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="blue-5"
                          standout
                          bottom-slots
                          v-model="employee.name"
                          label="ชื่อ-สกุล"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="person_add" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="blue-5"
                          standout
                          bottom-slots
                          v-model="employee.year"
                          label="ชั้นปีที่กำลังศึกษา"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="person_add" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-input
                          filled
                          v-model="employee.date"
                          label="ปีที่สำเร็จการศึกษา : วัน/เดือน/ปี"
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
                                <q-date v-model="employee.date">
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
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="blue-3"
                          standout
                          bottom-slots
                          v-model="employee.degree"
                          label="ระดับการศึกษา"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="school" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-select
                          color="blue-3"
                          :options="degree.options"
                          v-model="employee.degree"
                          label="เลือกระดับการศึกษา"
                        >
                          <template v-slot:prepend>
                            <q-icon name="school" />
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="blue-3"
                          standout
                          bottom-slots
                          v-model="employee.study_faculty"
                          label="ระบุสาขาวิชา"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="school" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-select
                          color="blue-3"
                          v-model="employee.study_faculty"
                          :options="department.options"
                          label="เลือกสาขา"
                        >
                          <template v-slot:prepend>
                            <q-icon name="school" />
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="blue-3"
                          standout
                          bottom-slots
                          v-model="employee.university"
                          label="ระบุสถาบันการศึกษา"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="school" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-select
                          color="blue-3"
                          v-model="employee.university"
                          :options="university.options"
                          label="เลือกสถาบันการศึกษา"
                        >
                          <template v-slot:prepend>
                            <q-icon name="school" />
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="blue-3"
                          standout
                          bottom-slots
                          v-model="employee.disability_type"
                          label="ระบุความบกพร่อง"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="assist_walker" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-md-6 col-xs-12 q-pa-md">
                        <q-select
                          color="blue-3"
                          v-model="employee.disability_type"
                          :options="disability.options"
                          label="เลือกประเภทความพิการ"
                        >
                          <template v-slot:prepend>
                            <q-icon name="assist_walker" />
                          </template>
                        </q-select>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 col-xs-12 q-pa-md">
                        <q-input
                          color="white"
                          bg-color="blue-3"
                          standout
                          bottom-slots
                          v-model="employee.disability_type"
                          label="รายละเอียดความบกพร่อง"
                          clearable
                        >
                          <template v-slot:prepend>
                            <q-icon name="assist_walker" />
                          </template>
                          <template v-slot:append>
                            <q-icon name="favorite" />
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
                  </q-form>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 col-xs-12 q-pa-md">
                  <div class="q-pa-md">
                    <q-table
                      class="my-sticky-header-table"
                      :grid="$q.screen.xs"
                      title="ข้อมูลส่วนตัว"
                      :rows="employees1"
                      :columns="columns"
                      row-key="name"
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
                          <q-btn icon="mode_edit" @click="editUser(props.row.id)"></q-btn>
                          <q-btn
                            icon="delete"
                            @click="deleteUser(props.row.id, props.row.name)"
                          ></q-btn>
                        </q-td>
                      </template>
                    </q-table>
                  </div>
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
//EP-ID	Name	Study Faculty	University	Disibility type
export default {
  name: "FormComponent",
  data() {
    return {
      title: "ข้อมูลส่วนตัว",
      email: "",
      username: "",
      password: "",
      repassword: "",
      register: false,
      passwordFieldType: "password",
      btnLabel: "กดปุ่ม",
      visibility: false,
      visibilityIcon: "visibility",
      input: {
        username: "",
        password: "",
      },
      member: {
        member_id: 0,
        full_name: "",
        status: "",
      },
      employees: Array,
      employees_: Array,
      degree: {
        options: [
          "มัธยมศึกษาตอนต้น",
          "มัธยมศึกษาตอนปลาย",
          "ปวช",
          "ปวส",
          "ปริญญาตรี",
          "ปริญญาโท",
          "ปริญญาเอก",
        ],
      },
      university: {
        options: [
          "มหาวิทยาลัยเชียงใหม่",
          "มหาวิทยาลัยแม่โจ้",
          "มหาวิทยาลัยราชภัฏเชียงใหม่",
        ],
      },
      department: {
        options: [
          "การบริหารจัดการ",
          "การเงินและการจัดการ",
          "บริหารธุรกิจ",
          "วิทยาการคอมพิวเตอร์",
        ],
      },
      disability: {
        options: [
          "การเห็น",
          "การได้ยิน",
          "สติปัญญา",
          "ร่างกาย",
          "การเรียนรู้",
          "การพูด",
          "พฤติกรรม",
          "ออทิสติก",
          "พิการซ้ำซ้อน",
          "ปกติ",
        ],
      },
      employee: {
        id: "",
        member_id: this.$store.getters.myMember_id,
        name: this.$store.getters.myName,
        year: "",
        date: "",
        degree: "",
        study_faculty: "",
        university: "",
        disability_type: "",
      },
      isEdit: false,
      status: "บันทึก",
      columns: [
        {
          name: "mem_id",
          required: true,
          label: "mem_id",
          align: "center",
          field: (row) => row.member_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "full_name",
          align: "center",
          label: "ชื่อ-สกุล",
          field: (row) => row.full_name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "year",
          align: "center",
          label: "ปีที่กำลังศึกษา",
          field: (row) => row.year,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "date",
          align: "center",
          label: "ปีที่สำเร็จการศึกษา",
          field: (row) => row.date,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "degree",
          align: "center",
          label: "ระดับการศึกษา",
          field: (row) => row.degree,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "study_faculty",
          align: "center",
          label: "สาขา",
          field: (row) => row.study_faculty,
          format: (val) => `${val}`,
        },
        {
          name: "university",
          align: "center",
          label: "สถาบันการศึกษา",
          field: (row) => row.university,
          format: (val) => `${val}`,
        },
        {
          name: "disability_type",
          align: "center",
          label: "ความพิการ",
          field: (row) => row.disability_type,
          format: (val) => `${val}`,
        },
        { name: "actions", align: "center", label: "Action" },
      ],
      filter: "",
      loading: true,
      employees1: [],
    };
  },

  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        this.checkMember();
      } else {
        console.log("A username and password must be present");
      }
    },
    checkMember() {
      console.log(" ตรวจสอบข้อมูลสมาชิค ");
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api-member.php", {
          action: "checkMember",
          user: this.input.username,
          pass: this.input.password,
        })
        .then(function (res) {
          self.member.member_id = res.data.map((item) => item.member_id)[0];
          self.member.full_name = res.data.map((item) => item.full_name)[0];
          self.member.status = res.data.map((item) => item.status)[0];
          self.storeCommit(
            self.member.member_id,
            self.member.full_name,
            self.member.status
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    storeCommit(member_id, full_name, status) {
      console.log("login:", member_id);
      console.log("login:", full_name);
      console.log("login:", status);
      if (member_id != 0 && full_name != "" && status != "") {
        this.$store.commit("setMyAuthenticate", true);
        this.$store.commit("setMyMember_id", member_id);
        this.$store.commit("setMyName", full_name);
        this.$store.commit("setMyStatus", status);
        this.$router.replace({ name: "home" });
      } else {
        console.log("The username and / or password is incorrect");
      }
    },
    required(val) {
      return (val && val.length > 0) || "ช่องที่ต้องกรอก";
    },
    diffPassword(val) {
      const val2 = this.password;
      return (val && val === val2) || "รหัสผ่านไม่ตรงกัน!";
    },
    short(val) {
      return (val && val.length > 3) || "ค่าสั้นเกินไป";
    },
    isEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "กรุณาใส่อีเมลที่ถูกต้อง";
    },
    switchTypeForm() {
      this.register = !this.register;
      this.title = this.register ? "ผู้ใช้ใหม่" : "การอนุญาต";
      this.btnLabel = this.register ? "การลงทะเบียน" : "ทางเข้า";
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
    resetForm() {
      this.status = "บันทึก";
      this.isEdit = false;
      console.log("ยกเลิกการบันทึกข้อมูล");
      this.employee.id = "";
      this.employee.member_id = "";
      this.employee.name = "";
      this.employee.year = "";
      this.employee.date = "";
      this.employee.degree = "";
      this.employee.study_faculty = "";
      this.employee.university = "";
      this.employee.disability_type = "";
    },
    submitForm() {
      if (!this.isEdit) {
        console.log("บันทึกข้อมูล:", this.employee);
        const newEmployee = {
          id: this.employee.id,
          member_id: this.employee.member_id,
          name: this.employee.name,
          year: this.employee.year,
          date: this.employee.date,
          degree: this.employee.degree,
          study_faculty: this.employee.study_faculty,
          university: this.employee.university,
          disibility_type: this.employee.disability_type,
        };
        this.$emit("saveData", newEmployee);

        axios
          .post("http://localhost/ICPScoreCard/api.php", {
            action: "insert",
            id: this.employee.id,
            member_id: this.employee.member_id,
            name: this.employee.name,
            year: this.employee.year,
            date: this.employee.date,
            degree: this.employee.degree,
            study_faculty: this.employee.study_faculty,
            university: this.employee.university,
            disibility_type: this.employee.disability_type,
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
          .post("http://localhost/ICPScoreCard/api.php", {
            action: "update",
            id: this.employee.id,
            member_id: this.employee.member_id,
            name: this.employee.name,
            year: this.employee.year,
            date: this.employee.date,
            degree: this.employee.degree,
            study_faculty: this.employee.study_faculty,
            university: this.employee.university,
            disability_type: this.employee.disability_type,
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
    editUser(id) {
      this.status = "Update(อัพเดท)";
      this.isEdit = true;
      var self = this;
      axios
        .post("http://localhost/ICPScoreCard/api.php", {
          action: "edit",
          id: id,
        })
        .then(function (response) {
          console.log(response);
          self.employee.id = response.data.id;
          self.employee.member_id = response.data.member_id;
          self.employee.name = response.data.name;
          self.employee.year = response.data.year;
          self.employee.date = response.data.date;
          self.employee.degree = response.data.degree;
          self.employee.study_faculty = response.data.study_faculty;
          self.employee.university = response.data.university;
          self.employee.disability_type = response.data.disability_type;
          self.employees_ = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteUser(id, name) {
      if (confirm("คุณต้องการลบรหัส " + name + " หรือไม่ ?")) {
        var self = this;
        axios
          .post("http://localhost/ICPScoreCard/api.php", {
            action: "delete",
            id: id,
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
        .post("http://localhost/ICPScoreCard/api.php", {
          action: "getall",
        })
        .then(function (res) {
          console.log("q-table:", res);
          self.employees1 = res.data;
          console.log("employees1.value:", self.employees1.value);
        })
        .finally(() => {
          self.loading = false;
        });
    },
    onNext() {
      this.$router.replace({ name: "FormPlanCareer" });
    },
    onPrevious() {},
  },
  mounted() {
    this.getUpdate();
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
