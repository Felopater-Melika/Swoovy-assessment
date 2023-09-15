// Importing necessary Ant Design and React components
import React from 'react';
import Image from 'next/image';
import { Card } from 'antd';

// Define the shape of your event object using TypeScript interfaces
export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    month: string;
    year: string;
    state: string;
    image: string;
}

export interface EventCardProps {
    event: Event;
    onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
    return (
        <Card
            onClick={onClick}
            title={event.title}
            hoverable
            cover={
                <Image
                    alt={event.title}
                    width="650"
                    height="350"
                    src={event.image}
                />
            }
        >
            <div className="flex flex-row justify-between">
                <p>{event.state}</p>
                <p>{event.date}</p>
            </div>
            <p>{event.description}</p>
        </Card>
    );
};

export default EventCard;
