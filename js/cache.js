

const DURATION =  10 * 60 * 1000; 

export function setUserCache(key, data) {
  localStorage.setItem(key, JSON.stringify({ data: data, savedAt: Date.now() }));
}

export function getUserCache(key) {
  const entry = JSON.parse(localStorage.getItem(key)); // null if the key doesn't exist

  if (entry && Date.now() - entry.savedAt < DURATION) {
    
    return entry.data;
  }

  return null; 
}