"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  CONTACT_LIMITS,
  submitContactForm,
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
  type ContactFormField,
} from "@/lib/contact";

type ContactStatus = "idle" | "sending" | "sent";

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

/** Orden de los campos para enfocar el primero con error. */
const FIELD_ORDER: ContactFormField[] = ["name", "email", "subject", "message"];

const baseFieldClasses =
  "w-full border bg-ink px-4 text-base text-bone outline-none transition-colors duration-300 placeholder:text-smoke/60 focus:border-blood disabled:cursor-not-allowed disabled:opacity-60";

function fieldClasses(hasError: boolean): string {
  return cn(baseFieldClasses, hasError ? "border-blood" : "border-steel");
}

/**
 * Formulario de contacto de SYNCRO22.
 * Valida en el cliente y delega el envío en `submitContactForm` (lib/contact.ts),
 * que hoy es un stub listo para conectarse a un servicio real.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const isSending = status === "sending";

  function handleChange(field: ContactFormField) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      // Limpia el error del campo apenas se corrige.
      setErrors((prev) =>
        prev[field] ? { ...prev, [field]: undefined } : prev
      );
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSending) return;

    // Honeypot: los bots suelen completar campos ocultos.
    // Se finge éxito sin procesar nada.
    if (honeypot.trim().length > 0) {
      setStatus("sent");
      return;
    }

    const nextErrors = validateContactForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setFormError(null);
      // Foco en el primer campo con error (accesibilidad).
      const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
      if (firstInvalid) {
        formRef.current
          ?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)
          ?.focus();
      }
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus("sending");

    const result = await submitContactForm(values);

    if (result.ok) {
      setStatus("sent");
      return;
    }

    setStatus("idle");
    setFormError(result.message);
  }

  function handleReset() {
    setValues(EMPTY_FORM);
    setErrors({});
    setFormError(null);
    setHoneypot("");
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="clip-corner border border-blood/40 bg-ink p-8 sm:p-10 lg:p-12"
      >
        <span className="tech-label text-blood">MENSAJE ENVIADO</span>
        <h3 className="display-title mt-4 text-3xl text-bone sm:text-4xl">
          GRACIAS POR CONTACTARNOS
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-fog sm:text-base">
          Recibimos tu mensaje. Te vamos a responder a la brevedad.
        </p>
        <div className="mt-8">
          <Button variant="outline" onClick={handleReset}>
            ENVIAR OTRO MENSAJE
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="clip-corner border border-steel bg-ink/60 p-5 sm:p-8 lg:p-10"
    >
      <div className="flex items-center gap-4">
        <span className="tech-label text-blood">FORMULARIO DE CONTACTO</span>
        <span className="industrial-line flex-1" aria-hidden="true" />
      </div>

      {/* Honeypot anti-spam — oculto para personas, sin dependencias. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">No completar este campo</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {/* Nombre */}
        <div className="sm:col-span-2">
          <label htmlFor="contact-name" className="tech-label mb-2 block text-fog">
            NOMBRE
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            maxLength={CONTACT_LIMITS.name.max}
            value={values.name}
            onChange={handleChange("name")}
            disabled={isSending}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={cn(fieldClasses(Boolean(errors.name)), "h-12")}
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-2 font-mono text-xs text-blood">
              {errors.name}
            </p>
          ) : null}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="tech-label mb-2 block text-fog">
            EMAIL
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            maxLength={CONTACT_LIMITS.email.max}
            value={values.email}
            onChange={handleChange("email")}
            disabled={isSending}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={cn(fieldClasses(Boolean(errors.email)), "h-12")}
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-2 font-mono text-xs text-blood">
              {errors.email}
            </p>
          ) : null}
        </div>

        {/* Asunto */}
        <div>
          <label htmlFor="contact-subject" className="tech-label mb-2 block text-fog">
            ASUNTO
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            autoComplete="off"
            placeholder="Motivo del mensaje"
            maxLength={CONTACT_LIMITS.subject.max}
            value={values.subject}
            onChange={handleChange("subject")}
            disabled={isSending}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            className={cn(fieldClasses(Boolean(errors.subject)), "h-12")}
          />
          {errors.subject ? (
            <p id="contact-subject-error" className="mt-2 font-mono text-xs text-blood">
              {errors.subject}
            </p>
          ) : null}
        </div>

        {/* Mensaje */}
        <div className="sm:col-span-2">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <label htmlFor="contact-message" className="tech-label text-fog">
              MENSAJE
            </label>
            <span className="font-mono text-[0.625rem] text-smoke" aria-hidden="true">
              {values.message.length} / {CONTACT_LIMITS.message.max}
            </span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Escribí tu mensaje..."
            maxLength={CONTACT_LIMITS.message.max}
            value={values.message}
            onChange={handleChange("message")}
            disabled={isSending}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={cn(fieldClasses(Boolean(errors.message)), "min-h-36 resize-y py-3")}
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-2 font-mono text-xs text-blood">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      {/* Error global del envío (reservado para el servicio real) */}
      <div aria-live="polite">
        {formError ? (
          <p className="mt-6 font-mono text-xs text-blood">{formError}</p>
        ) : null}
      </div>

      <div className="mt-8">
        <Button
          type="submit"
          size="lg"
          disabled={isSending}
          aria-busy={isSending}
          className="w-full disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
        >
          {isSending ? "ENVIANDO..." : "ENVIAR MENSAJE"}
        </Button>
      </div>
    </form>
  );
}