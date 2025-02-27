import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router"
import { toast } from "react-toastify";

const VerifyEmail: React.FC = () => {

  const navigate = useNavigate();
  // extract token from url
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
        toast.error("Invalid verification link.");
        navigate("/login");
        return;
    }   

    const verify = async () => {
      try {
        const res = await fetch(`http://localhost:3000/auth/verify-email?token=${token}`, { method: "GET"});
        const data = await res.json();
        
        if (res.ok) {
          toast.success(data.message + "Redirecting to login..." || "Email verified successfully. Redirecting to login...");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          toast.error(data.message || "Verification failed");
        }
      } catch (error) {
        toast.error("An error occured. Please try again.");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">Verifying account...</h2>
      </div>
     </div>
  );
};

export default VerifyEmail;