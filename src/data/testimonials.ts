export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "1",
    quote: "Commendable work!",
    author: "SyncX PVT LTD",
    role: "Client",
    company: "",
    avatarUrl: "",
  }
];
