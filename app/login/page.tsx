"use client";

import React, { useEffect, useState } from "react";
import NavbarComponent from "@/app/components/app-navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function generateRandomText(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789defghijklmnopqrstuvwxyz0123456789defghijklmnopqrstuvwxyz0123456789defghijklmnopqrstuvwxyz0123456789defghijklmnopqrstuvwxyz0123456789defghijklmnopqrstuvwxyz0123456789defghijklmnopqrstuvwxyz0123456789defghijklmnopqrstuvwxyz0123456789defghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export default function AuthPage() {
    const [randomText, setRandomText] = useState(generateRandomText(1200));

    useEffect(() => {
        const interval = setInterval(() => {
            setRandomText(generateRandomText(1200));
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
    return (
        <>
            <NavbarComponent role={""} />
            <div className="flex h-full">
                <div className="w-1/2 h-full mt-20 pl-20">
                    <div className="whitespace-pre-wrap break-words">
                        {randomText}
                    </div>
                </div>
                <div className="w-1/2 h-full mt-20 bg-white flex items-center justify-center">
                    <Tabs defaultValue="login" className="w-[400px] h-full">
                        <TabsList className="grid w-full">
                            <TabsTrigger value="login" className="w-[380px] h-[25px]">Login</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login" className="flex items-center justify-center h-full">
                            <Card className="w-full max-w-md">
                                <CardHeader>
                                    <CardTitle>Login</CardTitle>
                                    <CardDescription>Access your school..</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="encryption-key">Key</Label>
                                        <Input
                                            id="encryption-key"
                                            placeholder="some-generated-key"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="user-name">Username</Label>
                                        <Input
                                            id="user-name"
                                            placeholder="user_name"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Your password"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col items-center space-y-2">
                                    <Button className="w-[350px]">
                                        Login
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}