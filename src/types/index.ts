export interface Conference {
  id: number;
  title: string;
  date: string;
  description: string;
  location: string;
  spaces: number;
  price: number;
  category: string;
  image: string;
}

export interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
  conferenceId: string;
}
