import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/appError";
import { Prisma } from "../generated/prisma/client.js";

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
        err instanceof Prisma.PrismaClientKnownRequestError &&
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
