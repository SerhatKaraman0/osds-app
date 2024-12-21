"use server";

import { getIronSession } from "iron-session"
import { sessionOptions, SessionData, defaultSession } from "./lib"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import WebSocket from 'ws';



export const fetchUserData = async (key, user_name, password) => {

    const response = await fetch(`http://0.0.0.0:8080/auth/check-user/hash/${key}/username/${user_name}/pwd/${password}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    const data = await response.json();

    return data;
}

export async function backendLogin(user_name: string) {
    const ws = new WebSocket(`ws://0.0.0.0:8080/backend/websockets/ws/${user_name}`)
    ws.on('open', () => {
        console.log('Connected to server');
      
        ws.send('Hello, server!');
      });
      
      ws.on('message', (message: string) => {
        console.log(`Received message from server: ${message}`);
      });
      
      ws.on('close', () => {
        console.log('Disconnected from server');
      });
}

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
}   

export const login = async (key, user_name, password) => {
    try {
        const session = await getSession();
        const user = await fetchUserData(key, user_name, password);

        if (!user) {
            return { error: "Wrong credentials" };
        }
        console.log(user);
        session.userId = user.user.id;
        session.userName = user_name;
        session.role = user.user.role;
        session.isLoggedIn = true;
        session.balance = user.user.credits;


        if (user.user.role === "student") {
            session.assigned_admin_id = user.user.assigned_admin_id
            session.assigned_staff_id = user.user.assigned_staff_id
        }


        await session.save();
        return { success: true, redirectUrl: `http://localhost:3000/${session.role}/${session.userName}` };
    } catch (error) {
        console.error("Login error:", error);
        return { error: "An error occurred during login" };
    }
}

export const logout = async () => {
    const session = await getSession();
    session.isLoggedIn = false;
    session.destroy();

    return { success: true, redirectUrl: `http://localhost:3000/login` }; 
}