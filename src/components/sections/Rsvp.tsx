"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { emailjs as cfg, events } from "@/data/site";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "success" | "error";

const initialForm = { from_name: "", email: "", so_luong: "1", attend: "Có" };

export default function Rsvp() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.from_name.trim() || !form.email.trim()) {
      setStatus("error");
      setMessage("Vui lòng nhập họ tên và email của bạn.");
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!emailOk) {
      setStatus("error");
      setMessage("Địa chỉ email chưa hợp lệ, bạn kiểm tra lại giúp nhé.");
      return;
    }

    setStatus("sending");
    setMessage("");

    // Gửi song song tới các template EmailJS. Chỉ cần 1 template thành công là
    // coi như đã nhận được phản hồi — tránh báo lỗi giả khiến khách gửi trùng.
    const results = await Promise.allSettled(
      cfg.templateIds.map((tpl) =>
        emailjs.send(cfg.serviceId, tpl, { ...form }, { publicKey: cfg.publicKey }),
      ),
    );
    const anyOk = results.some((r) => r.status === "fulfilled");
    const failures = results.filter((r) => r.status === "rejected");
    if (failures.length) {
      console.error("RSVP: một số template gửi lỗi:", failures);
    }

    if (anyOk) {
      setStatus("success");
      setMessage("Cảm ơn bạn! Phản hồi của bạn đã được gửi thành công. ♥");
      setForm(initialForm);
    } else {
      setStatus("error");
      setMessage("Rất tiếc, có lỗi khi gửi phản hồi. Bạn vui lòng thử lại sau nhé.");
    }
  }

  return (
    <section id="rsvp" className="relative overflow-hidden bg-gradient-to-b from-forest-pale/60 to-mist py-24 sm:py-28">
      <div className="container-wed">
        <SectionTitle eyebrow="R.S.V.P" script="Bạn sẽ đến chứ?" title="Xác nhận tham dự" />

        <Reveal className="mx-auto mt-6 max-w-2xl text-center">
          <div className="grid gap-2 font-serif text-lg text-muted sm:grid-cols-2">
            {events.map((ev) => (
              <p key={ev.key}>
                <span className="font-semibold text-forest">{ev.label}:</span> {ev.time}h ·{" "}
                {ev.dateText}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl">
          <form onSubmit={handleSubmit} className="glass-card grid gap-5 p-8 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-sans text-xs uppercase tracking-widest text-muted">
                  Trân trọng kính mời (ông/bà)
                </span>
                <input
                  type="text"
                  value={form.from_name}
                  onChange={(e) => update("from_name", e.target.value)}
                  maxLength={60}
                  required
                  placeholder="Họ và tên của bạn"
                  className="w-full rounded-xl border border-gold/30 bg-white/70 px-4 py-3 font-serif text-lg outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
              </label>
              <label className="block">
                <span className="mb-1 block font-sans text-xs uppercase tracking-widest text-muted">
                  Email
                </span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  maxLength={80}
                  required
                  placeholder="email@cua-ban.com"
                  className="w-full rounded-xl border border-gold/30 bg-white/70 px-4 py-3 font-serif text-lg outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-sans text-xs uppercase tracking-widest text-muted">
                  Số lượng tham dự
                </span>
                <select
                  value={form.so_luong}
                  onChange={(e) => update("so_luong", e.target.value)}
                  className="w-full rounded-xl border border-gold/30 bg-white/70 px-4 py-3 font-serif text-lg outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} người
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block font-sans text-xs uppercase tracking-widest text-muted">
                  Bạn có tham dự?
                </span>
                <select
                  value={form.attend}
                  onChange={(e) => update("attend", e.target.value)}
                  className="w-full rounded-xl border border-gold/30 bg-white/70 px-4 py-3 font-serif text-lg outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                >
                  <option value="Có">Có, tôi sẽ đến ♥</option>
                  <option value="Không">Rất tiếc, tôi không thể đến</option>
                </select>
              </label>
            </div>

            <button type="submit" disabled={status === "sending"} className="btn-gold mt-2 justify-self-center disabled:opacity-60">
              {status === "sending" ? "Đang gửi..." : "Hoàn thành"}
            </button>

            {message && (
              <p
                className={`text-center font-serif text-lg ${
                  status === "success" ? "text-forest" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
