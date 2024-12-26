import { z } from "zod";

export const addDepartmentSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    onDutyDoctor: z.string({ required_error: "On Duty Doctor is required" }),
    unavailableDoctor: z.string({ required_error: "Unavailable Doctor is required" }),

});

export type AddDepartmentSchema = z.infer<typeof addDepartmentSchema>;

export const addDoctorSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    mobile: z.string({ required_error: "Mobile is required" }),
  });

export type AddDoctorSchema = z.infer<typeof addDoctorSchema>;

export const addEmergencySchema = z.object({
    doctor: z.string({ required_error: "Doctor is required" }),
    status: z.string({ required_error: "Status is required" }),
    designation: z.string({ required_error: "Designation is required" }),
  });

export type AddEmergencySchema = z.infer<typeof addEmergencySchema>;