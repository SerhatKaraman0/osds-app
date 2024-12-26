import NavbarComponent from "@/app/components/app-navbar";
import StudentInvoiceTable from "@/app/components/student-invoices";
import { getTransactionsByUserId } from "@/app/api/actions";
import { getSession } from "@/actions";

const studentInvoicesPage = async () => {
  const user = await getSession();
  console.log(user);
  const sampleInvoice = await getTransactionsByUserId(user.userId);
  console.log(sampleInvoice);
  return (
    <>
      <NavbarComponent role={"student"} />
      <div className="container mx-auto p-4">
        <StudentInvoiceTable data={sampleInvoice} />
      </div>
    </>
  );
}

export default studentInvoicesPage;