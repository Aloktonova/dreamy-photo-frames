// Input validation utilities for security

export interface ValidationError {
  field: string;
  message: string;
}

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 255); // Limit length
};

// Validate email format
export const validateEmail = (email: string): ValidationError | null => {
  const sanitized = sanitizeInput(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!sanitized) {
    return { field: 'email', message: 'Email is required' };
  }
  
  if (!emailRegex.test(sanitized)) {
    return { field: 'email', message: 'Please enter a valid email address' };
  }
  
  return null;
};

// Validate password strength
export const validatePassword = (password: string): ValidationError | null => {
  if (!password) {
    return { field: 'password', message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { field: 'password', message: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { field: 'password', message: 'Password must contain uppercase, lowercase, and number' };
  }
  
  return null;
};

// Validate username
export const validateUsername = (username: string): ValidationError | null => {
  const sanitized = sanitizeInput(username);
  
  if (!sanitized) {
    return { field: 'username', message: 'Username is required' };
  }
  
  if (sanitized.length < 2) {
    return { field: 'username', message: 'Username must be at least 2 characters long' };
  }
  
  if (sanitized.length > 50) {
    return { field: 'username', message: 'Username must be less than 50 characters' };
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(sanitized)) {
    return { field: 'username', message: 'Username can only contain letters, numbers, hyphens, and underscores' };
  }
  
  return null;
};

// Validate phone number
export const validatePhone = (phone: string): ValidationError | null => {
  if (!phone) return null; // Phone is optional
  
  const sanitized = sanitizeInput(phone);
  const phoneRegex = /^\+?[\d\s-()]+$/;
  
  if (!phoneRegex.test(sanitized)) {
    return { field: 'phone', message: 'Please enter a valid phone number' };
  }
  
  if (sanitized.length > 20) {
    return { field: 'phone', message: 'Phone number is too long' };
  }
  
  return null;
};

// Validate names (first/last)
export const validateName = (name: string, fieldName: string): ValidationError | null => {
  if (!name) return null; // Names are optional
  
  const sanitized = sanitizeInput(name);
  
  if (sanitized.length > 50) {
    return { field: fieldName, message: `${fieldName} must be less than 50 characters` };
  }
  
  if (!/^[a-zA-Z\s'-]+$/.test(sanitized)) {
    return { field: fieldName, message: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }
  
  return null;
};

// Clean up authentication state to prevent limbo
export const cleanupAuthState = (): void => {
  try {
    // Remove all Supabase auth keys from localStorage
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });
    
    // Remove from sessionStorage if available
    if (typeof sessionStorage !== 'undefined') {
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
          sessionStorage.removeItem(key);
        }
      });
    }
  } catch (error) {
    console.error('Error cleaning up auth state:', error);
  }
};