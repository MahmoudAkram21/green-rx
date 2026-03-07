import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads directory if it doesn't exist
// const uploadsDir = path.join(__dirname, "../../uploads");
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  // Accept Excel and CSV files
  const allowedMimes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
    "application/csv",
  ];

  if (
    allowedMimes.includes(file.mimetype) ||
    file.originalname.match(/\.(xlsx|xls|csv)$/)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only Excel (.xlsx, .xls) and CSV (.csv) files are allowed"));
  }
};

// Create multer upload instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
});

// Memory storage for logo (saved to DB)
const memoryStorage = multer.memoryStorage();
const logoFileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowed = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];
  if (file.mimetype && allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (PNG, JPEG, GIF, WebP, SVG) are allowed"));
  }
};
export const uploadLogo = multer({
  storage: memoryStorage,
  fileFilter: logoFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// ── Medicine image upload (patient self-report) ────────────────────────────────
const medicineImagesDir = path.join(
  __dirname,
  "../../uploads/patient-medicines",
);
if (!fs.existsSync(medicineImagesDir)) {
  fs.mkdirSync(medicineImagesDir, { recursive: true });
}

const medicineImageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, medicineImagesDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `medicine-${uniqueSuffix}${ext}`);
  },
});

const medicineImageFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowed = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
  ];
  if (
    allowed.includes(file.mimetype) ||
    file.originalname.match(/\.(png|jpg|jpeg|webp|gif)$/i)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (PNG, JPG, JPEG, WebP, GIF) are allowed"));
  }
};

export const uploadMedicineImage = multer({
  storage: medicineImageStorage,
  fileFilter: medicineImageFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ── Doctor license image upload (registration) ─────────────────────────────
const doctorLicensesDir = path.join(__dirname, "../../uploads/doctor-licenses");
if (!fs.existsSync(doctorLicensesDir)) {
  fs.mkdirSync(doctorLicensesDir, { recursive: true });
}

const doctorLicenseStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, doctorLicensesDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `license-${uniqueSuffix}${ext}`);
  },
});

const doctorLicenseFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowed = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
  ];
  if (
    allowed.includes(file.mimetype) ||
    file.originalname.match(/\.(png|jpg|jpeg|webp|gif)$/i)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files (PNG, JPG, JPEG, WebP, GIF) are allowed for license upload",
      ),
    );
  }
};

export const uploadDoctorLicense = multer({
  storage: doctorLicenseStorage,
  fileFilter: doctorLicenseFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// ── Pharmacist license folder (used by moveLicenseToRoleFolder) ─────────────
const pharmacistLicensesDir = path.join(__dirname, "../../uploads/pharmacist-licenses");
if (!fs.existsSync(pharmacistLicensesDir)) {
  fs.mkdirSync(pharmacistLicensesDir, { recursive: true });
}

// Shared license upload for register: saves to a generic folder; controller moves to doctor-licenses or pharmacist-licenses by role
const licenseUploadsDir = path.join(__dirname, "../../uploads/license-uploads");
if (!fs.existsSync(licenseUploadsDir)) {
  fs.mkdirSync(licenseUploadsDir, { recursive: true });
}

const licenseRegistrationStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, licenseUploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `license-${uniqueSuffix}${ext}`);
  },
});

export const uploadLicenseRegistration = multer({
  storage: licenseRegistrationStorage,
  fileFilter: doctorLicenseFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

/** Move a license file from license-uploads to role-specific folder; returns URL path like /uploads/doctor-licenses/... or /uploads/pharmacist-licenses/... */
export function moveLicenseToRoleFolder(
  sourcePath: string,
  role: "Doctor" | "Pharmacist"
): string {
  const targetDir = role === "Doctor" ? doctorLicensesDir : pharmacistLicensesDir;
  const filename = path.basename(sourcePath);
  const targetPath = path.join(targetDir, filename);
  if (fs.existsSync(sourcePath)) {
    fs.renameSync(sourcePath, targetPath);
  }
  const subdir = role === "Doctor" ? "doctor-licenses" : "pharmacist-licenses";
  return `/uploads/${subdir}/${filename}`;
}

// Cleanup utility - delete file after processing
export const cleanupFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};
