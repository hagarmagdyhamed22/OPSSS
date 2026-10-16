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
  Info,
  Eye,
  Target,
  Phone,
  MessageCircle,
  Mail
} from 'lucide-react';
// Advisor phone numbers (write each number between the quotes, e.g. '01012345678').
// An advisor with an empty number shows no contact buttons in the welcome banner.
const ADVISOR_PHONES: Record<string, string> = {
  'Prof. Haidan Mostafa': '01151052865',
  'Prof. Yasmin Abdellatif': '01063144993',
  'Dr. Yara Ahmed': '01126034629',
  'Dr. Kareema Nasr Eldin': '01220695030',
  'Dr. Mai Ahmed': '',
  'Dr. Marwa Kenawy': '',
  'Dr. Gehad Tarek': '01126253662',
  'Fouad Ashry': '01012265653',
  'Nouran Yehia': '01010565092',
  'Nashwa Hamido': '01099298111',
  'Hoda allam': '01062168325',
  'Yousef AboElkhair': '01063087800',
  'Mariam Zaki': '01066412792',
  'Nada Sherif': '01112977760',
  'Salma Omar': '01014999259',
  'Hesham Fady': '01155168383',
  'Youssef Maged': '01156283881',
  'Amr Waleed': '01069680900',
  'Mohamed Fahim': '01128861277',
  'Rawan Ali': '01503313619',
  'Shahd Eltarabily': '01099459550',
  'Nourhan Maher': '01129235895',
  'Hagar Magdy': '01090640361',
  'Faten Ehab': '01028167614',
};

// Advisor email addresses (write each email between the quotes, e.g. 'name@msa.edu.eg').
// An advisor with an empty email shows no email button in the welcome banner.
const ADVISOR_EMAILS: Record<string, string> = {
  'Prof. Haidan Mostafa': 'hamsalem@msa.edu.eg',
  'Prof. Yasmin Abdellatif': 'ylatif@msa.edu.eg',
  'Dr. Yara Ahmed': 'ymuhammed@msa.edu.eg',
  'Dr. Kareema Nasr Eldin': 'kamnasreldein@msa.edu.eg',
  'Dr. Mai Ahmed': 'mshafei@msa.edu.eg',
  'Dr. Marwa Kenawy': 'melrefaie@msa.edu.eg',
  'Dr. Gehad Tarek': 'gtibrahim@msa.edu.eg',
  'Fouad Ashry': 'fashry@msa.edu.eg',
  'Nouran Yehia': 'nhemida@msa.edu.eg',
  'Nashwa Hamido': 'nasmohamed@msa.edu.eg',
  'Hoda allam': 'hallam@msa.edu.eg',
  'Yousef AboElkhair': 'yaboulkheir@msa.edu.eg',
  'Mariam Zaki': 'mmzhassan@msa.edu.eg',
  'Nada Sherif': 'nshsalaheldien@msa.edu.eg',
  'Salma Omar': 'samahmoud@msa.edu.eg',
  'Hesham Fady': 'hfady@msa.edu.eg',
  'Youssef Maged': 'yomaged@msa.edu.eg',
  'Amr Waleed': 'awalid@msa.edu.eg',
  'Mohamed Fahim': 'mefahim@msa.edu.eg',
  'Rawan Ali': 'rawmagdy@msa.edu.eg',
  'Shahd Eltarabily': 'sabdelsalam@msa.edu.eg',
  'Nourhan Maher': 'noumaher@msa.edu.eg',
  'Hagar Magdy': 'hmmhamed@msa.edu.eg',
  'Faten Ehab': 'fehab@msa.edu.eg',
};

// Turns an Egyptian local number (01012345678) into the international form WhatsApp needs (201012345678)
function toWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('0')) return `20${digits.slice(1)}`;
  return digits;
}

function TeamMemberIcon({ name, photo }: { name: string; photo: string }) {
  const extensions = ['jpeg', 'jpg', 'png', 'webp'];
  const baseName = photo.replace(/\.[^.]+$/, '');
  const [extIndex, setExtIndex] = useState(0);
  const failed = extIndex >= extensions.length;
  const initials = name
    .replace(/^(Prof\.|Dr\.)\s*/i, '')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div className="flex flex-col items-center text-center gap-3">
      {failed ? (
        <div className="w-32 h-32 rounded-lg border-2 border-indigo-100 shadow-sm bg-indigo-50 text-[#45499F] flex items-center justify-center text-3xl font-extrabold">
          {initials}
        </div>
      ) : (
        <img
          key={extIndex}
          src={`/images/${baseName}.${extensions[extIndex]}`}
          alt={name}
          onError={() => setExtIndex((i) => i + 1)}
          className="w-32 h-32 object-cover rounded-lg border-2 border-indigo-100 shadow-sm bg-slate-50"
        />
      )}
      <p className="text-sm font-extrabold text-slate-900">{name}</p>
    </div>
  );
}

// Sidebar card (Student / Parent access): shows the student's academic advisor with photo and contact options
function AdvisorSidebarCard({ advisorName }: { advisorName: string }) {
  const extensions = ['jpeg', 'jpg', 'png', 'webp'];
  const slug = advisorName
    .replace(/^(Prof\.|Dr\.)\s*/i, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
  const [extIndex, setExtIndex] = useState(0);
  const failed = extIndex >= extensions.length;
  const initials = advisorName
    .replace(/^(Prof\.|Dr\.)\s*/i, '')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const phone = ADVISOR_PHONES[advisorName];
  const email = ADVISOR_EMAILS[advisorName];

  // reset the image fallback when the advisor changes
  useEffect(() => {
    setExtIndex(0);
  }, [advisorName]);

  return (
    <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
        Advisor Information
      </div>
      <div className="flex flex-col items-center text-center gap-2">
        {failed ? (
          <div className="w-20 h-20 rounded-xl border-2 border-indigo-100 shadow-sm bg-indigo-50 text-[#45499F] flex items-center justify-center text-xl font-extrabold">
            {initials}
          </div>
        ) : (
          <img
            key={extIndex}
            src={`/images/${slug}.${extensions[extIndex]}`}
            alt={advisorName}
            onError={() => setExtIndex((i) => i + 1)}
            className="w-20 h-20 object-cover rounded-xl border-2 border-indigo-100 shadow-sm bg-white"
          />
        )}
        <p className="text-sm font-extrabold text-slate-900 leading-tight">{advisorName}</p>
      </div>
      {(phone || email) ? (
        <div className="space-y-2">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Phone size={14} className="text-[#45499F] shrink-0" />
              <span className="truncate">{phone}</span>
            </a>
          )}
          {phone && (
            <a
              href={`https://wa.me/${toWhatsAppNumber(phone)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              <MessageCircle size={14} className="shrink-0" />
              Chat on WhatsApp
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              title={email}
              className="flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Mail size={14} className="text-[#45499F] shrink-0" />
              <span className="truncate">{email}</span>
            </a>
          )}
        </div>
      ) : (
        <p className="text-[11px] text-slate-400 text-center">Contact details not available yet.</p>
      )}
    </div>
  );
}

// ---------- Editable document sections (used by Certificates and Advisor Distribution) ----------
type DocFile = { id: string; name: string; size: number; url: string };
type DocSection = { id: string; title: string; files: DocFile[] };

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function EditableDocSections({
  sections,
  setSections,
  allowAddSection = true,
}: {
  sections: DocSection[];
  setSections: React.Dispatch<React.SetStateAction<DocSection[]>>;
  allowAddSection?: boolean;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id || '');
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [renamingFileId, setRenamingFileId] = useState<string | null>(null);
  const [draftFileName, setDraftFileName] = useState('');

  const active = sections.find((sec) => sec.id === activeId) || sections[0];

  const startEdit = () => {
    if (!active) return;
    setDraftTitle(active.title);
    setEditing(true);
  };

  const saveEdit = () => {
    if (!active) return;
    setSections((prev) =>
      prev.map((sec) => (sec.id === active.id ? { ...sec, title: draftTitle.trim() || sec.title } : sec))
    );
    setEditing(false);
  };

  const addSection = () => {
    const id = `sec-${Date.now()}`;
    setSections((prev) => [...prev, { id, title: 'New Section', files: [] }]);
    setActiveId(id);
    setDraftTitle('New Section');
    setEditing(true);
  };

  const deleteSection = () => {
    if (!active) return;
    if (!window.confirm(`Delete the section "${active.title}" and all of its documents?`)) return;
    active.files.forEach((f) => URL.revokeObjectURL(f.url));
    const remaining = sections.filter((sec) => sec.id !== active.id);
    setSections(remaining);
    setActiveId(remaining[0]?.id || '');
    setEditing(false);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!active) return;
    const picked = Array.from(e.target.files || []);
    const added: DocFile[] = [];
    for (const file of picked) {
      if (file.size > 15 * 1024 * 1024) {
        alert(`"${file.name}" is larger than 15 MB and was skipped.`);
        continue;
      }
      added.push({
        id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
      });
    }
    if (added.length) {
      setSections((prev) => prev.map((sec) => (sec.id === active.id ? { ...sec, files: [...sec.files, ...added] } : sec)));
    }
    e.target.value = '';
  };

  const removeFile = (fileId: string) => {
    if (!active) return;
    const target = active.files.find((f) => f.id === fileId);
    if (target) URL.revokeObjectURL(target.url);
    setSections((prev) => prev.map((sec) => (sec.id === active.id ? { ...sec, files: sec.files.filter((f) => f.id !== fileId) } : sec)));
  };

  const startRenameFile = (f: DocFile) => {
    setRenamingFileId(f.id);
    setDraftFileName(f.name);
  };

  const saveRenameFile = (f: DocFile) => {
    if (!active) return;
    let newName = draftFileName.trim();
    if (newName) {
      // keep the original extension if the new name has none, so the file still opens correctly
      const oldExt = f.name.includes('.') ? f.name.slice(f.name.lastIndexOf('.')) : '';
      if (oldExt && !newName.toLowerCase().endsWith(oldExt.toLowerCase())) newName += oldExt;
      setSections((prev) =>
        prev.map((sec) =>
          sec.id === active.id ? { ...sec, files: sec.files.map((x) => (x.id === f.id ? { ...x, name: newName } : x)) } : sec
        )
      );
    }
    setRenamingFileId(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => {
              setActiveId(sec.id);
              setEditing(false);
            }}
            style={active?.id === sec.id ? { backgroundColor: '#45499F' } : {}}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              active?.id === sec.id ? 'text-white shadow-md shadow-[#45499F]/25' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {sec.title}
          </button>
        ))}
        {allowAddSection && (
          <button
            onClick={addSection}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border border-dashed border-slate-300 text-slate-500 hover:border-[#45499F] hover:text-[#45499F] transition-colors cursor-pointer"
          >
            <Plus size={14} /> Add Section
          </button>
        )}
      </div>

      {!active ? (
        <div className="p-8 text-center text-sm text-slate-400 border border-dashed border-slate-200 rounded-2xl">
          No sections yet. Click "Add Section" to create one.
        </div>
      ) : (
        <div className="border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-5 bg-slate-50/50">
          <div className="flex flex-wrap items-start justify-between gap-3">
            {editing ? (
              <input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="flex-1 min-w-[200px] px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#45499F]/30"
                placeholder="Section title"
              />
            ) : (
              <h3 className="text-lg font-extrabold text-slate-900">{active.title}</h3>
            )}
            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <button
                    onClick={saveEdit}
                    className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer"
                  >
                    <Save size={14} /> Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer"
                  >
                    <X size={14} /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={startEdit}
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  {allowAddSection && (
                    <button
                      onClick={deleteSection}
                      className="inline-flex items-center gap-1.5 bg-white hover:bg-red-50 border border-slate-200 text-red-600 text-xs font-bold px-3 py-2 rounded-xl cursor-pointer"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Documents ({active.files.length})
              </h4>
              <label className="inline-flex items-center gap-1.5 text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer shadow-sm" style={{ backgroundColor: '#45499F' }}>
                <Upload size={14} /> Add Document / PDF
                <input type="file" multiple accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleUpload} className="hidden" />
              </label>
            </div>
            {active.files.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl bg-white">
                No documents added to this section yet. Upload a PDF or Word file.
              </div>
            ) : (
              <ul className="space-y-2">
                {active.files.map((f) => (
                  <li key={f.id} className="flex items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <FileText size={18} className="text-[#45499F] shrink-0" />
                      <div className="min-w-0 flex-1">
                        {renamingFileId === f.id ? (
                          <input
                            autoFocus
                            value={draftFileName}
                            onChange={(e) => setDraftFileName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') saveRenameFile(f);
                              if (e.key === 'Escape') setRenamingFileId(null);
                            }}
                            className="w-full px-2 py-1 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#45499F]/30"
                          />
                        ) : (
                          <p className="text-sm font-bold text-slate-900 truncate">{f.name}</p>
                        )}
                        <p className="text-[11px] text-slate-400">{formatFileSize(f.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {renamingFileId === f.id ? (
                        <>
                          <button onClick={() => saveRenameFile(f)} title="Save name" className="text-emerald-600 hover:text-emerald-700 cursor-pointer">
                            <Save size={16} />
                          </button>
                          <button onClick={() => setRenamingFileId(null)} title="Cancel" className="text-slate-400 hover:text-slate-600 cursor-pointer">
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          {f.name.toLowerCase().endsWith('.pdf') && (
                            <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#45499F] hover:underline">
                              View
                            </a>
                          )}
                          <a href={f.url} download={f.name} className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#45499F]">
                            <Download size={14} /> Download
                          </a>
                          <button onClick={() => startRenameFile(f)} title="Rename document" className="text-slate-400 hover:text-[#45499F] cursor-pointer">
                            <Edit3 size={15} />
                          </button>
                          <button onClick={() => removeFile(f.id)} title="Remove document" className="text-slate-400 hover:text-red-600 cursor-pointer">
                            <Trash2 size={15} />
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function OnProbationSystem() {
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [accessMode, setAccessMode] = useState(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState('Prof. Haidan Mostafa');
  const [advisorPassword, setAdvisorPassword] = useState('');
  const [studentIdInput, setStudentIdInput] = useState('');
  const [parentIdInput, setParentIdInput] = useState('');
  const [docPasswordInput, setDocPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const advisorPasswords = {
    'Prof. Haidan Mostafa': 'password123',
    'Prof. Yasmin Abdellatif': 'password123',
    'Dr. Yara Ahmed': 'password123',
    'Dr. Kareema Nasr Eldin': 'password123',
    'Dr. Mai Ahmed': 'password123',
    'Dr. Marwa Kenawy': 'password123',
    'Dr. Gehad Tarek': 'password123',
    'Fouad Ashry': 'password123',
    'Nouran Yehia': 'password123',
    'Nashwa Hamido': 'password123',
    'Hoda allam': 'password123',
    'Yousef AboElkhair': 'password123',
    'Mariam Zaki': 'password123',
    'Nada Sherif': 'password123',
    'Salma Omar': 'password123',
    'Hesham Fady': 'password123',
    'Youssef Maged': 'password123',
    'Amr Waleed': 'password123',
    'Mohamed Fahim': 'password123',
    'Rawan Ali': 'password123',
    'Shahd Eltarabily': 'password123',
    'Nourhan Maher': 'password123',
    'Hagar Magdy': 'password123',
    'Faten Ehab': 'password123'
  };
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
  const [certificateSections, setCertificateSections] = useState<DocSection[]>([
    { id: 'cert-template', title: 'Certificates Template', files: [] },
    { id: 'cert-out-of-probation', title: 'Out of Probation Students Certificates 2026', files: [] },
    { id: 'cert-advisors', title: 'Advisors Certificates 2026', files: [] },
  ]);
  const [distributionSections, setDistributionSections] = useState<DocSection[]>([
    { id: 'dist-main', title: 'Advisor Distribution', files: [] },
  ]);
  const todayDateStr = (() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  })();
  useEffect(() => {
    setMounted(true);
  }, []);
  // Keep the page background white on the landing view so no dark strip shows at the bottom
  useEffect(() => {
    if (currentView !== 'landing') return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlBg = html.style.backgroundColor;
    const prevBodyBg = body.style.backgroundColor;
    html.style.backgroundColor = '#ffffff';
    body.style.backgroundColor = '#ffffff';
    return () => {
      html.style.backgroundColor = prevHtmlBg;
      body.style.backgroundColor = prevBodyBg;
    };
  }, [currentView]);
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
          studentPhone: '01022708792',
          guardianPhone: 'Mother: 01115917230 | Father: 01006120801',
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
          studentPhone: '01033416338',
          guardianPhone: 'Mother: 01098883413 | Father: 01003977409',
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
        { id: '253470', name: 'Abdelrahman Mohamed Hanfey Abdelmoaty Aly', level: '2', gpa: '1.84', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01011322142', guardianPhone: 'Mother: 01026208050 | Father: 01026208060', customSections: [], courses: [], actionPlans: [{ text: 'Review foundational biochemistry notes', completed: false }], documentsList: [{ name: 'Study_Plan.docx', type: 'docx', dataUrl: '', sectionType: 'student' }], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [{ date: '2026-10-01', title: 'Initial advisor onboarding', loggedBy: 'Prof. Haidan Mostafa' }] },
        { id: '256820', name: 'Abdelrahman Nasser Khalaf Moussa Abdelaal', level: '2', gpa: '0.56', midterm: 8, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01127518279', guardianPhone: 'Mother: 01102943183 | Father: 01288775960', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '244361', name: 'Abdullah Hamdy Mohamed Khater', level: '2', gpa: '1.91', midterm: 16, quizzes: [4, 4.5], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01114092699', guardianPhone: 'Mother: +966566606824 | Father: +966561069333', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Prof. Yasmin Abdellatif',
      count: 5,
      students: [
        { id: '256761', name: 'Ahmed Adel Tahif Hassan', level: '2', gpa: '1.33', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01030638330', guardianPhone: 'Mother: 01017454714 | Father: 01019565650', customSections: [], courses: [], actionPlans: [{ text: 'Action plan review', completed: false }], documentsList: [{ name: 'Doc1.pdf', type: 'pdf', dataUrl: '', sectionType: 'student' }], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [{ date: '2026-10-02', title: 'Advisor meeting', loggedBy: 'Prof. Yasmin Abdellatif' }] },
        { id: '264428', name: 'Ahmed Emad Najip Hassan Ali', level: '2', gpa: '1.83', midterm: 7, quizzes: [1, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01002770983', guardianPhone: 'Mother: 01123912506 | Father: 01093653913', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '257136', name: 'Ahmed Ibrahim Hassan Gomaa Shared', level: '2', gpa: '0.76', midterm: 17, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01159542745', guardianPhone: 'Mother: 01141711514 | Father: 01159542848', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '257095', name: 'Ahmed Mohamed Hassanin Abdelsamie', level: '2', gpa: '1.48', midterm: 12, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01111060278', guardianPhone: 'Mother: 01007084700 | Father: 01117439111', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255885', name: 'Maryam Adel Baskharon Hanna Baskharon', level: '2', gpa: '1.99', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01113000498', guardianPhone: 'Mother: 01201827816 | Father: 01226194435', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Dr. Yara Ahmed',
      count: 5,
      students: [
        { id: '211937', name: 'Nourhan Othman Abdeltawab Abdelaziz', level: '4', gpa: '1.96', midterm: 7, quizzes: [1, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01100483028 / 01116557174', guardianPhone: 'Mother: 01149177552 | Father: 01100483028', customSections: [], courses: [], actionPlans: [{ text: 'Remedial sessions', completed: false }], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '257044', name: 'Rawan Hesham Nabeh Mohamed Mousa', level: '4', gpa: '1.62', midterm: 13, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01107022599', guardianPhone: 'Mother: 01006071649 | Father: 01003334321', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '238143', name: 'Salem Mohamed Salem Atia', level: '4', gpa: '1.6', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01151636846', guardianPhone: 'Mother: 01206034871 | Father: 01220324284', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '223689', name: 'Rawan Mostafa Mohamed Ibrahim Salman', level: '4', gpa: '1.89', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01011776844', guardianPhone: 'Mother: 01001456907 | Father: 01001114752', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '220517', name: 'Rana Mohamed Kamal Soliman Soliman Elzanary', level: 'out of 8', gpa: '2.31', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: 'N/A', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Dr. Kareema Nasr Eldin',
      count: 4,
      students: [
        { id: '256336', name: 'Ahmed Mostafa Abdulsalam Mohamed Khalil', level: '2', gpa: '1.26', midterm: 12, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01032393706', guardianPhone: 'Mother: 01100272442 | Father: 01097873809', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '266680', name: 'Farah Maged Abdellatif Shalaby', level: '2', gpa: '0.37', midterm: 17, quizzes: [4, 4.5], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01113513338', guardianPhone: 'Mother: +971562077261 | Father: +971505620316', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '251659', name: 'Mariam Abdalmaksoud Alsaed Ibrahim Aboelanain', level: '2', gpa: '1.97', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01118849634', guardianPhone: 'Mother: 01124957717 | Father: 01159886071', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256892', name: 'Menna Tamer Soltan Khaled Zallouk', level: '2', gpa: '0.57', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01007864202', guardianPhone: 'Mother: 01007725756 | Father: 01000040912', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Dr. Mai Ahmed',
      count: 6,
      students: [
        { id: '263856', name: 'Anan Ahmed Kamal Abbas Mohamed Khalil', level: '2', gpa: '0.27', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01032804885', guardianPhone: 'Mother: 01025331168 | Father: 01025331165', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255698', name: 'Demiana Youssef Boules Fasih Nesim', level: '2', gpa: '1.76', midterm: 10, quizzes: [2, 2.5], attendanceWarnings: 2, nextFollowUp: todayDateStr, studentPhone: '01147544055', guardianPhone: 'Mother: 01204493472 | Father: 01097680306', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '261915', name: 'Ebtsam Ahmed Abdeltawab Said Mohamed', level: '2', gpa: '1.19', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01040407440', guardianPhone: 'Father: 01117470070', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '247201', name: 'Esraa Hosney Marei Abdelazim', level: '2', gpa: '1.86', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01006076950', guardianPhone: 'Mother: 01069181995 | Father: 01050855550', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253714', name: 'Fady Mariee Amin Mariee Eldsoky', level: '2', gpa: '1.96', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01021860211', guardianPhone: 'Mother: 01032370045 | Father: 01062536812', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255964', name: 'Shamseldin Ahmed Sayed Abdeltawab', level: '2', gpa: '1.02', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01299934688', guardianPhone: 'Mother: 01094429432 | Father: 01225237522', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Dr. Marwa Kenawy',
      count: 5,
      students: [
        { id: '265649', name: 'Mohamed Adel Mohamed Aboelkhir Nofal', level: '2', gpa: '1.75', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01012696702', guardianPhone: 'Mother: 01205999011 | Father: 01099550560', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '264385', name: 'Mohamed Badr Ahmed Ahmed Abdelhalim', level: '2', gpa: '0.27', midterm: 8, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01111591334', guardianPhone: 'Father: 01555554788', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '247023', name: 'Mohamed Basem Mohamed Mahdi', level: '2', gpa: '0.6', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01553515766', guardianPhone: 'Mother: 01030972404 | Father: 01503777054', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '250665', name: 'Mohamed Tamer Elsayed Abdelhamid Mohamed', level: '2', gpa: '1.85', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01212834837', guardianPhone: 'Mother: 01284443666 | Father: 01223172312', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '246573', name: 'Mina Mamdouh Menz Sawirs Awadallah', level: '3', gpa: '1.45', midterm: 13, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01206436327', guardianPhone: 'Mother: 01097497277 | Father: 01228848273', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Dr. Gehad Tarek',
      count: 5,
      students: [
        { id: '256930', name: 'Habiba Mamdouh Ahmed Shawky Hussein', level: '2', gpa: '1.9', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01158708686', guardianPhone: 'Mother: 01152938007 | Father: 01123031112', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '266492', name: 'Habiba Mohamed Abdelrahman Ahmed Farag', level: '2', gpa: '0.16', midterm: 11, quizzes: [2, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01145607393', guardianPhone: 'Mother: 01282912963 | Father: 01288021730', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '261400', name: 'Hala Hassan Diaa Abdelaziz Ahmed', level: '2', gpa: '0.88', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01151198666', guardianPhone: 'Mother: 01112242429 | Father: 01143333706', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256223', name: 'Mokhtar Atef Abdelhamied Abdelmiged', level: '2', gpa: '1.61', midterm: 7, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01011232121', guardianPhone: 'Mother: 01112341371 | Father: 01100009771', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '266470', name: 'Nermin Thabet Mahmoud Abdelhalim Ali', level: '2', gpa: '1.19', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01027745641', guardianPhone: 'Mother: 01006762837 | Father: 01004277758', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Fouad Ashry',
      count: 9,
      students: [
        { id: '249343', name: 'Ahmed Abouelouyon Ahmed Khalifa Ahmed', level: '4', gpa: '1.98', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01112479920', guardianPhone: 'Mother: 01149978909 | Father: 01287844200', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '241853', name: 'Giovanni Kamal Atef Kamal', level: '4', gpa: '1.76', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01278133888', guardianPhone: 'Mother: 01011550250 | Father: 01223600919', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '213841', name: 'Noha Awad Abdelfattah Youssef Awad', level: '4', gpa: '1.31', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01120348402', guardianPhone: 'Mother: +971508142439 | Father: +971507811094', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '242675', name: 'Patol Mohamed Ossman Abdelkader', level: '4', gpa: '0.93', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01552500527', guardianPhone: 'Mother: +97433101454 | Father: +97433574145', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '225511', name: 'Amin Abdelnaby Mohamed Kamel Soliman', level: '4', gpa: '1.88', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01147451892', guardianPhone: 'Mother: 01158910314 | Father: 01100232353', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '235843', name: 'Aml Hamada Mohamed Mohamed Mohamed', level: '4', gpa: '1.91', midterm: 9, quizzes: [2, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01090444490', guardianPhone: 'Mother: 01017153761 | Father: 01090444450', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '200677', name: 'Nopheir George Shukry Basta Hanwy', level: 'out of 7', gpa: 'N/A', midterm: 17, quizzes: [4, 4.5], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: 'N/A', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '213081', name: 'Nadeen Mohamed Mohamed Elsagheer Sedeik', level: 'out of 7', gpa: '2.12', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: 'N/A', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '211971', name: 'Hussamaldein Mohamed Gaber Mostafa', level: 'out of 7', gpa: '2.1', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: 'N/A', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Nouran Yehia',
      count: 9,
      students: [
        { id: '253911', name: 'Khaled Ahmed Mohamed Abdelhamid Elbayoumi', level: '4', gpa: '1.94', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01114881747', guardianPhone: 'Mother: 01020251015', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '240176', name: 'Kholoud Mohammed Sleem Abdelmged', level: '4', gpa: '1.13', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01100960276', guardianPhone: 'Mother: 01124012357 | Father: 01111441564', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '247887', name: 'Malak Mostafa Mahmoud Mohamed Omran', level: '4', gpa: '1.5', midterm: 13, quizzes: [3.5, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01017121536', guardianPhone: 'Mother: 01142240618 | Father: 01223143105', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '242259', name: 'Mariam Ahmed Hassan Shehata', level: '4', gpa: '1.83', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01002003676', guardianPhone: 'Mother: 01006641798 | Father: 01006641044', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249591', name: 'Youssef Mohammed Elaraby Bassiony', level: '4', gpa: '1.21', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01009955579', guardianPhone: 'Mother: 01003527848 | Father: 01154788399', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '248001', name: 'Batoul Naser Shaaban Mahmoud Hassanin', level: '4', gpa: '1.52', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01110088843', guardianPhone: 'Mother: 01121552211 | Father: 01111180444', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249351', name: 'Kholoud Khaled Ahmed Mosa Mosa', level: '4', gpa: '1.76', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01279939448', guardianPhone: 'Mother: 01221007403 | Father: 01229028649', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249973', name: 'Shrouk Sayed Aboelela Ahmed', level: '4', gpa: '1.36', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01117841219', guardianPhone: 'Mother: 01146555351 | Father: 01032366950', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '236947', name: 'Mohamed Khaled Mohamed Mostafa', level: '4', gpa: '1.15', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01125037155', guardianPhone: 'Mother: 01221163353 | Father: 01222161488', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Nashwa Hamido',
      count: 6,
      students: [
        { id: '246253', name: 'Maria Mohsen Emeil Gerges', level: '4', gpa: '1.67', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01226116555', guardianPhone: 'Mother: 01203800985 | Father: 01222188199', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '224815', name: 'Rim Mohamed Fawzi Said Mohamed', level: '4', gpa: '1.33', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01033345013', guardianPhone: 'Mother: 01124680854 | Father: 01006906214', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '237053', name: 'Yousef Shaaban Elsayed Farag', level: '4', gpa: '1.92', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01021996366', guardianPhone: 'Mother: 01114334662 | Father: 01005096396', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '221945', name: 'Abdallah Asaad Abdallah Sadek', level: '4', gpa: '1.74', midterm: 13, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01140888379', guardianPhone: 'Mother: 01095136220 | Father: 01552338379', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '171709', name: 'Mohamed Osama Fouad Mokhtar Rabiee', level: 'out of 7', gpa: 'N/A', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: 'N/A', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '204329', name: 'Loujain Raeed Mohamed Nazir Hamza', level: 'out of 7', gpa: 'N/A', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: 'N/A', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Hoda allam',
      count: 4,
      students: [
        { id: '266719', name: 'Malak Sherif Mohammed Mohammadi Noureldin', level: '2', gpa: '1.91', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01069981554', guardianPhone: 'Mother: 01012183218 | Father: 01094244529', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '252925', name: 'Adham Mohamed Hussein Hammad', level: '3', gpa: '1.4', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01155502292', guardianPhone: 'Mother: 01124118011 | Father: 01111766645', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '260473', name: 'Badreldin Ayman Atef Abdellatif Afifi', level: '3', gpa: '1', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01013601593', guardianPhone: 'Mother: 01096180552 | Father: 01221414032', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254647', name: 'Malak Hesham Taha Mohamed Tantawy', level: '3', gpa: '0', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01034149208', guardianPhone: 'Mother: 01033526860 | Father: 01002010563', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Yousef AboElkhair',
      count: 9,
      students: [
        { id: '247211', name: 'Malak Mohamed Hassan Ahmed Mohamed', level: '4', gpa: '1.94', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01011323608', guardianPhone: 'Mother: 01005349919 | Father: 01011324383', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249339', name: 'Sama Ehab Mohamed Mohamed Ahmed', level: '4', gpa: '1.35', midterm: 13, quizzes: [3.5, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01099933040', guardianPhone: 'Mother: 01222670730 | Father: 01001729955', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '238219', name: 'Abdelrahman Hamdy Ali Abdelrasoul', level: '4', gpa: '1.33', midterm: 7, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01062588898', guardianPhone: 'Mother: 01114548247 | Father: 01111394667', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '232919', name: 'Ahmed Alaa Mohamed Sayed', level: '4', gpa: '1.86', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01004257852', guardianPhone: 'Mother: 01092692722', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '236921', name: 'Mahmoud Abdelnasser Mahmoud Mohamed', level: '4', gpa: '1.86', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01125904454', guardianPhone: 'Mother: 01110981104 | Father: 01118202624', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '204819', name: 'Nardin Ayman Fathy Sadek', level: '4', gpa: '1.55', midterm: 17, quizzes: [4, 4.5], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01102107365', guardianPhone: 'Mother: 01146284191 | Father: +962776834898', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '236395', name: 'Mariam Mohamed Reda Abozeid', level: '4', gpa: '1.19', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01032975182', guardianPhone: 'Mother: 01099079914 | Father: 01096623002', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '202781', name: 'Mostafa Ahmed Ibrahim Abdallah Sweed', level: 'out of 8', gpa: '2.14', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: 'N/A', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '185527', name: 'Hanaa Tarek Ibrahim Betiti', level: 'out of 8', gpa: 'N/A', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: 'N/A', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Mariam Zaki',
      count: 6,
      students: [
        { id: '253829', name: 'Hanin Emadelden Sayed Mohamed', level: '3', gpa: '1.99', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01029332452', guardianPhone: 'Mother: 01024818119 | Father: 01095000298', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256603', name: 'Kotouf Ehab Abdelkahar Abdelhamid', level: '3', gpa: '1.17', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01027355047', guardianPhone: 'Mother: 01095260619 | Father: 01095260619', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256743', name: 'Malak Ehab Aly Hassan Ibrahim', level: '3', gpa: '0', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01019205138', guardianPhone: 'Mother: 01019205138 | Father: 01019205138', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253786', name: 'Mariam Mohamed Abdelghany Mostafa Abdella', level: '3', gpa: '1.47', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01557606906', guardianPhone: 'Mother: 01288121200 | Father: 01111999606', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256180', name: 'Nadine Wael Youssif Ebrahim Elshahed', level: '3', gpa: '1.52', midterm: 12, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01067658894', guardianPhone: 'Mother: 01080858944 | Father: 01001852014', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255738', name: 'Sanabel Mohamed Abdelghani Abdelnabi', level: '3', gpa: '1.85', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01063300229', guardianPhone: 'Mother: 01012533188 | Father: 01022260090', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Nada Sherif',
      count: 9,
      students: [
        { id: '266065', name: 'Hana Khaled Mohamed Lutfy Abulaban', level: '2', gpa: '1.42', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01095159867', guardianPhone: 'Mother: 01019606797 | Father: 01000420105', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '266418', name: 'Haneen Ebrahim Abdellatif Ahmed Oraby', level: '2', gpa: '1.53', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01223220669', guardianPhone: 'Mother: 01126446970 | Father: 01223220660', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256458', name: 'Lojain Mamdouh Abdalla Ewis Abdelhamed', level: '2', gpa: '1.3', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01024008760', guardianPhone: 'Mother: 01024008737 | Father: 01100978410', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '263919', name: 'Yahia Ali Hassan Nada Saleh', level: '2', gpa: '1.42', midterm: 13, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01009611126', guardianPhone: 'Mother: 01063555980 | Father: 01002978010', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256515', name: 'Youssef Osama Ali Abas Saleh', level: '2', gpa: '1.74', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01014863040', guardianPhone: 'Mother: 01062387121 | Father: 01064653349', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254528', name: 'Zein Mohamed Zein Abdelalim Khalil', level: '2', gpa: '1.49', midterm: 8, quizzes: [2, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01092855290', guardianPhone: 'Mother: +96597952613 | Father: +96597581905', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '251454', name: 'Zeina Sayed Abbas Sultan Mohamed', level: '2', gpa: '1.22', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01091200515', guardianPhone: 'Mother: 01121601021 | Father: 01150782872', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '250376', name: 'Belal Mohamed Ahmed Moustafa Hassan', level: '3', gpa: '1.99', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01551573784', guardianPhone: 'Mother: +96597221526 | Father: +96597221520', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256277', name: 'Shahd Masood Fathy Abdelaziz', level: '3', gpa: '1.58', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01116635732', guardianPhone: 'Mother: 01112206110 | Father: 01500011113', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Salma Omar',
      count: 9,
      students: [
        { id: '245831', name: 'Haydi Said Sameeh Abdelaziz', level: '4', gpa: '1.91', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01097942361', guardianPhone: 'Mother: 01113271670 | Father: 01011646481', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '238039', name: 'Ibrahim Hassan Attia Rashd Mahran', level: '4', gpa: '1.77', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01093843891', guardianPhone: 'Mother: 01114035111 | Father: 01114033111', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '252844', name: 'Zeinab Walid Ibraheem Ahmed Ahmed', level: '4', gpa: '1.84', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01019288893', guardianPhone: 'Mother: 01090444437 | Father: 01006514990', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249645', name: 'Abdelrahman Ashraf Roshdy Abdelaziz Aly', level: '4', gpa: '0.47', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01114696780', guardianPhone: 'Mother: 01118157333 | Father: +966568813274', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '245001', name: 'Abram Rashad Sweaa Gaied', level: '4', gpa: '1.84', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01270789018', guardianPhone: 'Mother: 01221961507 | Father: 01158417007', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '224979', name: 'Rana Hossam Saber Ahmed', level: '4', gpa: '1.51', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01067932840', guardianPhone: 'Mother: 010922017 | Father: 01003351505', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '242469', name: 'Reham Wael Hassan Emam', level: '4', gpa: '1.31', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01503006329', guardianPhone: 'Mother: 01120151709 | Father: 01201035068', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249449', name: 'Salma Ehab Mohamed Mohamed Ahmed', level: '4', gpa: '1.39', midterm: 12, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01006075464', guardianPhone: 'Mother: 01222670730 | Father: 01001729955', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '237603', name: 'Omneya Ibrahim Abdalla Mohamed Ibrahim', level: '4', gpa: '0.65', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01125497869', guardianPhone: 'Mother: 01154093698 | Father: 01097849270', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Hesham Fady',
      count: 9,
      students: [
        { id: '255570', name: 'Sara Essam Arafa Shehata Sayed', level: '2', gpa: '1.93', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01101711375', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256756', name: 'Haneen Mohamed Ebrahim Mohamed Hassan', level: '3', gpa: '1.87', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01101307076', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256769', name: 'Merna Yehia Hussein Sabry Mahmoud Sabry', level: '3', gpa: '1.65', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01096038397', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254738', name: 'Mohamed Adel Sayed Ahmed Mahmoud', level: '3', gpa: '0', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01148610563', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256467', name: 'Mohamed Gamal Abdelhafeez Mohamed Atify', level: '3', gpa: '1.49', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01101713746', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256776', name: 'Mona Alsayed Galal Ahmed', level: '3', gpa: '0.83', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01031928337', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254800', name: 'Nancy Mohamed Salah Eid Morsy', level: '3', gpa: '1.75', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01226807386', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254056', name: 'Rania Salah Mohamed Eliwa Taha', level: '3', gpa: '1.5', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01023857746', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '240074', name: 'Youssef Mohamed Eid Milad', level: '3', gpa: '0.63', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01125636341', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Youssef Maged',
      count: 9,
      students: [
        { id: '253628', name: 'Mohamed Ahmed Badran Mohamed Badran', level: '4', gpa: '1.12', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01224420482', guardianPhone: 'Mother: 01229564298 | Father: 01229564298', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '237469', name: 'Omaima Abdelaziz Fahmey Ahmed', level: '4', gpa: '1.95', midterm: 7, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01028914272', guardianPhone: 'Mother: 01066660512 | Father: 01013302221', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '240220', name: 'Saad Yasser Saad Saleh Ahmed', level: '4', gpa: '1.72', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01066449847', guardianPhone: 'Mother: 01159335333 | Father: 01123555041', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255947', name: 'Sama Ali Abouelhamd Ali Abdelrehim', level: '4', gpa: '0.52', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01068908043', guardianPhone: 'Mother: 01066623571 | Father: 01115432222', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '247773', name: 'Shahd Abdelaziz Karar Mohamed', level: '4', gpa: '1.64', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01125074120', guardianPhone: 'Mother: 01102307436 | Father: 01155084742', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249413', name: 'Shahd Essam Mahmoud Goda Mohamed', level: '4', gpa: '1.87', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01011493821', guardianPhone: 'Mother: 01021557173 | Father: 01064644730', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249097', name: 'Shahd Imam Mohamed Hassan Mohamed Mohamed', level: '4', gpa: '1.72', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01061520693', guardianPhone: 'Mother: 01067256155', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255055', name: 'Toka Khaled Amin Abdelhamid Sheref', level: '4', gpa: '0.95', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01098308774', guardianPhone: 'Mother: 01153624939 | Father: +971547993753', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '246893', name: 'Virginia Sabry Samir Mikhail Soliman', level: '4', gpa: '1.81', midterm: 12, quizzes: [3, 3.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01270609450', guardianPhone: 'Mother: 01272179278 | Father: 01223672820', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Amr Waleed',
      count: 10,
      students: [
        { id: '262141', name: 'Houda Essam Hanafi Mahmoud Mohamed', level: '2', gpa: '0', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01032628769', guardianPhone: 'Mother: 01012852913 | Father: 01113111118', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '266307', name: 'Jana Amr Mostafa Ismail', level: '2', gpa: '0.14', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01147256206', guardianPhone: 'Mother: 01064579500', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '250714', name: 'Kanzi Amro Ahmed Saad Moustafa Elaagez', level: '2', gpa: '1.14', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01025496994', guardianPhone: 'Mother: 01030317111 | Father: 01010299292', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255987', name: 'Malak Mohamed Ahmed Abdallah Hassan', level: '2', gpa: '1.76', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01142065105', guardianPhone: 'Mother: 01125725910 | Father: 01116476785', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256312', name: 'Malak Muhamed Ahmed Aboelela Elsayed', level: '2', gpa: '1.6', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01154531823', guardianPhone: 'Mother: 01117978746 | Father: 01110176175', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256355', name: 'Malak Nasser Fathy Elsayed Said', level: '2', gpa: '1.24', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01100615058', guardianPhone: 'Mother: 01282152088 | Father: 01272445770', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255948', name: 'Monica Saad Mosaad Saad', level: '2', gpa: '1.98', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01092328919', guardianPhone: 'Mother: 01064590595 | Father: 01222864578', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254095', name: 'Omnia Magdy Mohamed Fawzy Aboelezz', level: '2', gpa: '1.61', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01145521195', guardianPhone: 'Father: 011222843838', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255748', name: 'Rawan Marwan Soliman Mohamed Saad', level: '2', gpa: '1.78', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01287155472', guardianPhone: 'Mother: 01221827134 | Father: 01008152928', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253730', name: 'Youssef Osama Ahmed Aly Khalil', level: '2', gpa: '1.94', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01017767293', guardianPhone: 'Mother: 01064404422 | Father: 01029393235', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Mohamed Fahim',
      count: 9,
      students: [
        { id: '240012', name: 'Alaa Yasser Abdelmohssen Hussin', level: '4', gpa: '0.54', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01112987595', guardianPhone: 'Mother: 01115555367 | Father: 01110444456', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '235433', name: 'Amr Hany Huasein Zakaria', level: '4', gpa: '1.95', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01551868004 / 01017752757', guardianPhone: 'Mother: 01272661917 | Father: 01017752757', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255207', name: 'Hamza Mohamed Sayed Mohamed Emam', level: '4', gpa: '1.71', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01207306946', guardianPhone: 'Mother: 01220410367 | Father: 01115444354', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '257035', name: 'Mahmoud Gamal Mohamed Abdelkawy', level: '4', gpa: '1.68', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01117126780', guardianPhone: 'Mother: 01126686617 | Father: 01010020869', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '237479', name: 'Malak Mohamed Omar Elsaghir Elfarouk Mohamed', level: '4', gpa: '1.96', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01024408489', guardianPhone: 'Mother: 01013811308 | Father: 01006045137', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253843', name: 'Yassin Khaled Abobakr Abdelmonem Elgarhy', level: '4', gpa: '1.32', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01159440660', guardianPhone: 'Mother: 01116707060 | Father: 01117009911', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '248155', name: 'Youssef Sherif Elsayed Mohamed', level: '4', gpa: '1.61', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01274338044', guardianPhone: 'Mother: 01201524466 | Father: 01202426831', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '246021', name: 'Mohamed Hamada Ramadan Mohamed Saleh', level: '4', gpa: '1.63', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01097206972', guardianPhone: 'Mother: 01005695152 | Father: 01064467990', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '204357', name: 'Ahmed Mohamed Sabra Hamdan', level: 'out of 7', gpa: 'N/A', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: 'N/A', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Rawan Ali',
      count: 9,
      students: [
        { id: '256752', name: 'Jana Ayman Abdelrahman Elmahdy Mohamed', level: '4', gpa: '1.8', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01278933386', guardianPhone: 'Mother: 01111828250 | Father: +971562266378', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '246489', name: 'Josia Melad Shokrallah Eshak', level: '4', gpa: '1.53', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01200018911', guardianPhone: 'Mother: 01200018897 | Father: 01273529844', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256828', name: 'Mariam Mamdouh Mohamed Mohamed Soliman', level: '4', gpa: '1', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01018152047', guardianPhone: 'Mother: 01278341717 | Father: 01558530574', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '243787', name: 'Mariam Mohamed Farouk Mohamed Aly', level: '4', gpa: '1.99', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '+971502996460', guardianPhone: 'Mother: +971508259643 | Father: +971507998338', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249451', name: 'Marwa Yahia Saed Gaber', level: '4', gpa: '1.34', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01097159693', guardianPhone: 'Mother: 01016119949 | Father: 01090312320', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '204083', name: 'Mustafa Ramzy Atteia Salman', level: '4', gpa: '1.89', midterm: 18, quizzes: [4.5, 4.5], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01097267094', guardianPhone: 'Mother: 01149872473 | Father: 01126922059', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253139', name: 'Rafael Younan Anwer Boctor', level: '4', gpa: '1.4', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '+971564654059', guardianPhone: 'Mother: +971553065972 | Father: +971551536510', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '248599', name: 'Rahma Sherin Muhammad Ali Youssef', level: '4', gpa: '1.74', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01093632878', guardianPhone: 'Mother: 01015541745 | Father: 01227173611', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '234857', name: 'Rawan Ahmed Badr Ibrahim', level: '4', gpa: '0.6', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01026488221', guardianPhone: 'Mother: 01001411993 | Father: 01026755599', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Shahd Eltarabily',
      count: 9,
      students: [
        { id: '265534', name: 'Hana Abdelgaed Sayed Abdelgaed Abouaziza', level: '2', gpa: '0', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01128774933', guardianPhone: 'Mother: 01005049493 | Father: 01129165615', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256591', name: 'Sabren Mohsen Saad Amin', level: '2', gpa: '1.56', midterm: 7, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01033497353', guardianPhone: 'Mother: 01140335505 | Father: 01116257774', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '253524', name: 'Salma Hani Mohamed Sabry Abdelsamee', level: '2', gpa: '0.91', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01095088561', guardianPhone: 'Mother: 01006840517 | Father: 01000463353', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '263983', name: 'Sama Mostafa Saad Elhoussiny Elnemr', level: '2', gpa: '1.65', midterm: 11, quizzes: [2.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01099822988', guardianPhone: 'Mother: 01004619998 | Father: 01005507502', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '257138', name: 'Shahd Yousry Abdelaziz Salem Elsheikh', level: '2', gpa: '0', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01066315578', guardianPhone: 'Mother: 01069129563 | Father: 01019552586', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '261140', name: 'Shakinaz Mohamed Hamed Ismail Mohamed', level: '2', gpa: '0.77', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01007959488', guardianPhone: 'Mother: 01001251278 | Father: 01005133497', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256300', name: 'Waad Wael Said Ewais Amer', level: '2', gpa: '1.28', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01145200569', guardianPhone: 'Mother: 01115162336 | Father: 01224181710', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '252782', name: 'Elbadry Mahmoud Ghonim Ahmed Rezk', level: '3', gpa: '1.8', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01158459983', guardianPhone: 'Mother: 01153629205 | Father: +96599755517', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256230', name: 'Hagar Saad Samir Mohamed Hamouda', level: '3', gpa: '1.9', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01017148218', guardianPhone: 'Father: 01025309228', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Nourhan Maher',
      count: 9,
      students: [
        { id: '257029', name: 'Ahmed Atef Abdelnaby Elmaasarawy', level: '3', gpa: '1.14', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01063565453', guardianPhone: 'Mother: 01061164743 | Father: 01025622611', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249205', name: 'Hayah Mohamed Ahmed Zeid', level: '3', gpa: '1.94', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01062410107', guardianPhone: 'Mother: 01006969001 | Father: 01002143440', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '240162', name: 'Haytham Ahmed Moftah Said Moragaa', level: '3', gpa: '0.19', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01208024903', guardianPhone: 'Mother: 01276152618 | Father: 01225220214', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249967', name: 'Hossam Ahmed Gamal Rashed', level: '3', gpa: '1.61', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01150998029', guardianPhone: 'Mother: 01121680923 | Father: 01023131079', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256949', name: 'Malak Abdeltawab Mohmed Abdeltawab', level: '3', gpa: '1.43', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01129328282', guardianPhone: 'Mother: 01113027672 | Father: 01551235685', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256891', name: 'Mariam Mohamed Sultan Khalid', level: '3', gpa: '1.84', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01029729153', guardianPhone: 'Mother: 01061698686 | Father: 01284388484', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256766', name: 'Rofida Mahmoud Hussein Mahmoud', level: '3', gpa: '1.92', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01117452103', guardianPhone: 'Mother: 01125323597 | Father: 01012867274', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255461', name: 'Saif Tamer Araby Mohamed', level: '3', gpa: '1.55', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01288780836', guardianPhone: 'N/A', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255908', name: 'Shahd Hazem Madi Ramadan', level: '3', gpa: '1.04', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01222253589', guardianPhone: 'Mother: 01224156937 | Father: 01227074491', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Hagar Magdy',
      count: 9,
      students: [
        { id: '256592', name: 'Ganna Adel Faisal Mohamed Sayed Nada', level: '2', gpa: '1.3', midterm: 13, quizzes: [3.5, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01154880816', guardianPhone: 'Mother: 01143151652 | Father: 01147768358', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256849', name: 'Mohraeil Mina Naeem Hana Hakim', level: '2', gpa: '1.91', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01212437085', guardianPhone: 'Mother: 01270834484 | Father: 01222719102', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254284', name: 'Maryam Essam Abdelsalam Elmaghwry', level: '3', gpa: '1.75', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01018844813', guardianPhone: 'Mother: 01115339393 | Father: 01010104110', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '246905', name: 'Sara Mohamed Mohamed Mokhtar Esawy', level: '3', gpa: '1.99', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01208070532', guardianPhone: 'Mother: 01229297610 | Father: 01229297552', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255539', name: 'Shahd Abdelrahman Zaghloul Alsayid', level: '3', gpa: '1.49', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01124002019', guardianPhone: 'Mother: 01124790712 | Father: 01145806697', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '249809', name: 'Shahd Ahmed Khalaf Ahmed Mohamed', level: '3', gpa: '0', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01124711772', guardianPhone: 'Mother: 01220849968 | Father: 01124933899', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256361', name: 'Shahd Hamidy Sbaq Abbas', level: '3', gpa: '1.13', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01127044516', guardianPhone: 'Mother: 01100936611 | Father: 01009796500', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '247245', name: 'Shahd Ibrahym Abdelrazek Sead', level: '3', gpa: '1.44', midterm: 7, quizzes: [1.5, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01096158189', guardianPhone: 'Mother: 01095895181 | Father: 01064064803', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256883', name: 'Tahgod Sayed Sayed Ahmed Mohamed Elhewehy', level: '3', gpa: '1.44', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01148291791', guardianPhone: 'Mother: 01154300276 | Father: 01224320429', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
      ]
    },
    {
      name: 'Faten Ehab',
      count: 9,
      students: [
        { id: '266574', name: 'Joudy Mohamed Taha Hussein Mohamed', level: '2', gpa: '0.87', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01030333321', guardianPhone: 'Mother: 01003333715 | Father: 01224355558', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256815', name: 'Nourhan Reda Saber Aborawash Youssef', level: '2', gpa: '1.8', midterm: 7, quizzes: [1.5, 2], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01206461633', guardianPhone: 'Mother: 01205144888 | Father: 01225813225', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '265170', name: 'Rahma Reda Saad Kotb Abdelmoneim', level: '2', gpa: '0.16', midterm: 16, quizzes: [4, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01070616460', guardianPhone: 'Mother: 01080310340 | Father: 01050385090', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '256721', name: 'Shahd Ragab Abdelsalam Kassam Attia', level: '2', gpa: '1.8', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01015046233', guardianPhone: 'Mother: 01070733669 | Father: 01000545926', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '260762', name: 'Youssef Ayman Mostafa Taha Mostafa', level: '2', gpa: '1.09', midterm: 11, quizzes: [2.5, 2.5], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01012081513', guardianPhone: 'Mother: 01005866673 | Father: 01001776753', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '265805', name: 'Youssef Omar Youssef Otaify Kamaleldin', level: '2', gpa: '0.63', midterm: 17, quizzes: [4.5, 4], attendanceWarnings: 0, nextFollowUp: todayDateStr, studentPhone: '01010167981', guardianPhone: 'Mother: 01004841971 | Father: 01005597007', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254603', name: 'Youssef Tarek Ali Sultan Ali', level: '2', gpa: '1.05', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01101058653', guardianPhone: 'Mother: 01113598937 | Father: 01145573188', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '254868', name: 'Johnathan Emil Samir Heshmat Ebrahim', level: '3', gpa: '1.45', midterm: 8, quizzes: [2, 1.5], attendanceWarnings: 3, nextFollowUp: todayDateStr, studentPhone: '01279313357', guardianPhone: 'Mother: 01270171579 | Father: 01223305715', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] },
        { id: '255870', name: 'Mahmoud Yasser Mamdoh Abdalhameed', level: '3', gpa: '1.95', midterm: 12, quizzes: [3, 3], attendanceWarnings: 1, nextFollowUp: todayDateStr, studentPhone: '01148906176', guardianPhone: 'Mother: 01149934524 | Father: 01112191937', customSections: [], courses: [], actionPlans: [], documentsList: [], assessment: { academic: '', behavioral: '', risks: [], weaknesses: [], strengths: [] }, timeline: [] }
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
      <div suppressHydrationWarning style={{ backgroundColor: '#ffffff' }} className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">
        <header className="bg-[#45499F] text-white px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <img src="/Biotechnology/logo.png" alt="Logo" className="w-[6.25rem] h-[6.25rem] object-contain rounded-xl bg-white/10 p-1 border border-white/20" />
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
          <button
            type="button"
            onClick={() => setCurrentView('about')}
            className="w-full max-w-xl bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-[#45499F] shadow-sm flex items-center justify-between gap-4 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#45499F] flex items-center justify-center border border-indigo-100 group-hover:scale-110 transition-transform">
                <Info size={24} />
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900">About Us</p>
                <p className="text-[11px] text-indigo-600 font-semibold mt-1">Learn about our mission, team, and support model</p>
              </div>
            </div>
            <ChevronRight size={22} className="text-slate-400 group-hover:text-[#45499F] transition-colors shrink-0" />
          </button>
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
      </div>
    );
  }
  if (currentView === 'about') {
    return (
      <div suppressHydrationWarning className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
        <header className="bg-[#45499F] text-white px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentView('landing')}
              title="Back to home"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/20 transition-all cursor-pointer"
            >
              <ArrowLeft size={18} />
            </button>
            <img src="/Biotechnology/logo.png" alt="Logo" className="w-[6.25rem] h-[6.25rem] object-contain rounded-xl bg-white/10 p-1 border border-white/20" />
            <div>
              <h1 className="text-lg font-bold tracking-tight">About Us</h1>
            </div>
          </div>
          <div className="text-xs bg-indigo-950/40 px-3 py-1.5 rounded-xl border border-indigo-500/30 text-indigo-200 font-semibold">
            MSA University
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div style={{ backgroundColor: '#45499F' }} className="rounded-3xl p-8 text-white shadow-xl">
              <h2 className="text-3xl font-extrabold tracking-tight">On-Probation Students Supporting System</h2>
              <p className="text-indigo-200 text-sm mt-2 max-w-3xl">
                A faculty-led academic recovery platform that connects advisors, students, parents, and the documentation team in one place.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/Meet Our Dean.jpeg"
                      alt="Dean of the Faculty of Biotechnology"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-indigo-100 shadow-sm shrink-0 bg-slate-50"
                    />
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Meet Our Dean</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Professor Gehan Safwat served for several years as Vice Dean of the Faculty of Biotechnology for Student Affairs and Community Service. She is the first Egyptian woman to receive a fully funded PhD scholarship from the University of Cambridge and completed her postdoctoral studies in Australia.
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      She has led UN food security initiatives and missions to refugee camps worldwide, and trained UN staff in food security and women’s empowerment. A distinguished scientist with numerous publications and prestigious awards, she currently chairs the National Committee for Women in Science.
                    </p>
                  </div>
                </div>
              </section>
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Meet Our Team</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {facultyAdvisors.map((adv) => (
                    <TeamMemberIcon
                      key={adv.name}
                      name={adv.name}
                      photo={`${adv.name.replace(/^(Prof\.|Dr\.)\s*/i, '').trim().toLowerCase().replace(/\s+/g, '-')}.jpeg`}
                    />
                  ))}
                </div>
              </section>
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">What is On-Probation Support System?</h3>
                <div className="space-y-3">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    The On-Probation Supporting System is designed to support students who are facing academic challenges and help them improve their academic performance. The system facilitates communication between students, and academic advisors to ensure that students receive the necessary guidance and support throughout their academic journey. It helps monitor students’ academic progress, track their attendance, identify challenges, and follow up on individual cases through regular communication and documentation. By providing continuous support and timely intervention, the system aims to help students overcome academic difficulties, improve their performance, and successfully get out of probation.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">On-Probation Support System Hierarchy</h3>
                  <a href="/images/opsss-hierarchy.jpeg" target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                    <img
                      src="/images/opsss-hierarchy.jpeg"
                      alt="On Probation Student Support System (OPSSS) hierarchy"
                      className="w-full h-auto rounded-2xl border border-slate-200 shadow-sm bg-slate-50"
                    />
                  </a>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Video</h4>
                    <a
                      href="/media/probation-system-video.mp4"
                      download="On-Probation-Support-System-Video.mp4"
                      className="inline-flex items-center gap-1.5 bg-[#45499F] hover:opacity-95 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      <Download size={14} />
                      Download Video
                    </a>
                  </div>
                  <video
                    controls
                    preload="metadata"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50"
                  >
                    <source src="/media/probation-system-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </section>
              <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Our Mission &amp; Vision</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#45499F] text-white flex items-center justify-center shadow-sm">
                        <Eye size={20} />
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">Our Vision</h4>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      To be a leading model of academic support, where every student facing academic challenges is guided, supported, and empowered to recover and succeed.
                    </p>
                  </div>
                  <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#45499F] text-white flex items-center justify-center shadow-sm">
                        <Target size={20} />
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">Our Mission</h4>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      To provide continuous guidance and timely intervention for students on probation through close advising, regular follow-up, and clear documentation, helping them overcome academic difficulties, improve their performance, and successfully get out of probation.
                    </p>
                  </div>
                </div>
              </section>
            </div>
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
          <img src="/Biotechnology/logo.png" alt="Logo" className="w-[6.25rem] h-[6.25rem] object-contain rounded-xl bg-white/10 p-1 border border-white/20" />
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
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex shrink-0 overflow-y-auto">
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
                <AdvisorSidebarCard advisorName={selectedStudentObj?.advisor || selectedAdvisor} />
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
                <button
                  onClick={() => handleNavClick('Advisors Information')}
                  style={activeNav === 'Advisors Information' ? { backgroundColor: '#45499F' } : {}}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    activeNav === 'Advisors Information' ? 'text-white shadow-md shadow-[#45499F]/25 font-bold' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <Phone size={18} />
                  <span>Advisors Information</span>
                </button>
                <button
                  onClick={() => handleNavClick('Certificates')}
                  style={activeNav === 'Certificates' ? { backgroundColor: '#45499F' } : {}}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    activeNav === 'Certificates' ? 'text-white shadow-md shadow-[#45499F]/25 font-bold' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <Award size={18} />
                  <span>Certificates</span>
                </button>
                <button
                  onClick={() => handleNavClick('Advisor Distribution')}
                  style={activeNav === 'Advisor Distribution' ? { backgroundColor: '#45499F' } : {}}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    activeNav === 'Advisor Distribution' ? 'text-white shadow-md shadow-[#45499F]/25 font-bold' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <FolderKanban size={18} />
                  <span>Advisor Distribution</span>
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
                    <div className="flex items-center gap-4">
  {(() => {
    const advisorImages = {
      'Hagar Magdy': 'hagar-magdy.jpeg',
      'Prof. Haidan Mostafa': 'haidan-mostafa.jpeg',
      'Dr. Gehad Tarek': 'gehad-tarek.jpeg',
      'Nourhan Maher': 'nourhan-maher.jpeg',
      'Dr. Marwa Kenawy': 'marwa-kenawy.jpeg',
      'Dr. Mai Ahmed': 'mai-ahmed.jpeg',
      'Nashwa Hamido': 'nashwa-hamido.jpeg',
      'Youssef Maged': 'youssef-maged.jpeg'
    };
    const photo = advisorImages[selectedAdvisor];
    if (!photo) return null;
    return (
      <div className="w-32 h-32 rounded-2xl bg-white/10 border border-white/20 overflow-hidden flex-shrink-0">
        <img
          src={`/images/${photo}`}
          alt={selectedAdvisor}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/dean.jpeg";
          }}
        />
      </div>
    );
  })()}
  <div className="space-y-1">
    <span className="bg-white/20 text-indigo-100 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
      Academic Advisor Portal
    </span>
    <h2 className="text-3xl font-extrabold tracking-tight">
      Welcome back, {selectedAdvisor}
    </h2>
    <p className="text-indigo-200 text-xs">
      Faculty of Biotechnology On-Probation Students Supporting System.
    </p>
    {(ADVISOR_PHONES[selectedAdvisor] || ADVISOR_EMAILS[selectedAdvisor]) && (
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {ADVISOR_PHONES[selectedAdvisor] && (
          <a
            href={`tel:${ADVISOR_PHONES[selectedAdvisor]}`}
            className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <Phone size={14} />
            {ADVISOR_PHONES[selectedAdvisor]}
          </a>
        )}
        {ADVISOR_PHONES[selectedAdvisor] && (
          <a
            href={`https://wa.me/${toWhatsAppNumber(ADVISOR_PHONES[selectedAdvisor])}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <MessageCircle size={14} />
            Chat on WhatsApp
          </a>
        )}
        {ADVISOR_EMAILS[selectedAdvisor] && (
          <a
            href={`mailto:${ADVISOR_EMAILS[selectedAdvisor]}`}
            className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            <Mail size={14} />
            {ADVISOR_EMAILS[selectedAdvisor]}
          </a>
        )}
      </div>
    )}
  </div>
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
            {/* CERTIFICATES VIEW */}
            {activeNav === 'Certificates' && simulatedRole === 'Documentation Team' && (
              <div className="space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-extrabold text-slate-900">Certificates</h2>
                  </div>
                  <EditableDocSections sections={certificateSections} setSections={setCertificateSections} />
                </div>
              </div>
            )}
            {/* ADVISOR DISTRIBUTION VIEW */}
            {activeNav === 'Advisor Distribution' && simulatedRole === 'Documentation Team' && (
              <div className="space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-extrabold text-slate-900">Advisor Distribution</h2>
                  </div>
                  <EditableDocSections sections={distributionSections} setSections={setDistributionSections} />
                </div>
              </div>
            )}
            {/* ADVISORS INFORMATION VIEW */}
            {activeNav === 'Advisors Information' && simulatedRole === 'Documentation Team' && (
              <div className="space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900">Advisors Information</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Contact details and student load for every academic advisor.</p>
                    </div>
                    <span className="bg-indigo-50 text-[#45499F] text-xs font-bold px-3 py-1.5 rounded-full border border-indigo-100">
                      {facultyAdvisors.length} Advisors
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                          <th className="p-3">#</th>
                          <th className="p-3">Advisor Name</th>
                          <th className="p-3">Phone Number</th>
                          <th className="p-3">WhatsApp</th>
                          <th className="p-3">Email Address</th>
                          <th className="p-3 text-center">Students Assigned</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {facultyAdvisors.map((adv, idx) => {
                          const phone = ADVISOR_PHONES[adv.name];
                          const email = ADVISOR_EMAILS[adv.name];
                          return (
                            <tr key={adv.name} className="hover:bg-slate-50 transition-colors">
                              <td className="p-3 text-slate-400 font-semibold">{idx + 1}</td>
                              <td className="p-3 font-bold text-slate-900 whitespace-nowrap">{adv.name}</td>
                              <td className="p-3 font-semibold text-slate-600 whitespace-nowrap">
                                {phone ? (
                                  <a href={`tel:${phone}`} className="hover:text-[#45499F] hover:underline">{phone}</a>
                                ) : (
                                  <span className="text-slate-400">N/A</span>
                                )}
                              </td>
                              <td className="p-3">
                                {phone ? (
                                  <a
                                    href={`https://wa.me/${toWhatsAppNumber(phone)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-colors whitespace-nowrap"
                                  >
                                    <MessageCircle size={13} />
                                    Chat
                                  </a>
                                ) : (
                                  <span className="text-slate-400">N/A</span>
                                )}
                              </td>
                              <td className="p-3 font-semibold text-slate-600">
                                {email ? (
                                  <a href={`mailto:${email}`} className="hover:text-[#45499F] hover:underline">{email}</a>
                                ) : (
                                  <span className="text-slate-400">N/A</span>
                                )}
                              </td>
                              <td className="p-3 text-center">
                                <span className="inline-block min-w-[2rem] bg-indigo-50 text-[#45499F] font-extrabold text-xs px-2.5 py-1 rounded-full border border-indigo-100">
                                  {adv.students.length}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
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