import * as React from 'react';

type EventsContextType = {
  events: any[];
  setEvents: (events: any[]) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  searching: boolean;
  debouncedSearchTerm: string;
  city: string;
  setCity: (city: string) => void;
};

export const EventsContext = React.createContext<EventsContextType>({
  events: [],
  setEvents: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
  searching: false,
  debouncedSearchTerm: '',
  city: '',
  setCity: () => {},
});