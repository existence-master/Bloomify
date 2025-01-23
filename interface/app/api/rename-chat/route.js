import { NextResponse } from 'next/server';
import connect from '@utils/db';
import Chat from '@models/Chat';

export async function PUT(req) {
  try {
    const body = await req.json();
    const { chatId, newTitle } = body;

    if (!chatId || !newTitle.trim()) {
      return NextResponse.json(
        { error: 'Invalid request. Chat ID and new title are required.' },
        { status: 400 }
      );
    }

    await connect(); // Ensure database is connected

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { title: newTitle },
      { new: true }
    );

    if (!updatedChat) {
      return NextResponse.json(
        { error: 'Chat not found or update failed.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Chat renamed successfully.', chat: updatedChat },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error renaming chat:', error);
    return NextResponse.json(
      { error: 'Server error while renaming chat.' },
      { status: 500 }
    );
  }
}
