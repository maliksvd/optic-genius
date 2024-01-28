export interface ProfileData {
  age: number | null;
  borough: string | null;
  city: string | null;
  first_name: string | null;
  id: string;
  last_name: string | null;
  phone: string | null;
  user_type: string | null;
}

let profileData: ProfileData | undefined;
