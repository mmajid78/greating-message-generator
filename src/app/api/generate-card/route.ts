import { NextRequest, NextResponse } from 'next/server';

// Groq API configuration - uses environment variable
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'API key not configured. Please set GROQ_API_KEY environment variable in Vercel.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, senderName, age, hobby, occasion, tone, creativity, theme, language } = body;

    // Validate required fields
    if (!name || !occasion || !tone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, occasion, and tone are required' },
        { status: 400 }
      );
    }

    // Build the prompt based on creativity level
    let creativityInstruction = '';
    let temperature = 0.7;
    switch (creativity) {
      case 'Safe':
        creativityInstruction = 'Keep it traditional and family-friendly with standard greetings.';
        temperature = 0.5;
        break;
      case 'Moderate':
        creativityInstruction = 'Be creative but appropriate, add some personality and warmth.';
        temperature = 0.7;
        break;
      case 'Wild':
        creativityInstruction = 'Be very creative and unique! Use unexpected metaphors, playful language, and make it memorable and fun!';
        temperature = 0.9;
        break;
      default:
        creativityInstruction = 'Be creative but appropriate, add some personality and warmth.';
    }

    // Language instruction
    const languageMap: Record<string, string> = {
      'English': 'in English',
      'Spanish': 'in Spanish (Español)',
      'French': 'in French (Français)',
      'German': 'in German (Deutsch)',
      'Chinese': 'in Chinese (中文)',
      'Japanese': 'in Japanese (日本語)',
      'Portuguese': 'in Portuguese (Português)',
      'Italian': 'in Italian (Italiano)',
    };

    const languageInstruction = languageMap[language] || 'in English';

    // Build occasion context
    let occasionContext = '';
    switch (occasion) {
      case 'Birthday':
        occasionContext = `It's ${name}'s birthday${age ? ` and they're turning ${age}` : ''}`;
        break;
      case 'Graduation':
        occasionContext = `${name} is graduating${age ? ` at age ${age}` : ''}`;
        break;
      case 'Anniversary':
        occasionContext = `It's ${name}'s anniversary`;
        break;
      case 'Wedding':
        occasionContext = `${name} is getting married`;
        break;
      case 'Baby Shower':
        occasionContext = `It's ${name}'s baby shower`;
        break;
      case 'Retirement':
        occasionContext = `${name} is retiring`;
        break;
      case 'Christmas':
        occasionContext = `It's Christmas time for ${name}`;
        break;
      case "Valentine's Day":
        occasionContext = `It's Valentine's Day for ${name}`;
        break;
      case 'Halloween':
        occasionContext = `It's Halloween for ${name}`;
        break;
      case 'Thanksgiving':
        occasionContext = `It's Thanksgiving for ${name}`;
        break;
      case 'New Year':
        occasionContext = `It's New Year for ${name}`;
        break;
      case "Mother's Day":
        occasionContext = `It's Mother's Day for ${name}`;
        break;
      case "Father's Day":
        occasionContext = `It's Father's Day for ${name}`;
        break;
      case 'Get Well Soon':
        occasionContext = `${name} is recovering and needs encouragement`;
        break;
      case 'Sympathy':
        occasionContext = `${name} needs sympathy and comfort`;
        break;
      case 'Thank You':
        occasionContext = `A thank you message for ${name}`;
        break;
      case 'Congratulations':
        occasionContext = `Congratulations are in order for ${name}`;
        break;
      case 'Housewarming':
        occasionContext = `${name} is celebrating a new home`;
        break;
      default:
        occasionContext = `It's a special occasion for ${name}`;
    }

    // Tone instruction
    let toneInstruction = '';
    switch (tone) {
      case 'Funny':
        toneInstruction = 'Make it humorous and light-hearted with appropriate jokes and wit.';
        break;
      case 'Sweet':
        toneInstruction = 'Make it sweet, gentle, and heartwarming with soft and caring words.';
        break;
      case 'Heartfelt':
        toneInstruction = 'Make it deeply emotional and sincere, touching the heart.';
        break;
      case 'Sarcastic':
        toneInstruction = 'Add some playful sarcasm and wit, but keep it friendly.';
        break;
      case 'Professional':
        toneInstruction = 'Keep it formal and professional while still being warm.';
        break;
      case 'Romantic':
        toneInstruction = 'Make it romantic, loving, and passionate.';
        break;
      case 'Inspirational':
        toneInstruction = 'Make it inspiring and motivational with uplifting words.';
        break;
      case 'Casual':
        toneInstruction = 'Make it casual, relaxed, and friendly like chatting with a buddy.';
        break;
      default:
        toneInstruction = 'Make it warm and friendly.';
    }

    const prompt = `Create a personalized greeting card message ${languageInstruction}.

Context: ${occasionContext}${hobby ? `. ${name} loves ${hobby}` : ''}
The card is from: ${senderName || 'A friend'}

Requirements:
- Tone: ${toneInstruction}
- Creativity: ${creativityInstruction}
- Theme style: ${theme || 'General celebration'}

Please write a complete greeting card message that:
1. Has a catchy headline/title
2. Contains 2-4 sentences for the main message
3. Includes appropriate emojis to enhance the message
4. Ends with a warm closing (but do NOT include a signature - that will be added separately)

Make it personal, memorable, and perfectly suited for ${name}.`;

    // Call Groq API
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are an expert greeting card writer who creates personalized, memorable messages for every occasion. 
You excel at matching the perfect tone - whether funny, sweet, heartfelt, sarcastic, or professional.
You know how to incorporate personal details naturally and use emojis tastefully.
Your messages are always original, creative, and make people feel special.`
          },
          { role: 'user', content: prompt }
        ],
        temperature: temperature,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error:', errorData);
      return NextResponse.json(
        { error: `API error: ${response.status} - ${errorData?.error?.message || 'Unknown error'}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content;

    if (!message) {
      return NextResponse.json(
        { error: 'Failed to generate card message' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message,
      metadata: {
        name,
        senderName,
        age,
        hobby,
        occasion,
        tone,
        creativity,
        theme,
        language,
        generatedAt: new Date().toISOString(),
        provider: 'Groq API'
      }
    });

  } catch (error) {
    console.error('Card generation error:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating the card. Please try again.' },
      { status: 500 }
    );
  }
}
