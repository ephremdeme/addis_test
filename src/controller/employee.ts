import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { response_status_codes } from "../middleware/errorHandler";
import EmployeeModel from "../models/employee/schema";
import { ErrorResponse } from "../util/errorResponse";

export const createEmployee = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const employee = await EmployeeModel.create(req.body);
    res
      .status(response_status_codes.success)
      .json({ success: true, data: employee });
  }
);
export const updateEmployee = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const employee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnOriginal: false,
      }
    );
    res
      .status(response_status_codes.success)
      .json({ success: true, data: employee });
  }
);

export const getAllEmployees = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allEmployees = await EmployeeModel.find(req.query);
    res
      .status(response_status_codes.success)
      .json({ success: true, count: allEmployees.length, data: allEmployees });
  }
);

export const getEmployeeById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const employee = await EmployeeModel.findById(req.params.id);
    if (!employee) {
      next(
        new ErrorResponse(
          "Employee Not Found!",
          response_status_codes.not_found
        )
      );
    } else {
      res
        .status(response_status_codes.success)
        .json({ success: true, data: employee });
    }
  }
);

export const deleteEmployee = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const employee = await EmployeeModel.findByIdAndDelete(req.params.id);

    if (!employee) {
      next(
        new ErrorResponse(
          "Failed Finding an Employee",
          response_status_codes.not_found
        )
      );
    } else {
      res.status(response_status_codes.success).json({
        success: true,
        data: null,
        message: "Successfully deleted a Employee!",
      });
    }
  }
);
