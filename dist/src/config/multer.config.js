"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupFile = exports.uploadMedicineImage = exports.uploadLogo = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Create uploads directory if it doesn't exist
const uploadsDir = path_1.default.join(__dirname, '../../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
// Configure storage
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});
// File filter
const fileFilter = (_req, file, cb) => {
    // Accept Excel and CSV files
    const allowedMimes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/csv'
    ];
    if (allowedMimes.includes(file.mimetype) || file.originalname.match(/\.(xlsx|xls|csv)$/)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only Excel (.xlsx, .xls) and CSV (.csv) files are allowed'));
    }
};
// Create multer upload instance
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max file size
    }
});
// Memory storage for logo (saved to DB)
const memoryStorage = multer_1.default.memoryStorage();
const logoFileFilter = (_req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (file.mimetype && allowed.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files (PNG, JPEG, GIF, WebP, SVG) are allowed'));
    }
};
exports.uploadLogo = (0, multer_1.default)({
    storage: memoryStorage,
    fileFilter: logoFileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});
// ── Medicine image upload (patient self-report) ────────────────────────────────
const medicineImagesDir = path_1.default.join(__dirname, '../../uploads/patient-medicines');
if (!fs_1.default.existsSync(medicineImagesDir)) {
    fs_1.default.mkdirSync(medicineImagesDir, { recursive: true });
}
const medicineImageStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, medicineImagesDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path_1.default.extname(file.originalname);
        cb(null, `medicine-${uniqueSuffix}${ext}`);
    },
});
const medicineImageFilter = (_req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype) || file.originalname.match(/\.(png|jpg|jpeg|webp|gif)$/i)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files (PNG, JPG, JPEG, WebP, GIF) are allowed'));
    }
};
exports.uploadMedicineImage = (0, multer_1.default)({
    storage: medicineImageStorage,
    fileFilter: medicineImageFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});
// Cleanup utility - delete file after processing
const cleanupFile = (filePath) => {
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlinkSync(filePath);
    }
};
exports.cleanupFile = cleanupFile;
//# sourceMappingURL=multer.config.js.map