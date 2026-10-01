export async function GET() {
  return new Response('google-site-verification: google9c3fd5e3163a1fd7.html\n', {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
