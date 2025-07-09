//@ts-nocheck
import https from 'https';
import crypto from 'crypto';
import moment from "moment";
import { SUPER_ADMIN } from "./constants";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const getRoleName = (role: string | undefined | null) => {
    if (role === SUPER_ADMIN) return SUPER_ADMIN;
};

export const truncateText = (string: string, limit = 0) => {
    if (string.length <= limit) {
        return string;
    }
    return string.slice(0, limit) + '...';
};

export const decryptApi = async (encryptedData: any, iv: any, secretKey: any) => {
    const iv1 = Buffer.from(iv, "hex");
    const encryptedText = Buffer.from(encryptedData, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(secretKey.slice(0, 32)), iv1);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

export const formatDate = (value: string | Date) => {
    return moment(value).format('DD MMMM YYYY [AT] hh:mm A');
};

export const downloadImage = (imageUrl: string) => {
    const url = imageUrl;
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// TASS API URL function
export const tassApiUrl = (
    tokenKey: string,
    appCode: string,
    companyCode: string,
    version: string,
    method: string,
    endPoint: string,
    parameterString: string
) => {
    // Encrypt function
    const encrypt = (parameterString: string, tokenKey: string) => {
        const binaryEncryptionKey = Buffer.from(tokenKey, "base64");
        const cipher = crypto.createCipheriv("AES-128-ECB", binaryEncryptionKey, Buffer.alloc(0));
        const encryptedString = cipher.update(parameterString, "utf8", "base64") + cipher.final("base64");
        return encryptedString;
    };

    // Decrypt function
    const decrypt = (encryptedInput: string, tokenKey: string) => {
        const binaryEncryptionKey = Buffer.from(tokenKey, "base64");
        const decipher = crypto.createDecipheriv("AES-128-ECB", binaryEncryptionKey, Buffer.alloc(0));
        const decryptedString = decipher.update(encryptedInput, "base64", "utf8") + decipher.final("utf8");
        return decryptedString;
    };

    // Constructs the request URL
    const constructRequest = () => {
        const token = encodeURIComponent(encrypt(parameterString, tokenKey));
        return `${endPoint}?appcode=${appCode}&v=${version}&method=${method}&company=${companyCode}&token=${token}`;
    };

    // Makes the API request and handles response
    const makeAPIRequest = () => {
        const requestURL = constructRequest();
        https.get(requestURL, (resp: any) => {
            if (resp.statusCode === 200) {
                let data = '';
                resp.on('data', (chunk: any) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    const searchResponse = JSON.parse(data);
                    console.log("Response:", searchResponse);
                });
            } else {
                console.log("Error:", resp.statusCode);
            }
        }).on("error", (err: any) => {
            console.log("Error:", err.message);
        });
    };

    // Display encrypted and decrypted parameter strings
    console.log('Original Parameter String:', parameterString);
    console.log('Encrypted Parameter String:', encrypt(parameterString, tokenKey));
    console.log('Decrypted Parameter String:', decrypt(encrypt(parameterString, tokenKey), tokenKey));

    // Display the constructed request URL
    console.log('Request URL:', constructRequest());

    // Initiate the API request
    makeAPIRequest();
};

// Returns initials from string
export const getInitials = (string: string) =>
    string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')



export const getParentInfo = (parentDetails: ParentDetails | undefined) => {
    if (!parentDetails) {
        return {
            parentName: '',
            mobileNumbers: [],
            students: [],
        };
    }

    const {
        father_name,
        mother_name,
        parent_mobile1,
        parent_mobile1_sms_flag,
        parent_mobile2,
        parent_mobile2_sms_flag,
        students = [],
    } = parentDetails;

    const mobileNumbers: MobileNumber[] = [];

    const appendMobileNumber = (number: string, flag: string) => {
        if (flag === 'Y' && number) {
            const { prefix, number: mobile } = extractMobileNumber(number);
            if (prefix === 'M') mobileNumbers.push({ name: father_name, number: mobile });
            else if (prefix === 'F') mobileNumbers.push({ name: mother_name, number: mobile });
        }
    };

    appendMobileNumber(parent_mobile1, parent_mobile1_sms_flag);
    appendMobileNumber(parent_mobile2, parent_mobile2_sms_flag);

    return {
        parentName: father_name,
        mobileNumbers,
        students,
    };
}

export function debounce(func: any, delay: number) {
    let timeoutId: any;
    return function (...args: any) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export const toTitleCase = (str: string): string => {
    return str?.toLowerCase()?.split(' ')?.map(word => word.charAt(0)?.toUpperCase() + word.slice(1)).join(' ')
}

export const formatDuration = (seconds) => {
    if (!seconds && seconds !== 0) return 'In progress';

    // Create a duration object from seconds
    const dur = dayjs.duration(seconds, 'seconds');

    // Format as hours, minutes, and seconds
    const hours = Math.floor(dur.asHours());
    const minutes = dur.minutes();
    const secs = dur.seconds();

    // Format with leading zeros
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Functions to manage unread counts in localStorage
export const getStoredUnreadCounts = () => {
  const stored = localStorage.getItem('chatUnreadCounts');
  return stored ? JSON.parse(stored) : {};
};

export const updateStoredUnreadCounts = (chatId: string, count: number) => {
  const stored = getStoredUnreadCounts();
  stored[chatId] = count;
  localStorage.setItem('chatUnreadCounts', JSON.stringify(stored));
};

// Helper to track "read" status of chats 
export const getReadChats = (): Record<string, boolean> => {
  const stored = localStorage.getItem('readChats');
  return stored ? JSON.parse(stored) : {};
};

export const markChatAsRead = (chatId: string) => {
  const readChats = getReadChats();
  readChats[chatId] = true; // Mark as read
  localStorage.setItem('readChats', JSON.stringify(readChats));
};

export const isChatRead = (chatId: string): boolean => {
  const readChats = getReadChats();
  return !!readChats[chatId]; // Returns true if chat is marked as read
};

