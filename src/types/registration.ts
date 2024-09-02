export enum RegistrationStatus {
    APPROVED = "APPROVED",
    REVIEW = "REVIEW",
    REPROVED = "REPROVED",
  }
  
  export interface Registration {
    id: string;
    admissionDate: string;
    email: string;
    employeeName: string;
    status: RegistrationStatus;
    cpf: string;
  }
  
  export const registrationStatusStyles: {
    [key in RegistrationStatus]: { background: string; title: string };
  } = {
    REVIEW: {
      background: "#fdf8e9",
      title: "#efc24d",
    },
    APPROVED: {
      background: "#eeeefd",
      title: "#4242df",
    },
    REPROVED: {
      background: "#fbedf6",
      title: "#ce2893",
    },
  };
  
  export interface RegistrationFilter {
    cpf?: string;
  }