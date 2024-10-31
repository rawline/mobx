import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import repositoryStore from '../stores/repositoryStore';
import ListItem from './ListItem';
import { Text, Center, Loader, Stack, Title, Affix, Transition, Button } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';

const RepositoryList: React.FC = observer(() => {
    const { repositories, loadRepositories } = repositoryStore;
    const [scroll, scrollTo] = useWindowScroll();
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        if (isFetching) {
            loadRepositories().finally(() => setIsFetching(false));
        }
    }, [isFetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, []);

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 300) {
            setIsFetching(true);
        }
    };

    return (
        <Center>
            <Stack align='center' mt={40} mb={70}>
                <Title order={1}>GitHub Repositories</Title>
                {repositories.length > 0 ? (
                    <Stack mt={20} mb={30}>
                        {repositories.map((repository) => (
                            <ListItem key={repository.id} repository={repository} />
                        ))}
                    </Stack>
                ) : (
                    <Text>No repositories found</Text>
                )}
                <Loader />
            </Stack>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <Button
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            Scroll to top
                        </Button>
                    )}
                </Transition>
            </Affix>
        </Center>
    );
});

export default RepositoryList;
