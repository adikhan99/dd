const backendUrl = process.env.NEXT_PUBLIC_REST_API_ENDPOINT;

export const INBOX_API_ENDPOINTS = {
  PARENT_WITH_MESSAGES: `/parents/parents-with-messages`,
  SEND_MESSAGE: `${backendUrl}/chat/send-message`,
  SEND_GREETING_TEMPLATE: `/chat/send-greeting-template`,
} 