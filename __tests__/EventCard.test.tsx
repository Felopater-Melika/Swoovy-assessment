import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventCard, { Event } from '@/components/EventCard';
describe('Event Card tests', () => {
    const mockEvent: Event = {
        id: 1,
        title: 'Sample Event',
        description: 'This is a description',
        date: '2023-09-15',
        month: 'September',
        year: '2023',
        state: 'NY',
        image: '/images/music-festival.jpg',
    };

    it('displays the event details correctly', () => {
        render(<EventCard event={mockEvent} onClick={jest.fn()} />);
        expect(screen.getByText('Sample Event')).toBeInTheDocument();
        expect(screen.getByText('This is a description')).toBeInTheDocument();
        expect(screen.getByText('NY')).toBeInTheDocument();
        expect(screen.getByText('2023-09-15')).toBeInTheDocument();
    });
});
