import crypto from 'crypto';

const generateAuthToken = () => {
    const buffer = crypto.randomBytes(6);
    const token = buffer.toString('base64')
                        .replace(/[^a-zA-Z0-9]/g, '')
                        .slice(0, 6);

    return token;
};

export default generateAuthToken;
