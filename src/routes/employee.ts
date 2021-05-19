import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "../controller/employee";
import express, { Request, Response, NextFunction } from "express";

const employeeRouter = express.Router();

employeeRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  getAllEmployees(req, res, next);
});
employeeRouter.get(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    getEmployeeById(req, res, next);
  }
);

employeeRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  createEmployee(req, res, next);
});
employeeRouter.put(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    updateEmployee(req, res, next);
  }
);

employeeRouter.delete(
  "/:id",
  (req: Request, res: Response, next: NextFunction) => {
    deleteEmployee(req, res, next);
  }
);

export default employeeRouter;
