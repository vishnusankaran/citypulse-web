import { useContext, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardDescription, CardFooter, CardTitle } from './ui/card';
import { UserContext } from '@/context/user';
import { useNavigate } from 'react-router';
import { EventsContext } from '@/context/events';
import { LocalStorageContext } from '@/context/local-storage';

export const Dash = () => {
  const { isAuthenticated } = useContext(UserContext);
  const {
    events,
    searchTerm,
    setSearchTerm,
    searching,
    debouncedSearchTerm,
    city,
    setCity,
  } = useContext(EventsContext);
  const navigate = useNavigate();
  const { language } = useContext(LocalStorageContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCardClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className="flex flex-1 flex-col grow h-full">
      <div className="@container/main flex flex-1 flex-col gap-4 p-4 grow">
        <div className="flex grow overflow-scroll h-0">
          <div className="flex flex-col gap-6 overflow-y-auto grow px-2">
            {events.length > 0 ? (
              events.map((event: any) => (
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
              <>
                {searching ? (
                  <div className="flex flex-col grow justify-center text-center text-gray-500">
                    Searching....
                  </div>
                ) : (
                  <div className="flex flex-col grow justify-center text-center text-gray-500">
                    {debouncedSearchTerm
                      ? `No results found for "${debouncedSearchTerm}"`
                      : 'Search for Keywords or City'}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div dir="ltr" className="flex w-full max-w-md gap-2">
          <Input
            className="w-full h-12"
            placeholder="Search..."
            onChange={handleSearch}
            value={searchTerm}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
          <Select
            onValueChange={setCity}
            value={city}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <SelectTrigger className="w-[180px]" style={{ height: '48px' }}>
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="px-4" value={null!}>
                All
              </SelectItem>
              <SelectItem className="px-4" value="abu dhabi">
                Abu Dhabi
              </SelectItem>
              <SelectItem className="px-4" value="dubai">
                Dubai
              </SelectItem>
              <SelectItem className="px-4" value="sharjah">
                Sharjah
              </SelectItem>
              <SelectItem className="px-4" value="ajman">
                Ajman
              </SelectItem>
              <SelectItem className="px-4" value="umm al quwain">
                Umm Al Quwain
              </SelectItem>
              <SelectItem className="px-4" value="ras al khaima">
                Ras Al Khaimah
              </SelectItem>
              <SelectItem className="px-4" value="fujairah">
                Fujairah
              </SelectItem>
              <SelectItem className="px-4" value="al ain">
                Al Ain
              </SelectItem>
              <SelectItem className="px-4" value="khor fakkan">
                Khor Fakkan
              </SelectItem>
              <SelectItem className="px-4" value="kalba">
                Kalba
              </SelectItem>
              <SelectItem className="px-4" value="hatta">
                Hatta
              </SelectItem>
              <SelectItem className="px-4" value="masafi">
                Masafi
              </SelectItem>
              <SelectItem className="px-4" value="ghayathi">
                Ghayathi
              </SelectItem>
              <SelectItem className="px-4" value="dibba">
                Dibba
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
