/**
 * Lógica del formulario de contacto.
 *
 * La validación se implementa como funciones puras para poder
 * reutilizarla del lado del servidor cuando se conecte un servicio
 * de envío real (API route, proveedor de email, etc.).
 */

/** Límites de longitud del formulario — evita textos absurdamente largos. */
export const CONTACT_LIMITS = {
  name: { max: 100 },
  email: { max: 254 },
  subject: { max: 150 },
  message: { max: 2000 },
} as const;

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormField = keyof ContactFormData;

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; message: string };

/** Patrón de email pragmático: algo@algo.algo sin espacios. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Recorta espacios y colapsa whitespace interno. */
function normalize(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

/**
 * Valida los datos del formulario.
 * Devuelve un objeto con un mensaje por campo inválido (objeto vacío = válido).
 */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  const name = normalize(data.name);
  const email = data.email.trim();
  const subject = normalize(data.subject);
  const message = data.message.trim();

  if (name.length === 0) {
    errors.name = "Este campo es obligatorio.";
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = `El nombre no puede superar los ${CONTACT_LIMITS.name.max} caracteres.`;
  }

  if (email.length === 0) {
    errors.email = "Este campo es obligatorio.";
  } else if (email.length > CONTACT_LIMITS.email.max) {
    errors.email = `El email no puede superar los ${CONTACT_LIMITS.email.max} caracteres.`;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Ingresá un email válido.";
  }

  if (subject.length === 0) {
    errors.subject = "Este campo es obligatorio.";
  } else if (subject.length > CONTACT_LIMITS.subject.max) {
    errors.subject = `El asunto no puede superar los ${CONTACT_LIMITS.subject.max} caracteres.`;
  }

  if (message.length === 0) {
    errors.message = "Este campo es obligatorio.";
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `El mensaje no puede superar los ${CONTACT_LIMITS.message.max} caracteres.`;
  }

  return errors;
}

/**
 * Envía el formulario de contacto.
 *
 * IMPORTANTE: todavía NO existe un servicio real de envío (sin backend,
 * sin servicios externos, sin dependencias nuevas). Esta función simula
 * la latencia de red y responde OK para poder probar el flujo completo.
 *
 * Para conectar el servicio real, reemplazar el cuerpo de esta función
 * (p. ej. un `fetch` a una API route `/api/contacto`) manteniendo la firma:
 * la UI no necesita ningún cambio.
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmitResult> {
  const errors = validateContactForm(data);
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Revisá los campos marcados." };
  }

  // Acá se enviaría el payload normalizado al servicio de email real.
  // Payload esperado: { name, email, subject, message } con valores recortados.

  // Simulación temporal del envío (stub).
  await new Promise((resolve) => setTimeout(resolve, 900));

  return { ok: true };
}