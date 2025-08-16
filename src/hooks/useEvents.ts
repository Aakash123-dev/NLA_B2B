import { useState, useEffect } from 'react'
// If you have a central Event type, import it here. Using any[] fallback.
import { eventService } from '@/services/eventServices/eventServices';
import { Event } from '@/types/event';
import { NewEvent } from '@/types/event';

export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [tpoId, setTpoId] = useState<string | null>(null)
    
    // Use useEffect to get search params after component mounts to avoid SSR issues
    useEffect(() => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const tpoIdFromUrl = urlParams.get('tpoId');
            setTpoId(tpoIdFromUrl);
        } catch (error) {
            console.warn('Failed to parse URL search params:', error);
            setTpoId(null);
        }
    }, []);

    // Listen for URL changes
    useEffect(() => {
        const handleUrlChange = () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const tpoIdFromUrl = urlParams.get('tpoId');
                setTpoId(tpoIdFromUrl);
            } catch (error) {
                console.warn('Failed to parse URL search params on change:', error);
                setTpoId(null);
            }
        };

        // Listen for popstate events (browser back/forward)
        window.addEventListener('popstate', handleUrlChange);
        
        // Listen for pushstate/replacestate events
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = function(...args) {
            originalPushState.apply(history, args);
            handleUrlChange();
        };
        
        history.replaceState = function(...args) {
            originalReplaceState.apply(history, args);
            handleUrlChange();
        };

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
        };
    }, []);

    const fetchEvents = async (eventTpoId?: string | null) => {
        try {
            setLoading(true)
            const effectiveId = eventTpoId ?? tpoId ?? ''
            const data = await eventService.getEvents(effectiveId)
            setEvents(data)
        } catch (err) {
            setError('Failed to fetch events')
        } finally {
            setLoading(false)
        }
    }

    const createEvent = async (event: NewEvent) => {
        try {
            const newEvent = await eventService.createEvent(event)
            setEvents(prev => [...prev, newEvent])
            return newEvent
        } catch (err) {
            setError('Failed to create event')
            throw err
        }
    }

    const createImportedEvent = async (event: NewEvent) => {
        try {
            const newEvent = await eventService.createImportedEvent(event)
            setEvents(prev => [...prev, newEvent])
            return newEvent
        } catch (err) {
            setError('Failed to create event')
            throw err
        }
    }

    const updateEvent = async (event: Event) => {
        try {
            const updatedEvent = await eventService.updateEvent(event)
            setEvents(prev => prev.map(e => e.id === event.id ? updatedEvent : e))
            return updatedEvent
        } catch (err) {
            setError('Failed to update event')
            throw err
        }
    }

    const deleteEvent = async (id: string) => {
        try {
            await eventService.deleteEvent(id)
            setEvents(prev => prev.filter(e => e.id !== id))
            return true
        } catch (err) {
            setError('Failed to delete event')
            throw err
        }
    }

    const updateTpoId = (newTpoId: string | null) => {
        setTpoId(newTpoId);
    }

    const refreshTpoId = () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const tpoIdFromUrl = urlParams.get('tpoId');
            setTpoId(tpoIdFromUrl);
        } catch (error) {
            console.warn('Failed to refresh tpoId from URL:', error);
            setTpoId(null);
        }
    }

    useEffect(() => {
        if (tpoId) {
            fetchEvents(tpoId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tpoId])

    return {
        events,
        loading,
        error,
        tpoId,
        createEvent,
        updateEvent,
        deleteEvent,
        createImportedEvent,
        refreshEvents: fetchEvents,
        updateTpoId,
        refreshTpoId,
    }
}