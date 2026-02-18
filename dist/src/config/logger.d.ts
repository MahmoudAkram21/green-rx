declare const logger: {
    debug: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    notice: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    warning: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
};
export default logger;
/** Morgan stream: pass HTTP log lines to logger.info */
export declare const morganStream: {
    write: (message: string) => void;
};
//# sourceMappingURL=logger.d.ts.map