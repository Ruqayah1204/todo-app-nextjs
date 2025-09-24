export async function GET() {
  return Response.json({ 
    message: 'API is working',
    hasGatewayKey: !!process.env.AI_GATEWAY_API_KEY,
    gatewayKeyLength: process.env.AI_GATEWAY_API_KEY?.length || 0
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return Response.json({ 
      message: 'POST received',
      receivedData: body,
      hasGatewayKey: !!process.env.AI_GATEWAY_API_KEY
    });
  } catch (error) {
    return Response.json({ 
      error: 'Failed to parse JSON',
      details: error.message 
    }, { status: 400 });
  }
}