import { getApp, initializeApp } from 'firebase-admin/app';

// initialize Firebase
export const loadFirebase = (): boolean => {
    try {
        getApp()
    } catch (FIreBaseAppError) {
        initializeApp()
    }

    return true
}

