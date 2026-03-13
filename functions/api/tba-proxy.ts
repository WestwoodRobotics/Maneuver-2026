/**
 * Cloudflare Pages Function - TBA API Proxy
 * Proxies requests to The Blue Alliance API without exposing API keys client-side
 */

interface Env {
  TBA_API_KEY: string;
}

export const onRequestGet = async (
  context: { request: Request; env: Env },
): Promise<Response> => {
  const { request, env } = context;

  // Get API key from environment
  const apiKey = env.TBA_API_KEY;

  // Get the endpoint from query parameters
  const url = new URL(request.url);
  const endpoint = url.searchParams.get("endpoint");

  if (!endpoint) {
    return new Response('Missing endpoint parameter', { status: 400 });
  }

  if (!apiKey) {
    return new Response('TBA API key not configured', { status: 500 });
  }

  try {
    // Forward request to TBA
    const tbaUrl = `https://www.thebluealliance.com/api/v3${endpoint}`;
    const response = await fetch(tbaUrl, {
      headers: {
        'X-TBA-Auth-Key': apiKey,
        'Accept': 'application/json',
      },
    });

    // Forward TBA response
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('TBA proxy error:', error);
    return new Response('Failed to fetch from TBA', { status: 500 });
  }
};
