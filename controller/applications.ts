import { type Request, type Response } from "express";
import { prisma } from "../lib/prisma";
import { z } from "zod";

const createSchema = z.object({
  company_name: z.string().min(2, { message: "company_name must be at least 2 characters" }),
  job_title: z.string().min(1, { message: "job_title is required" }),
  job_type: z.enum(["INTERNSHIP", "FULL_TIME", "PART_TIME"]),
  status: z.enum(["APPLIED", "INTERVIEWING", "OFFER", "REJECTED"]),
  applied_date: z.coerce.date(),
  notes: z.string().optional(),
});

const updateSchema = z.object({
  company_name: z.string().min(1).optional(),
  job_title: z.string().min(1).optional(),
  job_type: z.enum(["INTERNSHIP", "FULL_TIME", "PART_TIME"]).optional(),
  status: z.enum(["APPLIED", "INTERVIEWING", "OFFER", "REJECTED"]).optional(),
  applied_date: z.coerce.date().optional(),
  notes: z.string().optional(),
});

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : Array.isArray(value) && typeof value[0] === "string" ? value[0] : undefined;
}

function parsePositiveInt(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isInteger(parsed) && parsed > 0) return parsed;
  }
  return undefined;
}

function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

const PAGINATION_DEFAULTS = { page: 1, limit: 10 };
const MAX_LIMIT = 100;

export async function getApplications(req: Request, res: Response) {
  const status = asString(req.query.status);
  const search = asString(req.query.search);
  const page = parsePositiveInt(req.query.page);
  const limit = parsePositiveInt(req.query.limit);

  const whereParameters: Record<string, any> = {};

  if (status) {
    whereParameters.status = status;
  }

  if (search && search.trim().length > 0) {
    whereParameters.OR = [
      { company_name: { contains: search, mode: "insensitive" } },
      { job_title: { contains: search, mode: "insensitive" } },
    ];
  }

  const resolvedPage = page ?? PAGINATION_DEFAULTS.page;
  const resolvedLimit = Math.min(limit ?? PAGINATION_DEFAULTS.limit, MAX_LIMIT);

  const [applications, total] = await Promise.all([
    prisma.jobApplication.findMany({
      where: whereParameters,
      orderBy: { created_at: "desc" },
      skip: (resolvedPage - 1) * resolvedLimit,
      take: resolvedLimit,
    }),
    prisma.jobApplication.count({ where: whereParameters }),
  ]);

  res.json({
    applications,
    total,
    page: resolvedPage,
    limit: resolvedLimit,
  });
}

export async function getApplication(req: Request, res: Response) {
  const id = asString(req.params.id);

  if (!id || !isValidUUID(id)) {
    res.status(400).json({ error: "Invalid application id" });
    return;
  }

  const application = await prisma.jobApplication.findUnique({
    where: { id },
  });

  if (!application) {
    res.status(404).json({ error: "Application not found" });
    return;
  }

  res.json(application);
}

export async function createApplication(req: Request, res: Response) {
  const parsed = createSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    return;
  }

  const application = await prisma.jobApplication.create({
    data: parsed.data,
  });

  res.status(201).json(application);
}

export async function updateApplication(req: Request, res: Response) {
  const id = asString(req.params.id);

  if (!id || !isValidUUID(id)) {
    res.status(400).json({ error: "Invalid application id" });
    return;
  }

  const parsed = updateSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    return;
  }

  const existing = await prisma.jobApplication.findUnique({
    where: { id },
  });

  if (!existing) {
    res.status(404).json({ error: "Application not found" });
    return;
  }

  const application = await prisma.jobApplication.update({
    where: { id },
    data: parsed.data,
  });

  res.json(application);
}

export async function deleteApplication(req: Request, res: Response) {
  const id = asString(req.params.id);

  if (!id || !isValidUUID(id)) {
    res.status(400).json({ error: "Invalid application id" });
    return;
  }

  const existing = await prisma.jobApplication.findUnique({
    where: { id },
  });

  if (!existing) {
    res.status(404).json({ error: "Application not found" });
    return;
  }

  await prisma.jobApplication.delete({
    where: { id },
  });

  res.status(204).end();
}
