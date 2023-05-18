import { StackScreenProps } from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mapResponseToEventItemProp, searchEvents} from '../api/EventRepo';
import ErrorLayout from '../components/ErrorLayout';
import SmallEventItem from '../components/eventItems/SmallEventItem';
import GenericAppBar from '../components/GenericAppBar';
import SearchBar from '../components/SearchBar';
import Spacer from '../components/Spacer';
import { StackParamList } from '../navigation/StackNav';
import {Colors, Font, Sizes} from '../styles/Theme';

const itemProperty = {
  imageSource: '../assets/images/eventImage.jpeg',
  eventName: 'Philadelphia nuggets vs. Atlanta Hawks',
  date: {
    day: 'Sat',
    month: 'Jul 4',
    time: '8:30 pm',
  },
  location: {
    city: 'Citizens bank park',
    venue: 'Flushing, NY',
  },
};

const initialData = [
  {
    data: [] as any,
  },
];

type Props = StackScreenProps<StackParamList, 'Search'>;

const SearchScreen = ({route, navigation}: Props) => {

  const [searchItems, setSearchItems] = useState(initialData);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [shouldLoadMore, setShouldLoadMore] = useState(false);
  const [page, setPage] = useState(0);
  const [retryKey, setRetryKey] = useState(0);

  const [currentSearch, setCurrentSearch] = useState(route.params.query);

  function search(text: string) {
    if (!text) {
      return;
    }
    const formatted = text.trim();
    if (formatted.length != 0) {
      setCurrentSearch(formatted);
    }
  }

  function navigateToDetailScreen(id: string) {
    navigation.navigate('EventDetails', {id: id});
  }

  async function refreshPage() {
    setRefreshing(true);
    setPage(0);

    searchEvents(currentSearch)
      .then(response => {
        var responseData = null;
        try {
          responseData = response.data._embedded.events;
        } catch (e) {}

        setSearchItems([
          {
            data: responseData
              ? responseData.map((e: any) => {
                  return mapResponseToEventItemProp(e).data;
                })
              : [],
          },
        ]);
        setRefreshing(false);
      })
      .catch(error => {
        setRefreshing(false); 
      });
  }

  async function loadMore() {
    setPage(page => page + 1);
    setShouldLoadMore(true);
  }

  const loadPageEffect = useEffect(() => {

    const abortController = new AbortController();
    async function loadInitial() {
      setSearchItems(initialData);
      setPageLoading(true);
      setPageError(false);
      setLoadingMore(false);
      setRefreshing(false);
      setPage(0);

      searchEvents(currentSearch, '', 0, abortController.signal)
        .then(response => {
          var responseData = null;
          try {
            responseData = response.data._embedded.events;
          } catch (e) {}

          setSearchItems([
            {
              data: responseData
                ? responseData.map((e: any) => {
                    return mapResponseToEventItemProp(e).data;
                  })
                : [],
            },
          ]);
          setPageLoading(false);
        })
        .catch(error => {
          setPageError(true);
          setPageLoading(false);
        });
    }

    loadInitial();

    return () => {
      abortController.abort();
    };
  }, [currentSearch, retryKey]);

  const loadMoreEffect = useEffect(() => {
    const abortController = new AbortController();

    async function loadMore() {
      setLoadingMore(true);

      searchEvents(currentSearch, '', page, abortController.signal)
        .then(response => {
          var responseData = null;
          try {
            responseData = response.data._embedded.events;
          } catch (e) {}

          const newData = {
            data: [
              ...searchItems[0].data,
              ...(responseData
                ? responseData.map((e: any) => {
                    return mapResponseToEventItemProp(e).data;
                  })
                : []),
            ],
          };

          setSearchItems([newData]);

          setLoadingMore(false);
        })
        .catch(error => {
          setLoadingMore(false);
          setShouldLoadMore(false);
          setPage(page => page - 1);
        });
    }
    if (page != 0 && shouldLoadMore) {
      loadMore();
    }

    return () => {
      abortController.abort();
    };
  }, [page, shouldLoadMore]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: Colors.background,
          flexGrow: 1,
        }}>
        <GenericAppBar
          title="Search Results"
          onBackPress={() => {
            navigation.goBack();
          }}
        />

        <SectionList
          style={{}}
          stickySectionHeadersEnabled={false}
          sections={searchItems}
          onRefresh={() => {
            refreshPage();
          }}
          refreshing={refreshing}
          renderSectionHeader={({section}) => {
            return (
              <View
                style={{
                  marginHorizontal: Sizes.sideBorder,
                  flexDirection: 'column',
                }}>
                <Spacer height={24} />

                <SearchBar
                  onSearch={(text: string) => {
                    search(text);
                  }}
                  defaultText={currentSearch}
                />

                <Spacer height={25} />

                <Text style={{fontFamily: Font.medium, fontSize: 14}}>
                  Showing search results for...{' '}
                  {
                    <Text style={{fontFamily: Font.semiBold, fontSize: 16}}>
                      "{currentSearch}"
                    </Text>
                  }
                </Text>

                <Spacer height={25} />

                <Spacer height={0.5} color={Colors.separator} />

                <Spacer height={25} />

                {pageError ? (
                  <View>
                    <Spacer height={50} />

                    <ErrorLayout
                      onRetry={() => {
                        setRetryKey(key => key + 1);
                      }}
                    />
                  </View>
                ) : null}

                {pageLoading ? (
                  <View>
                    <Spacer height={65} />

                    <ActivityIndicator />
                  </View>
                ) : null}

                {(section.data.length == 0 && !pageLoading && !pageError) ? (
                  <View>
                    <Spacer height={50} />

                    <Text
                      style={styles.noResultText}>
                      No events found for your search
                    </Text>
                  </View>
                ) : null}
              </View>
            );
          }}
          renderItem={({item, index, section}) => {
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
              </View>
            );
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
            const shouldLoadMore = !isLoadingMore && !pageLoading && !pageError && searchItems[0].data.length != 0
            if (shouldLoadMore) {
              loadMore();
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: Colors.background,
    flexDirection: 'column',
  },
  noResultText: {
    fontFamily: Font.medium,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 25,
  },
});

export default SearchScreen;
