
// WordPress API Configuration
export const WORDPRESS_ENDPOINTS = {
  base: 'https://wellnessisgolden.com//wp-json/wp/v2',
  posts: 'https://wellnessisgolden.com//wp-json/wp/v2/posts',
  media: 'https://wellnessisgolden.com//wp-json/wp/v2/media',
  pages: 'https://wellnessisgolden.com//wp-json/wp/v2/pages',
  custom: {
    herbs: 'https://wellnessisgolden.com//wp-json/wp/v2/herbs',
    ebooks: 'https://wellnessisgolden.com//wp-json/wp/v2/ebooks'
  }
};

// Authentication headers for WordPress API
export function getAuthHeaders() {
  const credentials = `info@plan2befit.com:Almalik@77`;
  // Use TextEncoder for encoding in ES modules
  const encoder = new TextEncoder();
  const data = encoder.encode(credentials);
  const encodedCredentials = btoa(String.fromCharCode(...new Uint8Array(data)));
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${encodedCredentials}`
  };
}
