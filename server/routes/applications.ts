import { Router } from "express";
import {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../controller/applications";

const applicationrouter = Router();

applicationrouter.get("/", getApplications);
applicationrouter.get("/:id", getApplication);
applicationrouter.post("/", createApplication);
applicationrouter.patch("/:id", updateApplication);
applicationrouter.delete("/:id", deleteApplication);

export default applicationrouter;
