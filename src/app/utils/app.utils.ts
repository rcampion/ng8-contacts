// Headers HTTP
export const HEADER_X_SECRET = 'X-Secret';
export const HEADER_X_TOKEN_ACCESS = 'X-TokenAccess';
export const HEADER_X_DIGEST = 'X-Digest';
export const HEADER_X_ONCE = 'X-Once';
export const HEADER_WWW_AUTHENTICATE = 'WWW-Authenticate';
export const HEADER_AUTHENTICATION = 'Authentication';
export const CSRF_CLAIM_HEADER = 'X-HMAC-CSRF';

// Local storage keys
export const STORAGE_ACCOUNT_TOKEN = 'hmacApp-account';
export const STORAGE_SECURITY_TOKEN = 'hmacApp-security';

// Common http root api
export const BACKEND_API_PATH = '/ng5-contacts-server/api';
export const BACKEND_API_AUTHENTICATE_PATH = '/authenticate';
export const BACKEND_API_ROOT_URL = 'http://www.zdslogic-development.com:8080' + BACKEND_API_PATH;
// export const BACKEND_API_ROOT_URL: string = 'https://www.zdslogic.com' + BACKEND_API_PATH;

export class UrlMatcher {
    public static matches(url: string): boolean {
        return url.indexOf(BACKEND_API_PATH) !== -1
            && url.indexOf(BACKEND_API_PATH + BACKEND_API_AUTHENTICATE_PATH) === -1;
    }
}
