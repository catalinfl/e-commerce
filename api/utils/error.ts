import express from 'express'

interface CustomError extends Error {
    status?: number;
  }


export const createError: Function = (status: number, message: string) => {
    const error: CustomError = new Error();
    error.status = status;
    error.message = message;
    return error;
}