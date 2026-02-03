"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Request validation middleware
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: 'Validation error',
                details: error.details.map(detail => detail.message)
            });
        }
        return next();
    };
};
exports.default = validateRequest;
//# sourceMappingURL=validateRequest.js.map