"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import CopyArrowIcon from "./CopyArrowIcon";
import TransformIcon from "./TransformIcon";

export function HighlightForm() {
    const [bookName, setBookName] = useState("");
    const [pageNumber, setPageNumber] = useState("");
    const [location, setLocation] = useState("");
    const [highlightText, setHighlightText] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );
    const [selectedTime, setSelectedTime] = useState("00:00");
    const [formattedText, setFormattedText] = useState("");
    const [copyConfirmation, setCopyConfirmation] = useState(false);

    const handleTransform = () => {
        if (!selectedDate) return;

        const [hours, minutes] = selectedTime.split(":").map(Number);
        const dateTimeWithSelectedTime = new Date(selectedDate);
        dateTimeWithSelectedTime.setHours(hours, minutes, 0, 0);

        const formattedDateTime = format(
            dateTimeWithSelectedTime,
            "EEEE, d MMMM yyyy HH:mm:ss"
        );

        const formatted = `==========${bookName}
- Your Highlight on page ${pageNumber} | location ${location} | Added on ${formattedDateTime}

${highlightText}
==========`;

        setFormattedText(formatted);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(formattedText);
        setCopyConfirmation(true);
        setTimeout(() => setCopyConfirmation(false), 2000);
    };

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Book Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bookName">Book Name</Label>
                        <Input
                            id="bookName"
                            placeholder="Enter book name"
                            value={bookName}
                            onChange={(e) => setBookName(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col justify-between h-full">
                            <Label htmlFor="pageNumber" className="mb-2">
                                Page Number
                            </Label>
                            <Input
                                id="pageNumber"
                                placeholder="Page"
                                value={pageNumber}
                                onChange={(e) => setPageNumber(e.target.value)}
                                className="input"
                            />
                        </div>
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex items-center space-x-2 mb-2">
                                <Label htmlFor="location">Location</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Info className="h-4 w-4 text-muted-foreground" />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>
                                                Enter the Kindle location for
                                                this highlight
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Input
                                id="location"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="input"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Date and Time</CardTitle>
                </CardHeader>
                <CardContent className="flex space-x-4">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-[240px] justify-start text-left border-input"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? (
                                    format(selectedDate, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <div className="flex items-center space-x-2">
                        <ClockIcon className="h-4 w-4" />
                        <Input
                            type="time"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-[120px] input"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Highlight</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Enter your highlight text"
                        value={highlightText}
                        onChange={(e) => setHighlightText(e.target.value)}
                        rows={4}
                        className="textarea"
                    />
                </CardContent>
            </Card>
            <div className="flex justify-start">
                <Button
                    onClick={handleTransform}
                    className="bg-[#1e1f21] text-white rounded-md hover:bg-[#2e2f31] group flex items-center transition-all duration-300"
                >
                    <span className="flex items-center transition-all duration-300 group-hover:pr-2">
                        Transform
                    </span>
                    <span className="w-0 overflow-hidden transition-all duration-300 group-hover:w-5 group-hover:ml-1 opacity-0 group-hover:opacity-100">
                        <TransformIcon className="w-5 h-5" />
                    </span>
                </Button>
            </div>
            {formattedText && (
                <Card>
                    <CardHeader>
                        <CardTitle>Formatted Highlight</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="bg-muted p-4 rounded whitespace-pre-wrap break-words overflow-auto">
                            {formattedText}
                        </pre>
                        <div className="mt-4 flex items-center space-x-2">
                            <Button
                                onClick={handleCopy}
                                className="bg-[#1e1f21] text-white hover:bg-[#2e2f31] group relative flex items-center transition-all duration-300"
                            >
                                <span className="flex items-center pr-2 group-hover:pr-4 transition-all duration-300">
                                    {copyConfirmation
                                        ? "Copied!"
                                        : "Copy to Clipboard"}
                                </span>
                                <span className="w-0 overflow-hidden transition-all duration-300 group-hover:w-5 group-hover:ml-2 opacity-0 group-hover:opacity-100 absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <CopyArrowIcon className="w-5 h-5" />
                                </span>
                            </Button>
                            {copyConfirmation && (
                                <span className="text-sm text-green-600">
                                    Content copied to clipboard!
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
