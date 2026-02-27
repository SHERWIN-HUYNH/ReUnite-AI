export interface MissingPost{
    id_: string,
    name: string,
    description?: string,
    missing_since: string,
    gender: string,
    dob?: string,
    relationship:string,
    address?:string,
    contact_infor:string,
    images: { 
    _id: string;
    created_at: string;
    is_avatar: boolean;
    url: string;
  }[];
}

export interface Account {
  id: number;
  ownerName: string;
  postsCreated: number;
  postsFound: number;
  createdDate: string;
  lastLogin: string;
  status: 'Active' | 'Disabled';
}

export interface AppointmentData {
  year: number;
  month: number;
  price: number;
}