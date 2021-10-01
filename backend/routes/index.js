const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const loginRoute = require("./login-route");
const studentRoute = require("./student-routes");
const userRoute = require("./user-route");
const schoolRoute = require("./school-routes");
const gradeRoute = require("./grades-routes");
const attendanceRoute = require("./attendance-routes");
const assignmentRoute = require("./assignments-routes");
const anScolarRoute = require("./anScolar-routes");
const parentRoute = require("./parents-routes");
const classRoute = require("./class-routes");
const courseRoute = require("./courses-routes");
const semestreRoute = require("./semestre-routes");
const repartizareRoute = require("./repartizare-routes");
const conditiiRoute = require("./conditiiPromovare-routes");
const corigentaRoute = require("./corigenta-routes");
const repetentRoute = require("./repetent-routes");
const istoricClaseRoute = require("./istoricClase-routes");
const intervalClaseRoute = require("./intervalClase-routes");

router.use(loginRoute.loginChecker);
router.post("/api/login", loginRoute.login);
router.post("/api/logout", loginRoute.logout);
router.post("/api/register", userRoute.addUser);
router.get("/api/isLoggedIn", loginRoute.isLoggedIn);

//User
router.post("/api/user/add", userRoute.addUser);
router.put("/api/user/update/:id", userRoute.updateUser);
router.get("/api/profesori/get/:id_scoala", userRoute.getTeachers);
router.get(
  "/api/profesor/getTeacherByRepartizare/:id_repartizare",
  userRoute.getTeacherByRepartizare
);

//School
router.post("/api/school/add", schoolRoute.addSchool);

//student
router.post("/api/student/add", studentRoute.addStudent);
router.put("/api/student/update/:id_student", studentRoute.updateStudent);
router.delete("/api/student/delete/:id", studentRoute.deleteStudent);
router.get(
  "/api/student/getBySchoolYear/:id_an_scolar",
  studentRoute.getBySchoolYear
);
router.get("/api/student/getByClass/:id_clasa", studentRoute.getByClass);
router.get(
  "/api/student/getByRepartizare/:id_repartizare",
  studentRoute.getByRepartizare
);
router.get(
  "/api/student/getWithParents/:id_an_scolar",
  studentRoute.getWithParents
);
router.get(
  "/api/student/getByParent/:id_an_scolar/:id_user",
  studentRoute.getByParent
);
router.get(
  "/api/student/getWithAttendance/:id_an_scolar/:date/:id_clasa",
  studentRoute.getWithAttendance
);

//parent
router.post("/api/parent/add", parentRoute.addParent);
router.get("/api/parent/getCopii/:id_user", parentRoute.getCopii);

//Course
router.post("/api/course/add", courseRoute.addCourse);
router.get("/api/course/getBySchool/:id_scoala", courseRoute.getBySchool);
router.get("/api/course/getByClass/:id_clasa", courseRoute.getByClass);
router.put("/api/course/update/:id", courseRoute.update);
router.delete("/api/course/delete/:id", courseRoute.deleteCourse);

//Class
router.post("/api/class/add/:id_an_scolar", classRoute.addClass);
router.get(
  "/api/class/getBySchoolYear/:id_an_scolar",
  classRoute.getBySchoolYear
);
router.get("/api/class/getByStudent/:id_user", classRoute.getByStudent);
router.put("/api/course/update/:id", classRoute.updateClass);
router.put("/api/class/promote/:id_an_scolar/:id_clasa", classRoute.promote);

//grade
router.post("/api/grade/add", gradeRoute.addGrade);
router.put("/api/grade/update/:id_evaluare/:id_elev", gradeRoute.updateGrade);
router.delete(
  "/api/grade/delete/:id_evaluare/:id_elev",
  gradeRoute.deleteGrade
);
router.get(
  "/api/grade/getByDiscipline/:id_repartizare",
  gradeRoute.getByDiscipline
);
router.get(
  "/api/grade/getByAssignment/:id_evaluare",
  gradeRoute.getByAssignment
);
router.get(
  "/api/grade/getMedie/:id_an_scolar/:id_disciplina/:id_elev",
  gradeRoute.getMedieByStudentAndDiscipline
);

//assignment
router.post("/api/assignment/add", assignmentRoute.addAssignment);
router.put("/api/grade/update/:id", assignmentRoute.updateAssignment);
router.delete("/api/grade/delete/:id", assignmentRoute.deleteAssignment);
router.get(
  "/api/assignment/getAssignmentsWithGrades/:id_semestru/:id_repartizare",
  assignmentRoute.getAssignmentsWithGrades
);
router.get(
  "/api/assignment/getByIdAndUser/:id_evaluare/:id_user",
  assignmentRoute.getByIdAndUser
);
router.get("/api/assignment/getById/:id_evaluare", assignmentRoute.getById);
router.put("/api/assignments/update", assignmentRoute.update);

//attendance
router.post("/api/attendance/add", attendanceRoute.addAttendance);
router.put("/api/attendance/update", attendanceRoute.updateAttendance);
router.get(
  "/api/attendance/getByDate/:data_participare/:id_repartizare",
  attendanceRoute.getByDate
);
router.get(
  "/api/attendance/getByStudentAndDate/:date/:id_user",
  attendanceRoute.getByStudentAndDate
);
router.get(
  "/api/attendance/getNrNemotivate/:id_an_scolar/:id_elev",
  attendanceRoute.getNrNemotivate
);
router.get(
  "/api/attendance/getAll/:id_an_scolar/:id_elev",
  attendanceRoute.getAll
);
router.get(
  "/api/attendance/getByStudentAndPeriod/:start_date/:final_date/:id_elev",
  attendanceRoute.getByStudentAndPeriod
);

//an scolar
router.post("/api/anScolar/add/:id_scoala", anScolarRoute.addAnScolar);
router.get("/api/anScolar/getBySchool/:id_scoala", anScolarRoute.getBySchool);
router.get(
  "/api/anScolar/getAnScolarUrmator/:id_scoala/:id_an_scolar",
  anScolarRoute.getAnScolarUrmator
);
router.get(
  "/api/anScolar/getAllWithSemester/:id_scoala",
  anScolarRoute.getAllWithSemester
);
router.put("/api/anScolar/update/:id_an_scolar", anScolarRoute.update);

//semestru
router.post("/api/semestru/add/:id_an_scolar", semestreRoute.addSemestre);
router.get(
  "/api/semestru/getBySchoolYear/:id_an_scolar",
  semestreRoute.getBySchoolYear
);
router.put("/api/anScolar/update/:id_semestru", semestreRoute.update);

//repartizare
router.post("/api/repartizare/add", repartizareRoute.addRepartizare);
router.get(
  "/api/repartizare/getByTeacher/:id_scoala/:id_an_scolar/:id_profesor",
  repartizareRoute.getByTeacher
);
router.get(
  "/api/repartizare/getClaseDisponibile/:id_an_scolar/:id_disciplina",
  repartizareRoute.getClaseDisponibile
);

//conditii promovare
router.get(
  "/api/conditiiPromovare/getBySchool/:id_scoala",
  conditiiRoute.getBySchool
);
router.post("/api/conditiiPromovare/add", conditiiRoute.add);
router.put("/api/conditiiPromovare/update/:id", conditiiRoute.update);

//corigente
router.post("/api/corigenta/add", corigentaRoute.add);

//repetenti
router.post("/api/repetenti/add", repetentRoute.add);
router.delete("/api/repetenti/delete/:id_elev", repetentRoute.deleteRepetent);
router.get("/api/repetenti/getBySchool/:id_scoala", repetentRoute.getBySchool);

//istoric clase
router.post("/api/istoricClase/add", istoricClaseRoute.add);

//interval clase
router.post("/api/intervalClase/add", intervalClaseRoute.add);
router.put("/api/intervalClase/update/:id", intervalClaseRoute.update);
router.get("/api/intervalClase/get/:id_scoala", intervalClaseRoute.get);

module.exports = router;
