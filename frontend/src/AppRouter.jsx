import { Route, Routes } from "react-router";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Resister";
import FindPassword from "./views/FindPassword";
import StudentDashboard from "./views/StudentDashboard";
import InstructorDashboard from "./views/InstructorDashboard";
import DirectorDashboard from "./views/DirectorDashboard";
import StudentGrades from "./views/StudentGrades";
import StudentPracticalRecords from "./views/StudentPracticalRecords";
import ManageStudents from "./views/ManageStudents";
import Records from "./views/Records";
import RecordDetail from "./views/RecordDetail";
import Grades from "./views/Grades";
import AddRecord from "./views/AddRecord";
import StudentInfo from "./views/StudentInfo";
import UniversityList from "./views/UniversityList";
import UniversityDetail from "./views/UniversityDetail";
import ManageSchedules from "./views/ManageSchedules";
import NoticeList from "./views/NoticeList";
import NoticeDetail from "./views/NoticeDetail";
import ManageNotices from "./views/ManageNotices";
import ManageAccounts from "./views/ManageAccounts";
import ManageUniversities from "./views/ManageUniversities";
import RecommendedUniversities from "./views/RecommendedUniversities";
import ScrollToTop from "./components/common/ScrollToTop";
import AddUniv from "./views/AddUniv";
import EditUniv from "./views/EditUniv";
import RequestApproval from "./views/RequestApproval";
import AcademyTest from "./views/AcademyTest";
import AddAcademyTest from "./views/AddAcademyTest";
import AcademyTestDetail from "./views/AcademyTestDetail";

export default function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/studentdashboard/grades" element={<StudentGrades />} />
        <Route
          path="/studentPracticalRecords"
          element={<StudentPracticalRecords />}
        />
        <Route path="/instructordashboard" element={<InstructorDashboard />} />
        <Route path="/directordashboard" element={<DirectorDashboard />} />
        <Route path="/managestudents" element={<ManageStudents />} />
        <Route path="/manageschedules" element={<ManageSchedules />} />
        <Route path="/managenotices" element={<ManageNotices />} />
        <Route path="/manageuniversities" element={<ManageUniversities />} />
        <Route path="/manageaccounts" element={<ManageAccounts />} />
        <Route path="/manageaccounts/request" element={<RequestApproval />} />
        <Route path="/studentinfo/:studentId" element={<StudentInfo />} />
        <Route path="/grades/:studentId" element={<Grades />} />
        <Route
          path="/managestudents/:studentId/addrecord"
          element={<AddRecord />}
        />
        <Route path="/manageuniversities/adduniv" element={<AddUniv />} />
        <Route
          path="/manageuniversities/edituniv/:univId"
          element={<EditUniv />}
        />
        <Route path="/records/:studentId" element={<Records />} />
        <Route path=":studentId/record/:recordId" element={<RecordDetail />} />
        <Route path="/university" element={<UniversityList />} />
        <Route
          path="/university/detail/:univId"
          element={<UniversityDetail />}
        />
        <Route path="/notice" element={<NoticeList />} />
        <Route path="/notice/:noticeId" element={<NoticeDetail />} />
        <Route path="/recommended" element={<RecommendedUniversities />} />
        <Route path="/academy-test" element={<AcademyTest />} />
        <Route path="/academy-test/add" element={<AddAcademyTest />} />
        <Route
          path="/academy-test/detail/:studentId"
          element={<AcademyTestDetail />}
        />
      </Routes>
    </>
  );
}
