export interface SocialLink {
    path: string
    link: string
}

export interface TextLink {
    path: string,
    text: string
}

export interface AppLink {
    path: string
    link: string
}

export interface AppLinks {
    appStore: AppLink,
    googlePlay: AppLink
}

export interface SocialLinks {
    instagram: SocialLink
    telegram: SocialLink
    facebook: SocialLink
    youtube: SocialLink
}

