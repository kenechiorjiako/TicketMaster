import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {getEvent, mapResponseToEventDetailsProp} from '../api/EventRepo';
import ErrorLayout from '../components/ErrorLayout';
import {DateLayout, LocationLayout} from '../components/eventItems/Components';
import GenericAppBar from '../components/GenericAppBar';
import Spacer from '../components/Spacer';
import {StackParamList} from '../navigation/StackNav';
import {Colors, Font, Sizes} from '../styles/Theme';

export type EventDetailPropData = {
  id: string;
  imageSource: string;
  eventName: string;
  location: {
    city: string;
    venue: string;
  };
  date: {
    day: string;
    month: string;
    time: string;
  };
  ticketInfo: {
    minPrice?: string | undefined | null;
    maxPrice?: string | undefined | null;
  };
  venue: {
    imageSource?: string | undefined | null;
    name: string;
    address: string;
  };
  segment?: string | undefined;
  genre?: string | undefined;
  subGenre?: string | undefined;
  link?: string | undefined;
};
export type EventDetailsProp = {
  data: EventDetailPropData;
};

type Props = StackScreenProps<StackParamList, 'EventDetails'>;

const EventDetailsScreen = ({route, navigation}: Props) => {
  const {height} = useWindowDimensions();

  const [eventId, setEventId] = useState(route.params.id);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(true);
  const [pageData, setPageData] = useState({} as EventDetailPropData);
  const [retryKey, setRetryKey] = useState(0);

  const loadInBrowser = (url?: string) => {
    if (url) {
      Linking.openURL(url).catch(err =>
        console.error("Couldn't load page", err),
      );
    }
  };

  StatusBar.currentHeight;

  const loadPageEffect = useEffect(() => {
    setPageLoading(true);
    setPageError(false);
    const abortController = new AbortController();

    async function loadPage() {
      getEvent(eventId, abortController.signal)
        .then(response => {
          setPageData(mapResponseToEventDetailsProp(response.data).data);
          setPageLoading(false);
        })
        .catch(error => {
          setPageError(true);
          setPageLoading(false);
        });
    }

    loadPage();

    return () => {
      abortController.abort();
    };
  }, [eventId, retryKey]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <GenericAppBar
          title="Event Details"
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        {pageLoading ? (
          <View
            style={{
              height: height - 104,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" />
          </View>
        ) : !pageError ? (
          <ScrollView style={styles.scrollbar}>
            <EventInfoLayout data={pageData} />
            {pageData.ticketInfo.minPrice != null &&
            pageData.ticketInfo.maxPrice != null ? (
              <TicketInfoLayout
                data={pageData}
                onBuyNow={() => loadInBrowser(pageData.link)}
              />
            ) : null}

            <VenueInfoLayout data={pageData} />
            <Spacer height={32} />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.viewMoreButton}
              onPress={() => {
                loadInBrowser(pageData.link);
              }}>
              <Text style={styles.viewMoreButtonText}>View More Info</Text>
            </TouchableOpacity>
            <Spacer height={80} />
          </ScrollView>
        ) : (
          <View
            style={{
              height: height - 104,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ErrorLayout
              onRetry={() => {
                setRetryKey(key => key + 1);
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const EventInfoLayout = ({data}: EventDetailsProp) => {
  const {width} = useWindowDimensions();

  const calculatedWidth = width - Sizes.sideBorder * 2;
  const calculatedHeight = (calculatedWidth * 9) / 16;
  return (
    <View>
      <Image
        style={{
          ...styles.eventImage,
          width: calculatedWidth,
          height: calculatedHeight,
        }}
        source={{uri: data.imageSource}}></Image>

      <Spacer height={18} />
      <Text style={styles.eventTitle}>{data.eventName}</Text>

      <Spacer height={9} />

      <LocationLayout
        venue={data.location.city}
        city={data.location.venue}
        fontSize={13}
      />

      <Spacer height={11} />

      <DateLayout
        day={data.date.day}
        month={data.date.month}
        time={data.date.time}
        fontSize={12}
      />

      <Spacer height={24} />

      <View style={{flexDirection: 'row'}}>
        <EventTag text={data.segment} />
        <Spacer width={10} />
        <EventTag text={data.genre} />
      </View>

      <Spacer height={24} />

      <Spacer height={0.5} color={Colors.separator} />
    </View>
  );
};

const EventTag = ({text}: any) => {
  return (
    <View style={styles.eventTag}>
      <Text style={styles.eventTagText}>{text}</Text>
    </View>
  );
};

const TicketInfoLayout = ({data, onBuyNow}: any) => {
  return (
    <View style={{flexDirection: 'column', marginTop: 24}}>
      <Text style={styles.subSectionText}>Ticket Info</Text>

      <Spacer height={15} />

      <View style={styles.ticketRangeContainer}>
        <Text style={{fontFamily: Font.medium, fontSize: 14}}>Price Range</Text>

        <Text style={styles.ticketPriceRangeText}>
          ${data.ticketInfo.minPrice} - ${data.ticketInfo.maxPrice}
        </Text>
      </View>

      <Spacer height={17} />

      <View style={{borderRadius: 6, alignSelf: 'flex-end'}}>
        <TouchableHighlight
          style={{borderRadius: 6, alignSelf: 'flex-end'}}
          underlayColor={Colors.primary}
          onPress={() => {
            onBuyNow();
          }}>
          <View style={styles.buyNowButton}>
            <Text style={styles.buyNowButtonText}>Buy Now</Text>
          </View>
        </TouchableHighlight>
      </View>

      <Spacer height={24} />

      <Spacer height={0.5} color={Colors.separator} />
    </View>
  );
};

const VenueInfoLayout = ({data}: any) => {
  const {height, width} = useWindowDimensions();

  let calculatedWidth = (width - Sizes.sideBorder * 2) * 0.3;
  let calculatedHeight = (calculatedWidth * 9) / 16;

  const layoutStyles = StyleSheet.create({
    container: {
      width: 'auto',
      backgroundColor: Colors.white,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textLayout: {
      marginStart: 18,
      flexDirection: 'column',
      flex: 1,
    },
    venueName: {
      fontFamily: Font.bold,
      fontSize: 14,
    },
    venueAddress: {
      fontFamily: Font.medium,
      fontSize: 13,
      lineHeight: 20,
      color: '#7A7A7A',
    },
  });
  return (
    <View>
      <Spacer height={24} />

      <Text style={styles.subSectionText}>Venue</Text>

      <Spacer height={18} />

      <View style={layoutStyles.container}>
        {data.venue.imageSource ? (
          <Image
            style={{
              width: calculatedWidth,
              height: calculatedHeight,
            }}
            source={{uri: data.venue.imageSource}}
          />
        ) : (
          <View>
            <Image
              style={{
                width: 34,
                height: 34,
                marginStart: 24,
                marginEnd: 18,
              }}
              source={require('../assets/images/venueIcon.png')}
            />
          </View>
        )}

        <View style={layoutStyles.textLayout}>
          <Text style={layoutStyles.venueName} numberOfLines={2}>
            {data.venue.name}
          </Text>

          <Spacer height={7} />

          <Text style={layoutStyles.venueAddress} numberOfLines={2}>
            {data.venue.address}
          </Text>
        </View>
      </View>

      <Spacer height={24} />
      <Spacer height={0.5} color={Colors.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: Colors.background,
    flexDirection: 'column',
    flex: 1,
  },
  container: {
    backgroundColor: Colors.background,
    flexDirection: 'column',
  },
  scrollbar: {
    flexDirection: 'column',
    paddingHorizontal: Sizes.sideBorder,
  },
  eventImage: {
    borderRadius: 6,
    backgroundColor: Colors.secondary,
    marginTop: Sizes.sideBorder,
  },
  eventTitle: {
    fontFamily: Font.bold,
    fontSize: 18,
  },
  eventTag: {
    borderRadius: 500,
    backgroundColor: Colors.secondary,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  eventTagText: {
    fontFamily: Font.medium,
    fontSize: 12,
  },
  subSectionText: {
    fontFamily: Font.bold,
    fontSize: 16,
  },
  ticketRangeContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketPriceRangeText: {
    fontFamily: Font.bold,
    fontSize: 18,
    color: Colors.primary,
  },
  buyNowButton: {
    width: 'auto',
    borderRadius: 6,
    backgroundColor: '#F2F8FE',
    borderColor: '#DDEBFB',
    paddingHorizontal: 25,
    paddingVertical: 12,
    alignSelf: 'flex-end',
  },
  buyNowButtonText: {
    fontFamily: Font.bold,
    fontSize: 14,
    color: Colors.primary,
  },
  viewMoreButton: {
    paddingVertical: 16,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMoreButtonText: {
    fontFamily: Font.semiBold,
    fontSize: 14,
    color: Colors.white,
  },
});

export default EventDetailsScreen;
