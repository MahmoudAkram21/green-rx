import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

// File filter
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept Excel and CSV files
    const allowedMimes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv',
        'application/csv'
    ];

    if (allowedMimes.includes(file.mimetype) || file.originalname.match(/\.(xlsx|xls|csv)$/)) {
        cb(null, true);
    } else {
        cb(new Error('Only Excel (.xlsx, .xls) and CSV (.csv) files are allowed'));
    }
};

// Create multer upload instance
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max file size
    }
});

// Memory storage for logo (saved to DB)
const memoryStorage = multer.memoryStorage();
const logoFileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
    const allowed = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (file.mimetype && allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (PNG, JPEG, GIF, WebP, SVG) are allowed'));
    }
};
export const uploadLogo = multer({
    storage: memoryStorage,
    fileFilter: logoFileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// Cleanup utility - delete file after processing
export const cleanupFile = (filePath: string) => {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};
