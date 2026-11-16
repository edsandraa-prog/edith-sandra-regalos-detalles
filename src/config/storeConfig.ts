/**
 * Store Configuration - Edith Sandra – Regalos & Detalles
 * All business details, contact information, and payment parameters
 * are centralized here for easy future updates.
 */

export const STORE_CONFIG = {
  brandName: "Edith Sandra – Regalos & Detalles",
  shortName: "Edith Sandra",
  tagline: "Regalos que convierten momentos en recuerdos",
  subtagline: "Encuentra el detalle perfecto para sorprender a quienes más quieres.",
  
  // WhatsApp config: Country code Peru +51 + 998509848
  whatsappNumber: "51998509848",
  whatsappDisplay: "998 509 848",
  whatsappInternationalDisplay: "+51 998 509 848",
  
  // Official Contact Information
  email: "edsandraa@iestpacora.edu.pe",
  phone: "998 509 848",
  address: "Jr. Puno s/n (Frente a la Plaza de Armas), Ácora, Puno, Perú",
  city: "Ácora",
  region: "Puno",
  country: "Perú",
  
  // Business Hours
  businessHours: {
    weekdays: "Lunes a Sábado: 8:30 AM - 7:30 PM",
    sunday: "Domingos: 9:00 AM - 2:00 PM (Previa coordinación)",
    deliveryHours: "Horario de entregas: 9:00 AM - 6:00 PM",
  },

  // Social Media Links (Configurable placeholders)
  socialLinks: {
    instagram: "https://instagram.com/edithsandra_regalos",
    facebook: "https://facebook.com/edithsandra.regalos",
    tiktok: "https://tiktok.com/@edithsandra_detalles",
    whatsapp: "https://wa.me/51998509848",
  },

  // E-Commerce Shipping & Delivery Rates in Soles (PEN)
  shipping: {
    standardDeliveryFee: 10.00,
    freeDeliveryThreshold: 150.00,
    pickupFee: 0.00,
    coveredDistricts: [
      "Ácora Centro",
      "Comunidades aledañas de Ácora",
      "Ilave",
      "Chucuito",
      "Puno Ciudad",
    ],
  },

  // Payment information for direct wire/mobile payments
  paymentDetails: {
    yape: {
      number: "998509848",
      holder: "Edith Sandra",
      qrCodeNote: "Escanea desde tu app Yape o transfiere al número",
    },
    plin: {
      number: "998509848",
      holder: "Edith Sandra",
      qrCodeNote: "Transfiere vía Plin a nuestro número oficial",
    },
    bcp: {
      accountNumber: "495-98347102-0-45",
      cci: "002-495-0098347102045-81",
      holder: "Edith Sandra Ramos",
    },
    interbank: {
      accountNumber: "898-3142095812",
      cci: "003-898-013142095812-33",
      holder: "Edith Sandra Ramos",
    },
  },

  // Active Promo Coupons
  coupons: [
    { code: "EDITH10", type: "percentage", value: 10, description: "10% de descuento en tu compra" },
    { code: "BIENVENIDA", type: "fixed", value: 15, description: "S/ 15 de descuento por ser tu primera compra" },
    { code: "SANVALENTIN", type: "percentage", value: 15, description: "15% especial en detalles de amor" },
  ],
};

/**
 * Generate formatted WhatsApp link with personalized message
 */
export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`;
}

/**
 * Generate single product quick order WhatsApp message
 */
export function buildProductWhatsAppMessage(
  productName: string,
  quantity: number,
  price: number,
  personalization?: {
    recipientName?: string;
    specialMessage?: string;
    deliveryDate?: string;
  }
): string {
  let msg = `Hola, quiero realizar un pedido:\n`;
  msg += `Producto: ${productName}\n`;
  msg += `Cantidad: ${quantity}\n`;
  msg += `Precio: S/ ${(price * quantity).toFixed(2)}\n`;
  if (personalization?.recipientName) {
    msg += `Personalización: Para ${personalization.recipientName}\n`;
  }
  if (personalization?.specialMessage) {
    msg += `Mensaje de dedicatoria: "${personalization.specialMessage}"\n`;
  }
  if (personalization?.deliveryDate) {
    msg += `Fecha de entrega: ${personalization.deliveryDate}\n`;
  }
  msg += `¿Podrían ayudarme con mi pedido?`;
  return msg;
}
