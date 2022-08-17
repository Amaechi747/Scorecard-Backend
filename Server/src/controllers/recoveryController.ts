import express, { Request, Response, NextFunction}  from 'express';
import asyncHandler from "express-async-handler";
import recoveryService from '../services/recoveryService';

export const forgotPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction)=>{
    const userExists = await recoveryService.userExists({ ...req.body });
    if(userExists) {
        if(userExists.status === 'inactive') throw new Error('Account is not activated');
        const decadev = await recoveryService.sendPasswordResetLink(userExists);
        if(decadev) {
            res.status(200).send({ status: 'success', message: 'Password resent link has been sent to your email and would expire in 24hrs' });
            return;
        }
    } else {
        throw new Error(`No user exists with email ${req.body?.email}`);
    }
})

export const resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id, newPassword: password } = req.body;
    const updatedUser = await recoveryService.resetPassword(id, password);
    if(updatedUser) {
        res.status(200).send({ status: 'success', message: 'Password reset successful' })
        return;
    }
})