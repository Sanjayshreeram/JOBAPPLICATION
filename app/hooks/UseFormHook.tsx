'use client'
import React from 'react'


import { useState } from "react";
import { 
  Briefcase, 
  Clock, 
  Globe, 
  FileText, 
  Star, 
  Apple, 
  Facebook, 
  Github, 
  Linkedin, 
  Twitter, 
  Youtube, 
  Pin, 

  Utensils,
  UtensilsCrossed
} from "lucide-react";
import { prisma } from '@/lib/prisma';

export type JobFormData = {
  jobTitle: string;
  companyName: string;
  companyLogo?: string ;
  location: string;
  jobType: string;
  salaryMin: string;
  salaryMax: string;
  applicationDeadline: Date | undefined;
  jobDescription: string;
};

export type JobTypeOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
};
export type CompanyOption = {
  value: string;
  label: string;
  logoUrl: string;
};

export const jobTypes: JobTypeOption[] = [
  { value: "Full Time", label: "Full Time", icon: <Briefcase size={16} /> },
  { value: "Part Time", label: "Part Time", icon: <Clock size={16} /> },
  { value: "Internship", label: "Internship", icon: <Star size={16} /> },
  { value: "Contract", label: "Contract", icon: <FileText size={16} /> },
  { value: "Freelance", label: "Freelance", icon: <Globe size={16} /> },
];

export const companyOptions: CompanyOption[] = [
  {
    value: "Amazon",
    label: "Amazon",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    value: "Microsoft",
    label: "Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    value: "Apple",
    label: "Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    value: "Facebook",
    label: "Facebook",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  },
  {
  value: "Twitter",
  label: "Twitter",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
},
  {
  value: "LinkedIn",
  label: "LinkedIn",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
},
  {
    value: "GitHub",
    label: "GitHub",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  },
  {
    value: "YouTube",
    label: "YouTube",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png",
  },
  {
  value: "Swiggy",
  label: "Swiggy",
  logoUrl: "https://companieslogo.com/img/orig/SWIGGY.NS_BIG-5a63e7fa.png?t=1648996824",
},
{
  value: "Zomato",
  label: "Zomato",
  logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Zomato_logo_2022.svg",
},
];


export const locations = ["Remote", "Bangalore", "Chennai", "Hyderabad", "Delhi", "Mumbai"];

export const locationIcons = {
  "Remote": <Globe size={16} />,
  "Bangalore": <Pin size={16} />,
  "Chennai": <Pin size={16} />,
  "Hyderabad": <Pin size={16} />,
  "Delhi": <Pin size={16} />,
  "Mumbai": <Pin size={16} />
};

export function UseFormHook() {
  const [formData, setFormData] = useState<JobFormData>({
    jobTitle: "",
    companyName: "",
    companyLogo: undefined,
    location: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    applicationDeadline: undefined,
    jobDescription: "",
  });

  const handleInputChange = (field: keyof JobFormData, value: any) => {
    if (field === 'companyName') {
      
      const company = companyOptions.find(c => c.value === value);
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        companyLogo: company?.logoUrl || undefined,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

const handleSubmit = async () => {
  try {
    const res = await fetch('/api/SubmitJob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await res.json()

    if (result.success) {
      console.log('Job posting submitted:', result.data)
    } else {
      console.error(result.error)
    }

    return result
  } catch (error) {
    console.error('Submit error:', error)
    return { success: false, error: 'Network or server error' }
  }
}

  

  const handleSaveDraft = () => {
    console.log("Job posting saved as draft:", formData);
    return formData;
  };

  return {
    formData,
    
    handleInputChange,
    handleSubmit,
    handleSaveDraft,
  };
}
