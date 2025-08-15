import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { EventsContext } from '@/context/events';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeftIcon,
  CalendarIcon,
  Heart,
  Info,
  MapPinIcon,
  UserIcon,
} from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { LocalStorageContext } from '@/context/local-storage';

export const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events } = useContext(EventsContext);
  const [event, setEvent] = useState(() =>
    events.find((e) => e.id === eventId)
  );
  const [loading, setLoading] = useState(!event);
  const { favoritedEvents, setFavoritedEvents, language } =
    useContext(LocalStorageContext);
  const isFavorited = eventId
    ? favoritedEvents.some((e) => e.id === eventId)
    : false;

  const toggleFavorite = () => {
    if (!event) return;
    if (isFavorited) {
      setFavoritedEvents(favoritedEvents.filter((e) => e.id !== event.id));
    } else {
      setFavoritedEvents([...favoritedEvents, event]);
    }
  };

  useEffect(() => {
    if (!event && eventId) {
      setLoading(true);
      const fetchEvent = async () => {
        try {
          // Hardcoded the Ticketmaster API key for easy demo setup.
          const ticketmaster = 'gcsYbSYzfVJvD4LAFevXycQG0Abh7a1k';
          const response = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${ticketmaster}`
          );
          if (!response.ok) {
            throw new Error('Event not found');
          }
          const data = await response.json();
          setEvent(data);
        } catch (error) {
          console.error('Error fetching event:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [event, eventId]);

  const createIcsFile = () => {
    if (!event) return;
    const eventDate = event.dates?.start?.localDate;
    const eventTime = event.dates?.start?.localTime || '00:00:00';
    const startDate = new Date(`${eventDate}T${eventTime}`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:${event.id}
SUMMARY:${event.name}
DTSTART:${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}
DTEND:${endDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}
LOCATION:${event._embedded?.venues?.[0]?.name || ''}
DESCRIPTION:Ticket available at ${event.url}
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.name}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <Skeleton className="w-full h-64" />
          <div className="p-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Skeleton className="h-10 w-32 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
              </div>
              <div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-500">Event not found</p>
      </div>
    );
  }

  const imageUrl = event.images?.[0]?.url;
  const seatmapUrl = event.seatmap?.staticUrl;
  const classifications = event.classifications?.[0];
  const priceRanges = event.priceRanges?.[0];

  return (
    <div
      className="bg-white dark:bg-gray-900 min-h-screen"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-220 mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="relative">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={event.name}
                className="w-full h-64 object-cover"
              />
            )}
            <Button
              variant="ghost"
              className="absolute top-4 left-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/75"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/75"
              onClick={toggleFavorite}
            >
              <Heart
                className="w-6 h-6"
                fill={isFavorited ? 'currentColor' : 'none'}
              />
            </Button>
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {event.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {classifications?.segment && (
                <Badge>{classifications.segment.name}</Badge>
              )}
              {classifications?.genre && (
                <Badge variant="secondary">{classifications.genre.name}</Badge>
              )}
              {classifications?.subGenre && (
                <Badge variant="outline">{classifications.subGenre.name}</Badge>
              )}
            </div>

            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-0">
                <div>
                  <div className="flex items-center mb-4 gap-2">
                    <CalendarIcon className="w-6 h-6 mr-2" />
                    <div>
                      <p className="text-lg font-semibold">
                        {event.dates?.start?.localDate}
                      </p>
                      <p className="text-gray-600">
                        {event.dates?.start?.localTime}
                      </p>
                    </div>
                    <Button
                      variant="link"
                      className="ml-auto"
                      onClick={createIcsFile}
                    >
                      Add to Calendar
                    </Button>
                  </div>
                  {event._embedded?.venues?.[0] && (
                    <div className="flex items-center mb-4 gap-2">
                      <MapPinIcon className="w-6 h-6 mr-2" />
                      <div>
                        <p className="text-lg font-semibold">
                          {event._embedded.venues[0].name}
                        </p>
                        <p className="text-gray-600">
                          {event._embedded.venues[0].address?.line1},{' '}
                          {event._embedded.venues[0].city?.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {seatmapUrl && (
                    <div className="my-4">
                      <img
                        src={seatmapUrl}
                        alt="Seat Map"
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                  {event.promoter && (
                    <div className="flex items-center">
                      <UserIcon className="w-6 h-6 mr-2" />
                      <p className="text-lg font-semibold">
                        {event.promoter.name}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  {event._embedded?.venues?.[0] && (
                    <div className="my-4">
                      <iframe
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(
                          `${event._embedded.venues[0].name}, ${event._embedded.venues[0].address?.line1}, ${event._embedded.venues[0].city?.name}`
                        )}&output=embed`}
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  {priceRanges && (
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                      <strong>Price:</strong> ${priceRanges.min} - $
                      {priceRanges.max} ({priceRanges.currency})
                    </p>
                  )}
                  {event.info && (
                    <div className="mb-4">
                      <h2 className="flex gap-2 text-lg items-center font-semibold mb-2 text-gray-900 dark:text-white">
                        <Info className="w-4 mx-1" />
                        INFO
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 ml-8">
                        {event.info}
                      </p>
                    </div>
                  )}
                  <div className="bg-gradient-to-t from-white to-transparent">
                    <Button asChild className="w-full h-12">
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg"
                      >
                        Buy Tickets
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
