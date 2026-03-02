# 🕒 ChronoWeave  
### Intelligent Constraint-Based Timetable Optimization System  
> *From Complex Constraints to Optimal Timetables.*

---

## 🚀 Overview

**ChronoWeave** is an intelligent academic scheduling system that models timetable generation as a **Constraint Satisfaction Problem (CSP)** and solves it using mathematical optimization techniques.

It generates optimal or near-optimal timetables while satisfying institutional constraints such as faculty availability, course credits, and room capacities.

---

## 🎯 Problem We Solve

Academic timetable creation is complex due to:

- 👨‍🏫 Faculty availability constraints  
- 📚 Course credit requirements  
- 🏫 Room capacity limitations  
- 🧪 Lab scheduling dependencies  
- 🔄 Frequent last-minute changes  

Manual scheduling leads to:
- Conflicts  
- Inefficient resource allocation  
- High administrative workload  

ChronoWeave automates and optimizes this process.

---

## 🏗 System Architecture
User (Admin / Scheduler)
↓
Frontend – Next.js Dashboard
↓
Node.js API Layer
↓
Optimization Engine (Python + OR-Tools CP-SAT)
↓
PostgreSQL Database (Supabase)
↓
Visualization Dashboard
↘
Gemini API (Conflict Explanation Layer)


---

## 🔄 Data Flow

### 1️⃣ Data Input
Admin provides:
- Faculty availability
- Course structure & credit hours
- Room capacity & lab details
- Time slot definitions

### 2️⃣ API Processing
- Input validation
- JSON payload structuring
- Request sent to optimization engine

### 3️⃣ Optimization Engine
- Decision variable creation
- Hard & soft constraint modeling
- CP-SAT solver execution
- Optimal / infeasible schedule generation

### 4️⃣ Conflict Handling
If infeasible:
- Solver detects constraint violation
- Gemini API generates human-readable explanation

### 5️⃣ Storage & Visualization
- Schedule stored in PostgreSQL
- Dashboard displays interactive timetable
- Conflicts highlighted dynamically

---

## 🧠 Technology Stack

### 💻 Frontend
- Next.js
- React
- Tailwind CSS

### 🌐 Backend
- Node.js (API Layer)

### ⚙ Optimization Engine
- Python
- Google OR-Tools (CP-SAT Solver)

### 🗄 Database
- PostgreSQL
- Supabase

### 🤖 AI Layer
- Gemini API (Conflict explanation & reporting)

---

## ⚙ Constraint Modeling

### 🔢 Decision Variable


X[course][room][slot] = 1 if assigned, else 0


---

### ✅ Hard Constraints
- No faculty overlap
- No room overlap
- Credit hours must be fulfilled
- Room capacity ≥ enrolled students

---

### 🎯 Soft Constraints
- Minimize idle gaps
- Balance faculty workload
- Avoid excessive consecutive lectures

---

### 🏆 Objective

Minimize total penalty from soft constraint violations  
while satisfying all hard constraints.

If no feasible solution exists, the system:
- Returns infeasible status
- Provides AI-generated conflict explanation

---

## 🔁 Dynamic Regeneration

When constraints change:
- Model is updated
- Solver re-executes
- Valid allocations are preserved
- New optimized timetable is generated

Ensures minimal disruption.

---

## ✨ Key Features

- 📊 Automated timetable generation
- 🚫 Conflict detection & reporting
- 🔄 Dynamic schedule regeneration
- ⚡ Optimized resource allocation
- 📈 Scalable institutional deployment
- 🖥 Interactive visualization dashboard

---

## 🗂 Database Structure (High-Level)

### Faculty
- id
- name
- availability

### Courses
- id
- faculty_id
- credit_hours
- student_count

### Rooms
- id
- capacity
- type

### TimeSlots
- id
- day
- start_time
- end_time

### Schedules
- id
- course_id
- room_id
- slot_id
- generated_at

---

## 📈 Impact & Benefits

- Eliminates manual scheduling errors
- Reduces administrative workload
- Ensures optimal faculty & room utilization
- Provides transparent conflict reporting
- Scalable across departments & campuses

---

## 🔮 Future Enhancements

- Multi-objective optimization
- Advanced soft constraint weighting
- ERP system integration
- Predictive workload analytics
- Multi-campus deployment support

---

## 📚 Research Foundation

- Constraint Satisfaction Problems (CSP)
- Operations Research in scheduling
- CP-SAT optimization techniques
- Academic timetabling models

---

## 🏁 Conclusion

ChronoWeave bridges mathematical optimization and modern web architecture to deliver a scalable, intelligent academic scheduling system.

It transforms complex constraints into structured, optimized timetables — efficiently and intelligently.

---
