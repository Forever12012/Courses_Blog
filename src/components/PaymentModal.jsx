import { X, CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";

export default function PaymentModal({ amount, onClose, onPaymentComplete }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [otp, setOtp] = useState("");

  const handleProceed = () => {
    if (step === 1 && paymentMethod) {
      setStep(2);
    } else if (step === 2 && otp.length === 6) {
      onPaymentComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Secure Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {step === 1 ? (
          <div>
            <p className="text-gray-600 mb-4">Amount to pay: ₹{amount}</p>

            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`w-full p-4 rounded-lg border ${
                  paymentMethod === "card"
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200"
                } flex items-center`}
              >
                <CreditCard className="h-6 w-6 mr-3" />
                <span>Credit/Debit Card</span>
              </button>

              <button
                onClick={() => setPaymentMethod("upi")}
                className={`w-full p-4 rounded-lg border ${
                  paymentMethod === "upi"
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200"
                } flex items-center`}
              >
                <Smartphone className="h-6 w-6 mr-3" />
                <span>UPI Payment</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              Enter the OTP sent to your device
            </p>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-center text-2xl tracking-widest"
              placeholder="******"
            />
          </div>
        )}

        <button
          onClick={handleProceed}
          disabled={step === 1 ? !paymentMethod : otp.length !== 6}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 disabled:bg-gray-300"
        >
          {step === 1 ? "Proceed to Verification" : "Complete Payment"}
        </button>
      </div>
    </div>
  );
}
