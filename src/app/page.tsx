'use client';

import EventCard from '@/components/EventCard';
import mockData from '../../mockData.json';
import { Event } from '@/components/EventCard';
import React, { useState, useEffect } from 'react';
import { Button, ConfigProvider, DatePicker, Modal, Select, theme } from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import NavBar from '@/components/NavBar';

const { Option } = Select;

export default function Home() {
    const [filteredEvents, setFilteredEvents] = useState(mockData);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(
        null,
    );
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Effect for filtering events when location or date changes
    useEffect(() => {
        let newFilteredEvents = mockData;

        // Filter by location
        if (selectedLocation) {
            newFilteredEvents = newFilteredEvents.filter(
                (event) => event.state === selectedLocation,
            );

            // If "All" is selected, revert to the original list
            if (selectedLocation === 'All') {
                newFilteredEvents = mockData;
            }
        }

        // Filter by month
        if (selectedDate) {
            const formattedDate = dayjs(selectedDate).format('YYYY-MM');
            newFilteredEvents = newFilteredEvents.filter((event) =>
                event.date.startsWith(formattedDate),
            );
        }

        setFilteredEvents(newFilteredEvents);
    }, [selectedLocation, selectedDate]);

    // Model handlers
    const showEventDetails = (event: Event) => {
        setSelectedEvent(event);
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <NavBar />
            <main className="flex flex-col items-center justify-between p-24 max-w-screen-lg w-full mx-auto">
                <div className="flex space-x-4 mb-6 flex-row">
                    <Select
                        data-testid="locationSelect"
                        placeholder="Select a location"
                        allowClear={true} // This allows clearing the selection
                        onChange={(value) => setSelectedLocation(value || null)}
                    >
                        <Option value="All">All Locations</Option>
                        <Option value="CA" data-testid="cali">
                            California (CA)
                        </Option>
                        <Option value="NY">New York (NY)</Option>
                        <Option value="TX">Texas (TX)</Option>
                    </Select>

                    <DatePicker
                        picker="month"
                        format="YYYY-MM"
                        placeholder="Select a month"
                        onChange={(date, dateString) => {
                            if (date) {
                                setSelectedDate(dayjs(date));
                            } else {
                                setSelectedDate(null);
                            }
                        }}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center w-full">
                    {filteredEvents.map((event: any) => (
                        <div key={event.id} className="w-full">
                            <EventCard
                                event={event}
                                onClick={() => showEventDetails(event)}
                            />
                        </div>
                    ))}
                </div>

                <Modal
                    title={selectedEvent?.title}
                    open={isModalVisible}
                    onCancel={handleCancel}
                    onOk={handleCancel}
                    footer={[
                        <Button key={selectedEvent?.id} onClick={handleCancel}>
                            Ok
                        </Button>,
                    ]}
                >
                    <p className="mb-3">{selectedEvent?.description}</p>
                    {selectedEvent?.image && selectedEvent?.title ? (
                        <Image
                            src={selectedEvent.image}
                            alt={selectedEvent.title}
                            width="650"
                            height="350"
                        />
                    ) : null}
                </Modal>
            </main>
        </ConfigProvider>
    );
}
