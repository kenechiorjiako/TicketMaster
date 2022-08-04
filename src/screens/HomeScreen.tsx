import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
  TouchableHighlight,
  SectionList,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import HomeAppBar from '../components/HomeAppBar';
import SearchBar from '../components/SearchBar';
import SmallEventItem, {
} from '../components/eventItems/SmallEventItem';
import {Colors, Font, Sizes} from '../styles/Theme';
import Spacer from '../components/Spacer';
import LargeEventItem from '../components/eventItems/LargeEventItem';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {statesList} from '../util/Constants';
import {
  getUpcomingEvents,
  getFeaturedEvents,
  mapResponseToEventItemProp,
} from '../api/EventRepo';
import axios from 'axios';
import { StackParamList } from '../navigation/StackNav';
import { StackScreenProps } from '@react-navigation/stack';

enum SectionType {
  Search,
  FeaturedEvents,
  UpcomingEvents,
}

const SECTIONS = [
  {
    title: null,
    type: SectionType.Search,
    data: [] as any,
  },
  {
    title: 'Featured Events',
    type: SectionType.FeaturedEvents,
    data: [] as any,
  },
  {
    title: 'Other Upcoming Events',
    type: SectionType.UpcomingEvents,
    data: [] as any,
  },
];

type Props = StackScreenProps<StackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [location, setLocation] = useState(statesList[0]);
  const [sections, setSections] = useState(SECTIONS);

  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [shouldLoadMore, setShouldLoadMore] = useState(false);
  const [page, setPage] = useState(0);
  const [retryKey, setRetryKey] = useState(0);

  const overlayOpacity = useRef(new Animated.Value(1)).current;
  const {width, height} = useWindowDimensions();

  function search(text: string) {
    if (!text) {
      return;
    }
    const formatted = text.trim();
    if (formatted.length != 0) {
      navigation.navigate('Search', {query: formatted});
    }
  }

  function navigateToDetailScreen(id: string) {
    navigation.navigate('EventDetails', {id: id})
  }

  
  async function refreshPage() {
    setRefreshing(true);
    setPage(0);

    axios
      .all([
        getFeaturedEvents(location.abbreviation),
        getUpcomingEvents(location.abbreviation, 0),
      ])
      .then(
        axios.spread(function (featured, upcoming) {
          var featuredData = null;
          var upcomingData = null;

          try {
            featuredData = featured.data._embedded.events;
          } catch (e) {}
          try {
            upcomingData = upcoming.data._embedded.events;
          } catch (e) {}

          setRefreshing(false);

          const featuredEventsSection = {
            title: sections[1].title,
            type: sections[1].type,
            data: featuredData
              ? featuredData.map((e: any) => {
                  return mapResponseToEventItemProp(e).data;
                })
              : [],
          };

          const upcomingEventsSection = {
            title: sections[2].title,
            type: sections[2].type,
            data: upcomingData
              ? upcomingData.map((e: any) => {
                  return mapResponseToEventItemProp(e).data;
                })
              : [],
          };


          setSections([
            sections[0],
            featuredEventsSection,
            upcomingEventsSection,
          ]);
        }),
      )
      .catch(error => {
        setRefreshing(false);
      });
  }

  async function loadMore() {
    setPage(page => page + 1);
    setShouldLoadMore(true)
  }

  const loadPageEffect = useEffect(() => {

    async function loadInitial() {
      setPageLoading(true);
      setPageError(false);
      setLoadingMore(false);
      setRefreshing(false);
      setPage(0);

      setSections([sections[0], SECTIONS[1], SECTIONS[2]]);

      axios
        .all([
          getFeaturedEvents(location.abbreviation),
          getUpcomingEvents(location.abbreviation, 0),
        ])
        .then(
          axios.spread(function (featured, upcoming) {
            var featuredData = null
            var upcomingData = null

            try {featuredData = featured.data._embedded.events;} catch(e) {}
            try {
              upcomingData = upcoming.data._embedded.events;
            } catch (e) {}

            const featuredEventsSection = {
              title: sections[1].title,
              type: sections[1].type,
              data: (featuredData ? featuredData.map((e: any) => {
                return mapResponseToEventItemProp(e).data;
              }) : []),
            };

            const upcomingEventsSection = {
              title: sections[2].title,
              type: sections[2].type,
              data: upcomingData
                ? upcomingData.map((e: any) => {
                    return mapResponseToEventItemProp(e).data;
                  })
                : [],
            };

            setSections([
              sections[0],
              featuredEventsSection,
              upcomingEventsSection,
            ]);
            setPageLoading(false);
          }),
        )
        .catch(error => {
          setPageError(true);
          setPageLoading(false);
        });
    }

    loadInitial();
  }, [location, retryKey]);

  const loadMoreEffect = useEffect(() => {
    async function loadMore() {
      setLoadingMore(true);

      getUpcomingEvents(location.abbreviation, page)
        .then(response => {
          const responseData = response.data?._embedded?.events;

          const upcomingEventsSection = {
            title: sections[2].title,
            type: sections[2].type,
            data: [
              ...sections[2].data,
              ...(responseData ? responseData.map((e: any) => {
                return mapResponseToEventItemProp(e).data;
              }) : []),
            ],
          };
          setSections([sections[0], sections[1], upcomingEventsSection]);

          setLoadingMore(false);
        })
        .catch(error => {
          setLoadingMore(false);
          setShouldLoadMore(false);
          setPage(page => page - 1)
        });
    }
    if (page != 0 && shouldLoadMore) {
      loadMore();
    }
  }, [page, shouldLoadMore]);

  return (
    <SafeAreaView style={styles.screen}>
      <View
        style={{
          backgroundColor: Colors.background,
          flexGrow: 1,
        }}>
        <HomeAppBar
          location={
            location.abbreviation ? location.abbreviation : location.name
          }
          onSelectLocation={() => {
            setShowLocationSelector(true);
            Animated.timing(overlayOpacity, {
              duration: 250,
              toValue: 1,
              useNativeDriver: false,
            }).start();
          }}
        />

        {pageError ? (
          <ErrorLayout
            onRetry={() => {
              setRetryKey(key => key + 1);
            }}
          />
        ) : null}

        {pageLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : !pageError ? (
          <SectionList
            stickySectionHeadersEnabled={false}
            sections={sections}
            onRefresh={() => {
              refreshPage();
            }}
            refreshing={refreshing}
            renderSectionHeader={({section}) => {
              switch (section.type) {
                case SectionType.Search:
                  return (
                    <View style={{marginHorizontal: Sizes.sideBorder}}>
                      <Spacer height={Sizes.marginLarge} />

                      <SearchBar
                        onSearch={(text: string) => {
                          search(text);
                        }}
                      />

                      <Spacer height={44} color="transparent" />
                    </View>
                  );
                case SectionType.FeaturedEvents:
                  return (
                    <View>
                      <Text
                        style={{
                          marginStart: Sizes.sideBorder,
                          ...styles.headings,
                        }}>
                        Featured Events
                      </Text>

                      <Spacer height={25} />

                      {section.data.length == 0 &&
                      !pageLoading &&
                      !pageError ? (
                        <View>
                          <Spacer height={25} />

                          <Text
                            style={{
                              fontFamily: Font.medium,
                              fontSize: 16,
                              textAlign: 'center',
                              lineHeight: 25,
                            }}>
                            No featured events found in your location
                          </Text>
                        </View>
                      ) : null}

                      <FlatList
                        data={section.data}
                        renderItem={({item}) => <LargeEventItem data={item} onPress={() => {navigateToDetailScreen(item.id)}} />}
                        horizontal={true}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => {
                          return <Spacer width={Sizes.sideBorder} />;
                        }}
                        ListHeaderComponent={() => {
                          return <Spacer width={Sizes.sideBorder} />;
                        }}
                        ListFooterComponent={() => {
                          return <Spacer width={Sizes.sideBorder} />;
                        }}
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment="start"
                        decelerationRate={'fast'}
                        snapToInterval={
                          Dimensions.get('window').width -
                          Sizes.sideBorder * 2 -
                          Sizes.sideBorder / 2
                        }
                      />

                      <Spacer height={30} />

                      <Spacer
                        marginHorizontal={Sizes.sideBorder}
                        height={0.5}
                        color={Colors.separator}
                      />
                    </View>
                  );
                case SectionType.UpcomingEvents:
                  return (
                    <View>
                      <Spacer height={30} />
                      <Text
                        style={{
                          marginStart: Sizes.sideBorder,
                          ...styles.headings,
                        }}>
                        Other upcoming events
                      </Text>
                      <Spacer height={20} />

                      {section.data.length == 0 &&
                      !pageLoading &&
                      !pageError ? (
                        <View>
                          <Spacer height={25} />

                          <Text
                            style={{
                              fontFamily: Font.medium,
                              fontSize: 16,
                              textAlign: 'center',
                              lineHeight: 25,
                            }}>
                            No other upcoming events found in your location
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  );
              }
            }}
            renderItem={({item, index, section}) => {
              if (section.type == SectionType.UpcomingEvents) {
                return (
                  <View style={{marginHorizontal: Sizes.sideBorder}}>
                    {index == 0 ? <Spacer height={5} /> : null}

                    <SmallEventItem
                      data={item}
                      onPress={() => {
                        navigateToDetailScreen(item.id);
                      }}
                    />

                    <Spacer height={30} />

                    {index === section.data.length - 1 ? (
                      <Spacer height={1} />
                    ) : null}
                  </View>
                );
              } else {
                return null;
              }
            }}
            ListFooterComponent={
              isLoadingMore ? (
                <View style={{marginBottom: 60}}>
                  <ActivityIndicator />
                </View>
              ) : null
            }
            onEndReachedThreshold={0}
            onEndReached={() => {
              const shouldLoadMore = !isLoadingMore && !pageLoading && !pageError && sections[2].data.length != 0
              if (shouldLoadMore) {
                loadMore();
              }
            }}
          />
        ) : null}
      </View>
      {showLocationSelector ? (
        <Animated.View
          style={{
            width: width,
            height: height,
            position: 'absolute',
            opacity: overlayOpacity,
          }}>
          <LocationSelector
            onDismiss={() => {
              Animated.timing(overlayOpacity, {
                duration: 200,
                toValue: 0,
                useNativeDriver: false,
              }).start(() => {
                setShowLocationSelector(false);
              });
            }}
            onSave={(location: any) => {
              setLocation(location);
            }}
            currentLocation={location}
          />
        </Animated.View>
      ) : null}
    </SafeAreaView>
  );
};

const ErrorLayout: React.FC<any> = ({onRetry}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontFamily: Font.medium, fontSize: 16, textAlign: 'center', lineHeight: 25}}>
        Something went wrong, please try again
      </Text>

      <Spacer height={20} />

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: 26,
          paddingVertical: 10,
          borderRadius: 6
        }}
        onPress={() => {onRetry()}}>
        <Text style={{fontFamily: Font.medium, fontSize: 14, color: Colors.white}}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const LocationSelector: React.FC<any> = ({
  onDismiss,
  onSave,
  currentLocation,
}) => {
  const [location, setLocation] = useState(currentLocation);
  const {width, height} = useWindowDimensions();

  let _renderItem = ({item}: any) => (
    <LocationItem
      name={item.name}
      abbreviation={item.abbreviation}
      selected={item.name == location.name}
      onPress={() => {
        setLocation(item);
      }}
    />
  );

  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      backgroundColor: '#00000070',
      position: 'absolute',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dimmer: {
      width: width,
      height: height,
    },
    listContainer: {
      width: width * 0.7,
      height: height * 0.5,
      backgroundColor: Colors.white,
      position: 'absolute',
      borderRadius: 6,
      flexDirection: 'column',
    },
    title: {
      fontFamily: Font.bold,
      fontSize: 14,
      marginStart: 16,
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.dimmer,
        }}
        activeOpacity={0.5}
        onPress={() => {
          onDismiss();
        }}
      />

      <View style={styles.listContainer}>
        <Text style={styles.title}>Select Region</Text>

        <Spacer height={16} />
        <Spacer height={4} color={Colors.separator} />

        <FlatList
          data={statesList}
          renderItem={_renderItem}
          ItemSeparatorComponent={() => {
            return <Spacer height={0.5} color={Colors.separator} />;
          }}
        />

        <SaveButton
          location={location}
          onPress={(location: any) => {
            onSave(location);
            onDismiss();
          }}
        />
      </View>
    </View>
  );
};

const LocationItem: React.FC<any> = ({
  name,
  abbreviation,
  selected,
  onPress,
}) => {
  const styles = StyleSheet.create({
    container: {
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginStart: 16,
      marginEnd: 9,
    },
    text: {
      fontFamily: Font.medium,
      fontSize: 12,
      color: Colors.black,
    },
    image: {
      width: 24,
      height: 24,
    },
  });

  return (
    <TouchableHighlight
      underlayColor="#EBEBEB"
      onPress={() => {
        onPress();
      }}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {name}
          {abbreviation ? ', ' + abbreviation : null}
        </Text>

        {selected ? (
          <Image
            style={styles.image}
            source={require('../assets/images/checkMark.png')}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

const SaveButton: React.FC<any> = ({location, onPress}) => {
  return (
    <TouchableHighlight
      style={{borderBottomLeftRadius: 6, borderBottomRightRadius: 6}}
      underlayColor={Colors.primary}
      onPress={() => onPress(location)}>
      <View style={styles.saveButton}>
        <Text
          style={{fontFamily: Font.bold, fontSize: 12, color: Colors.primary}}>
          SAVE
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  body: {
    marginHorizontal: Sizes.sideBorder,
    backgroundColor: Colors.background,
  },
  headings: {
    fontFamily: Font.bold,
    fontSize: 18,
    color: 'black',
  },
  saveButton: {
    paddingVertical: 18,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: '#E0E7EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
