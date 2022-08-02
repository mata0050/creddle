

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  github: string;
  location: string;
  phone: string;
};
  

export type UserProfileType =
  | (User & {
      education: Education[];
      skills: Skill[];
      projects: Project[];
      employment: Employment[];
    })
  | undefined;

export type Education = {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate: Date;
  userId: string | null;
};

export type Skill = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  name: string;
  skill: string;
};

export type Skills = {
  frameworks: Skill[];
  system: Skill[];
  languages: Skill[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  link: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Employment = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  company: string;
  position: string;
  startDate: Date;
  endDate: Date;
  description: string;
  userId: string | null;
};

