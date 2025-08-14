import * as React from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '@/context/user';
import { LocalStorageContext } from '@/context/local-storage';
import { Card, CardDescription, CardFooter, CardTitle } from './ui/card';

export function Profile() {
  const { user } = React.useContext(UserContext);
  const { favoritedEvents, language } = React.useContext(LocalStorageContext);
  const navigate = useNavigate();

  const handleCardClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div
      className="container mx-auto p-4"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user && (
        <div className="mb-4">
          <p className="text-lg">Name: {user.data.name}</p>
          <p className="text-lg">Email: {user.data.email}</p>
        </div>
      )}
      <div>
        <h2 className="text-xl font-bold mb-2">Favorited Events</h2>
        <div className="flex flex-col gap-6 overflow-y-auto grow px-2">
          {favoritedEvents.length > 0 ? (
            favoritedEvents.map((event: any) => (
              <Card
                key={event.id}
                className="py-0  gap-0"
                onClick={() => handleCardClick(event.id)}
              >
                <div className="relative rounded-md overflow-hidden shadow-lg">
                  {event.images && event.images.length > 0 ? (
                    <img
                      src={event.images[0].url}
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">No Image</p>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <CardTitle className="text-white">{event.name}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {new Date(event.dates.start.dateTime).toLocaleString()}
                    </CardDescription>
                  </div>
                </div>
                <CardFooter className="p-4">
                  <p>{event._embedded?.venues[0]?.name}</p>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No favorited events yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
