export interface Repository {
    id: number;
    name: string;
    html_url: string;
    description: string;
}

export interface ListItemProps {
    repository: Repository;
}