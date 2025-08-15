import { useState, useEffect } from 'react';
import { EventsContext } from '@/context/events';
import useDebounce from '@/hooks/use-debounce';

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [city, setCity] = useState('');
  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 300 });

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearching(true);
      const fetchEvents = async () => {
        try {
          // Hardcoded the Ticketmaster API key for easy demo setup.
          const tickermaster = 'gcsYbSYzfVJvD4LAFevXycQG0Abh7a1k';
          const cityParam = city ? `&city=${city}` : '';
          const response = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${debouncedSearchTerm}${cityParam}&apikey=${tickermaster}`
          );
          const data = await response.json();
          setEvents(data._embedded?.events || []);
          setSearching(false);
        } catch (error) {
          setSearching(false);
          console.error('Error fetching events:', error);
        }
      };

      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [debouncedSearchTerm, city]);

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        searchTerm,
        setSearchTerm,
        searching,
        debouncedSearchTerm,
        city,
        setCity,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
