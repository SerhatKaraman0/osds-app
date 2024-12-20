import NavbarComponent from "@/app/components/app-navbar";
import { getSession } from "@/actions";


const SysadminCertificatePage = async () => {
  return (
    <>
      <NavbarComponent role={""} />
      <h1>Certificate</h1>
    </>
  );
}

export default SysadminCertificatePage; 