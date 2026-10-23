export interface Member {
    id: string;
    dateOfBirth: string;
    displayName: string;
    imageUrl?: string;
    created: string;
    lastActive: string;
    gender: string;
    bio?: string;
    city: string;
    country: string;
}

export interface MemberEdit {
    displayName: string;
    bio?: string;
    city: string;
    country: string;
}
