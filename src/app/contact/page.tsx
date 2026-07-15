import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact | Wanderly" };

export default function ContactPage() {
  return (
    <div className="container-app py-14">
      <h1 className="text-3xl font-extrabold mb-2">Get in Touch</h1>
      <p className="text-gray-500 mb-10 max-w-lg">Questions about a booking, a listed tour, or becoming a guide partner? We usually reply within one business day.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
        <div className="space-y-5">
          <div className="card-base p-5 flex items-start gap-3">
            <Mail className="text-[var(--color-primary)] mt-0.5" size={18} />
            <div>
              <div className="font-semibold text-sm">Email</div>
              <div className="text-sm text-gray-500">support@wanderly.com</div>
            </div>
          </div>
          <div className="card-base p-5 flex items-start gap-3">
            <Phone className="text-[var(--color-primary)] mt-0.5" size={18} />
            <div>
              <div className="font-semibold text-sm">Phone</div>
              <div className="text-sm text-gray-500">+1 (555) 019-2837</div>
            </div>
          </div>
          <div className="card-base p-5 flex items-start gap-3">
            <MapPin className="text-[var(--color-primary)] mt-0.5" size={18} />
            <div>
              <div className="font-semibold text-sm">Office</div>
              <div className="text-sm text-gray-500">48 Harbor Street, Lisbon, Portugal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
