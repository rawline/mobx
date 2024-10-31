import React, { useState } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { Anchor, Badge, Text, Group, Paper, Stack, Button, Grid, Input } from '@mantine/core';
import repositoryStore from '../stores/repositoryStore';
import { ListItemProps } from './interfaces';
import { action, observable } from 'mobx';

const ListItem: React.FC<ListItemProps> = observer(({ repository }) => {
    const [isEditing, setIsEditing] = useState(false);
    const localState = useLocalObservable(() => ({
        editName: observable.box(repository.name),
        setEditName: action((value: string) => {
            localState.editName.set(value);
        })
    }));

    const handleEdit = () => {
        setIsEditing(true);
        localState.setEditName(repository.name);
    };

    const handleSave = () => {
        repositoryStore.editRepository(repository.id, localState.editName.get());
        setIsEditing(false);
    };

    const handleDelete = () => {
        repositoryStore.deleteRepository(repository.id);
    };

    return (
        <Paper w={"40vw"} shadow="xs" radius="md" withBorder p="lg" pr={0}>
            {isEditing ? (
                <Grid columns={24}>
                    <Grid.Col span={24}>
                        <Input
                            type="text"
                            value={localState.editName.get()}
                            onChange={(e) => localState.setEditName(e.target.value)}
                            width={"100%"}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Button variant="filled" onClick={handleSave} w={"100%"}>
                            Save
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Button variant="filled" onClick={() => setIsEditing(false)} w={"100%"}>
                            Cancel
                        </Button>
                    </Grid.Col>
                </Grid>
            ) : (
                <Group justify="space-between" grow>
                    <Stack gap={0}>
                        <Badge mr={10} variant="default" color="grape" size="sm">
                            {repository.id}
                        </Badge>
                        <Anchor fw={700} fz="xl" href={repository.html_url} target="_blank" mb={20}>
                            {repository.name}
                        </Anchor>
                        <Text>{repository.description}</Text>
                    </Stack>
                    <Stack align="center">
                        <Button variant="filled" onClick={handleEdit} w={"90%"}>
                            Edit Name
                        </Button>
                        <Button variant="filled" onClick={handleDelete} w={"90%"}>
                            Delete
                        </Button>
                    </Stack>
                </Group>
            )}
        </Paper>
    );
});

export default ListItem;
