export interface CreateEventForm {
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
  maxPlayers: number;
  courtCount: number;
  price: number;
  isPublic: boolean;
  description?: string;
}