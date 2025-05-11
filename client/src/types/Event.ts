export interface Event {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  maxPlayers: number;
  createdAt: string;
  courtCount: number;
  price: string;
  isPublic: boolean;
  description: string;
  organizer: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}