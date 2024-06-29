import moment from 'moment-timezone';
import environments from '../../config/environments/environments.js';

export const dateSet = () => {
    
    const date = Date().toLocaleString('en-US', { timeZone: environments.timeZone });
    return date;
};