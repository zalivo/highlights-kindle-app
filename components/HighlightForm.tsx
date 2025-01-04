'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, parse } from "date-fns"
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from 'lucide-react'

export function HighlightForm() {
  const [bookName, setBookName] = useState('')
  const [pageNumber, setPageNumber] = useState('')
  const [location, setLocation] = useState('')
  const [highlightText, setHighlightText] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState('00:00')
  const [formattedText, setFormattedText] = useState('')

  const handleTransform = () => {
    if (!selectedDate) return;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const dateTimeWithSelectedTime = new Date(selectedDate);
    dateTimeWithSelectedTime.setHours(hours, minutes, 0, 0);

    const formattedDateTime = format(dateTimeWithSelectedTime, "EEEE, d MMMM yyyy HH:mm:ss")

    const formatted = `==========
${bookName}
- Your Highlight on page ${pageNumber} | location ${location} | Added on ${formattedDateTime}

${highlightText}
==========`

    setFormattedText(formatted)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText)
  }

  return (
    <div className="space-y-6">
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
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pageNumber">Page Number</Label>
              <Input
                id="pageNumber"
                placeholder="Page"
                value={pageNumber}
                onChange={(e) => setPageNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="location">Location</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter the Kindle location for this highlight</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
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
              className="w-[120px]"
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
          />
        </CardContent>
      </Card>

      <Button onClick={handleTransform} className="w-full">
        Transform
      </Button>

      {formattedText && (
        <Card>
          <CardHeader>
            <CardTitle>Formatted Highlight</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded whitespace-pre-wrap">{formattedText}</pre>
            <Button onClick={handleCopy} className="mt-4">
              Copy to Clipboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

