import React, { useState } from "react";
import emailjs from "@emailjs/browser";

interface MessageModalProps {
  onClose: () => void;
}

export function MessageModal({ onClose }: MessageModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    time: Date.now().toLocaleString(),
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    emailjs
      .send(
        "service_i9wi1nn", // e.g., "service_xxx"
        "template_oxbnjxp", // e.g., "template_yyy"
        formData,
        "nQEmZbxPMkRVFPfAz" // e.g., "user_zzz"
      )
      .then(
        () => {
          setLoading(false);
          setFeedback("Message sent successfully! 🎉");
          setFormData({ user_name: "", user_email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          setFeedback("Oops! Something went wrong. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#12101f] border border-pink-500 rounded-lg p-6 w-96 text-cyan-400 shadow-[0_0_15px_#00fff7]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="text-neon-pink text-2xl font-bold float-right"
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="text-2xl mb-4 font-bold neon-glow">Send Me a Message</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            className="w-full bg-[#1a1a2e] border border-cyan-500 rounded-md p-2 text-white neon-glow"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            className="w-full bg-[#1a1a2e] border border-cyan-500 rounded-md p-2 text-white neon-glow"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            className="w-full bg-[#1a1a2e] border border-cyan-500 rounded-md p-2 text-white neon-glow resize-none"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neon-cyan hover:bg-cyan-500 text-black font-semibold py-2 rounded-md transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        {feedback && <p className="mt-4 text-center">{feedback}</p>}
      </div>
    </div>
  );
}
