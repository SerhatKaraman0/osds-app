"use server";

import { getSession } from "@/actions";

export const getStudents = async () => {
    const user = await getSession();
    const response = await fetch(`http://localhost:8080/frontend/admin/${user.userId}/student`);
    const result = await response.json();
    return result.students;
}

export const getStaff = async () => {
    const user = await getSession();
    const response = await fetch(`http://localhost:8080/frontend/admin/${user.userId}/staff`);
    const result = await response.json();
    return result.staff;
}

export const getAdmin = async () => {
    const response = await fetch("http://localhost:8080/backend/sysadmins");
    const result = await response.json();
    return result.sysadmins;
}

export const getStudents_Staff = async () => {
    const user = await getSession();
    const response = await fetch(`http://localhost:8080/frontend/students/${user.userId}`);
    const result = await response.json();
    if (result.message !== "success") {
        return [];
    }
    return result.students;
}

export const getRequests_Request = async () => {
    const user = await getSession();
    const response = await fetch(`http://localhost:8080/frontend/requests/${user.userId}`);
    const result = await response.json();
    if (result.message !== "success") {
        return [];
    }
    return result.requests;
}

export const createAdmin = async (adminName, userName, pwd) => {
    const url = "http://0.0.0.0:8080/backend/create/sysadmin";
    const data = {
        sysadmin_id: 0,
        username: userName,
        password: pwd,
        sysadmin_name: adminName,
        role: "sysadmin",
        employment_date: "string"
    };

    try {
        const response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        });

        if (response.ok) {
        const responseData = await response.json();
        return responseData;
        } else {
        console.error("Failed to create sysadmin:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

const createStaff = async (staffName, userName, pwd) => {
    const user = await getSession();
    const url = `http://0.0.0.0:8080/backend/create/staff/${user.userId}`;
    const data = {
      staff_id: 0,
      username: userName,
      password: pwd,
      staff_name: staffName,
      role: "staff",
      employment_date: "string",
      assigned_admin_id: user.userId
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        return responseData;
      } else {
        console.error("Failed to create staff:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error creating staff:", error);
    }
}

const createStudent = async (studentName, userName, pwd) => {
    const user = await getSession();
    const url = `http://0.0.0.0:8080/backend/create/student/${user.userId}`;
    const data = {
        std_id: 0,
        std_name: studentName,
        username: userName,
        password: pwd,
        department: "default",
        std_academic_year: "default",
        std_semester: "default",
        credits: 0,
        role: "student",
        assigned_admin_id: user.userId,
        assigned_staff_id: 0
    };

    try {
        const response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        });

        if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
        } else {
        console.error("Failed to create student:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error creating student:", error);
    }
}

export const createUser = async (usernameName, userName, pwd, role) => {
    if (role === "sysadmin") {
        const response = await createAdmin(usernameName, userName, pwd);
        return response;
    } else if (role === "student") {
        const response = await createStudent(usernameName, userName, pwd);
        return response;
    } else if (role === "staff") {
        const response = await createStaff(usernameName, userName, pwd);
        return response;
    }
}


export const updateStudentInfo = async (id, studentId, department, academicYear, semester) => {
    const url = `http://0.0.0.0:8080/frontend/student/${id}/std_id/${studentId}/department/${department}/academic_year/${academicYear}/semester/${semester}`;

    try {
        const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Accept": "application/json"
        }
        });

        if (response.ok) {
        const responseData = await response.json();
        return responseData;
        } else {
        console.error("Failed to update student:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error updating student:", error);
    }
}

export const getStudentFromId = async (stdId) => {
    const url = `http://0.0.0.0:8080/backend/students/${stdId}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error("Failed to get student info:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error fetching student info:", error);
    }
}

export const postTranscriptRequest = async (stdId, tableCourses) => {
    const student = await getStudentFromId(stdId);
    const user = await getSession();

    const transcriptData = {
        owner_id: String(student.student.std_id),
        sender_staff_id: String(user.userId),
        academic_year: student.student.std_academic_year,
        semester: student.student.std_semester,
        department: student.student.department,
        courses: tableCourses,
        gpa: "2.78",
        cgpa: "3.31",
        sem_ch: "44",
        cum_ch: "44",
        sem_cr: "44",
        cum_cr: "44",
        acd_term: student.student.std_semester,
        act_term: student.student.std_semester,
        status: "string"
    };
    console.log(transcriptData);
    const result = await fetch(`http://0.0.0.0:8080/images/transcript/${user.userName}`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transcriptData)
    })

    const response = await result.json();
    return response;
    
}