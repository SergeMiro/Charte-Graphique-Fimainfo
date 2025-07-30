import React, { useState } from "react";
import { SubscriptionDate, ScheduleDate, DropdownSelect, DateTimePicker } from "@/components/date";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DateComponentsDemo() {
  const [dateTime, setDateTime] = useState<Date | undefined>(new Date());
  return (
    <div className="container py-10 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Date Components Demo</h1>
        <p className="text-muted-foreground mt-2">
          Showcase of date, datetime and dropdown components
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Date</CardTitle>
            <CardDescription>
              Calendar date picker with manual input option
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionDate />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Date</CardTitle>
            <CardDescription>
              Natural language date input with calendar fallback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScheduleDate />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dropdown Select</CardTitle>
            <CardDescription>
              Searchable dropdown component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DropdownSelect 
              label="Select a category"
              options={[
                { value: "design", label: "Design" },
                { value: "development", label: "Development" },
                { value: "marketing", label: "Marketing" },
                { value: "product", label: "Product" },
                { value: "sales", label: "Sales" },
                { value: "support", label: "Support" },
              ]}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>DateTime Picker</CardTitle>
            <CardDescription>
              Combined date and time selection component
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DateTimePicker 
              date={dateTime}
              setDate={setDateTime}
              label="Select date and time"
            />
            {dateTime && (
              <p className="text-muted-foreground text-sm mt-4">
                Selected: {dateTime.toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Form Example</CardTitle>
            <CardDescription>
              Example of using all components together in a form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DropdownSelect 
                label="Event Type"
                options={[
                  { value: "meeting", label: "Meeting" },
                  { value: "conference", label: "Conference" },
                  { value: "workshop", label: "Workshop" },
                  { value: "webinar", label: "Webinar" },
                ]}
              />
              
              <SubscriptionDate />
              
              <div className="md:col-span-2">
                <ScheduleDate />
              </div>
              
              <div className="md:col-span-2">
                <DateTimePicker
                  date={dateTime}
                  setDate={setDateTime}
                  label="Event Date and Time"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                Submit Form
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
