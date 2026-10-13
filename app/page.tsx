'use client';
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ClipboardList, 
  Calendar, 
  BarChart3, 
  Plus, 
  ShieldCheck,
  GraduationCap,
  HeartHandshake,
  ArrowLeft,
  UserCheck,
  Clock,
  CheckCircle2,
  ChevronRight,
  FileText,
  AlertTriangle,
  Award,
  Download,
  Upload,
  Printer,
  FolderKanban,
  BookOpen,
  Search,
  Edit3,
  Trash2,
  X,
  Save,
  LayoutDashboard,
  Info
} from 'lucide-react';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [accessMode, setAccessMode] = useState(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState('');
  const [advisorPassword, setAdvisorPassword] = useState('');
  const [studentIdInput, setStudentIdInput] = useState('');
  const [parentIdInput, setParentIdInput] = useState('');
  const [docPasswordInput, setDocPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [advisorPasswords, setAdvisorPasswords] = useState({});
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [activeStudentTab, setActiveStudentTab] = useState('Action Plans');
  const [simulatedRole, setSimulatedRole] = useState('Academic Advisor');
  const [isGlobalEditMode, setIsGlobalEditMode] = useState(false);
  
  // Dashboard Table Edit Mode Toggle
  const [isDashboardEditMode, setIsDashboardEditMode] = useState(false);
  
  const [editStudentName, setEditStudentName] = useState('');
  const [editStudentGpa, setEditStudentGpa] = useState('');
  const [editStudentLevel, setEditStudentLevel] = useState('');
  const [editStudentMidterm, setEditStudentMidterm] = useState('');
  
  const [editableAcademic, setEditableAcademic] = useState('');
  const [editableBehavioral, setEditableBehavioral] = useState('');
  const [editableRisks, setEditableRisks] = useState([]);
  const [editableWeaknesses, setEditableWeaknesses] = useState([]);
  const [editableStrengths, setEditableStrengths] = useState([]);
  
  const [editCourses, setEditCourses] = useState([]);
  const [editActionPlans, setEditActionPlans] = useState([]);
  const [editDocuments, setEditDocuments] = useState([]);
  const [editTimeline, setEditTimeline] = useState([]);
  const [editCustomSections, setEditCustomSections] = useState([]);
  
  // Editable Team Meetings State
  const [teamMeetings, setTeamMeetings] = useState([
    {
      id: 1,
      category: 'Dean and Doc Team Meeting',
      title: 'Mid-Semester Probation Review',
      date: '2026-10-12',
      time: '11:00 AM'
    },
    {
      id: 2,
      category: 'Advisors & Doc Team Meeting',
      title: 'Critical Warning Cases Briefing',
      date: '2026-10-15',
      time: '10:00 AM'
    },
    {
      id: 3,
      category: 'Doc Team Members Meeting',
      title: 'Action Plan Standardization Workshop',
      date: '2026-10-18',
      time: '03:00 PM'
    }
  ]);
  const [isAddMeetingModalOpen, setIsAddMeetingModalOpen] = useState(false);
  const [newMeetingCategory, setNewMeetingCategory] = useState('Dean and Doc Team Meeting');
  const [newMeetingTitle, setNewMeetingTitle] = useState('');
  const [newMeetingDate, setNewMeetingDate] = useState('2026-10-20');
  const [newMeetingTime, setNewMeetingTime] = useState('10:00 AM');
  const [isTeamMeetingsEditMode, setIsTeamMeetingsEditMode] = useState(false);
  
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentId, setNewStudentId] = useState('');
  const [newStudentLevel, setNewStudentLevel] = useState('2');
  const [newStudentGpa, setNewStudentGpa] = useState('1.00');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentGuardianPhone, setNewStudentGuardianPhone] = useState('');
  const [isAddingSectionModalOpen, setIsAddingSectionModalOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingSectionTitleText, setEditingSectionTitleText] = useState('');
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [evaluatingStudentId, setEvaluatingStudentId] = useState(null);
  const [reportSelectedStudentId, setReportSelectedStudentId] = useState('');
  const [docTeamSearchQuery, setDocTeamSearchQuery] = useState('');
  const todayDateStr = '2026-10-11';

  useEffect(() => {
    setMounted(true);
  }, []);

  const [facultyAdvisors, setFacultyAdvisors] = useState([
    {
      name: 'Prof. Haidan Mostafa',
      count: 5,
      students: [
        { 
          id: '256866', 
          name: 'Abdelrahman Ahmed Mohamed Ahmed', 
          level: '2', 
          gpa: '0.27', 
          midterm: 18, 
          quizzes: [4.5, 4.5], 
          attendanceWarnings: 0, 
          nextFollowUp: todayDateStr,
          studentPhone: '01012345678',
          guardianPhone: '01298765432',
          assessment: {
            academic: 'Strong performance in molecular genetics with minor need for lab time-management review.',
            behavioral: 'Highly focused, maintains active attendance and positive engagement.',
            risks: ['Low Midterm Score (<50%)', 'High Absence Rate in Labs'],
            weaknesses: ['Time management during exams', 'Mathematical calculations in biochemistry', 'Lab report structuring'],
            strengths: ['Enthusiastic in hands-on lab work', 'Good peer collaboration', 'Punctual submission when reminded']
          },
          courses: [
            { name: 'BIOT401: Advanced Molecular Biology', lecturerInstructor: 'Dr. Haidan Mostafa', labInstructor: 'Eng. Sarah Mahmoud', q1: '4.5', q2: '4.5', midterm: '18', assignment: '9', coursework: '36' },
            { name: 'BIOT302: Recombinant DNA Technology', lecturerInstructor: 'Dr. Tarek Salem', labInstructor: 'Eng. Ahmed Khaled', q1: '4', q2: '4', midterm: '16', assignment: '8', coursework: '32' }
          ],
          actionPlans: [
            { text: 'Complete advanced genetics problem set', completed: false },
            { text: 'Review PCR protocol before Friday lab', completed: true }
          ],
          documentsList: [
            { name: 'Genetics_Report_Draft.pdf', type: 'pdf', dataUrl: '', sectionType: 'student' },
            { name: 'Lab_Safety_Certificate.docx', type: 'docx', dataUrl: '', sectionType: 'student' },
            { name: 'Advisor_Syllabus_Guidelines.pdf', type: 'pdf', dataUrl: '', sectionType: 'advisor' }
          ],
          customSections: [],
          timeline: [
            { date: '2026-10-01', title: 'Initial advisor meeting completed', loggedBy: 'Prof. Haidan Mostafa' },
            { date: '2026-02-15', title: 'Placed under academic probation', loggedBy: 'Faculty Administration' }
          ]
        },
        { 
          id: '265127', 
          name: 'Abdelrahman Mahmoud Sayed Ibrahim Mansy', 
          level: '2', 
          gpa: '0.58', 
          midterm: 11, 
          quizzes: [2, 3], 
          attendanceWarnings: 2, 
          nextFollowUp: todayDateStr,
          studentPhone: '01122334455',
          guardianPhone: '01566778899',
          assessment: {
            academic: 'Requires closer monitoring in core quizzes and problem sets.',
            behavioral: 'Shows moderate engagement; advised to attend TA revision hours.',
            risks: ['Attendance Warning in Core Lectures', 'Quiz Score Below Threshold'],
            weaknesses: ['Problem-solving speed', 'Enzymology calculations'],
            strengths: ['Willingness to improve', 'Good attendance in labs']
          },
          courses: [
            { name: 'BIOT401: Advanced Molecular Biology', lecturerInstructor: 'Dr. Haidan Mostafa', labInstructor: 'Eng. Sarah Mahmoud', q1: '2', q2: '3', midterm: '11', assignment: '6', coursework: '24' },
            { name: 'CHEM301: Enzymology', lecturerInstructor: 'Dr. Nevine Kamal', labInstructor: 'Dr. Dina Maged', q1: '2.5', q2: '3', midterm: '12', assignment: '7', coursework: '26' }
          ],
          actionPlans: [
            { text: 'Attend weekly TA office hours', completed: false },
            { text: 'Submit missing lab assignment', completed: false }
          ],
          documentsList: [{ name: 'Remedial_Schedule.pdf', type: 'pdf', dataUrl: '', sectionType: 'advisor' }],
          customSections: [],
          timeline: [
            { date: '2026-10-03', title: 'Attendance warning reviewed', loggedBy: 'Prof. Haidan Mostafa' }
          ]
        },
        { id: '253470', name: 'Abdelrahman Mohamed Hanfey Abdelmoaty Aly', level: '2', gpa: '1.84', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01099887766', guardianPhone: '01011223344', customSections: [], courses: [], actionPlans: [{ text: 'Review foundational biochemistry notes', completed: false }], documentsList: [{ name: 'Study_Plan.docx', type: 'docx', dataUrl: '', sectionType: 'student' }], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [{ date: '2026-10-01', title: 'Initial advisor onboarding', loggedBy: 'Prof. Haidan Mostafa' }] },
        { id: '256820', name: 'Abdelrahman Nasser Khalaf Moussa Abdelaal', level: '2', gpa: '0.56', midterm: 8, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01233445566', guardianPhone: '01155667788', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '244361', name: 'Abdullah Hamdy Mohamed Khater', level: '2', gpa: '1.91', midterm: 16, quizzes: [4, 4.5], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01055443322', guardianPhone: '01211223344', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Prof. Yasmin Abdellatif',
      count: 5,
      students: [
        { id: '256761', name: 'Ahmed Adel Tahif Hassan', level: '2', gpa: '1.33', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01011112222', guardianPhone: '01233334444', customSections: [], courses: [], actionPlans: [{ text: 'Action plan review', completed: false }], documentsList: [{ name: 'Doc1.pdf', type: 'pdf', dataUrl: '', sectionType: 'student' }], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [{ date: '2026-10-02', title: 'Advisor meeting', loggedBy: 'Prof. Yasmin Abdellatif' }] },
        { id: '264428', name: 'Ahmed Emad Najip Hassan Ali', level: '2', gpa: '1.83', midterm: 7, quizzes: [1, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01122223333', guardianPhone: '01544445555', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '257136', name: 'Ahmed Ibrahim Hassan Gomaa Shared', level: '2', gpa: '0.76', midterm: 17, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01055556666', guardianPhone: '01077778888', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '257095', name: 'Ahmed Mohamed Hassanin Abdelsamie', level: '2', gpa: '1.48', midterm: 12, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01288889999', guardianPhone: '01100001111', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255885', name: 'Maryam Adel Baskharon Hanna Baskharon', level: '2', gpa: '1.99', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01022334455', guardianPhone: '01299887766', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Dr. Yara Ahmed',
      count: 5,
      students: [
        { id: '211937', name: 'Nourhan Othman Abdeltawab Abdelaziz', level: '4', gpa: '1.96', midterm: 7, quizzes: [1, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01033445566', guardianPhone: '01177889900', customSections: [], courses: [], actionPlans: [{ text: 'Remedial sessions', completed: false }], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '257044', name: 'Rawan Hesham Nabeh Mohamed Mousa', level: '4', gpa: '1.62', midterm: 13, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01244556677', guardianPhone: '01088990011', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '238143', name: 'Salem Mohamed Salem Atia', level: '4', gpa: '1.6', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01155667788', guardianPhone: '01522334455', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '223689', name: 'Rawan Mostafa Mohamed Ibrahim Salman', level: '4', gpa: '1.89', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01066778899', guardianPhone: '01233445566', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '220517', name: 'Rana Mohamed Kamal Soliman Soliman Elzanary', level: 'out of 8', gpa: '2.31', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01577889900', guardianPhone: '01011223344', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Dr. Kareema Nasr Eldin',
      count: 4,
      students: [
        { id: '256336', name: 'Ahmed Mostafa Abdulsalam Mohamed Khalil', level: '2', gpa: '1.26', midterm: 12, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01012123434', guardianPhone: '01256567878', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '266680', name: 'Farah Maged Abdellatif Shalaby', level: '2', gpa: '0.37', midterm: 17, quizzes: [4, 4.5], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01134345656', guardianPhone: '01578789090', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '251659', name: 'Mariam Abdalmaksoud Alsaed Ibrahim Aboelanain', level: '2', gpa: '1.97', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01056567878', guardianPhone: '01012123434', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256892', name: 'Menna Tamer Soltan Khaled Zallouk', level: '2', gpa: '0.57', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01278789090', guardianPhone: '01134345656', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Dr. Mai Ahmed',
      count: 6,
      students: [
        { id: '263856', name: 'Anan Ahmed Kamal Abbas Mohamed Khalil', level: '2', gpa: '0.27', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01090901212', guardianPhone: '01234345656', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255698', name: 'Demiana Youssef Boules Fasih Nesim', level: '2', gpa: '1.76', midterm: 10, quizzes: [2, 2.5], attendanceWarnings: 2, nextFollowUp: todayDateStr, studentPhone: '01112123434', guardianPhone: '01556567878', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '261915', name: 'Ebtsam Ahmed Abdeltawab Said Mohamed', level: '2', gpa: '1.19', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01034345656', guardianPhone: '01090901212', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '247201', name: 'Esraa Hosney Marei Abdelazim', level: '2', gpa: '1.86', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01256567878', guardianPhone: '01112123434', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253714', name: 'Fady Mariee Amin Mariee Eldsoky', level: '2', gpa: '1.96', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01078789090', guardianPhone: '01234345656', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255964', name: 'Shamseldin Ahmed Sayed Abdeltawab', level: '2', gpa: '1.02', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01190901212', guardianPhone: '01512123434', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Dr. Marwa Kenawy',
      count: 5,
      students: [
        { id: '265649', name: 'Mohamed Adel Mohamed Aboelkhir Nofal', level: '2', gpa: '1.75', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01011223344', guardianPhone: '01244556677', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '264385', name: 'Mohamed Badr Ahmed Ahmed Abdelhalim', level: '2', gpa: '0.27', midterm: 8, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01133445566', guardianPhone: '01577889900', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '247023', name: 'Mohamed Basem Mohamed Mahdi', level: '2', gpa: '0.6', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01055667788', guardianPhone: '01011223344', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '250665', name: 'Mohamed Tamer Elsayed Abdelhamid Mohamed', level: '2', gpa: '1.85', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01277889900', guardianPhone: '01133445566', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '246573', name: 'Mina Mamdouh Menz Sawirs Awadallah', level: '3', gpa: '1.45', midterm: 13, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01099887766', guardianPhone: '01255667788', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Dr. Gehad Tarek',
      count: 5,
      students: [
        { id: '256930', name: 'Habiba Mamdouh Ahmed Shawky Hussein', level: '2', gpa: '1.9', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01021214343', guardianPhone: '01265658787', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '266492', name: 'Habiba Mohamed Abdelrahman Ahmed Farag', level: '2', gpa: '0.16', midterm: 11, quizzes: [2, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01143436565', guardianPhone: '01587870909', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '261400', name: 'Hala Hassan Diaa Abdelaziz Ahmed', level: '2', gpa: '0.88', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01065658787', guardianPhone: '01021214343', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256223', name: 'Mokhtar Atef Abdelhamied Abdelmiged', level: '2', gpa: '1.61', midterm: 7, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01287870909', guardianPhone: '01143436565', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '266470', name: 'Nermin Thabet Mahmoud Abdelhalim Ali', level: '2', gpa: '1.19', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01098982323', guardianPhone: '01243436565', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Fouad Ashry',
      count: 9,
      students: [
        { id: '249343', name: 'Ahmed Abouelouyon Ahmed Khalifa Ahmed', level: '4', gpa: '1.98', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01011223300', guardianPhone: '01255667700', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '241853', name: 'Giovanni Kamal Atef Kamal', level: '4', gpa: '1.76', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01122334411', guardianPhone: '01566778811', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '213841', name: 'Noha Awad Abdelfattah Youssef Awad', level: '4', gpa: '1.31', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01033445522', guardianPhone: '01011223300', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '242675', name: 'Patol Mohamed Ossman Abdelkader', level: '4', gpa: '0.93', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01244556633', guardianPhone: '01122334411', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '225511', name: 'Amin Abdelnaby Mohamed Kamel Soliman', level: '4', gpa: '1.88', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01055667744', guardianPhone: '01233445522', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '235843', name: 'Aml Hamada Mohamed Mohamed Mohamed', level: '4', gpa: '1.91', midterm: 9, quizzes: [2, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01166778855', guardianPhone: '01544556633', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '200677', name: 'Nopheir George Shukry Basta Hanwy', level: 'out of 7', gpa: 'N/A', midterm: 17, quizzes: [4, 4.5], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01077889966', guardianPhone: '01055667744', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '213081', name: 'Nadeen Mohamed Mohamed Elsagheer Sedeik', level: 'out of 7', gpa: '2.12', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01288990077', guardianPhone: '01166778855', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '211971', name: 'Hussamaldein Mohamed Gaber Mostafa', level: 'out of 7', gpa: '2.1', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01099001188', guardianPhone: '01277889966', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Nouran Yehia',
      count: 9,
      students: [
        { id: '253911', name: 'Khaled Ahmed Mohamed Abdelhamid Elbayoumi', level: '4', gpa: '1.94', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01010101010', guardianPhone: '01220202020', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '240176', name: 'Kholoud Mohammed Sleem Abdelmged', level: '4', gpa: '1.13', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01130303030', guardianPhone: '01540404040', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '247887', name: 'Malak Mostafa Mahmoud Mohamed Omran', level: '4', gpa: '1.5', midterm: 13, quizzes: [3.5, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01050505050', guardianPhone: '01010101010', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '242259', name: 'Mariam Ahmed Hassan Shehata', level: '4', gpa: '1.83', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01270707070', guardianPhone: '01130303030', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249591', name: 'Youssef Mohammed Elaraby Bassiony', level: '4', gpa: '1.21', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01090909090', guardianPhone: '01250505050', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '248001', name: 'Batoul Naser Shaaban Mahmoud Hassanin', level: '4', gpa: '1.52', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01112121212', guardianPhone: '01534343434', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249351', name: 'Kholoud Khaled Ahmed Mosa Mosa', level: '4', gpa: '1.76', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01034343434', guardianPhone: '01012121212', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249973', name: 'Shrouk Sayed Aboelela Ahmed', level: '4', gpa: '1.36', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01256565656', guardianPhone: '01134343434', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '236947', name: 'Mohamed Khaled Mohamed Mostafa', level: '4', gpa: '1.15', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01078787878', guardianPhone: '01256565656', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Nashwa Hamido',
      count: 6,
      students: [
        { id: '246253', name: 'Maria Mohsen Emeil Gerges', level: '4', gpa: '1.67', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01013131313', guardianPhone: '01245454545', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '224815', name: 'Rim Mohamed Fawzi Said Mohamed', level: '4', gpa: '1.33', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01124242424', guardianPhone: '01567676767', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '237053', name: 'Yousef Shaaban Elsayed Farag', level: '4', gpa: '1.92', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01035353535', guardianPhone: '01013131313', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '221945', name: 'Abdallah Asaad Abdallah Sadek', level: '4', gpa: '1.74', midterm: 13, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01246464646', guardianPhone: '01124242424', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '171709', name: 'Mohamed Osama Fouad Mokhtar Rabiee', level: 'out of 7', gpa: 'N/A', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01057575757', guardianPhone: '01235353535', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '204329', name: 'Loujain Raeed Mohamed Nazir Hamza', level: 'out of 7', gpa: 'N/A', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01168686868', guardianPhone: '01546464646', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Hoda allam',
      count: 4,
      students: [
        { id: '266719', name: 'Malak Sherif Mohammed Mohammadi Noureldin', level: '2', gpa: '1.91', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01014141414', guardianPhone: '01225252525', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '252925', name: 'Adham Mohamed Hussein Hammad', level: '3', gpa: '1.4', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01126262626', guardianPhone: '01536363636', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '260473', name: 'Badreldin Ayman Atef Abdellatif Afifi', level: '3', gpa: '1', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01037373737', guardianPhone: '01014141414', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254647', name: 'Malak Hesham Taha Mohamed Tantawy', level: '3', gpa: '0', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01248484848', guardianPhone: '01126262626', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Yousef AboElkhair',
      count: 9,
      students: [
        { id: '247211', name: 'Malak Mohamed Hassan Ahmed Mohamed', level: '4', gpa: '1.94', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01015151515', guardianPhone: '01267676767', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249339', name: 'Sama Ehab Mohamed Mohamed Ahmed', level: '4', gpa: '1.35', midterm: 13, quizzes: [3.5, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01126262626', guardianPhone: '01578787878', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '238219', name: 'Abdelrahman Hamdy Ali Abdelrasoul', level: '4', gpa: '1.33', midterm: 7, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01037373737', guardianPhone: '01015151515', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '232919', name: 'Ahmed Alaa Mohamed Sayed', level: '4', gpa: '1.86', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01248484848', guardianPhone: '01126262626', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '236921', name: 'Mahmoud Abdelnasser Mahmoud Mohamed', level: '4', gpa: '1.86', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01059595959', guardianPhone: '01237373737', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '204819', name: 'Nardin Ayman Fathy Sadek', level: '4', gpa: '1.55', midterm: 17, quizzes: [4, 4.5], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01160606060', guardianPhone: '01548484848', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '236395', name: 'Mariam Mohamed Reda Abozeid', level: '4', gpa: '1.19', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01071717171', guardianPhone: '01059595959', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '202781', name: 'Mostafa Ahmed Ibrahim Abdallah Sweed', level: 'out of 8', gpa: '2.14', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01282828282', guardianPhone: '01160606060', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '185527', name: 'Hanaa Tarek Ibrahim Betiti', level: 'out of 8', gpa: 'N/A', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01093939393', guardianPhone: '01271717171', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Mariam Zaki',
      count: 6,
      students: [
        { id: '253829', name: 'Hanin Emadelden Sayed Mohamed', level: '3', gpa: '1.99', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01016161616', guardianPhone: '01237373737', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256603', name: 'Kotouf Ehab Abdelkahar Abdelhamid', level: '3', gpa: '1.17', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01127272727', guardianPhone: '01548484848', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256743', name: 'Malak Ehab Aly Hassan Ibrahim', level: '3', gpa: '0', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01038383838', guardianPhone: '01016161616', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253786', name: 'Mariam Mohamed Abdelghany Mostafa Abdella', level: '3', gpa: '1.47', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01249494949', guardianPhone: '01127272727', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256180', name: 'Nadine Wael Youssif Ebrahim Elshahed', level: '3', gpa: '1.52', midterm: 12, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01060606060', guardianPhone: '01238383838', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255738', name: 'Sanabel Mohamed Abdelghani Abdelnabi', level: '3', gpa: '1.85', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01171717171', guardianPhone: '01549494949', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Nada Sherif',
      count: 9,
      students: [
        { id: '266065', name: 'Hana Khaled Mohamed Lutfy Abulaban', level: '2', gpa: '1.42', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01017171717', guardianPhone: '01238383838', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '266418', name: 'Haneen Ebrahim Abdellatif Ahmed Oraby', level: '2', gpa: '1.53', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01128282828', guardianPhone: '01549494949', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256458', name: 'Lojain Mamdouh Abdalla Ewis Abdelhamed', level: '2', gpa: '1.3', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01039393939', guardianPhone: '01017171717', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '263919', name: 'Yahia Ali Hassan Nada Saleh', level: '2', gpa: '1.42', midterm: 13, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01250505050', guardianPhone: '01128282828', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256515', name: 'Youssef Osama Ali Abas Saleh', level: '2', gpa: '1.74', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01061616161', guardianPhone: '01239393939', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254528', name: 'Zein Mohamed Zein Abdelalim Khalil', level: '2', gpa: '1.49', midterm: 8, quizzes: [2, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01172727272', guardianPhone: '01550505050', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '251454', name: 'Zeina Sayed Abbas Sultan Mohamed', level: '2', gpa: '1.22', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01083838383', guardianPhone: '01061616161', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '250376', name: 'Belal Mohamed Ahmed Moustafa Hassan', level: '3', gpa: '1.99', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01294949494', guardianPhone: '01172727272', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256277', name: 'Shahd Masood Fathy Abdelaziz', level: '3', gpa: '1.58', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01005050505', guardianPhone: '01283838383', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Salma Omar',
      count: 9,
      students: [
        { id: '245831', name: 'Haydi Said Sameeh Abdelaziz', level: '4', gpa: '1.91', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01018181818', guardianPhone: '01239393939', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '238039', name: 'Ibrahim Hassan Attia Rashd Mahran', level: '4', gpa: '1.77', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01129292929', guardianPhone: '01550505050', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '252844', name: 'Zeinab Walid Ibraheem Ahmed Ahmed', level: '4', gpa: '1.84', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01030303030', guardianPhone: '01018181818', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249645', name: 'Abdelrahman Ashraf Roshdy Abdelaziz Aly', level: '4', gpa: '0.47', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01241414141', guardianPhone: '01129292929', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '245001', name: 'Abram Rashad Sweaa Gaied', level: '4', gpa: '1.84', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01052525252', guardianPhone: '01230303030', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '224979', name: 'Rana Hossam Saber Ahmed', level: '4', gpa: '1.51', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01163636363', guardianPhone: '01541414141', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '242469', name: 'Reham Wael Hassan Emam', level: '4', gpa: '1.31', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01074747474', guardianPhone: '01052525252', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249449', name: 'Salma Ehab Mohamed Mohamed Ahmed', level: '4', gpa: '1.39', midterm: 12, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01285858585', guardianPhone: '01163636363', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '237603', name: 'Omneya Ibrahim Abdalla Mohamed Ibrahim', level: '4', gpa: '0.65', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01096969696', guardianPhone: '01274747474', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Hesham Fady',
      count: 9,
      students: [
        { id: '255570', name: 'Sara Essam Arafa Shehata Sayed', level: '2', gpa: '1.93', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01019191919', guardianPhone: '01242424242', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256756', name: 'Haneen Mohamed Ebrahim Mohamed Hassan', level: '3', gpa: '1.87', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01120202020', guardianPhone: '01553535353', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256769', name: 'Merna Yehia Hussein Sabry Mahmoud Sabry', level: '3', gpa: '1.65', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01031313131', guardianPhone: '01019191919', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254738', name: 'Mohamed Adel Sayed Ahmed Mahmoud', level: '3', gpa: '0', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01242424242', guardianPhone: '01120202020', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256467', name: 'Mohamed Gamal Abdelhafeez Mohamed Atify', level: '3', gpa: '1.49', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01053535353', guardianPhone: '01231313131', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256776', name: 'Mona Alsayed Galal Ahmed', level: '3', gpa: '0.83', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01164646464', guardianPhone: '01542424242', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254800', name: 'Nancy Mohamed Salah Eid Morsy', level: '3', gpa: '1.75', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01075757575', guardianPhone: '01053535353', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254056', name: 'Rania Salah Mohamed Eliwa Taha', level: '3', gpa: '1.5', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01286868686', guardianPhone: '01164646464', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '240074', name: 'Youssef Mohamed Eid Milad', level: '3', gpa: '0.63', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01097979797', guardianPhone: '01275757575', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Youssef Maged',
      count: 9,
      students: [
        { id: '253628', name: 'Mohamed Ahmed Badran Mohamed Badran', level: '4', gpa: '1.12', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01020202020', guardianPhone: '01243434343', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '237469', name: 'Omaima Abdelaziz Fahmey Ahmed', level: '4', gpa: '1.95', midterm: 7, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01121212121', guardianPhone: '01554545454', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '240220', name: 'Saad Yasser Saad Saleh Ahmed', level: '4', gpa: '1.72', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01032323232', guardianPhone: '01020202020', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255947', name: 'Sama Ali Abouelhamd Ali Abdelrehim', level: '4', gpa: '0.52', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01243434343', guardianPhone: '01121212121', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '247773', name: 'Shahd Abdelaziz Karar Mohamed', level: '4', gpa: '1.64', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01054545454', guardianPhone: '01232323232', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249413', name: 'Shahd Essam Mahmoud Goda Mohamed', level: '4', gpa: '1.87', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01165656565', guardianPhone: '01543434343', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249097', name: 'Shahd Imam Mohamed Hassan Mohamed Mohamed', level: '4', gpa: '1.72', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01076767676', guardianPhone: '01054545454', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255055', name: 'Toka Khaled Amin Abdelhamid Sheref', level: '4', gpa: '0.95', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01287878787', guardianPhone: '01165656565', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '246893', name: 'Virginia Sabry Samir Mikhail Soliman', level: '4', gpa: '1.81', midterm: 12, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01098989898', guardianPhone: '01276767676', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Amr Waleed',
      count: 10,
      students: [
        { id: '262141', name: 'Houda Essam Hanafi Mahmoud Mohamed', level: '2', gpa: '0', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01021212121', guardianPhone: '01244444444', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '266307', name: 'Jana Amr Mostafa Ismail', level: '2', gpa: '0.14', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01122222222', guardianPhone: '01555555555', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '250714', name: 'Kanzi Amro Ahmed Saad Moustafa Elaagez', level: '2', gpa: '1.14', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01033333333', guardianPhone: '01021212121', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255987', name: 'Malak Mohamed Ahmed Abdallah Hassan', level: '2', gpa: '1.76', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01244444444', guardianPhone: '01122222222', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256312', name: 'Malak Muhamed Ahmed Aboelela Elsayed', level: '2', gpa: '1.6', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01055555555', guardianPhone: '01233333333', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256355', name: 'Malak Nasser Fathy Elsayed Said', level: '2', gpa: '1.24', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01166666666', guardianPhone: '01544444444', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255948', name: 'Monica Saad Mosaad Saad', level: '2', gpa: '1.98', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01077777777', guardianPhone: '01055555555', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254095', name: 'Omnia Magdy Mohamed Fawzy Aboelezz', level: '2', gpa: '1.61', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01288888888', guardianPhone: '01166666666', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255748', name: 'Rawan Marwan Soliman Mohamed Saad', level: '2', gpa: '1.78', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01099999999', guardianPhone: '01277777777', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253730', name: 'Youssef Osama Ahmed Aly Khalil', level: '2', gpa: '1.94', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01111111111', guardianPhone: '01588888888', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Mohamed Fahim',
      count: 9,
      students: [
        { id: '240012', name: 'Alaa Yasser Abdelmohssen Hussin', level: '4', gpa: '0.54', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01022223333', guardianPhone: '01255556666', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '235433', name: 'Amr Hany Huasein Zakaria', level: '4', gpa: '1.95', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01133334444', guardianPhone: '01566667777', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255207', name: 'Hamza Mohamed Sayed Mohamed Emam', level: '4', gpa: '1.71', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01044445555', guardianPhone: '01022223333', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '257035', name: 'Mahmoud Gamal Mohamed Abdelkawy', level: '4', gpa: '1.68', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01255556666', guardianPhone: '01133334444', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '237479', name: 'Malak Mohamed Omar Elsaghir Elfarouk Mohamed', level: '4', gpa: '1.96', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01066667777', guardianPhone: '01244445555', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253843', name: 'Yassin Khaled Abobakr Abdelmonem Elgarhy', level: '4', gpa: '1.32', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01177778888', guardianPhone: '01555556666', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '248155', name: 'Youssef Sherif Elsayed Mohamed', level: '4', gpa: '1.61', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01088889999', guardianPhone: '01066667777', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '246021', name: 'Mohamed Hamada Ramadan Mohamed Saleh', level: '4', gpa: '1.63', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01299990000', guardianPhone: '01177778888', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '204357', name: 'Ahmed Mohamed Sabra Hamdan', level: 'out of 7', gpa: 'N/A', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01000001111', guardianPhone: '01288889999', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Rawan Ali',
      count: 9,
      students: [
        { id: '256752', name: 'Jana Ayman Abdelrahman Elmahdy Mohamed', level: '4', gpa: '1.8', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01023234545', guardianPhone: '01267678989', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '246489', name: 'Josia Melad Shokrallah Eshak', level: '4', gpa: '1.53', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01134345656', guardianPhone: '01578789090', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256828', name: 'Mariam Mamdouh Mohamed Mohamed Soliman', level: '4', gpa: '1', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01045456767', guardianPhone: '01023234545', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '243787', name: 'Mariam Mohamed Farouk Mohamed Aly', level: '4', gpa: '1.99', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01256567878', guardianPhone: '01134345656', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249451', name: 'Marwa Yahia Saed Gaber', level: '4', gpa: '1.34', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01067678989', guardianPhone: '01245456767', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '204083', name: 'Mustafa Ramzy Atteia Salman', level: '4', gpa: '1.89', midterm: 18, quizzes: [4.5, 4.5], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01178789090', guardianPhone: '01556567878', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253139', name: 'Rafael Younan Anwer Boctor', level: '4', gpa: '1.4', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01089890101', guardianPhone: '01067678989', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '248599', name: 'Rahma Sherin Muhammad Ali Youssef', level: '4', gpa: '1.74', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01290901212', guardianPhone: '01178789090', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '234857', name: 'Rawan Ahmed Badr Ibrahim', level: '4', gpa: '0.6', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01001012323', guardianPhone: '01289890101', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Shahd Eltarabily',
      count: 9,
      students: [
        { id: '265534', name: 'Hana Abdelgaed Sayed Abdelgaed Abouaziza', level: '2', gpa: '0', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01024246868', guardianPhone: '01289891212', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256591', name: 'Sabren Mohsen Saad Amin', level: '2', gpa: '1.56', midterm: 7, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01135357979', guardianPhone: '01590902323', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253524', name: 'Salma Hani Mohamed Sabry Abdelsamee', level: '2', gpa: '0.91', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01046468080', guardianPhone: '01024246868', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '263983', name: 'Sama Mostafa Saad Elhoussiny Elnemr', level: '2', gpa: '1.65', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01257579191', guardianPhone: '01135357979', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '257138', name: 'Shahd Yousry Abdelaziz Salem Elsheikh', level: '2', gpa: '0', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01068680202', guardianPhone: '01246468080', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '261140', name: 'Shakinaz Mohamed Hamed Ismail Mohamed', level: '2', gpa: '0.77', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01179791313', guardianPhone: '01557579191', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256300', name: 'Waad Wael Said Ewais Amer', level: '2', gpa: '1.28', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01090902424', guardianPhone: '01068680202', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '252782', name: 'Elbadry Mahmoud Ghonim Ahmed Rezk', level: '3', gpa: '1.8', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01201013535', guardianPhone: '01179791313', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256230', name: 'Hagar Saad Samir Mohamed Hamouda', level: '3', gpa: '1.9', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01012124646', guardianPhone: '01290902424', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Nourhan Maher',
      count: 9,
      students: [
        { id: '257029', name: 'Ahmed Atef Abdelnaby Elmaasarawy', level: '3', gpa: '1.14', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01025256767', guardianPhone: '01290903434', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249205', name: 'Hayah Mohamed Ahmed Zeid', level: '3', gpa: '1.94', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01136367878', guardianPhone: '01501014545', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '240162', name: 'Haytham Ahmed Moftah Said Moragaa', level: '3', gpa: '0.19', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01047478989', guardianPhone: '01025256767', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249967', name: 'Hossam Ahmed Gamal Rashed', level: '3', gpa: '1.61', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01258589090', guardianPhone: '01136367878', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256949', name: 'Malak Abdeltawab Mohmed Abdeltawab', level: '3', gpa: '1.43', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01069690101', guardianPhone: '01247478989', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256891', name: 'Mariam Mohamed Sultan Khalid', level: '3', gpa: '1.84', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01170701212', guardianPhone: '01558589090', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256766', name: 'Rofida Mahmoud Hussein Mahmoud', level: '3', gpa: '1.92', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01081812323', guardianPhone: '01069690101', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255461', name: 'Saif Tamer Araby Mohamed', level: '3', gpa: '1.55', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01292923434', guardianPhone: '01170701212', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255908', name: 'Shahd Hazem Madi Ramadan', level: '3', gpa: '1.04', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01003034545', guardianPhone: '01281812323', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Hagar Magdy',
      count: 9,
      students: [
        { id: '256592', name: 'Ganna Adel Faisal Mohamed Sayed Nada', level: '2', gpa: '1.3', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01026267878', guardianPhone: '01201015656', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256849', name: 'Mohraeil Mina Naeem Hana Hakim', level: '2', gpa: '1.91', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01137378989', guardianPhone: '01512126767', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254284', name: 'Maryam Essam Abdelsalam Elmaghwry', level: '3', gpa: '1.75', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01048489090', guardianPhone: '01026267878', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '246905', name: 'Sara Mohamed Mohamed Mokhtar Esawy', level: '3', gpa: '1.99', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01259590101', guardianPhone: '01137378989', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255539', name: 'Shahd Abdelrahman Zaghloul Alsayid', level: '3', gpa: '1.49', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01070701212', guardianPhone: '01248489090', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249809', name: 'Shahd Ahmed Khalaf Ahmed Mohamed', level: '3', gpa: '0', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01181812323', guardianPhone: '01559590101', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256361', name: 'Shahd Hamidy Sbaq Abbas', level: '3', gpa: '1.13', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01092923434', guardianPhone: '01070701212', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '247245', name: 'Shahd Ibrahym Abdelrazek Sead', level: '3', gpa: '1.44', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01203034545', guardianPhone: '01181812323', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256883', name: 'Tahgod Sayed Sayed Ahmed Mohamed Elhewehy', level: '3', gpa: '1.44', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01014145656', guardianPhone: '01203034545', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Faten Ehab',
      count: 9,
      students: [
        { id: '266574', name: 'Joudy Mohamed Taha Hussein Mohamed', level: '2', gpa: '0.87', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01027278989', guardianPhone: '01212127878', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256815', name: 'Nourhan Reda Saber Aborawash Youssef', level: '2', gpa: '1.8', midterm: 7, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01138389090', guardianPhone: '01523238989', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '265170', name: 'Rahma Reda Saad Kotb Abdelmoneim', level: '2', gpa: '0.16', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01049490101', guardianPhone: '01027278989', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256721', name: 'Shahd Ragab Abdelsalam Kassam Attia', level: '2', gpa: '1.8', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01260601212', guardianPhone: '01138389090', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '260762', name: 'Youssef Ayman Mostafa Taha Mostafa', level: '2', gpa: '1.09', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01071712323', guardianPhone: '01249490101', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '265805', name: 'Youssef Omar Youssef Otaify Kamaleldin', level: '2', gpa: '0.63', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01182823434', guardianPhone: '01560601212', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254603', name: 'Youssef Tarek Ali Sultan Ali', level: '2', gpa: '1.05', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01093934545', guardianPhone: '01071712323', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254868', name: 'Johnathan Emil Samir Heshmat Ebrahim', level: '3', gpa: '1.45', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01204045656', guardianPhone: '01182823434', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255870', name: 'Mahmoud Yasser Mamdoh Abdalhameed', level: '3', gpa: '1.95', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01015156767', guardianPhone: '01204045656', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    }
  ]);

  const allProbationStudents = facultyAdvisors.flatMap(adv => 
    adv.students.map(stu => ({
      ...stu,
      advisor: adv.name,
      nextFollowUp: stu.nextFollowUp || todayDateStr,
      assessment: {
        academic: stu.assessment?.academic || 'Struggling with core laboratory calculations and theoretical midterm concepts.',
        behavioral: stu.assessment?.behavioral || 'Often appears anxious about academic standing; receptive to guidance when reached out.',
        risks: stu.assessment?.risks && stu.assessment.risks.length > 0 ? stu.assessment.risks : ['Low Midterm Score (<50%)', 'High Absence Rate in Labs'],
        weaknesses: stu.assessment?.weaknesses && stu.assessment.weaknesses.length > 0 ? stu.assessment.weaknesses : ['Time management during exams', 'Mathematical calculations in biochemistry', 'Lab report structuring'],
        strengths: stu.assessment?.strengths && stu.assessment.strengths.length > 0 ? stu.assessment.strengths : ['Enthusiastic in hands-on lab work', 'Good peer collaboration', 'Punctual submission when reminded']
      },
      courses: stu.courses && stu.courses.length > 0 ? stu.courses : [
        { name: 'BIOT401: Advanced Molecular Biology', lecturerInstructor: 'Dr. Haidan Mostafa', labInstructor: 'Eng. Sarah Mahmoud', q1: '3.5', q2: '4', midterm: '14', assignment: '8', coursework: '32' }
      ],
      actionPlans: stu.actionPlans && stu.actionPlans.length > 0 ? stu.actionPlans : [
        { text: 'Study Molecular Biology chapters 1-3', completed: false }
      ],
      documentsList: stu.documentsList && stu.documentsList.length > 0 ? stu.documentsList : [{ name: 'Molecular_Biology_Study_Plan_Fall2026.pdf', type: 'pdf', dataUrl: '', sectionType: 'student' }],
      customSections: stu.customSections || [],
      timeline: stu.timeline && stu.timeline.length > 0 ? stu.timeline : [
        { date: '2026-10-02', title: 'Action Plan created and study schedule uploaded', loggedBy: adv.name }
      ]
    }))
  );

  const currentAdvisorObj = facultyAdvisors.find(a => a.name === selectedAdvisor) || facultyAdvisors[0];
  const currentAdvisorStudents = currentAdvisorObj.students.map(stu => {
    return allProbationStudents.find(s => s.id === stu.id);
  });
  
  const normalDashboardStudents = currentAdvisorStudents.filter(s => !s.level.startsWith('out of'));
  const outOfProbationSectionStudents = currentAdvisorStudents.filter(s => s.level.startsWith('out of'));
  
  const followUpsTodayCount = currentAdvisorStudents.filter(s => s.nextFollowUp === todayDateStr).length;
  const outOfProbationCount = outOfProbationSectionStudents.length;
  
  const selectedStudentObj = allProbationStudents.find(s => s.id === selectedStudentId) || allProbationStudents[0];
  
  const advisorSpecificStudents = allProbationStudents.filter(s => s.advisor === selectedAdvisor);
  const reportDropdownStudents = simulatedRole === 'Academic Advisor' ? advisorSpecificStudents : allProbationStudents;
  const rawReportStudentObj = allProbationStudents.find(s => s.id === reportSelectedStudentId) || currentAdvisorStudents[0] || allProbationStudents[0];
  const reportStudentObj = reportSelectedStudentId === selectedStudentId && selectedStudentId !== null ? {
    ...rawReportStudentObj,
    name: editStudentName || rawReportStudentObj.name,
    gpa: editStudentGpa || rawReportStudentObj.gpa,
    level: editStudentLevel || rawReportStudentObj.level,
    assessment: {
      academic: editableAcademic,
      behavioral: editableBehavioral,
      risks: editableRisks,
      weaknesses: editableWeaknesses,
      strengths: editableStrengths
    },
    courses: editCourses,
    actionPlans: editActionPlans,
    documentsList: editDocuments,
    customSections: editCustomSections,
    timeline: editTimeline
  } : rawReportStudentObj;

  const evaluatingStudentObj = currentAdvisorStudents.find(s => s.id === evaluatingStudentId);
  const isReportStudentOutOfProbation = reportStudentObj?.level?.startsWith('out of');

  useEffect(() => {
    if (selectedStudentObj) {
      setEditStudentName(selectedStudentObj.name);
      setEditStudentGpa(selectedStudentObj.gpa);
      setEditStudentLevel(selectedStudentObj.level);
      setEditStudentMidterm(selectedStudentObj.midterm);
      setEditableAcademic(selectedStudentObj.assessment.academic);
      setEditableBehavioral(selectedStudentObj.assessment.behavioral);
      setEditableRisks(selectedStudentObj.assessment.risks ? [...selectedStudentObj.assessment.risks] : []);
      setEditableWeaknesses(selectedStudentObj.assessment.weaknesses ? [...selectedStudentObj.assessment.weaknesses] : []);
      setEditableStrengths(selectedStudentObj.assessment.strengths ? [...selectedStudentObj.assessment.strengths] : []);
      setEditCourses(selectedStudentObj.courses ? JSON.parse(JSON.stringify(selectedStudentObj.courses)) : []);
      setEditActionPlans(selectedStudentObj.actionPlans ? JSON.parse(JSON.stringify(selectedStudentObj.actionPlans)) : []);
      setEditDocuments(selectedStudentObj.documentsList ? [...selectedStudentObj.documentsList] : []);
      setEditTimeline(selectedStudentObj.timeline ? JSON.parse(JSON.stringify(selectedStudentObj.timeline)) : []);
      setEditCustomSections(selectedStudentObj.customSections ? JSON.parse(JSON.stringify(selectedStudentObj.customSections)) : []);
    }
  }, [selectedStudentId]);

  const handleSaveStudentEdits = () => {
    const newTimelineItem = {
      date: todayDateStr,
      title: 'Update: Student profile, assessment, or evaluation details edited',
      loggedBy: simulatedRole === 'Student View' ? selectedStudentObj.name : selectedStudentObj.advisor
    };
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                name: editStudentName,
                gpa: editStudentGpa,
                level: editStudentLevel,
                midterm: parseFloat(editStudentMidterm) || stu.midterm,
                assessment: {
                  academic: editableAcademic,
                  behavioral: editableBehavioral,
                  risks: editableRisks,
                  weaknesses: editableWeaknesses,
                  strengths: editableStrengths
                },
                courses: editCourses,
                actionPlans: editActionPlans,
                documentsList: editDocuments,
                customSections: editCustomSections,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
    setIsGlobalEditMode(false);
  };

  const handleUpdateStudentField = (stuId, field, value) => {
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === stuId
            ? { ...stu, [field]: value }
            : stu
        )
      }))
    );
  };

  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentId.trim() || !selectedAdvisor) return;
    const newStuObj = {
      id: newStudentId.trim(),
      name: newStudentName.trim(),
      level: newStudentLevel,
      gpa: newStudentGpa,
      midterm: 12,
      quizzes: [3, 3],
      attendanceWarnings: 0,
      nextFollowUp: todayDateStr,
      studentPhone: newStudentPhone.trim() || '01000000000',
      guardianPhone: newStudentGuardianPhone.trim() || '01200000000',
      assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] },
      courses: [],
      actionPlans: [],
      documentsList: [],
      customSections: [],
      timeline: [{ date: todayDateStr, title: 'Student added to system', loggedBy: selectedAdvisor }]
    };
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => {
        if (adv.name === selectedAdvisor) {
          return {
            ...adv,
            count: adv.students.length + 1,
            students: [newStuObj, ...adv.students]
          };
        }
        return adv;
      })
    );
    setNewStudentName('');
    setNewStudentId('');
    setNewStudentPhone('');
    setNewStudentGuardianPhone('');
    setIsAddStudentModalOpen(false);
  };

  const handleAddRiskItem = () => {
    setEditableRisks([...editableRisks, 'New risk indicator']);
  };

  const handleAddWeaknessItem = () => {
    setEditableWeaknesses([...editableWeaknesses, 'New weakness point']);
  };

  const handleAddStrengthItem = () => {
    setEditableStrengths([...editableStrengths, 'New strength point']);
  };

  const handleDownloadDocument = (doc) => {
    const element = document.createElement("a");
    if (doc.dataUrl) {
      element.href = doc.dataUrl;
      element.download = doc.name;
    } else {
      const isWord = doc.type === 'docx' || doc.name.endsWith('.docx') || doc.name.endsWith('.doc');
      const mimeType = isWord ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'application/pdf';
      const file = new Blob([`MSA University - Faculty of Biotechnology\nOfficial Document Dossier\nDocument Name: ${doc.name}\nType: ${isWord ? 'Word Document' : 'PDF Document'}\nDate: ${todayDateStr}`], { type: mimeType });
      element.href = URL.createObjectURL(file);
      element.download = doc.name;
    }
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleAddCustomSection = (e) => {
    e.preventDefault();
    if (!newSectionTitle.trim() || !newSectionContent.trim()) return;
    const newSec = {
      id: Date.now(),
      title: newSectionTitle.trim(),
      content: newSectionContent.trim()
    };
    const newTimelineItem = {
      date: todayDateStr,
      title: `Update: Custom section added - "${newSectionTitle.trim()}"`,
      loggedBy: selectedStudentObj.advisor
    };
    const updatedSections = [...editCustomSections, newSec];
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditCustomSections(updatedSections);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                customSections: updatedSections,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
    setNewSectionTitle('');
    setNewSectionContent('');
    setIsAddingSectionModalOpen(false);
  };

  const handleRenameCustomSection = (secId, newTitle) => {
    if (!newTitle.trim()) return;
    const oldSec = editCustomSections.find(s => s.id === secId);
    const oldTitle = oldSec ? oldSec.title : 'Section';
    const updatedSections = editCustomSections.map(sec => sec.id === secId ? { ...sec, title: newTitle.trim() } : sec);
    const newTimelineItem = {
      date: todayDateStr,
      title: `Update: Custom section renamed from "${oldTitle}" to "${newTitle.trim()}"`,
      loggedBy: selectedStudentObj.advisor
    };
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditCustomSections(updatedSections);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                customSections: updatedSections,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
    setEditingSectionId(null);
  };

  const handleDeleteCustomSection = (secId) => {
    const updatedSections = editCustomSections.filter(sec => sec.id !== secId);
    const newTimelineItem = {
      date: todayDateStr,
      title: 'Update: Custom section deleted',
      loggedBy: selectedStudentObj.advisor
    };
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditCustomSections(updatedSections);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                customSections: updatedSections,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
  };

  const handleUploadDocumentSubmit = (e) => {
    e.preventDefault();
    if (!attachedFile) return;
    const fileName = attachedFile.name;
    const isWord = fileName.endsWith('.docx') || fileName.endsWith('.doc');
    const fileType = isWord ? 'docx' : 'pdf';
    const dataUrl = URL.createObjectURL(attachedFile);
    
    const resolvedSectionType = simulatedRole === 'Academic Advisor' ? 'advisor' : 'student';
    const newDocObj = {
      name: fileName,
      type: fileType,
      dataUrl: dataUrl,
      sectionType: resolvedSectionType
    };
    
    const loggedUser = simulatedRole === 'Student View' ? selectedStudentObj.name : selectedStudentObj.advisor;
    const newTimelineItem = {
      date: todayDateStr,
      title: `Update: File attached by ${simulatedRole === 'Student View' ? 'Student' : 'Advisor'} (${resolvedSectionType === 'advisor' ? 'Advisor Section' : 'Student Section'}) - "${fileName}"`,
      loggedBy: loggedUser
    };
    const updatedDocs = [...editDocuments, newDocObj];
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditDocuments(updatedDocs);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                documentsList: updatedDocs,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
    setAttachedFile(null);
    setIsUploadModalOpen(false);
  };

  const handleDeleteDocument = (idx) => {
    const targetDoc = editDocuments[idx];
    const removedDoc = targetDoc.name;
    if (simulatedRole === 'Academic Advisor' && targetDoc.sectionType === 'student') {
      alert("Restriction: Advisors cannot delete student-uploaded documents.");
      return;
    }
    const updatedDocs = editDocuments.filter((_, i) => i !== idx);
    const loggedUser = simulatedRole === 'Student View' ? selectedStudentObj.name : selectedStudentObj.advisor;
    const newTimelineItem = {
      date: todayDateStr,
      title: `Update: Document deleted - "${removedDoc}"`,
      loggedBy: loggedUser
    };
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditDocuments(updatedDocs);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                documentsList: updatedDocs,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
  };

  const handleAddActionPlan = () => {
    const newActionText = 'New action plan task item';
    const updatedActions = [...editActionPlans, { text: newActionText, completed: false }];
    const newTimelineItem = {
      date: todayDateStr,
      title: `Update: Action Plan task added - "${newActionText}"`,
      loggedBy: selectedStudentObj.advisor
    };
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditActionPlans(updatedActions);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                actionPlans: updatedActions,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
  };

  const handleUpdateActionPlanText = (idx, newText) => {
    const updated = [...editActionPlans];
    updated[idx].text = newText;
    setEditActionPlans(updated);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                actionPlans: updated
              }
            : stu
        )
      }))
    );
  };

  const handleToggleActionPlanComplete = (idx) => {
    if (simulatedRole !== 'Student View') return;
    const updated = [...editActionPlans];
    updated[idx].completed = !updated[idx].completed;
    const taskObj = updated[idx];
    const statusText = taskObj.completed ? 'completed' : 'uncompleted';
    const loggedUser = selectedStudentObj.name;
    const newTimelineItem = {
      date: todayDateStr,
      title: `Update: Action Plan task "${taskObj.text}" marked as ${statusText} by Student`,
      loggedBy: loggedUser
    };
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditActionPlans(updated);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                actionPlans: updated,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
  };

  const handleDeleteActionPlan = (idx) => {
    const removedAction = editActionPlans[idx].text;
    const updatedActions = editActionPlans.filter((_, i) => i !== idx);
    const newTimelineItem = {
      date: todayDateStr,
      title: `Update: Action Plan task removed - "${removedAction}"`,
      loggedBy: selectedStudentObj.advisor
    };
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditActionPlans(updatedActions);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                actionPlans: updatedActions,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
  };

  const handleAddCourse = () => {
    const newCrs = { name: 'New Course Name', lecturerInstructor: 'Dr. Faculty', labInstructor: 'Eng. TA', q1: '3', q2: '3', midterm: '12', assignment: '7', coursework: '25' };
    const updatedCourses = [...editCourses, newCrs];
    const newTimelineItem = {
      date: todayDateStr,
      title: `Update: Course added - ${newCrs.name}`,
      loggedBy: selectedStudentObj.advisor
    };
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditCourses(updatedCourses);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                courses: updatedCourses,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
  };

  const handleDeleteCourse = (idx) => {
    const removedCrsName = editCourses[idx].name;
    const updatedCourses = editCourses.filter((_, i) => i !== idx);
    const newTimelineItem = {
      date: todayDateStr,
      title: `Update: Course removed - ${removedCrsName}`,
      loggedBy: selectedStudentObj.advisor
    };
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditCourses(updatedCourses);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                courses: updatedCourses,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
  };

  const handleUpdateGrade = (idx, field, value) => {
    const updatedCourses = [...editCourses];
    const courseName = updatedCourses[idx].name;
    updatedCourses[idx][field] = value;
    let fieldLabel = field;
    if (field === 'q1') fieldLabel = 'Quiz 1';
    if (field === 'q2') fieldLabel = 'Quiz 2';
    if (field === 'midterm') fieldLabel = 'Midterm Grade';
    if (field === 'assignment') fieldLabel = 'Assignment Grade';
    if (field === 'coursework') fieldLabel = 'Coursework Grade';
    const loggedUser = simulatedRole === 'Student View' ? selectedStudentObj.name : selectedStudentObj.advisor;
    const newTimelineItem = {
      date: todayDateStr,
      title: `Update: Grade updated for "${courseName}" (${fieldLabel} changed to ${value})`,
      loggedBy: loggedUser
    };
    const updatedTimeline = [newTimelineItem, ...editTimeline];
    setEditCourses(updatedCourses);
    setEditTimeline(updatedTimeline);
    setFacultyAdvisors(prevAdvisors =>
      prevAdvisors.map(adv => ({
        ...adv,
        students: adv.students.map(stu =>
          stu.id === selectedStudentObj.id
            ? {
                ...stu,
                courses: updatedCourses,
                timeline: updatedTimeline
              }
            : stu
        )
      }))
    );
  };

  const handleNavClick = (name) => {
    setActiveNav(name);
    setEvaluatingStudentId(null);
    if (name === 'Student Preview' && !selectedStudentId) {
      setSelectedStudentId(currentAdvisorStudents[0].id);
      setActiveStudentTab(
        simulatedRole === 'Student View' ? 'Action Plans' :
        simulatedRole === 'Parent View' ? 'Academic Records & Courses' :
        'Advisor Assessment'
      );
    }
    if (name === 'Student Reports') {
      setReportSelectedStudentId(selectedStudentId || currentAdvisorStudents[0]?.id || allProbationStudents[0].id);
    }
  };

  const handleAdvisorLogin = (e) => {
    e.preventDefault();
    if (!selectedAdvisor || !advisorPassword) {
      setLoginError('Please select your name and enter your password.');
      return;
    }
    const currentValidPassword = advisorPasswords[selectedAdvisor] || 'password123';
    if (advisorPassword !== currentValidPassword) {
      setLoginError('Invalid password. Please try again.');
      return;
    }
    setLoginError('');
    setSimulatedRole('Academic Advisor');
    setActiveNav('Dashboard');
    setSelectedStudentId(null);
    setCurrentView('app');
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    if (!studentIdInput) {
      setLoginError('Please enter your Student ID.');
      return;
    }
    const found = allProbationStudents.find(s => s.id.toLowerCase() === studentIdInput.trim().toLowerCase());
    if (found) {
      setSelectedStudentId(found.id);
      setSelectedAdvisor(found.advisor);
      setReportSelectedStudentId(found.id);
      setLoginError('');
      setSimulatedRole('Student View');
      setActiveNav('Student Preview');
      setActiveStudentTab('Action Plans');
      setCurrentView('app');
    } else {
      setLoginError('Student ID not found in probation records.');
    }
  };

  const handleParentLogin = (e) => {
    e.preventDefault();
    if (!parentIdInput) {
      setLoginError('Please enter the Student ID.');
      return;
    }
    const found = allProbationStudents.find(s => s.id.toLowerCase() === parentIdInput.trim().toLowerCase());
    if (found) {
      setSelectedStudentId(found.id);
      setSelectedAdvisor(found.advisor);
      setReportSelectedStudentId(found.id);
      setLoginError('');
      setSimulatedRole('Parent View');
      setActiveNav('Student Preview');
      setActiveStudentTab('Academic Records & Courses');
      setCurrentView('app');
    } else {
      setLoginError('Student ID not found in probation records.');
    }
  };

  const handleDocTeamLogin = (e) => {
    e.preventDefault();
    if (docPasswordInput !== 'Documentation123') {
      setLoginError('Incorrect Documentation Team password.');
      return;
    }
    setLoginError('');
    setSimulatedRole('Documentation Team');
    setActiveNav('Documentation Overview');
    setReportSelectedStudentId(allProbationStudents[0].id);
    setCurrentView('app');
  };

  if (!mounted) {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#45499F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (currentView === 'landing') {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col justify-between">
        <header className="bg-[#45499F] text-white px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <img src="/Biotechnology/logo.png" alt="Logo" className="w-9 h-9 object-contain rounded-xl bg-white/10 p-1 border border-white/20" />
            <div>
              <p className="text-[10px] text-indigo-200 uppercase tracking-widest font-semibold">Faculty of Biotechnology</p>
              <h1 className="text-lg font-bold tracking-tight">On-Probation Students Supporting System</h1>
            </div>
          </div>
          <div className="text-xs bg-indigo-950/40 px-3 py-1.5 rounded-xl border border-indigo-500/30 text-indigo-200 font-semibold">
            MSA University
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center p-6 max-w-5xl mx-auto w-full space-y-8">
          <div className="text-center space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Academic Support & Advising System
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Number of Advisors</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">24</p>
                <p className="text-[11px] text-indigo-600 font-semibold mt-1">Active Faculty Members</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#45499F] flex items-center justify-center border border-indigo-100">
                <Users size={24} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Probation Students</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">178</p>
                <p className="text-[11px] text-amber-600 font-semibold mt-1">Under Academic Monitoring</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <ShieldCheck size={24} />
              </div>
            </div>
          </div>

          {/* ABOUT US SECTION DIRECTLY BELOW THE TWO BOXES ON THE FIRST INTERFACE */}
          <div className="w-full max-w-xl space-y-4">
            <div style={{ backgroundColor: '#45499F' }} className="rounded-2xl p-6 text-white shadow-md text-center">
              <h3 className="text-xl font-extrabold tracking-tight">About Us</h3>
              <p className="text-indigo-200 text-xs mt-1">
                MSA University • Faculty of Biotechnology On-Probation Students Supporting System
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <h4 className="text-xs font-bold text-[#45499F] uppercase tracking-wider">Our Mission</h4>
                <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                  To provide proactive academic support, guidance, and personalized tracking for on-probation students, fostering resilience and academic recovery.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <h4 className="text-xs font-bold text-[#45499F] uppercase tracking-wider">Our Vision</h4>
                <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                  Creating a collaborative faculty family where every student is equipped with the tools, mentorship, and action plans needed to succeed.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <h4 className="text-xs font-bold text-[#45499F] uppercase tracking-wider">Support Team</h4>
                <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                  Dedicated academic advisors, documentation teams, and faculty administration working hand-in-hand to monitor progress and celebrate milestones.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            {!accessMode && (
              <div className="space-y-4">
                <h3 className="text-center text-sm font-bold text-slate-900 uppercase tracking-wider">Select Your Access Portal</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => { setAccessMode('advisor'); setLoginError(''); }}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#45499F] bg-slate-50 hover:bg-indigo-50/50 flex flex-col items-center text-center gap-2.5 transition-all group shadow-sm cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white text-[#45499F] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-indigo-100">
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-[11px]">Advisor</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">Faculty login</p>
                    </div>
                  </button>
                  <button
                    onClick={() => { setAccessMode('student'); setLoginError(''); }}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#45499F] bg-slate-50 hover:bg-indigo-50/50 flex flex-col items-center text-center gap-2.5 transition-all group shadow-sm cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-emerald-100">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-[11px]">Student</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">Student login</p>
                    </div>
                  </button>
                  <button
                    onClick={() => { setAccessMode('parent'); setLoginError(''); }}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#45499F] bg-slate-50 hover:bg-indigo-50/50 flex flex-col items-center text-center gap-2.5 transition-all group shadow-sm cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white text-violet-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-violet-100">
                      <HeartHandshake size={20} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-[11px]">Parent</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">Parent login</p>
                    </div>
                  </button>
                  <button
                    onClick={() => { setAccessMode('docteam'); setLoginError(''); }}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#45499F] bg-slate-50 hover:bg-indigo-50/50 flex flex-col items-center text-center gap-2.5 transition-all group shadow-sm cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-blue-100">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-[11px]">Doc Team</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">Master Records</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
            {accessMode === 'advisor' && (
              <form onSubmit={handleAdvisorLogin} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <UserCheck size={18} className="text-[#45499F]" />
                    <h3 className="text-sm font-bold text-slate-900">Academic Advisor Authentication</h3>
                  </div>
                  <button type="button" onClick={() => setAccessMode(null)} className="text-xs text-indigo-600 hover:underline font-bold cursor-pointer">Back</button>
                </div>
                {loginError && <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">{loginError}</div>}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Select Advisor Name (24 Faculty)</label>
                  <select
                    value={selectedAdvisor}
                    onChange={(e) => setSelectedAdvisor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                  >
                    <option value="">-- Select Your Name from List --</option>
                    {facultyAdvisors.map((adv, idx) => (
                      <option key={idx} value={adv.name}>{adv.name} ({adv.count} students)</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter advisor password"
                      value={advisorPassword}
                      onChange={(e) => setAdvisorPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pl-10 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                    />
                    <Users size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                </div>
                <button type="submit" style={{ backgroundColor: '#45499F' }} className="w-full text-white font-bold text-xs py-3.5 rounded-xl shadow-md hover:opacity-95 transition-all mt-2 cursor-pointer">
                  Login to Dashboard
                </button>
              </form>
            )}
            {accessMode === 'student' && (
              <form onSubmit={handleStudentLogin} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={18} className="text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900">Student Portal Authentication</h3>
                  </div>
                  <button type="button" onClick={() => setAccessMode(null)} className="text-xs text-indigo-600 hover:underline font-bold cursor-pointer">Back</button>
                </div>
                {loginError && <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">{loginError}</div>}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student ID</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. 256866"
                      value={studentIdInput}
                      onChange={(e) => setStudentIdInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pl-10 text-xs font-semibold text-slate-800 outline-none focus:border-emerald-600"
                    />
                    <Users size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                  <p className="text-[10px] text-slate-400">Enter your Student ID to check off action plans and attach documents.</p>
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all mt-2 cursor-pointer">
                  Enter Student Dashboard
                </button>
              </form>
            )}
            {accessMode === 'parent' && (
              <form onSubmit={handleParentLogin} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <HeartHandshake size={18} className="text-violet-600" />
                    <h3 className="text-sm font-bold text-slate-900">Parent Portal Authentication</h3>
                  </div>
                  <button type="button" onClick={() => setAccessMode(null)} className="text-xs text-indigo-600 hover:underline font-bold cursor-pointer">Back</button>
                </div>
                {loginError && <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">{loginError}</div>}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student ID (Child)</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. 256866"
                      value={parentIdInput}
                      onChange={(e) => setParentIdInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pl-10 text-xs font-semibold text-slate-800 outline-none focus:border-violet-600"
                    />
                    <Users size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all mt-2 cursor-pointer">
                  Enter Parent Dashboard
                </button>
              </form>
            )}
            {accessMode === 'docteam' && (
              <form onSubmit={handleDocTeamLogin} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-900">Documentation Team Portal</h3>
                  </div>
                  <button type="button" onClick={() => setAccessMode(null)} className="text-xs text-indigo-600 hover:underline font-bold cursor-pointer">Back</button>
                </div>
                {loginError && <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">{loginError}</div>}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Team Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter documentation team password"
                      value={docPasswordInput}
                      onChange={(e) => setDocPasswordInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 pl-10 text-xs font-semibold text-slate-800 outline-none focus:border-blue-600"
                    />
                    <Users size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all mt-2 cursor-pointer">
                  Login to Documentation Portal
                </button>
              </form>
            )}
          </div>
        </main>
        <footer className="text-center py-4 text-slate-400 text-[11px]">
          Faculty of Biotechnology &copy; 2026 MSA University. All rights reserved.
        </footer>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .print-report-container, .print-report-container * {
            visibility: visible;
          }
          .print-report-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            background: white !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}} />
      <header className="bg-[#45499F] text-white px-6 py-3 flex flex-wrap items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={() => { setCurrentView('landing'); setAccessMode(null); }} title="Logout" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/20 transition-all cursor-pointer">
            <ArrowLeft size={18} />
          </button>
          <img src="/Biotechnology/logo.png" alt="Logo" className="w-9 h-9 object-contain rounded-xl bg-white/10 p-1 border border-white/20" />
          <div>
            <h1 className="text-base font-bold tracking-tight">On-Probation Students Supporting System</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-indigo-950/40 px-3 py-1.5 rounded-xl border border-indigo-500/30 text-xs">
            <span className="text-indigo-200 font-medium">Role:</span>
            <span className="text-white font-bold">{simulatedRole}</span>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex shrink-0">
          <nav className="p-4 space-y-1">
            <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Navigation</div>
            {simulatedRole === 'Parent View' || simulatedRole === 'Student View' ? (
              <>
                <button
                  onClick={() => handleNavClick('Student Preview')}
                  style={activeNav === 'Student Preview' ? { backgroundColor: '#45499F' } : {}}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    activeNav === 'Student Preview' ? 'text-white shadow-md shadow-[#45499F]/25 font-bold' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <Users size={18} />
                  <span>Student Portfolio</span>
                </button>
              </>
            ) : simulatedRole === 'Documentation Team' ? (
              <>
                <button
                  onClick={() => handleNavClick('Documentation Overview')}
                  style={activeNav === 'Documentation Overview' ? { backgroundColor: '#45499F' } : {}}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    activeNav === 'Documentation Overview' ? 'text-white shadow-md shadow-[#45499F]/25 font-bold' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <BookOpen size={18} />
                  <span>Advisors & Students Master</span>
                </button>
                <button
                  onClick={() => handleNavClick('Student Reports')}
                  style={activeNav === 'Student Reports' ? { backgroundColor: '#45499F' } : {}}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    activeNav === 'Student Reports' ? 'text-white shadow-md shadow-[#45499F]/25 font-bold' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <BarChart3 size={18} />
                  <span>Student Reports</span>
                </button>
                <button
                  onClick={() => handleNavClick('Team Meetings')}
                  style={activeNav === 'Team Meetings' ? { backgroundColor: '#45499F' } : {}}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    activeNav === 'Team Meetings' ? 'text-white shadow-md shadow-[#45499F]/25 font-bold' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <Calendar size={18} />
                  <span>Team Meetings</span>
                </button>
              </>
            ) : (
              [
                { name: 'Dashboard', icon: LayoutDashboard },
                { name: 'Student Preview', icon: Users },
                { name: 'Out of Probation Students', icon: CheckCircle2 },
                { name: 'Student Reports', icon: BarChart3 }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.name)}
                    style={isActive ? { backgroundColor: '#45499F' } : {}}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive ? 'text-white shadow-md shadow-[#45499F]/25 font-bold' : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </button>
                );
              })
            )}
          </nav>
          <div className="p-4 m-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <p className="text-xs font-bold text-slate-900">MSA Biotechnology</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              {simulatedRole === 'Student View' ? 'Student Interactive Mode' : simulatedRole === 'Parent View' ? 'Read-Only Portal' : 'Fully Editable Mode'}
            </p>
          </div>
        </aside>
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* DOCUMENTATION OVERVIEW VIEW */}
            {activeNav === 'Documentation Overview' && (
              <div className="space-y-6">
                <div style={{ backgroundColor: '#45499F' }} className="rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="space-y-2">
                    <span className="bg-white/20 text-indigo-100 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                      Documentation Team Portal (Master Audit)
                    </span>
                    <h2 className="text-3xl font-extrabold tracking-tight">
                      Faculty Master Records: All Advisors & Students
                    </h2>
                  </div>
                  <div className="bg-indigo-950/50 p-4 rounded-2xl border border-indigo-400/30 text-center shrink-0">
                    <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">TOTAL STUDENTS</p>
                    <p className="text-2xl font-extrabold text-white mt-0.5">{allProbationStudents.length}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-base font-bold text-slate-900">All Advisors & Assigned Students Master Table</h3>
                    <div className="relative w-full sm:w-72">
                      <input
                        type="text"
                        placeholder="Search student or advisor..."
                        value={docTeamSearchQuery}
                        onChange={(e) => setDocTeamSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 pl-9 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                      />
                      <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Student Name</th>
                          <th className="p-3">Student ID</th>
                          <th className="p-3">Level</th>
                          <th className="p-3">GPA</th>
                          <th className="p-3">Student Phone Number</th>
                          <th className="p-3">Guardian Phone Number</th>
                          <th className="p-3">Faculty Advisor</th>
                          <th className="p-3">Student Report</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {allProbationStudents
                          .filter(s => 
                            s.name.toLowerCase().includes(docTeamSearchQuery.toLowerCase()) || 
                            s.id.includes(docTeamSearchQuery) || 
                            s.advisor.toLowerCase().includes(docTeamSearchQuery.toLowerCase())
                          )
                          .map((stu) => (
                            <tr key={stu.id} className="hover:bg-slate-50">
                              <td className="p-3 font-bold text-slate-900">{stu.name}</td>
                              <td className="p-3 font-mono font-semibold text-[#45499F]">{stu.id}</td>
                              <td className="p-3 font-semibold text-slate-600">Level {stu.level}</td>
                              <td className="p-3 font-extrabold text-[#45499F] font-mono">{stu.gpa}</td>
                              <td className="p-3 font-semibold text-slate-600">{stu.studentPhone}</td>
                              <td className="p-3 font-semibold text-slate-600">{stu.guardianPhone}</td>
                              <td className="p-3 font-semibold text-indigo-900">{stu.advisor}</td>
                              <td className="p-3">
                                <button
                                  onClick={() => {
                                    setReportSelectedStudentId(stu.id);
                                    setActiveNav('Student Reports');
                                  }}
                                  className="text-blue-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  View Audit Report <BarChart3 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {/* DASHBOARD VIEW */}
            {activeNav === 'Dashboard' && (
              <div className="space-y-6">
                <div style={{ backgroundColor: '#45499F' }} className="rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex items-center gap-4">
                    {selectedAdvisor === 'Hagar Magdy' && (
                      <div className="w-28 h-28 rounded-2xl bg-white/10 border border-white/20 overflow-hidden flex-shrink-0">
                        <img
                          src="/images/hagar-magdy.jpg"
                          alt="Profile Picture"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/hagar-magdy.jpeg";
                          }}
                        />
                      </div>
                    )}
                    <div className="space-y-1">
                      <span className="bg-white/20 text-indigo-100 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                        Academic Advisor Portal
                      </span>
                      <h2 className="text-3xl font-extrabold tracking-tight">
                        Welcome back, {selectedAdvisor || 'Prof. Haidan Mostafa'}
                      </h2>
                      <p className="text-indigo-200 text-xs">
                        Faculty of Biotechnology On-Probation Students Supporting System.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsAddStudentModalOpen(true)}
                      className="bg-white text-[#45499F] font-bold text-xs px-4 py-3 rounded-2xl flex items-center gap-2 shadow-md cursor-pointer hover:bg-slate-50 transition-all"
                    >
                      <Plus size={16} /> Add New Student
                    </button>
                    {!isDashboardEditMode ? (
                      <button
                        onClick={() => setIsDashboardEditMode(true)}
                        className="bg-indigo-950/50 hover:bg-indigo-900 text-white border border-indigo-400/40 font-bold text-xs px-4 py-3 rounded-2xl flex items-center gap-2 shadow-md cursor-pointer transition-all"
                      >
                        <Edit3 size={16} /> Edit Profile
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsDashboardEditMode(false)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3 rounded-2xl flex items-center gap-2 shadow-md cursor-pointer transition-all"
                      >
                        <Save size={16} /> Save Profile
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Probation Students</p>
                      <p className="text-3xl font-extrabold text-slate-900 mt-1">{normalDashboardStudents.length}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#45499F] flex items-center justify-center border border-indigo-100">
                      <Users size={24} />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Follow-ups Today</p>
                      <p className="text-3xl font-extrabold text-slate-900 mt-1">{followUpsTodayCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                      <Clock size={24} />
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Out of Probation Students</p>
                      <p className="text-3xl font-extrabold text-slate-900 mt-1">{outOfProbationCount}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                      <CheckCircle2 size={24} />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-slate-900">Assigned Probation Students</h3>
                    <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full text-xs">
                      {normalDashboardStudents.length} Active Students
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Student Name</th>
                          <th className="p-3">Student ID</th>
                          <th className="p-3">Level</th>
                          <th className="p-3">GPA</th>
                          <th className="p-3">Student Phone Number</th>
                          <th className="p-3">Guardian Phone Number</th>
                          <th className="p-3">Next Follow-up</th>
                          <th className="p-3">Portfolio</th>
                          <th className="p-3">Report</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {normalDashboardStudents.map((stu) => (
                          <tr key={stu.id} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-900">
                              {!isDashboardEditMode ? (
                                stu.name
                              ) : (
                                <input
                                  type="text"
                                  value={stu.name}
                                  onChange={(e) => handleUpdateStudentField(stu.id, 'name', e.target.value)}
                                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-full font-bold outline-none focus:border-[#45499F]"
                                />
                              )}
                            </td>
                            <td className="p-3 font-mono font-semibold text-[#45499F]">
                              {!isDashboardEditMode ? (
                                stu.id
                              ) : (
                                <input
                                  type="text"
                                  value={stu.id}
                                  onChange={(e) => handleUpdateStudentField(stu.id, 'id', e.target.value)}
                                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-24 font-mono outline-none focus:border-[#45499F]"
                                />
                              )}
                            </td>
                            <td className="p-3 font-semibold text-slate-600">
                              {!isDashboardEditMode ? (
                                stu.level
                              ) : (
                                <input
                                  type="text"
                                  value={stu.level}
                                  onChange={(e) => handleUpdateStudentField(stu.id, 'level', e.target.value)}
                                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-16 outline-none focus:border-[#45499F]"
                                />
                              )}
                            </td>
                            <td className="p-3 font-extrabold text-[#45499F] font-mono">
                              {!isDashboardEditMode ? (
                                stu.gpa
                              ) : (
                                <input
                                  type="text"
                                  value={stu.gpa}
                                  onChange={(e) => handleUpdateStudentField(stu.id, 'gpa', e.target.value)}
                                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-16 font-mono outline-none focus:border-[#45499F]"
                                />
                              )}
                            </td>
                            <td className="p-3 font-semibold text-slate-600">
                              {!isDashboardEditMode ? (
                                stu.studentPhone || 'N/A'
                              ) : (
                                <input
                                  type="text"
                                  value={stu.studentPhone || ''}
                                  onChange={(e) => handleUpdateStudentField(stu.id, 'studentPhone', e.target.value)}
                                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-28 outline-none focus:border-[#45499F]"
                                />
                              )}
                            </td>
                            <td className="p-3 font-semibold text-slate-600">
                              {!isDashboardEditMode ? (
                                stu.guardianPhone || 'N/A'
                              ) : (
                                <input
                                  type="text"
                                  value={stu.guardianPhone || ''}
                                  onChange={(e) => handleUpdateStudentField(stu.id, 'guardianPhone', e.target.value)}
                                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-28 outline-none focus:border-[#45499F]"
                                />
                              )}
                            </td>
                            <td className="p-3 font-semibold text-indigo-700">
                              {!isDashboardEditMode ? (
                                stu.nextFollowUp || todayDateStr
                              ) : (
                                <input
                                  type="date"
                                  value={stu.nextFollowUp || todayDateStr}
                                  onChange={(e) => handleUpdateStudentField(stu.id, 'nextFollowUp', e.target.value)}
                                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-32 outline-none focus:border-[#45499F]"
                                />
                              )}
                            </td>
                            <td className="p-3">
                              <button 
                                onClick={() => { 
                                  setSelectedStudentId(stu.id); 
                                  setReportSelectedStudentId(stu.id); 
                                  setActiveNav('Student Preview'); 
                                  setActiveStudentTab(
                                    simulatedRole === 'Student View' ? 'Action Plans' :
                                    simulatedRole === 'Parent View' ? 'Academic Records & Courses' :
                                    'Advisor Assessment'
                                  ); 
                                }} 
                                className="text-[#45499F] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                Open Portfolio <ChevronRight size={14} />
                              </button>
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => {
                                  setReportSelectedStudentId(stu.id);
                                  setActiveNav('Student Reports');
                                }}
                                className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                View Report <BarChart3 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {/* STUDENT PREVIEW VIEW */}
            {activeNav === 'Student Preview' && (
              selectedStudentId ? (
                <div className="space-y-6">
                  <div style={{ backgroundColor: '#45499F' }} className="rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4 w-full">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-extrabold shadow-inner shrink-0">
                        {selectedStudentObj.name.charAt(0)}
                      </div>
                      <div className="space-y-1 w-full">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <h2 className="text-2xl font-extrabold tracking-tight">
                            {selectedStudentObj.name}
                          </h2>
                          <div className="flex items-center gap-3">
                            {simulatedRole === 'Academic Advisor' && (
                              !isGlobalEditMode ? (
                                <button
                                  onClick={() => setIsGlobalEditMode(true)}
                                  className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3 py-1.5 rounded-xl border border-white/30 flex items-center gap-1 cursor-pointer"
                                >
                                  <Edit3 size={14} /> Edit Profile
                                </button>
                              ) : (
                                <button
                                  onClick={handleSaveStudentEdits}
                                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
                                >
                                  <Save size={14} /> Save Profile
                                </button>
                              )
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-indigo-200 text-xs pt-1">
                          <span>Student ID: {selectedStudentObj.id}</span>
                          <span>|</span>
                          <span>Level: {selectedStudentObj.level}</span>
                          <span>|</span>
                          <span>Advisor: {selectedStudentObj.advisor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex items-center gap-4 bg-indigo-950/50 p-4 rounded-2xl border border-indigo-400/30">
                        <div>
                          <p className="text-[9px] text-indigo-300 font-bold uppercase tracking-wider">CURRENT GPA</p>
                          <p className="text-2xl font-extrabold text-white mt-0.5">{selectedStudentObj.gpa}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {simulatedRole === 'Student View' ? (
                        ['Action Plans', 'Academic Records & Courses', 'Document'].map((tab) => {
                          const isActive = activeStudentTab === tab;
                          return (
                            <button
                              key={tab}
                              onClick={() => setActiveStudentTab(tab)}
                              style={isActive ? { backgroundColor: '#45499F' } : {}}
                              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                                isActive ? 'text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                              }`}
                            >
                              {tab}
                            </button>
                          );
                        })
                      ) : simulatedRole === 'Parent View' ? (
                        ['Advisor Assessment', 'Academic Records & Courses', 'Action Plans', 'Document'].map((tab) => {
                          const isActive = activeStudentTab === tab;
                          return (
                            <button
                              key={tab}
                              onClick={() => setActiveStudentTab(tab)}
                              style={isActive ? { backgroundColor: '#45499F' } : {}}
                              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                                isActive ? 'text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                              }`}
                            >
                              {tab}
                            </button>
                          );
                        })
                      ) : (
                        ['Advisor Assessment', 'Academic Records & Courses', 'Action Plans', 'Document', ...(editCustomSections || []).map(s => s.title)].map((tab) => {
                          const isActive = activeStudentTab === tab;
                          return (
                            <button
                              key={tab}
                              onClick={() => setActiveStudentTab(tab)}
                              style={isActive ? { backgroundColor: '#45499F' } : {}}
                              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                                isActive ? 'text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                              }`}
                            >
                              {tab}
                            </button>
                          );
                        })
                      )}
                    </div>
                    {simulatedRole === 'Academic Advisor' && (
                      <button
                        onClick={() => setIsAddingSectionModalOpen(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Plus size={16} /> Create New Section
                      </button>
                    )}
                  </div>
                  {/* ADVISOR ASSESSMENT TAB */}
                  {activeStudentTab === 'Advisor Assessment' && simulatedRole !== 'Student View' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <FileText size={18} className="text-[#45499F]" />
                            <h3 className="text-sm font-bold text-slate-900">Advisor Assessment</h3>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic Performance Evaluation</p>
                            {!isGlobalEditMode ? (
                              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100 mt-1 font-medium leading-relaxed">
                                {editableAcademic}
                              </p>
                            ) : (
                              <textarea
                                value={editableAcademic}
                                onChange={(e) => setEditableAcademic(e.target.value)}
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F] mt-1"
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Behavioral & Well-being Evaluation</p>
                            {!isGlobalEditMode ? (
                              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100 mt-1 font-medium leading-relaxed">
                                {editableBehavioral}
                              </p>
                            ) : (
                              <textarea
                                value={editableBehavioral}
                                onChange={(e) => setEditableBehavioral(e.target.value)}
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F] mt-1"
                              />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">At-Risk Indicators</p>
                              {isGlobalEditMode && (
                                <button
                                  onClick={handleAddRiskItem}
                                  className="text-xs text-[#45499F] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                                >
                                  <Plus size={14} /> Add Risk
                                </button>
                              )}
                            </div>
                            {!isGlobalEditMode ? (
                              <div className="bg-rose-50 text-rose-700 p-3 rounded-2xl border border-rose-200 mt-1 text-xs font-bold space-y-1">
                                {editableRisks.map((r, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <AlertTriangle size={14} className="shrink-0" /> {r}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-2 mt-1">
                                {editableRisks.map((r, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={r}
                                      onChange={(e) => {
                                        const updated = [...editableRisks];
                                        updated[i] = e.target.value;
                                        setEditableRisks(updated);
                                      }}
                                      className="w-full bg-rose-50 border border-rose-200 rounded-xl p-2 text-xs font-semibold text-rose-800 outline-none"
                                    />
                                    <button
                                      onClick={() => setEditableRisks(editableRisks.filter((_, idx) => idx !== i))}
                                      className="text-rose-600 hover:text-rose-800 cursor-pointer shrink-0"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                          <Award size={18} className="text-[#45499F]" />
                          <h3 className="text-sm font-bold text-slate-900">Strengths & Weaknesses</h3>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identified Weaknesses</p>
                              {isGlobalEditMode && (
                                <button
                                  onClick={handleAddWeaknessItem}
                                  className="text-xs text-[#45499F] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                                >
                                  <Plus size={14} /> Add Weakness
                                </button>
                              )}
                            </div>
                            {!isGlobalEditMode ? (
                              <div className="flex flex-wrap gap-2 mt-1.5">
                                {editableWeaknesses.map((w, i) => (
                                  <span key={i} className="bg-rose-50 text-rose-700 text-[11px] font-bold px-3 py-1 rounded-full border border-rose-200">{w}</span>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-2 mt-1.5">
                                {editableWeaknesses.map((w, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={w}
                                      onChange={(e) => {
                                        const updated = [...editableWeaknesses];
                                        updated[i] = e.target.value;
                                        setEditableWeaknesses(updated);
                                      }}
                                      className="w-full bg-rose-50 border border-rose-200 rounded-xl p-2 text-xs font-semibold text-rose-800 outline-none"
                                    />
                                    <button
                                      onClick={() => setEditableWeaknesses(editableWeaknesses.filter((_, idx) => idx !== i))}
                                      className="text-rose-600 hover:text-rose-800 cursor-pointer shrink-0"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identified Strengths</p>
                              {isGlobalEditMode && (
                                <button
                                  onClick={handleAddStrengthItem}
                                  className="text-xs text-[#45499F] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                                >
                                  <Plus size={14} /> Add Strength
                                </button>
                              )}
                            </div>
                            {!isGlobalEditMode ? (
                              <div className="flex flex-wrap gap-2 mt-1.5">
                                {editableStrengths.map((s, i) => (
                                  <span key={i} className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200">{s}</span>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-2 mt-1.5">
                                {editableStrengths.map((s, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <input
                                      type="text"
                                      value={s}
                                      onChange={(e) => {
                                        const updated = [...editableStrengths];
                                        updated[i] = e.target.value;
                                        setEditableStrengths(updated);
                                      }}
                                      className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-2 text-xs font-semibold text-emerald-800 outline-none"
                                    />
                                    <button
                                      onClick={() => setEditableStrengths(editableStrengths.filter((_, idx) => idx !== i))}
                                      className="text-rose-600 hover:text-rose-800 cursor-pointer shrink-0"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* ACADEMIC RECORDS & COURSES TAB */}
                  {activeStudentTab === 'Academic Records & Courses' && (
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">Enrolled Courses & Assessment Grades</h3>
                        </div>
                        {isGlobalEditMode && simulatedRole === 'Academic Advisor' && (
                          <button
                            onClick={handleAddCourse}
                            className="bg-[#45499F] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={14} /> Add Course
                          </button>
                        )}
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-200">
                            <tr>
                              <th className="p-3">Course Name</th>
                              <th className="p-3">Lecturer Instructor</th>
                              <th className="p-3">Lab Instructor</th>
                              <th className="p-3">Quizzes</th>
                              <th className="p-3">Midterm (/20)</th>
                              <th className="p-3">Assignment</th>
                              <th className="p-3">Coursework (/40)</th>
                              {isGlobalEditMode && simulatedRole === 'Academic Advisor' && <th className="p-3">Action</th>}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {editCourses.map((crs, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-3 font-bold text-slate-900">
                                  {!isGlobalEditMode || simulatedRole === 'Student View' || simulatedRole === 'Parent View' ? crs.name : (
                                    <input
                                      type="text"
                                      value={crs.name}
                                      onChange={(e) => {
                                        const updated = [...editCourses];
                                        updated[idx].name = e.target.value;
                                        setEditCourses(updated);
                                      }}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs w-full font-semibold"
                                    />
                                  )}
                                </td>
                                <td className="p-3 font-semibold text-slate-600">
                                  {!isGlobalEditMode || simulatedRole === 'Student View' || simulatedRole === 'Parent View' ? crs.lecturerInstructor : (
                                    <input
                                      type="text"
                                      value={crs.lecturerInstructor}
                                      onChange={(e) => {
                                        const updated = [...editCourses];
                                        updated[idx].lecturerInstructor = e.target.value;
                                        setEditCourses(updated);
                                      }}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs w-full"
                                    />
                                  )}
                                </td>
                                <td className="p-3 font-semibold text-indigo-700">
                                  {!isGlobalEditMode || simulatedRole === 'Student View' || simulatedRole === 'Parent View' ? (crs.labInstructor || 'TBD') : (
                                    <input
                                      type="text"
                                      value={crs.labInstructor || ''}
                                      onChange={(e) => {
                                        const updated = [...editCourses];
                                        updated[idx].labInstructor = e.target.value;
                                        setEditCourses(updated);
                                      }}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs w-full"
                                    />
                                  )}
                                </td>
                                <td className="p-3 font-semibold text-slate-700">
                                  {!isGlobalEditMode || simulatedRole === 'Student View' || simulatedRole === 'Parent View' ? `Q1: ${crs.q1} | Q2: ${crs.q2}` : (
                                    <div className="flex gap-1 items-center">
                                      <input
                                        type="text"
                                        value={crs.q1}
                                        onBlur={(e) => handleUpdateGrade(idx, 'q1', e.target.value)}
                                        onChange={(e) => {
                                          const updated = [...editCourses];
                                          updated[idx].q1 = e.target.value;
                                          setEditCourses(updated);
                                        }}
                                        className="bg-slate-50 border border-slate-300 rounded px-1 py-0.5 text-xs w-12"
                                      />
                                      <span>|</span>
                                      <input
                                        type="text"
                                        value={crs.q2}
                                        onBlur={(e) => handleUpdateGrade(idx, 'q2', e.target.value)}
                                        onChange={(e) => {
                                          const updated = [...editCourses];
                                          updated[idx].q2 = e.target.value;
                                          setEditCourses(updated);
                                        }}
                                        className="bg-slate-50 border border-slate-300 rounded px-1 py-0.5 text-xs w-12"
                                      />
                                    </div>
                                  )}
                                </td>
                                <td className="p-3 font-semibold text-slate-700">
                                  {!isGlobalEditMode || simulatedRole === 'Student View' || simulatedRole === 'Parent View' ? `${crs.midterm}/20` : (
                                    <input
                                      type="text"
                                      value={crs.midterm}
                                      onBlur={(e) => handleUpdateGrade(idx, 'midterm', e.target.value)}
                                      onChange={(e) => {
                                        const updated = [...editCourses];
                                        updated[idx].midterm = e.target.value;
                                        setEditCourses(updated);
                                      }}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs w-16"
                                    />
                                  )}
                                </td>
                                <td className="p-3 font-semibold text-slate-700">
                                  {!isGlobalEditMode || simulatedRole === 'Student View' || simulatedRole === 'Parent View' ? crs.assignment : (
                                    <input
                                      type="text"
                                      value={crs.assignment}
                                      onBlur={(e) => handleUpdateGrade(idx, 'assignment', e.target.value)}
                                      onChange={(e) => {
                                        const updated = [...editCourses];
                                        updated[idx].assignment = e.target.value;
                                        setEditCourses(updated);
                                      }}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs w-16"
                                    />
                                  )}
                                </td>
                                <td className="p-3 font-semibold text-slate-700">
                                  {!isGlobalEditMode || simulatedRole === 'Student View' || simulatedRole === 'Parent View' ? `${crs.coursework}/40` : (
                                    <input
                                      type="text"
                                      value={crs.coursework}
                                      onBlur={(e) => handleUpdateGrade(idx, 'coursework', e.target.value)}
                                      onChange={(e) => {
                                        const updated = [...editCourses];
                                        updated[idx].coursework = e.target.value;
                                        setEditCourses(updated);
                                      }}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs w-16"
                                    />
                                  )}
                                </td>
                                {isGlobalEditMode && simulatedRole === 'Academic Advisor' && (
                                  <td className="p-3">
                                    <button
                                      onClick={() => handleDeleteCourse(idx)}
                                      className="text-rose-600 hover:text-rose-800 cursor-pointer"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* ACTION PLANS TAB */}
                  {activeStudentTab === 'Action Plans' && (
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">Action Plans & Task Progress</h3>
                        </div>
                        {simulatedRole === 'Academic Advisor' && (
                          <button
                            onClick={handleAddActionPlan}
                            className="bg-[#45499F] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
                          >
                            <Plus size={14} /> Add Task
                          </button>
                        )}
                      </div>
                      {(() => {
                        const totalTasks = editActionPlans.length;
                        const completedTasks = editActionPlans.filter(t => t.completed).length;
                        const progressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                        return (
                          <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 space-y-2">
                            <div className="flex justify-between items-center text-xs font-bold">
                              <span className="text-[#45499F]">Action Plan Completion Progress</span>
                              <span className="text-emerald-700 font-extrabold">{progressPct}% Completed ({completedTasks}/{totalTasks} tasks)</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                              <div 
                                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300" 
                                style={{ width: `${progressPct}%` }} 
                              />
                            </div>
                          </div>
                        );
                      })()}
                      <div className="space-y-3">
                        {editActionPlans.map((act, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                            <div className="flex items-center gap-3 flex-1">
                              <input
                                type="checkbox"
                                checked={act.completed}
                                disabled={simulatedRole !== 'Student View'}
                                onChange={() => handleToggleActionPlanComplete(idx)}
                                className={`w-4 h-4 rounded text-[#45499F] focus:ring-[#45499F] ${simulatedRole === 'Student View' ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'}`}
                              />
                              {simulatedRole === 'Academic Advisor' ? (
                                <input
                                  type="text"
                                  value={act.text}
                                  onChange={(e) => handleUpdateActionPlanText(idx, e.target.value)}
                                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                                  placeholder="Rename task..."
                                />
                              ) : (
                                <span className={`text-xs font-semibold ${act.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                  {act.text}
                                </span>
                              )}
                            </div>
                            {simulatedRole === 'Academic Advisor' && (
                              <button
                                onClick={() => handleDeleteActionPlan(idx)}
                                className="text-rose-600 hover:text-rose-800 cursor-pointer shrink-0"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* DOCUMENT TAB */}
                  {activeStudentTab === 'Document' && (
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">Documents Repository</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Manage advisor notices and student-uploaded documentation securely.</p>
                        </div>
                        {(simulatedRole === 'Academic Advisor' || simulatedRole === 'Student View') && (
                          <button
                            onClick={() => setIsUploadModalOpen(true)}
                            className="bg-[#45499F] hover:opacity-95 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
                          >
                            <Upload size={16} /> Attach PDF or Word File
                          </button>
                        )}
                      </div>
                      {/* SECTION 1: ADVISOR DOCUMENTS */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-extrabold text-[#45499F] uppercase tracking-wider flex items-center gap-2">
                            <FileText size={16} /> Advisor Documents
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">Provided by your academic advisor (View-only)</span>
                        </div>
                        <div className="space-y-3">
                          {editDocuments.filter(doc => doc.sectionType === 'advisor' || !doc.sectionType).length === 0 ? (
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
                              No advisor documents available.
                            </div>
                          ) : (
                            editDocuments.map((doc, idx) => {
                              if (doc.sectionType === 'advisor' || !doc.sectionType) {
                                const docName = typeof doc === 'string' ? doc : doc.name;
                                const docType = typeof doc === 'string' ? (doc.endsWith('.docx') ? 'docx' : 'pdf') : doc.type;
                                return (
                                  <div key={idx} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-200">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#45499F] flex items-center justify-center border border-indigo-100 shrink-0">
                                        <FileText size={20} />
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-bold text-[#45499F]">{docName}</h4>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{docType === 'docx' ? 'Word Document' : 'PDF Document'}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <button 
                                        onClick={() => handleDownloadDocument(doc)}
                                        className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-xs cursor-pointer hover:bg-slate-50"
                                        title="Download & Open Document"
                                      >
                                        <Download size={16} />
                                      </button>
                                      {simulatedRole === 'Academic Advisor' && (
                                        <button
                                          onClick={() => handleDeleteDocument(idx)}
                                          className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shadow-xs cursor-pointer"
                                          title="Delete Advisor Document"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })
                          )}
                        </div>
                      </div>
                      {/* SECTION 2: STUDENT DOCUMENTS */}
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
                            <GraduationCap size={16} /> My Uploaded Documents
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">Uploaded by student (Protected from advisor deletion)</span>
                        </div>
                        <div className="space-y-3">
                          {editDocuments.filter(doc => doc.sectionType === 'student').length === 0 ? (
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
                              No student documents uploaded yet.
                            </div>
                          ) : (
                            editDocuments.map((doc, idx) => {
                              if (doc.sectionType === 'student') {
                                const docName = typeof doc === 'string' ? doc : doc.name;
                                const docType = typeof doc === 'string' ? (doc.endsWith('.docx') ? 'docx' : 'pdf') : doc.type;
                                return (
                                  <div key={idx} className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-200">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
                                        <FileText size={20} />
                                      </div>
                                      <div>
                                        <h4 className="text-xs font-bold text-emerald-800">{docName}</h4>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{docType === 'docx' ? 'Word Document' : 'PDF Document'}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <button 
                                        onClick={() => handleDownloadDocument(doc)}
                                        className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-xs cursor-pointer hover:bg-slate-50"
                                        title="Download & Open Document"
                                      >
                                        <Download size={16} />
                                      </button>
                                      
                                      {simulatedRole === 'Student View' && (
                                        <button
                                          onClick={() => handleDeleteDocument(idx)}
                                          className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shadow-xs cursor-pointer"
                                          title="Delete Document"
                                        >
                                          <Trash2 size={16} />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* CUSTOM SECTIONS TAB */}
                  {simulatedRole !== 'Student View' && simulatedRole !== 'Parent View' && (editCustomSections || []).map((sec) => {
                    if (activeStudentTab === sec.title) {
                      return (
                        <div key={sec.id} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3">
                              {editingSectionId === sec.id ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={editingSectionTitleText}
                                    onChange={(e) => setEditingSectionTitleText(e.target.value)}
                                    className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 outline-none"
                                  />
                                  <button
                                    onClick={() => handleRenameCustomSection(sec.id, editingSectionTitleText)}
                                    className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingSectionId(null)}
                                    className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <h3 className="text-base font-bold text-slate-900">{sec.title}</h3>
                                  {simulatedRole === 'Academic Advisor' && (
                                    <button
                                      onClick={() => {
                                        setEditingSectionId(sec.id);
                                        setEditingSectionTitleText(sec.title);
                                      }}
                                      className="text-indigo-600 hover:text-indigo-800 p-1 cursor-pointer"
                                      title="Rename Section"
                                    >
                                      <Edit3 size={14} />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                            {simulatedRole === 'Academic Advisor' && (
                              <button
                                onClick={() => handleDeleteCustomSection(sec.id)}
                                className="text-rose-600 hover:text-rose-800 text-xs font-bold flex items-center gap-1 cursor-pointer bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200"
                              >
                                <Trash2 size={14} /> Delete Section
                              </button>
                            )}
                          </div>
                          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium">
                            {sec.content}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : null
            )}
            {/* OUT OF PROBATION STUDENTS VIEW */}
            {activeNav === 'Out of Probation Students' && (
              <div className="space-y-6">
                {!evaluatingStudentId ? (
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900">Out of Probation Students</h3>
                        <p className="text-xs text-slate-500 mt-1">Students monitored for graduation/clearance evaluation.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {!isDashboardEditMode ? (
                          <button
                            onClick={() => setIsDashboardEditMode(true)}
                            className="bg-[#45499F] hover:opacity-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
                          >
                            <Edit3 size={16} /> Edit Profile
                          </button>
                        ) : (
                          <button
                            onClick={() => setIsDashboardEditMode(false)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
                          >
                            <Save size={16} /> Save Profile
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-3">Student Name</th>
                            <th className="p-3">Student ID</th>
                            <th className="p-3">Level</th>
                            <th className="p-3">Student Phone Number</th>
                            <th className="p-3">Guardian Phone Number</th>
                            <th className="p-3">Next Follow-up</th>
                            <th className="p-3">Academic Evaluation</th>
                            <th className="p-3">Report</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {outOfProbationSectionStudents.length > 0 ? (
                            outOfProbationSectionStudents.map((stu) => (
                              <tr key={stu.id} className="hover:bg-slate-50">
                                <td className="p-3 font-bold text-slate-900">
                                  {!isDashboardEditMode ? (
                                    stu.name
                                  ) : (
                                    <input
                                      type="text"
                                      value={stu.name}
                                      onChange={(e) => handleUpdateStudentField(stu.id, 'name', e.target.value)}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-full font-bold outline-none focus:border-[#45499F]"
                                    />
                                  )}
                                </td>
                                <td className="p-3 font-mono font-semibold text-[#45499F]">
                                  {!isDashboardEditMode ? (
                                    stu.id
                                  ) : (
                                    <input
                                      type="text"
                                      value={stu.id}
                                      onChange={(e) => handleUpdateStudentField(stu.id, 'id', e.target.value)}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-24 font-mono outline-none focus:border-[#45499F]"
                                    />
                                  )}
                                </td>
                                <td className="p-3 font-semibold text-slate-600">
                                  {!isDashboardEditMode ? (
                                    stu.level
                                  ) : (
                                    <input
                                      type="text"
                                      value={stu.level}
                                      onChange={(e) => handleUpdateStudentField(stu.id, 'level', e.target.value)}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-20 outline-none focus:border-[#45499F]"
                                    />
                                  )}
                                </td>
                                <td className="p-3 font-semibold text-slate-600">
                                  {!isDashboardEditMode ? (
                                    stu.studentPhone || 'N/A'
                                  ) : (
                                    <input
                                      type="text"
                                      value={stu.studentPhone || ''}
                                      onChange={(e) => handleUpdateStudentField(stu.id, 'studentPhone', e.target.value)}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-28 outline-none focus:border-[#45499F]"
                                    />
                                  )}
                                </td>
                                <td className="p-3 font-semibold text-slate-600">
                                  {!isDashboardEditMode ? (
                                    stu.guardianPhone || 'N/A'
                                  ) : (
                                    <input
                                      type="text"
                                      value={stu.guardianPhone || ''}
                                      onChange={(e) => handleUpdateStudentField(stu.id, 'guardianPhone', e.target.value)}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-28 outline-none focus:border-[#45499F]"
                                    />
                                  )}
                                </td>
                                <td className="p-3 font-semibold text-indigo-700">
                                  {!isDashboardEditMode ? (
                                    stu.nextFollowUp || todayDateStr
                                  ) : (
                                    <input
                                      type="date"
                                      value={stu.nextFollowUp || todayDateStr}
                                      onChange={(e) => handleUpdateStudentField(stu.id, 'nextFollowUp', e.target.value)}
                                      className="bg-slate-50 border border-slate-300 rounded px-2 py-1 w-32 outline-none focus:border-[#45499F]"
                                    />
                                  )}
                                </td>
                                <td className="p-3">
                                  <button 
                                    onClick={() => setEvaluatingStudentId(stu.id)} 
                                    className="text-[#45499F] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    Open Evaluation <ChevronRight size={14} />
                                  </button>
                                </td>
                                <td className="p-3">
                                  <button
                                    onClick={() => {
                                      setReportSelectedStudentId(stu.id);
                                      setActiveNav('Student Reports');
                                    }}
                                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                                  >
                                    View Report <BarChart3 size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="p-8 text-center text-slate-500 text-xs font-semibold">
                                No out-of-probation level students currently assigned to this advisor.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setEvaluatingStudentId(null)}
                          className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-all cursor-pointer"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-900">{evaluatingStudentObj?.name}</h3>
                          <p className="text-xs text-slate-500 font-medium">Student ID: {evaluatingStudentObj?.id} | Level: {evaluatingStudentObj?.level}</p>
                        </div>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full text-xs border border-emerald-200">
                        Out of Probation
                      </span>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-sm font-extrabold text-[#45499F] uppercase tracking-wider flex items-center gap-2">
                        <FileText size={18} /> Advisor Assessment & Evaluation Summary
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic Performance Evaluation</p>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-4 rounded-xl border border-slate-200">
                            {evaluatingStudentObj?.assessment?.academic}
                          </p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Behavioral & Well-being Evaluation</p>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-4 rounded-xl border border-slate-200">
                            {evaluatingStudentObj?.assessment?.behavioral}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* TEAM MEETINGS VIEW */}
            {activeNav === 'Team Meetings' && simulatedRole === 'Documentation Team' && (
              <div className="space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <span className="bg-indigo-100 text-[#45499F] font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-200">
                        Fall 2026 Schedule
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-2">Team Meetings & Review Sessions</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsAddMeetingModalOpen(true)}
                        className="bg-[#45499F] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 hover:opacity-95 transition-all cursor-pointer"
                      >
                        <Plus size={16} /> Schedule New Meeting
                      </button>
                      {!isTeamMeetingsEditMode ? (
                        <button
                          onClick={() => setIsTeamMeetingsEditMode(true)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Edit3 size={16} /> Edit Meetings
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsTeamMeetingsEditMode(false)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Save size={16} /> Save Changes
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Grouped Team Meetings Display Stacked Vertically */}
                  <div className="space-y-6">
                    {Array.from(new Set(teamMeetings.map(m => m.category))).map((categoryName) => {
                      const categoryMeetings = teamMeetings.filter(m => m.category === categoryName);
                      return (
                        <div key={categoryName} className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4">
                          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                            <Users size={18} className="text-[#45499F] shrink-0" />
                            <h4 className="text-sm font-bold text-slate-900">{categoryName}</h4>
                          </div>
                          <div className="space-y-3">
                            {categoryMeetings.map((mtg) => (
                              <div key={mtg.id} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 relative shadow-xs">
                                {isTeamMeetingsEditMode && (
                                  <button
                                    onClick={() => setTeamMeetings(teamMeetings.filter(m => m.id !== mtg.id))}
                                    className="absolute top-3 right-3 text-rose-600 hover:text-rose-800 bg-rose-50 p-1.5 rounded-xl border border-rose-200 cursor-pointer"
                                    title="Delete Meeting"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                                <div className="space-y-2 pr-6">
                                  {!isTeamMeetingsEditMode ? (
                                    <p className="font-bold text-[#45499F] text-xs">{mtg.title}</p>
                                  ) : (
                                    <input
                                      type="text"
                                      value={mtg.title}
                                      onChange={(e) => {
                                        const updated = [...teamMeetings];
                                        const target = updated.find(m => m.id === mtg.id);
                                        if (target) target.title = e.target.value;
                                        setTeamMeetings(updated);
                                      }}
                                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-semibold outline-none focus:border-[#45499F]"
                                      placeholder="Meeting topic..."
                                    />
                                  )}
                                  <div className="flex flex-wrap items-center gap-2">
                                    {!isTeamMeetingsEditMode ? (
                                      <p className="text-slate-600 flex items-center gap-1.5 text-xs">
                                        <Calendar size={13} className="text-slate-400" /> {mtg.date} | {mtg.time}
                                      </p>
                                    ) : (
                                      <div className="flex items-center gap-2 w-full max-w-md">
                                        <input
                                          type="date"
                                          value={mtg.date}
                                          onChange={(e) => {
                                            const updated = [...teamMeetings];
                                            const target = updated.find(m => m.id === mtg.id);
                                            if (target) target.date = e.target.value;
                                            setTeamMeetings(updated);
                                          }}
                                          className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-medium outline-none focus:border-[#45499F] w-1/2"
                                        />
                                        <input
                                          type="text"
                                          value={mtg.time}
                                          onChange={(e) => {
                                            const updated = [...teamMeetings];
                                            const target = updated.find(m => m.id === mtg.id);
                                            if (target) target.time = e.target.value;
                                            setTeamMeetings(updated);
                                          }}
                                          className="bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-medium outline-none focus:border-[#45499F] w-1/2"
                                          placeholder="e.g. 11:00 AM"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {/* FULLY EXPANDED STUDENT REPORTS VIEW */}
            {activeNav === 'Student Reports' && (
              <div className="space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <span className="bg-indigo-100 text-[#45499F] font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-200">
                        Exportable Academic Dossier & Documentation Team Audit
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-2">Student Reports</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {simulatedRole !== 'Student View' && simulatedRole !== 'Parent View' && (
                        <select
                          value={reportSelectedStudentId}
                          onChange={(e) => setReportSelectedStudentId(e.target.value)}
                          className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                        >
                          {reportDropdownStudents.map((stu) => (
                            <option key={stu.id} value={stu.id}>{stu.name} ({stu.id}) — Level {stu.level} ({stu.advisor})</option>
                          ))}
                        </select>
                      )}
                      <button
                        onClick={() => window.print()}
                        style={{ backgroundColor: '#45499F' }}
                        className="text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 hover:opacity-95 transition-all cursor-pointer"
                      >
                        <Printer size={16} /> Export Report in PDF
                      </button>
                    </div>
                  </div>
                  {/* PRINTABLE REPORT CONTAINER */}
                  <div className="print-report-container bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
                    <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-[#45499F] uppercase tracking-wider">MSA University • Faculty of Biotechnology</p>
                        <h4 className="text-2xl font-extrabold text-slate-900">{reportStudentObj.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">
                          Student ID: <span className="font-mono font-bold text-slate-700">{reportStudentObj.id}</span> | Level: {reportStudentObj.level} | Academic Advisor: {reportStudentObj.advisor}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-xs font-bold text-slate-700">Current GPA: <span className="text-[#45499F] font-mono">{reportStudentObj.gpa}</span></p>
                      </div>
                    </div>
                    {/* Advisor Assessment Section */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-extrabold text-[#45499F] uppercase tracking-wider flex items-center gap-2">
                        <FileText size={16} /> Advisor Assessment & Evaluation Summary
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic Performance</p>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">{reportStudentObj.assessment.academic}</p>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Behavioral & Well-being</p>
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">{reportStudentObj.assessment.behavioral}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                          <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">At-Risk Indicators</p>
                          <ul className="space-y-1 text-xs text-slate-700 font-semibold">
                            {reportStudentObj.assessment.risks?.map((r, i) => (
                              <li key={i} className="flex items-center gap-1.5 text-rose-700">
                                <AlertTriangle size={12} className="shrink-0" /> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identified Weaknesses</p>
                          <div className="flex flex-wrap gap-1.5">
                            {reportStudentObj.assessment.weaknesses?.map((w, i) => (
                              <span key={i} className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">{w}</span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Identified Strengths</p>
                          <div className="flex flex-wrap gap-1.5">
                            {reportStudentObj.assessment.strengths?.map((s, i) => (
                              <span key={i} className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {!isReportStudentOutOfProbation && (
                      <>
                        <div className="space-y-3 pt-2">
                          <h5 className="text-xs font-extrabold text-[#45499F] uppercase tracking-wider flex items-center gap-2">
                            <GraduationCap size={16} /> Enrolled Courses & Continuous Assessment Grades
                          </h5>
                          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-100 text-slate-500 uppercase tracking-wider font-bold">
                                <tr>
                                  <th className="p-3">Course Name</th>
                                  <th className="p-3">Lecturer Instructor</th>
                                  <th className="p-3">Lab Instructor</th>
                                  <th className="p-3">Quizzes</th>
                                  <th className="p-3">Midterm (/20)</th>
                                  <th className="p-3">Assignment</th>
                                  <th className="p-3">Coursework (/40)</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 font-medium">
                                {reportStudentObj.courses.map((crs, idx) => (
                                  <tr key={idx}>
                                    <td className="p-3 font-bold text-slate-900">{crs.name}</td>
                                    <td className="p-3 text-slate-600">{crs.lecturerInstructor}</td>
                                    <td className="p-3 text-indigo-700 font-semibold">{crs.labInstructor || 'TBD'}</td>
                                    <td className="p-3 text-slate-700">Q1: {crs.q1} | Q2: {crs.q2}</td>
                                    <td className="p-3 text-slate-700 font-bold">{crs.midterm}</td>
                                    <td className="p-3 text-slate-700">{crs.assignment}</td>
                                    <td className="p-3 text-slate-700 font-bold">{crs.coursework}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                            <h5 className="text-xs font-extrabold text-[#45499F] uppercase tracking-wider flex items-center gap-2">
                              <ClipboardList size={16} /> Action Plans & Tasks Progress
                            </h5>
                            <ul className="space-y-2 text-xs text-slate-700">
                              {reportStudentObj.actionPlans.map((act, idx) => (
                                <li key={idx} className="flex items-center gap-2 font-semibold">
                                  <span>{act.completed ? '☑' : '☐'}</span> 
                                  <span className={act.completed ? 'line-through text-slate-400' : 'text-slate-800'}>{act.text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                            <h5 className="text-xs font-extrabold text-[#45499F] uppercase tracking-wider flex items-center gap-2">
                              <FolderKanban size={16} /> Documents Repository
                            </h5>
                            <div className="space-y-2 text-xs text-slate-700">
                              {reportStudentObj.documentsList.map((doc, idx) => {
                                const docName = typeof doc === 'string' ? doc : doc.name;
                                const docType = typeof doc === 'string' ? (doc.endsWith('.docx') ? 'docx' : 'pdf') : doc.type;
                                return (
                                  <div key={idx} className="flex items-center justify-between">
                                    <span className="font-bold text-slate-800 flex items-center gap-2">
                                      <FileText size={14} className="text-[#45499F]" /> {docName}
                                    </span>
                                    <button
                                      onClick={() => handleDownloadDocument(doc)}
                                      className="text-xs font-bold text-[#45499F] hover:underline flex items-center gap-1 cursor-pointer"
                                    >
                                      <Download size={12} /> Download
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        {reportStudentObj.customSections && reportStudentObj.customSections.length > 0 && (
                          <div className="space-y-3 pt-2">
                            <h5 className="text-xs font-extrabold text-[#45499F] uppercase tracking-wider flex items-center gap-2">
                              <BookOpen size={16} /> Custom Assessment Sections
                            </h5>
                            <div className="grid grid-cols-1 gap-3">
                              {reportStudentObj.customSections.map((sec) => (
                                <div key={sec.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
                                  <p className="text-xs font-extrabold text-[#45499F]">{sec.title}</p>
                                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{sec.content}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ADD NEW STUDENT MODAL */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Add New Student to Table</h3>
              <button onClick={() => setIsAddStudentModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddStudentSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ahmed Mohamed"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student ID</label>
                  <input
                    type="text"
                    placeholder="e.g. 269999"
                    value={newStudentId}
                    onChange={(e) => setNewStudentId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Level</label>
                  <input
                    type="text"
                    placeholder="e.g. 2"
                    value={newStudentLevel}
                    onChange={(e) => setNewStudentLevel(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Student Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. 01012345678"
                    value={newStudentPhone}
                    onChange={(e) => setNewStudentPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Guardian Phone</label>
                  <input
                    type="text"
                    placeholder="e.g. 01298765432"
                    value={newStudentGuardianPhone}
                    onChange={(e) => setNewStudentGuardianPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsAddStudentModalOpen(false)} className="bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" style={{ backgroundColor: '#45499F' }} className="text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer">Add Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD MEETING MODAL */}
      {isAddMeetingModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Schedule New Team Meeting</h3>
              <button onClick={() => setIsAddMeetingModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!newMeetingTitle.trim()) return;
              const newMtg = {
                id: Date.now(),
                category: newMeetingCategory,
                title: newMeetingTitle.trim(),
                date: newMeetingDate,
                time: newMeetingTime
              };
              setTeamMeetings([...teamMeetings, newMtg]);
              setNewMeetingTitle('');
              setIsAddMeetingModalOpen(false);
            }} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Meeting Category / Group</label>
                <select
                  value={newMeetingCategory}
                  onChange={(e) => setNewMeetingCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                >
                  <option value="Dean and Doc Team Meeting">Dean and Doc Team Meeting</option>
                  <option value="Advisors & Doc Team Meeting">Advisors & Doc Team Meeting</option>
                  <option value="Doc Team Members Meeting">Doc Team Members Meeting</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Meeting Agenda / Topic Title</label>
                <input
                  type="text"
                  placeholder="e.g. Final Probation Clearance Discussion"
                  value={newMeetingTitle}
                  onChange={(e) => setNewMeetingTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</label>
                  <input
                    type="date"
                    value={newMeetingDate}
                    onChange={(e) => setNewMeetingDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 02:00 PM"
                    value={newMeetingTime}
                    onChange={(e) => setNewMeetingTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsAddMeetingModalOpen(false)} className="bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" style={{ backgroundColor: '#45499F' }} className="text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer">Schedule Meeting</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW SECTION MODAL */}
      {isAddingSectionModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-lg w-full space-y-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Create New Custom Section</h3>
              <button onClick={() => setIsAddingSectionModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddCustomSection} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Section Title</label>
                <input
                  type="text"
                  placeholder="e.g. Special Accommodations"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Section Content</label>
                <textarea
                  rows={4}
                  placeholder="Enter detailed notes..."
                  value={newSectionContent}
                  onChange={(e) => setNewSectionContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F]"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsAddingSectionModalOpen(false)} className="bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" style={{ backgroundColor: '#45499F' }} className="text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer">Add Section</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ATTACH FILE MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-6 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">Attach PDF or Word File</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={handleUploadDocumentSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Select File (.pdf, .docx, .doc)</label>
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={(e) => setAttachedFile(e.target.files[0])}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#45499F] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-[#45499F] hover:file:bg-indigo-100 cursor-pointer"
                  required
                />
                <p className="text-[10px] text-slate-400">Choose a document from your device to attach to this student&apos;s record.</p>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsUploadModalOpen(false)} className="bg-slate-100 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" style={{ backgroundColor: '#45499F' }} className="text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer">Attach File</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}