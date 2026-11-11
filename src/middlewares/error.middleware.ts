import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/appError";

export const errorMiddleware: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            message: err.message
        });
        return;
    }

  if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    err.code === "P2002"
) {
    res.status(409).json({
        message: "Já existe um registro com esses dados únicos."
    });
    return;
}


    console.error(err);

    res.status(500).json({
        message: "Erro interno do servidor."
    });
};
