import React, { useEffect, useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from 'your-select-component-library';
import { getStaff } from 'your-api-service';

export const StaffSelect = () => {

    const fetchStaff = async () => {
        const staffResponse = await getStaff();
        const staffJSON = await staffResponse.json();
        return staffJSON;
    };


    return (
        <Select onValueChange={(value) => setSelectedStaff(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    {staff.map((staffMember) => (
                        <SelectItem key={staffMember.id} value={staffMember.id}>
                            {staffMember.id}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
