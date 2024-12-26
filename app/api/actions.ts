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
    if (!result.success) {
        return [];
    }
    return result.students;
}

export const getRequests_Request = async () => {
    const user = await getSession();
    const response = await fetch(`http://localhost:8080/frontend/requests/${user.userId}`);
    const result = await response.json();
    if (!result.success) {
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

export const createStaff = async (staffName, userName, pwd) => {
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

export const createStudent = async (studentName, userName, pwd, assigned_staff_id) => {
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
        assigned_staff_id: assigned_staff_id
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
        console.error("Failed to create student:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error creating student:", error);
    }
}

export const createUser = async (usernameName, userName, pwd, role, assigned_staff_id) => {
    if (role === "sysadmin") {
        const response = await createAdmin(usernameName, userName, pwd);
        return response;
    } else if (role === "student") {
        const response = await createStudent(usernameName, userName, pwd, assigned_staff_id);
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
            return responseData.student;
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
        owner_id: student.std_id,
        sender_staff_id: user.userId,
        academic_year: student.std_academic_year,
        semester: student.std_semester,
        department: student.department,
        courses: tableCourses,
        gpa: "2.78",
        cgpa: "3.31",
        sem_ch: "44",
        cum_ch: "44",
        sem_cr: "44",
        cum_cr: "44",
        acd_term: student.std_semester,
        act_term: student.std_semester,
        status: "string"
    };
    const result = await fetch(`http://localhost:8080/images/transcript/owner/${stdId}/sender/${user.userId}`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transcriptData)
    })

    const response = await result.json();
    console.log(response);
    return response;
    
}

export const verifyStudent_Invoice = async (stdId, staffId, invoice) => {
    const response = await fetch(`http://localhost:8080/frontend/transactions/verify/student/${stdId}/staff/${staffId}/invoice/${invoice}`);
    const data = response.json();

    return data.success;
}

export const createRequest_Certificate = async (invoiceId) => {
    const user = await getSession();

    if (user.balance < 281) {
        return {
            "message": "Your Credits for action is not enough", 
            "success": false
        }
    } 

    const request = fetch(`http://localhost:8080/backend/create/request/${user.userId}/to/${user.assigned_staff_id}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          request_id: 0,
          request_sender_id: 0,
          request_receiver_id: 0,
          request_state: "string",
          request_type: "transcript",
          request_amount: 0
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        user.balance -= 281;
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

async function postReceipt(owner_id, sender_staff_id) {
    const url = `http://localhost:8080/images/receipt/owner/${owner_id}/sender/${sender_staff_id}`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: null, 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

async function createTransaction(sender, receiver, amount, receipt_url, reference_no) {
    const url = `http://localhost:8080/backend/create/transaction/sender/${sender}/receiver/${receiver}/amount/${amount}`;
    const requestData = {
        transaction_id: 0,
        sender_staff_id: sender,
        receiver_student_id: receiver,
        amount: amount,
        receipt_photo_url: receipt_url,
        reference_no: reference_no,
        transaction_state: "approved",
        timestamp: "string",
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}


export const  updateStudentCredits = async (studentId, assigned_staff_id, newCredits) => {
    const receipt = await postReceipt(studentId, assigned_staff_id);
    const photoUrl = receipt.invoice.firebase_url;
    const reference_no = receipt.invoice.reference_no;
    const transaction = await createTransaction(assigned_staff_id, studentId , 281, photoUrl, reference_no);
    const result = await fetch(`http://localhost:8080/backend/students/${studentId}/credits?new_credits=${newCredits}`, {
      method: 'PUT',
      headers: {
        'accept': 'application/json'
      }
    });

    const response = result.json()

    return response;
}

export const getTransactionsByUserId = async (studentId) => {
    const result = await fetch(`http://localhost:8080/frontend/transactions/${studentId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (result.ok){
        const response = await result.json();
        return response.transactions;
    }

}

export const getTranscriptsByUserId = async (studentId) => {
    const result = await fetch(`http://localhost:8080/frontend/transcripts/${studentId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (result.ok) {
        const response = await result.json();

        return response.certificates;
    }
    return [];
}