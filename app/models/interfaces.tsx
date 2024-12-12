export type StudentAccountDetails = {
  id: number;
  std_id: number;
  std_name: string;
  department: string;
  std_academic_year: string;
  std_semester: string;
  credits: number;
  register_date: string;
};

export type StaffAccountDetails = {
  id: number;
  staff_id: number;
  staff_name: string;
  role: string;
  employment_date: string;
};

export type SysadminAccountDetails = {
  id: number;
  sysadmin_id: number;
  sysadmin_name: string;
  role: string;
  employment_date: string;
};

export type RequestDetails = {
  id: number;
  request_id: number;
  request_sender_id: number;
  request_type: string;
  request_state: string;
  request_date: string;
};
