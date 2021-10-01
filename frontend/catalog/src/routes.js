import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TeachersPage from "./pages/TeachersPage";
import ClassPage from "./pages/ClassPage";
import StudentsPage from "./pages/StudentsPage";
import Configurari from "./pages/Configurari";
import GradesPage from "./pages/GradesPage";
import AddAssignment from "./pages/AddAssignment";
import AttendancePage from "./pages/AttendancePage";
import StudentGradesPage from "./pages/StudentGradesPage";
import StudentAssignmentPage from "./pages/StudentAssignmentPage";
import StudentAttendancePage from "./pages/StudentAttendancePage";
import AssignmentDetails from "./pages/AssignmentDetails";
import ParentsPage from "./pages/ParentsPage";
import ParentGrades from "./pages/ParentGrades";
import Homepage from "./pages/Homepage";
import ParentAttendance from "./pages/ParentAttendance";
import AdminAttendance from "./pages/AdminAttendance";
import TeachersContactPage from "./pages/TeachersContactPage";
import EditSchoolYearPage from "./pages/EditSchoolYearPage";
const routes = [
  {
    path: "/login",
    navbar: false,
    private: false,
    component: LoginPage,
    tip_utilizator: "All",
  },
  {
    path: "/register",
    navbar: false,
    private: false,
    component: RegisterPage,
    tip_utilizator: "All",
  },
  // {
  //   path: "/",
  //   navbar: true,
  //   private: true,
  //   // component: Homepage,
  // },
  {
    path: "/admin/elevi",
    navbar: true,
    private: true,
    component: StudentsPage,
    tip_utilizator: "Administrator",
  },
  {
    path: "/admin/clase",
    navbar: true,
    private: true,
    component: ClassPage,
    tip_utilizator: "Administrator",
  },
  {
    path: "/admin/profesori",
    navbar: true,
    private: true,
    component: TeachersPage,
    tip_utilizator: "Administrator",
  },
  {
    path: "/admin/parinti",
    navbar: true,
    private: true,
    component: ParentsPage,
    tip_utilizator: "Administrator",
  },
  {
    path: "/admin/detaliiParticipareElev/:date",
    navbar: true,
    private: true,
    component: StudentAttendancePage,
    tip_utilizator: "Administrator",
  },
  {
    path: "/admin/vizitareCatalogProfesor/:id_profesor",
    navbar: true,
    private: true,
    component: GradesPage,
    tip_utilizator: "Administrator",
  },
  {
    path: "/admin/participare",
    navbar: true,
    private: true,
    component: AdminAttendance,
    tip_utilizator: "Administrator",
  },
  {
    path: "/admin/aniScolari",
    navbar: true,
    private: true,
    component: EditSchoolYearPage,
    tip_utilizator: "Administrator",
  },
  {
    path: "/admin/configurari",
    navbar: true,
    private: true,
    component: Configurari,
    tip_utilizator: "Administrator",
  },
  {
    path: "/profesor/note",
    navbar: true,
    private: true,
    component: GradesPage,
    tip_utilizator: "Profesor",
  },
  {
    path: "/profesor/adaugaEvaluare/:id_semestru/:id_repartizare",
    navbar: true,
    private: true,
    component: AddAssignment,
    tip_utilizator: "Profesor",
  },
  {
    path: "/profesor/participare",
    navbar: true,
    private: true,
    component: AttendancePage,
    tip_utilizator: "Profesor",
  },
  {
    path: "/profesor/detaliiEvaluare/:id_evaluare",
    navbar: true,
    private: true,
    component: AssignmentDetails,
    tip_utilizator: "Profesor",
  },
  {
    path: "/elev/note",
    navbar: true,
    private: true,
    component: StudentGradesPage,
    tip_utilizator: "Elev",
  },
  {
    path: "/elev/detaliiNota/:id_evaluare",
    navbar: true,
    private: true,
    component: StudentAssignmentPage,
    tip_utilizator: "Elev",
  },
  {
    path: "/elev/participare",
    navbar: true,
    private: true,
    component: StudentAttendancePage,
    tip_utilizator: "Elev",
  },
  {
    path: "/elev/profesori",
    navbar: true,
    private: true,
    component: TeachersContactPage,
    tip_utilizator: "Elev",
  },
  {
    path: "/parinte/note",
    navbar: true,
    private: true,
    component: ParentGrades,
    tip_utilizator: "Parinte",
  },
  {
    path: "/parinte/detaliiNota/:id_evaluare",
    navbar: true,
    private: true,
    component: StudentAssignmentPage,
    tip_utilizator: "Parinte",
  },
  {
    path: "/parinte/participare",
    navbar: true,
    private: true,
    component: ParentAttendance,
    tip_utilizator: "Parinte",
  },
  {
    path: "/",
    navbar: true,
    private: true,
    component: Homepage,
    tip_utilizator: "All",
  },
];

export default routes;
