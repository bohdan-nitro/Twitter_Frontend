export type User = {
    id: string;
    name: string;
    image?: string;
    username: string;
}

export type TweetType = {
    id: string;
    content: string;
    user: User;
    createdAt: string;
    image?: string;
    numberOfComments?: number;
    numberOfRetweets?: number;
    numberOfLikes?: number;
    impressions?: number;
}