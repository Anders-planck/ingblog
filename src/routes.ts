export const AUTH_ROUTE = '/auth';
export const HOME_ROUTE = '/';
export const ACCOUNT_ROUTE = '/account';
export const ADD_POST_ROUTE = '/add-post';
export const POST_ROUTE = '/posts';

export const TAB_POSTS_LIKED = 'postsLikes';
export const TAB_SAVED_POSTS = 'savedPosts';
export const TAB_SETTINGS = 'settings';

export const ACCOUNT_POSTS_LIKED_ROUTE = `${ACCOUNT_ROUTE}?tabValue=${TAB_POSTS_LIKED}`;
export const ACCOUNT_SAVED_POSTS_ROUTE = `${ACCOUNT_ROUTE}?tabValue=${TAB_SAVED_POSTS}`;
export const ACCOUNT_SETTINGS_ROUTE = `${ACCOUNT_ROUTE}?tabValue=${TAB_SETTINGS}`;
