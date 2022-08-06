const apiUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/v1' // development api
    : 'http://localhost:5000/v1'; // production api
    
 
export {
    apiUrl
};