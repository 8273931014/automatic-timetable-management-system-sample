
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [teachers, setTeachers] = useState([]);
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [weeklyLectures, setWeeklyLectures] = useState("3");

  const [rooms, setRooms] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("Classroom");
  const [capacity, setCapacity] = useState("60");

  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("A");
  const [semester, setSemester] = useState("1");
  const [studentCount, setStudentCount] = useState("60");

  const [timeSlots, setTimeSlots] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState("MONDAY");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [assignments, setAssignments] = useState([]);
  const [assignmentTeacherId, setAssignmentTeacherId] = useState("");
  const [assignmentSubjectId, setAssignmentSubjectId] = useState("");
  const [assignmentClassId, setAssignmentClassId] = useState("");
  const [lecturesPerWeek, setLecturesPerWeek] = useState("3");

  // Load data for the selected page
  useEffect(() => {
    setMessage("");

    const endpoints = {
      Teachers: {
        url: "/api/teachers",
        setter: setTeachers,
        error: "Teachers load nahi hue.",
      },
      Subjects: {
        url: "/api/subjects",
        setter: setSubjects,
        error: "Subjects load nahi hue.",
      },
      Rooms: {
        url: "/api/rooms",
        setter: setRooms,
        error: "Rooms load nahi hue.",
      },
      Classes: {
        url: "/api/classes",
        setter: setClasses,
        error: "Classes load nahi hui.",
      },
      "Time Slots": {
        url: "/api/time-slots",
        setter: setTimeSlots,
        error: "Time slots are not load yet.",
              Assignments: {
                url: "/api/assignments",
                setter: setAssignments,
                error: "Assignments load nahi hue.",
              },
      },
    };

    const selected = endpoints[activePage];
    if (!selected) return;

    fetch(`${API}${selected.url}`)
      .then((response) => {
        if (!response.ok) throw new Error(selected.error);
        return response.json();
      })
      .then(selected.setter)
      .catch(() => {
        setMessage(`${selected.error} check Backend/CORS .`);
      });
  }, [activePage]);

  // Add Teacher
  async function addTeacher(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/teachers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: teacherName.trim(),
          email: teacherEmail.trim(),
        }),
      });

      if (!response.ok) throw new Error("Teacher add nahi hua.");

      const saved = await response.json();
      setTeachers((previous) => [...previous, saved]);
      setTeacherName("");
      setTeacherEmail("");
      setMessage("Teacher successfully add ho gaya!");
    } catch (error) {
      setMessage(error.message || "Backend/CORS error.");
    } finally {
      setLoading(false);
    }
  }

  // Add Subject
  async function addSubject(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/subjects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: subjectName.trim(),
          code: subjectCode.trim(),
          weeklyLectures: Number(weeklyLectures),
        }),
      });

      if (!response.ok) throw new Error("Subject add nahi hua.");

      const saved = await response.json();
      setSubjects((previous) => [...previous, saved]);
      setSubjectName("");
      setSubjectCode("");
      setWeeklyLectures("3");
      setMessage("Subject successfully add ho gaya!");
    } catch (error) {
      setMessage(error.message || "Backend/CORS error.");
    } finally {
      setLoading(false);
    }
  }

  // Add Room
  async function addRoom(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomNumber: roomNumber.trim(),
          roomType,
          capacity: Number(capacity),
        }),
      });

      if (!response.ok) throw new Error("Room add nahi hua.");

      const saved = await response.json();
      setRooms((previous) => [...previous, saved]);
      setRoomNumber("");
      setRoomType("Classroom");
      setCapacity("60");
      setMessage("Room successfully add ho gaya!");
    } catch (error) {
      setMessage(error.message || "Backend/CORS error.");
    } finally {
      setLoading(false);
    }
  }

  // Add Class
  async function addClass(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/classes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: className.trim(),
          section: section.trim(),
          semester: Number(semester),
          studentCount: Number(studentCount),
        }),
      });

      if (!response.ok) throw new Error("Class add nahi hui.");

      const saved = await response.json();
      setClasses((previous) => [...previous, saved]);
      setClassName("");
      setSection("A");
      setSemester("1");
      setStudentCount("60");
      setMessage("Class successfully add ho gayi!");
    } catch (error) {
      setMessage(error.message || "Backend/CORS error.");
    } finally {
      setLoading(false);
    }
  }

  // Add Time Slot
  async function addTimeSlot(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    if (startTime >= endTime) {
      setMessage("End time, start time se baad ka hona chahiye.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API}/api/time-slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dayOfWeek,
          startTime: `${startTime}:00`,
          endTime: `${endTime}:00`,
        }),
      });

      if (!response.ok) throw new Error("Time slot add nahi hua.");

      const saved = await response.json();
      setTimeSlots((previous) => [...previous, saved]);
      setStartTime("09:00");
      setEndTime("10:00");
      setMessage("Time slot successfully add ho gaya!");
    } catch (error) {
      setMessage(error.message || "Backend/CORS error.");
    } finally {
      setLoading(false);
    }
  }

  const menu = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Teachers", icon: "👨‍🏫" },
    { name: "Subjects", icon: "📚" },
    { name: "Classes", icon: "🎓" },
    { name: "Rooms", icon: "🏫" },
    { name: "Time Slots", icon: "🕒" },
    { name: "Assignments", icon: "📝" },
    { name: "Timetable", icon: "📅" },
  ];

  const stats = [
    { title: "Teachers", icon: "👨‍🏫", count: teachers.length },
    { title: "Subjects", icon: "📚", count: subjects.length },
    { title: "Classes", icon: "🎓", count: classes.length },
    { title: "Rooms", icon: "🏫", count: rooms.length },
  ];

  function StatusMessage() {
    if (!message) return null;

    return (
      <p
        className={`status-message ${
          message.includes("successfully") ? "success" : "error"
        }`}
      >
        {message}
      </p>
    );
  }

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">📅</div>
          <div>
            <h2>TimeTable</h2>
            <p>Management System</p>
          </div>
        </div>

        <p className="menu-heading">MAIN MENU</p>

        <nav className="sidebar-menu">
          {menu.map((item) => (
            <button
              key={item.name}
              className={`menu-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => {
                setActivePage(item.name);
                setMessage("");
              }}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-avatar">A</div>
          <div>
            <strong>Administrator</strong>
            <p>College Admin</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Pages / {activePage}</p>
            <h2>{activePage}</h2>
          </div>
          <div className="admin-badge">👤 Admin</div>
        </header>

        {/* Dashboard */}
        {activePage === "Dashboard" ? (
          <>
            <section className="welcome-card">
              <div>
                <p className="welcome-label">COLLEGE MANAGEMENT</p>
                <h1>Welcome to your Dashboard!</h1>
                <p>
                  Manage teachers, subjects, classes, rooms and your college
                  timetable in one place.
                </p>
                <button
                  className="primary-button"
                  onClick={() => setActivePage("Timetable")}
                >
                  View Timetable →
                </button>
              </div>
              <div className="welcome-illustration">📅</div>
            </section>

            <div className="section-heading">
              <div>
                <h2>Overview</h2>
                <p>Manage your college resources</p>
              </div>
            </div>

            <section className="stats-grid">
              {stats.map((stat) => (
                <button
                  className="stat-card"
                  key={stat.title}
                  onClick={() => setActivePage(stat.title)}
                >
                  <div className="stat-top">
                    <span className="stat-icon">{stat.icon}</span>
                    <span className="stat-arrow">↗</span>
                  </div>
                  <h3>{stat.count}</h3>
                  <p>{stat.title}</p>
                </button>
              ))}
            </section>

            <section className="content-card">
              <div className="card-heading">
                <div>
                  <h2>Timetable Management</h2>
                  <p>Generate and manage your weekly timetable</p>
                </div>
                <button
                  className="primary-button"
                  onClick={() => setActivePage("Timetable")}
                >
                  Open Timetable
                </button>
              </div>
              <div className="empty-state">
                <div className="empty-icon">🗓️</div>
                <h3>Your timetable workspace</h3>
                <p>Add your college data first, then generate your timetable.</p>
              </div>
            </section>
          </>
        ) : activePage === "Teachers" ? (
          /* Teachers */
          <section className="content-card">
            <div className="card-heading">
              <div>
                <h2>Teacher Management</h2>
                <p>Add teachers and view saved teacher details.</p>
              </div>
              <span className="count-badge">Total: {teachers.length}</span>
            </div>

            <form className="teacher-form" onSubmit={addTeacher}>
              <div className="form-field">
                <label htmlFor="teacherName">Teacher Name</label>
                <input
                  id="teacherName"
                  value={teacherName}
                  onChange={(event) => setTeacherName(event.target.value)}
                  placeholder="Enter teacher name"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="teacherEmail">Email Address</label>
                <input
                  id="teacherEmail"
                  type="email"
                  value={teacherEmail}
                  onChange={(event) => setTeacherEmail(event.target.value)}
                  placeholder="Enter teacher email"
                  required
                />
              </div>
              <button className="primary-button" disabled={loading} type="submit">
                {loading ? "Adding..." : "+ Add Teacher"}
              </button>
            </form>

            <StatusMessage />

            <div className="teacher-list">
              <h3>Teachers List</h3>
              {teachers.length === 0 ? (
                <div className="empty-state"><p>No teachers added yet.</p></div>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr><th>ID</th><th>Teacher Name</th><th>Email Address</th></tr>
                    </thead>
                    <tbody>
                      {teachers.map((teacher, index) => (
                        <tr key={teacher.id ?? index}>
                          <td>{teacher.id ?? "—"}</td>
                          <td>{teacher.name}</td>
                          <td>{teacher.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        ) : activePage === "Subjects" ? (
          /* Subjects */
          <section className="content-card">
            <div className="card-heading">
              <div>
                <h2>Subject Management</h2>
                <p>Add subjects and view saved subject details.</p>
              </div>
              <span className="count-badge">Total: {subjects.length}</span>
            </div>

            <form className="teacher-form" onSubmit={addSubject}>
              <div className="form-field">
                <label htmlFor="subjectName">Subject Name</label>
                <input
                  id="subjectName"
                  value={subjectName}
                  onChange={(event) => setSubjectName(event.target.value)}
                  placeholder="e.g. Data Structures"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="subjectCode">Subject Code</label>
                <input
                  id="subjectCode"
                  value={subjectCode}
                  onChange={(event) => setSubjectCode(event.target.value)}
                  placeholder="e.g. MCA101"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="weeklyLectures">Weekly Lectures</label>
                <input
                  id="weeklyLectures"
                  type="number"
                  min="1"
                  max="40"
                  value={weeklyLectures}
                  onChange={(event) => setWeeklyLectures(event.target.value)}
                  required
                />
              </div>
              <button className="primary-button" disabled={loading} type="submit">
                {loading ? "Adding..." : "+ Add Subject"}
              </button>
            </form>

            <StatusMessage />

            <div className="teacher-list">
              <h3>Subjects List</h3>
              {subjects.length === 0 ? (
                <div className="empty-state"><p>No subjects added yet.</p></div>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th><th>Subject Name</th>
                        <th>Subject Code</th><th>Weekly Lectures</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, index) => (
                        <tr key={subject.id ?? index}>
                          <td>{subject.id ?? "—"}</td>
                          <td>{subject.name}</td>
                          <td>{subject.code}</td>
                          <td>{subject.weeklyLectures}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        ) : activePage === "Rooms" ? (
          /* Rooms */
          <section className="content-card">
            <div className="card-heading">
              <div>
                <h2>Room Management</h2>
                <p>Add classrooms and labs.</p>
              </div>
              <span className="count-badge">Total: {rooms.length}</span>
            </div>

            <form className="teacher-form" onSubmit={addRoom}>
              <div className="form-field">
                <label htmlFor="roomNumber">Room Number</label>
                <input
                  id="roomNumber"
                  value={roomNumber}
                  onChange={(event) => setRoomNumber(event.target.value)}
                  placeholder="e.g. 101"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="roomType">Room Type</label>
                <select
                  id="roomType"
                  value={roomType}
                  onChange={(event) => setRoomType(event.target.value)}
                >
                  <option value="Classroom">Classroom</option>
                  <option value="Lab">Lab</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="capacity">Capacity</label>
                <input
                  id="capacity"
                  type="number"
                  min="1"
                  value={capacity}
                  onChange={(event) => setCapacity(event.target.value)}
                  required
                />
              </div>
              <button className="primary-button" disabled={loading} type="submit">
                {loading ? "Adding..." : "+ Add Room"}
              </button>
            </form>

            <StatusMessage />

            <div className="teacher-list">
              <h3>Rooms List</h3>
              {rooms.length === 0 ? (
                <div className="empty-state"><p>No rooms added yet.</p></div>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th><th>Room Number</th>
                        <th>Room Type</th><th>Capacity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms.map((room, index) => (
                        <tr key={room.id ?? index}>
                          <td>{room.id ?? "—"}</td>
                          <td>{room.roomNumber}</td>
                          <td>{room.roomType}</td>
                          <td>{room.capacity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        ) : activePage === "Classes" ? (
          /* Classes */
          <section className="content-card">
            <div className="card-heading">
              <div>
                <h2>Class Management</h2>
                <p>Add classes, sections and student counts.</p>
              </div>
              <span className="count-badge">Total: {classes.length}</span>
            </div>

            <form className="teacher-form" onSubmit={addClass}>
              <div className="form-field">
                <label htmlFor="className">Class Name</label>
                <input
                  id="className"
                  value={className}
                  onChange={(event) => setClassName(event.target.value)}
                  placeholder="e.g. MCA"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="section">Section</label>
                <input
                  id="section"
                  value={section}
                  onChange={(event) => setSection(event.target.value)}
                  placeholder="e.g. A"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="semester">Semester</label>
                <select
                  id="semester"
                  value={semester}
                  onChange={(event) => setSemester(event.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6].map((number) => (
                    <option key={number} value={number}>{number}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="studentCount">Number of Students</label>
                <input
                  id="studentCount"
                  type="number"
                  min="1"
                  value={studentCount}
                  onChange={(event) => setStudentCount(event.target.value)}
                  required
                />
              </div>
              <button className="primary-button" disabled={loading} type="submit">
                {loading ? "Adding..." : "+ Add Class"}
              </button>
            </form>

            <StatusMessage />

            <div className="teacher-list">
              <h3>Classes List</h3>
              {classes.length === 0 ? (
                <div className="empty-state"><p>No classes added yet.</p></div>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th><th>Class Name</th><th>Section</th>
                        <th>Semester</th><th>Students</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes.map((collegeClass, index) => (
                        <tr key={collegeClass.id ?? index}>
                          <td>{collegeClass.id ?? "—"}</td>
                          <td>{collegeClass.name}</td>
                          <td>{collegeClass.section}</td>
                          <td>{collegeClass.semester}</td>
                          <td>{collegeClass.studentCount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        ) : activePage === "Time Slots" ? (
          /* Time Slots */
          <section className="content-card">
            <div className="card-heading">
              <div>
                <h2>Time Slot Management</h2>
                <p>Create and manage your weekly lecture periods.</p>
              </div>
              <span className="count-badge">Total: {timeSlots.length}</span>
            </div>

            <form className="teacher-form" onSubmit={addTimeSlot}>
              <div className="form-field">
                <label htmlFor="dayOfWeek">Day</label>
                <select
                  id="dayOfWeek"
                  value={dayOfWeek}
                  onChange={(event) => setDayOfWeek(event.target.value)}
                >
                  {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map((day) => (
                    <option key={day} value={day}>
                      {day.charAt(0) + day.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="startTime">Start Time</label>
                <input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="endTime">End Time</label>
                <input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  required
                />
              </div>
              <button className="primary-button" disabled={loading} type="submit">
                {loading ? "Adding..." : "+ Add Time Slot"}
              </button>
            </form>

            <StatusMessage />

            <div className="teacher-list">
              <h3>Time Slots List</h3>
              {timeSlots.length === 0 ? (
                <div className="empty-state"><p>No time slots added yet.</p></div>
              ) : (
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr><th>ID</th><th>Day</th><th>Start Time</th><th>End Time</th></tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((slot, index) => (
                        <tr key={slot.id ?? index}>
                          <td>{slot.id ?? "—"}</td>
                          <td>{slot.dayOfWeek}</td>
                          <td>{slot.startTime}</td>
                          <td>{slot.endTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        ) : (
          /* Remaining sections */
          <section className="content-card">
            <div className="card-heading">
              <div>
                <h2>{activePage}</h2>
                <p>This section will be connected to the backend step by step.</p>
              </div>
            </div>

            <div className="empty-state">
              <div className="empty-icon">
                {menu.find((item) => item.name === activePage)?.icon ?? "📋"}
              </div>
              <h3>{activePage} Management</h3>
              <p>
                Your {activePage.toLowerCase()} section is ready for the next
                development step.
              </p>

              {activePage === "Timetable" && (
                <button
                  className="primary-button"
                  disabled={loading}
                  onClick={async () => {
                    setMessage("");
                    setLoading(true);

                    try {
                      const response = await fetch(
                        `${API}/api/timetable/generate`,
                        { method: "POST" }
                      );

                      if (!response.ok) {
                        throw new Error(
                          "Timetable generate nahi hua. Pehle assignments aur required data add karo."
                        );
                      }

                      setMessage("Timetable generated successfully!");
                    } catch (error) {
                      setMessage(error.message || "Timetable generate nahi hua.");
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? "Generating..." : "Generate Timetable"}
                </button>
              )}

              {activePage === "Timetable" && <StatusMessage />}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
