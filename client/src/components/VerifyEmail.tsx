import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router"
import { toast } from "react-toastify";

const VerifyEmail: React.FC = () => {

  const navigate = useNavigate();
  // extract token from url
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) {
        toast.error("Invalid verification link.");
        setStatus("error");
        return;
    }   

    const verify = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_APP_URL}/auth/verify-email?token=${token}`, { method: "GET"});
        const data = await res.json();
        
        if (res.ok && data.message !== "Error") {
          toast.success("Email verified successfully!");
          setStatus("success");
        } else {
          toast.error(data.message || "Verification failed");
          setStatus("error");
        }
      } catch (error) {
        toast.error("An error occured. Please try again.");
        setStatus("error");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#121212] to-[#1E1E1E] p-4">
      <div className="bg-[#1E1E1E] text-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <img src="/src/assets/logo.jpg" alt="Baddie Connect's Logo" className="mx-auto w-60 h-24 object-contain mb-4" />

        {status === "loading" && <h2 className="text-2xl font-bold text-gray-300">Verifying your account at BaddyConnect...</h2>}

        {status === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-400">Your email has been verified!</h2>
            <p className="text-gray-400 mt-2">Click below to log in.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Go to Login
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-2xl font-bold text-red-400">Verification Failed.</h2>
            <p className="text-gray-400 mt-2">
              Your verification link may have expired or is invalid.
            </p>
            {/* re-send api needs to be in nestjs side */}
            <button
              onClick={() => navigate("/resend-verification")}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-md w-full"
            >
              Resend Verification Email 
            </button>
            <button
              onClick={() => navigate("/login")}
              className="mt-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md w-full"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
     </div>
  );
};

export default VerifyEmail;