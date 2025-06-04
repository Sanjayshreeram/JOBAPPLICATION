'use client'
import React from "react";
import { format } from "date-fns";
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Clock, 
  DollarSign, 
  CalendarDays,
  Globe,
  Pin,
  Search,
  ArrowDownUp,
  ArrowUpDown,
  CircleX,
  ChevronDown,
  ChevronsDown,
  ChevronRight,
  ChevronsRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {  jobTypes, locations, locationIcons, companyOptions } from "@/app/hooks/UseFormHook";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UseFormHook } from "../hooks/UseFormHook";
import { useJobCardToggle } from "../context/JobCardContextType";
import toast from "react-hot-toast";

export function JobForm() {
    const {closeCard}=useJobCardToggle();
  const { formData, handleInputChange, handleSubmit, handleSaveDraft } = UseFormHook();
  const [openCompanySelect, setOpenCompanySelect] = React.useState(false);

  const onPublish = () => {
    if (!formData.jobTitle || !formData.companyName || !formData.jobType || !formData.location || formData.salaryMin==="" || formData.salaryMax==="" || !formData.applicationDeadline || !formData.jobDescription) {
     toast.error("Please fill in all required fields.");
      return;
    }
    handleSubmit();
    toast.success("Job posted successfully!");
    closeCard();

    
  };

  const onSaveDraft = () => {
    handleSaveDraft();
    closeCard();
    
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl mx-auto">
      <div  className="flex justify-between">
         <h1 className="text-2xl font-bold text-center mb-6">Create Job Opening</h1>
         <CircleX onClick={()=>closeCard()}/>

      </div>
     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label htmlFor="jobTitle" className="text-sm font-medium">
            Job Title
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-2.5 text-gray-500">
              <Briefcase className="w-5 h-5" />
            </span>
            <Input
              id="jobTitle"
              placeholder="Full Stack Developer"
              className="pl-9"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="companyName" className="text-sm font-medium">
            Company Name
          </label>
          <div className="relative">
            <Popover open={openCompanySelect} onOpenChange={setOpenCompanySelect}>
              <PopoverTrigger asChild>
                <Button
  variant="outline"
  role="combobox"
  aria-expanded={openCompanySelect}
  className="w-full justify-between pl-9 text-left"
>
  <span className="absolute left-2.5 top-2.5 text-gray-500">
    <Building className="w-5 h-5" />
  </span>
  {formData.companyName || "Select Company"}
</Button>

              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 z-50">
                <Command>
                  <CommandInput placeholder="Search company..." className="h-9" />
                  <CommandEmpty>No company found.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-y-auto">
                    {companyOptions.map((company) => (
                      <CommandItem
                        key={company.value}
                        value={company.value}
                        onSelect={(currentValue) => {
                          handleInputChange("companyName", currentValue);
                          setOpenCompanySelect(false);
                        }}
                        className="flex items-center gap-2 py-2"
                      >
                       
                        <span>{company.label}</span>
                      </CommandItem>
                    ))}
                    <CommandItem
                      value="custom"
                      onSelect={() => {
                        setOpenCompanySelect(false);
                      }}
                      className="text-blue-500 font-medium"
                    >
                      + Add custom company
                    </CommandItem>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location
          </label>
          <div className="relative">
            <Select
              value={formData.location}
              onValueChange={(value) => handleInputChange("location", value)}
            >
              <SelectTrigger className="w-full pl-9">
                <span className="absolute left-2.5 top-2.5 text-gray-500">
                  <MapPin className="w-5 h-5" />
                </span>
                <SelectValue placeholder="Choose Preferred Location" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {locations.map((location) => (
                  <SelectItem 
                    key={location} 
                    value={location} 
                    
                  >
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="jobType" className="text-sm font-medium">
            Job Type
          </label>
          <div className="relative">
            <Select
              value={formData.jobType}
              onValueChange={(value) => handleInputChange("jobType", value)}
            >
              <SelectTrigger className="w-full pl-9">
                <span className="absolute left-2.5 top-2.5 text-gray-500">
                  <Briefcase className="w-5 h-5" />
                </span>
                <SelectValue placeholder="Select Job Type" />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                {jobTypes.map((type) => (
                  <SelectItem 
                    key={type.value} 
                    value={type.value}
                   
                  >
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Salary Range</label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-2.5 text-gray-500">
                <ArrowUpDown className="w-5 h-5" />
              </span>
              <Input
                placeholder="Min"
                className="pl-9"
                value={formData.salaryMin}
                onChange={(e) => handleInputChange("salaryMin", e.target.value)}
              />
            </div>
            <span>to</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-2.5 text-gray-500">
                <ArrowUpDown className="w-5 h-5" />
              </span>
              <Input
                placeholder="Max"
                className="pl-9"
                value={formData.salaryMax}
                onChange={(e) => handleInputChange("salaryMax", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Application Deadline</label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full pl-9 justify-start text-left font-normal",
                    !formData.applicationDeadline && "text-muted-foreground"
                  )}
                >
                  <span className="absolute left-2.5 top-2.5 text-gray-500">
                    <CalendarDays className="w-5 h-5" />
                  </span>
                  {formData.applicationDeadline ? (
                    format(formData.applicationDeadline, "PPP")
                  ) : (
                    <span>Select a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <CalendarComponent
                  mode="single"
                  selected={formData.applicationDeadline}
                  onSelect={(date) => handleInputChange("applicationDeadline", date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <label htmlFor="jobDescription" className="text-sm font-medium">
          Job Description
        </label>
        <Textarea
          id="jobDescription"
          placeholder="Please share a description to let the candidate know more about the job role"
          className="min-h-[150px]"
          value={formData.jobDescription}
          onChange={(e) => handleInputChange("jobDescription", e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <Button
          variant="outline"
          className="px-6 flex flex-row"
          onClick={onSaveDraft}
        >
        
          <p>
       Save Draft
          </p>
         <ChevronsDown/>


        </Button>
        <Button
          className="px-6 bg-blue-500 hover:bg-blue-600 text-white"
          onClick={onPublish}
        >
          <p>
             Publish
          </p>
          <ChevronsRight/>
         
        </Button>
      </div>
    </div>
  );
}
